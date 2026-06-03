import { readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

import { glob } from "glob";
import ts from "typescript";

import { extractClassNameInfo } from "./class-name";
import {
  addCategories,
  categoryTotal,
  createEmptyCategoryCounts,
} from "./css/categories";
import { collectImports } from "./imports";
import type { CssModuleImport } from "./imports";
import {
  firstMemberName,
  isBackpackComponent,
  isNonBackpackComponent,
  isNonVisualComponent,
  isRawHtmlElement,
  lastMemberName,
  sourceFileFor,
  tagNameText,
} from "./jsx";
import { buildVisualComponentRegistry } from "./visual-components";
import { DEFAULT_IGNORE_PATTERNS, DEFAULT_PATTERN } from "../shared/config";
import type { AdoptionReport, CssCategoryCounts } from "../shared/types";

type FileAnalysis = {
  backpackUsages: number;
  classNameOverrides: number;
  nonBackpackUsages: number;
  rawHtmlUsages: number;
  componentCounts: Record<string, number>;
  cssOverrides: CssCategoryCounts;
  rawHtmlCssOverrides: CssCategoryCounts;
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
  cssOverrides: createEmptyCategoryCounts(),
  rawHtmlCssOverrides: createEmptyCategoryCounts(),
});

const incrementComponentCount = (
  componentCounts: Record<string, number>,
  componentName: string,
) => {
  componentCounts[componentName] = (componentCounts[componentName] || 0) + 1;
};

const addCategoryCounts = (
  target: CssCategoryCounts,
  source: CssCategoryCounts,
) => {
  addCategories(
    target,
    Object.entries(source).flatMap(([category, count]) =>
      Array.from({ length: count }, () => category),
    ),
  );
};

const analyzeFile = (
  filePath: string,
  visualComponentRegistry: Set<string>,
): FileAnalysis => {
  const content = readFileSync(filePath, "utf8");
  const sourceFile = sourceFileFor(filePath, content);
  const importedComponents = new Set<string>();
  const namespaceImports = new Set<string>();
  const cssModuleImports = new Map<string, CssModuleImport>();
  const nonVisualImports = new Set<string>();
  const result = emptyFileAnalysis();

  collectImports(
    sourceFile,
    filePath,
    importedComponents,
    namespaceImports,
    cssModuleImports,
    nonVisualImports,
  );

  const visit = (node: ts.Node) => {
    if (ts.isJsxFragment(node)) {
      ts.forEachChild(node, visit);
      return;
    }

    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const elementName = tagNameText(node.tagName);
      if (!elementName || isNonVisualComponent(elementName, nonVisualImports)) {
        ts.forEachChild(node, visit);
        return;
      }

      if (elementName.includes(".")) {
        const namespace = firstMemberName(elementName);
        const componentName = lastMemberName(elementName);

        if (namespaceImports.has(namespace)) {
          result.backpackUsages += 1;
          incrementComponentCount(result.componentCounts, componentName);

          const classNameInfo = extractClassNameInfo(
            node.attributes,
            cssModuleImports,
          );
          if (classNameInfo.hasOverride) {
            result.classNameOverrides += classNameInfo.overrideCount;
            addCategories(result.cssOverrides, classNameInfo.cssCategories);
          }
        } else {
          const classNameInfo = extractClassNameInfo(
            node.attributes,
            cssModuleImports,
          );
          if (
            classNameInfo.hasOverride ||
            visualComponentRegistry.has(elementName)
          ) {
            result.nonBackpackUsages += 1;
          }
        }

        ts.forEachChild(node, visit);
        return;
      }

      if (isRawHtmlElement(elementName)) {
        result.rawHtmlUsages += 1;
        const classNameInfo = extractClassNameInfo(
          node.attributes,
          cssModuleImports,
        );
        if (classNameInfo.hasOverride) {
          addCategories(
            result.rawHtmlCssOverrides,
            classNameInfo.cssCategories,
          );
        }

        ts.forEachChild(node, visit);
        return;
      }

      if (isBackpackComponent(elementName) || importedComponents.has(elementName)) {
        result.backpackUsages += 1;
        incrementComponentCount(result.componentCounts, elementName);

        const classNameInfo = extractClassNameInfo(
          node.attributes,
          cssModuleImports,
        );
        if (classNameInfo.hasOverride) {
          result.classNameOverrides += classNameInfo.overrideCount;
          addCategories(result.cssOverrides, classNameInfo.cssCategories);
        }

        ts.forEachChild(node, visit);
        return;
      }

      if (isNonBackpackComponent(elementName)) {
        const classNameInfo = extractClassNameInfo(
          node.attributes,
          cssModuleImports,
        );
        if (
          classNameInfo.hasOverride ||
          visualComponentRegistry.has(elementName)
        ) {
          result.nonBackpackUsages += 1;
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

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
      addCategoryCounts(totals.cssOverrides, fileResult.cssOverrides);
      addCategoryCounts(
        totals.rawHtmlCssOverrides,
        fileResult.rawHtmlCssOverrides,
      );
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

  const nonPureBackpackUsages = Math.min(
    totals.classNameOverrides,
    totals.backpackUsages,
  );
  const pureBackpackUsages = totals.backpackUsages - nonPureBackpackUsages;
  const totalElementUsages =
    totals.backpackUsages + totals.nonBackpackUsages + totals.rawHtmlUsages;
  const percentage = (count: number) =>
    totalElementUsages > 0 ? roundPercentage((count / totalElementUsages) * 100) : 0;

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
    cssOverrides: {
      byCategory: totals.cssOverrides,
      total: categoryTotal(totals.cssOverrides),
    },
    rawHtmlCssOverrides: {
      byCategory: totals.rawHtmlCssOverrides,
      total: categoryTotal(totals.rawHtmlCssOverrides),
    },
    componentCounts: totals.componentCounts,
  };
};
