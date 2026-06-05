/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

import _traverse from "@babel/traverse";
import type { JSXAttribute, JSXOpeningElement, JSXSpreadAttribute } from "@babel/types";
import { glob } from "glob";

import { extractClassNameInfo } from "./class-name";
import { collectImports } from "./imports";
import {
  firstMemberName,
  isBackpackComponent,
  isNonBackpackComponent,
  isNonVisualComponent,
  isRawHtmlElement,
  lastMemberName,
  parseSourceFile,
  tagNameText,
} from "./jsx";
import { buildVisualComponentRegistry } from "./visual-components";
import { DEFAULT_IGNORE_PATTERNS, DEFAULT_PATTERN } from "../shared/config";
import type { AdoptionReport } from "../shared/types";

const traverse = (
  (_traverse as unknown as { default?: typeof _traverse }).default ?? _traverse
) as typeof _traverse;

type FileAnalysis = {
  backpackUsages: number;
  classNameOverrides: number;
  nonBackpackUsages: number;
  rawHtmlUsages: number;
  componentCounts: Record<string, number>;
};

type AnalyzerOptions = {
  pattern?: string;
  ignore?: string[];
};

const roundPercentage = (value: number) => Number(value.toFixed(2));

const emptyFileAnalysis = (): FileAnalysis => ({
  backpackUsages: 0,
  classNameOverrides: 0,
  nonBackpackUsages: 0,
  rawHtmlUsages: 0,
  componentCounts: {},
});

const incrementComponentCount = (
  componentCounts: Record<string, number>,
  componentName: string,
) => {
  componentCounts[componentName] = (componentCounts[componentName] || 0) + 1;
};

const analyzeFile = (
  filePath: string,
  visualComponentRegistry: Set<string>,
): FileAnalysis => {
  const content = readFileSync(filePath, "utf8");
  const ast = parseSourceFile(content);
  const importedComponents = new Set<string>();
  const namespaceImports = new Set<string>();
  const nonVisualImports = new Set<string>();
  const result = emptyFileAnalysis();

  collectImports(ast, importedComponents, namespaceImports, nonVisualImports);

  const handleOpening = (
    name: JSXOpeningElement["name"],
    attributes: Array<JSXAttribute | JSXSpreadAttribute>,
  ) => {
    const elementName = tagNameText(name);
    if (!elementName || isNonVisualComponent(elementName, nonVisualImports)) {
      return;
    }

    const isBackpackUsage =
      (elementName.includes(".") &&
        namespaceImports.has(firstMemberName(elementName))) ||
      (!elementName.includes(".") &&
        (isBackpackComponent(elementName) ||
          importedComponents.has(elementName)));

    if (isBackpackUsage) {
      const componentName = elementName.includes(".")
        ? lastMemberName(elementName)
        : elementName;
      result.backpackUsages += 1;
      incrementComponentCount(result.componentCounts, componentName);

      if (extractClassNameInfo(attributes).hasOverride) {
        result.classNameOverrides += 1;
      }
      return;
    }

    if (!elementName.includes(".") && isRawHtmlElement(elementName)) {
      result.rawHtmlUsages += 1;
      return;
    }

    if (
      elementName.includes(".") ||
      isNonBackpackComponent(elementName)
    ) {
      const hasOverride = extractClassNameInfo(attributes).hasOverride;
      if (hasOverride || visualComponentRegistry.has(elementName)) {
        result.nonBackpackUsages += 1;
      }
    }
  };

  traverse(ast, {
    JSXOpeningElement(path) {
      handleOpening(path.node.name, path.node.attributes);
    },
  });

  return result;
};

const findBackpackWebVersion = async (repoPath: string) => {
  const packageJsonFiles = await glob("**/package.json", {
    cwd: repoPath,
    absolute: true,
    ignore: DEFAULT_IGNORE_PATTERNS,
  });

  const rootPackageJson = join(repoPath, "package.json");
  const sortedFiles = [
    rootPackageJson,
    ...packageJsonFiles.filter((file) => file !== rootPackageJson),
  ];

  for (const filePath of sortedFiles) {
    try {
      const packageJson = JSON.parse(readFileSync(filePath, "utf8")) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
      const version =
        packageJson.dependencies?.["@skyscanner/backpack-web"] ||
        packageJson.devDependencies?.["@skyscanner/backpack-web"];

      if (version) {
        return version;
      }
    } catch {
      // Ignore invalid package files.
    }
  }

  return null;
};

export const analyzeRepository = async (
  repoPath: string,
  options: AnalyzerOptions = {},
): Promise<AdoptionReport> => {
  const pattern = options.pattern || DEFAULT_PATTERN;
  const ignore = options.ignore || DEFAULT_IGNORE_PATTERNS;
  const files = await glob(pattern, {
    cwd: repoPath,
    absolute: true,
    ignore,
    nodir: true,
  });
  const visualComponentRegistry = buildVisualComponentRegistry(files);
  const parseErrors: AdoptionReport["parseErrors"] = [];
  const totals = emptyFileAnalysis();

  files.forEach((filePath) => {
    try {
      const fileResult = analyzeFile(filePath, visualComponentRegistry);
      totals.backpackUsages += fileResult.backpackUsages;
      totals.classNameOverrides += fileResult.classNameOverrides;
      totals.nonBackpackUsages += fileResult.nonBackpackUsages;
      totals.rawHtmlUsages += fileResult.rawHtmlUsages;
      Object.entries(fileResult.componentCounts).forEach(
        ([componentName, count]) => {
          totals.componentCounts[componentName] =
            (totals.componentCounts[componentName] || 0) + count;
        },
      );
    } catch (error) {
      parseErrors.push({
        file: relative(repoPath, filePath),
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  const nonPureBackpackUsages = totals.classNameOverrides;
  const pureBackpackUsages = totals.backpackUsages - nonPureBackpackUsages;
  const totalElementUsages =
    totals.backpackUsages + totals.nonBackpackUsages + totals.rawHtmlUsages;
  const percentage = (count: number) =>
    totalElementUsages > 0
      ? roundPercentage((count / totalElementUsages) * 100)
      : 0;

  return {
    repository: basename(repoPath),
    generatedAt: new Date().toISOString(),
    filesAnalyzed: files.length,
    parseErrors,
    backpackWebVersion: await findBackpackWebVersion(repoPath),
    usage: {
      backpack: {
        count: totals.backpackUsages,
        percentage: percentage(totals.backpackUsages),
      },
      pureBackpack: {
        count: pureBackpackUsages,
        percentage: percentage(pureBackpackUsages),
      },
      nonPureBackpack: {
        count: nonPureBackpackUsages,
        percentage: percentage(nonPureBackpackUsages),
      },
      nonBackpack: {
        count: totals.nonBackpackUsages,
        percentage: percentage(totals.nonBackpackUsages),
      },
      rawHtml: {
        count: totals.rawHtmlUsages,
        percentage: percentage(totals.rawHtmlUsages),
      },
    },
    componentCounts: totals.componentCounts,
  };
};