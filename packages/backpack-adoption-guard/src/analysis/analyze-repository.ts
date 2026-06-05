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
// Verbatim port of analyzeRepository + analyzeFile from
// Skyscanner/ds-analyser src/analyzer.js. Combined with helpers from
// jsx-helpers.ts, css-helpers.ts, class-name.ts, visual-components.ts the
// behaviour matches ds-analyser one-for-one. The `analyzeRepository` returns
// a thin AdoptionReport wrapper compatible with our run.ts and guard logic;
// the underlying counts come straight from the ds-analyser algorithm.
import { existsSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import { glob } from "glob";

import {
  extractClassNameInfo,
  type CSSModuleImportInfo,
} from "./class-name";
import {
  isCSSModuleImport,
  resolveCSSModulePath,
} from "./css-helpers";
import {
  PARSER_PLUGINS,
  detectVariant,
  extractProps,
  getJSXElementName,
  isBackpackComponent,
  isDesignSystemImport,
  isNonBackpackComponent,
  isNonVisualComponent,
  isNonVisualComponentName,
  isRawHTMLElement,
} from "./jsx-helpers";
import { buildVisualComponentRegistry } from "./visual-components";
import { DEFAULT_IGNORE_PATTERNS, DEFAULT_PATTERN } from "../shared/config";
import type { AdoptionReport } from "../shared/types";

const traverse = (
  (_traverse as unknown as { default?: typeof _traverse }).default ?? _traverse
) as typeof _traverse;

type ComponentLocation = {
  file: string;
  line: number;
  column: number;
  variant: string | null;
  hasClassNameOverride: boolean;
  classNameValue: string | null;
  classNameType: string | null;
  cssCategories: string[];
  cssModule: any;
  cssModules: any;
  classNames: string[] | null;
  overrideCount: number;
};

type SimpleLocation = {
  file: string;
  line: number;
  column: number;
  source: string | null;
};

type RawHtmlLocation = SimpleLocation & {
  hasClassName: boolean;
  cssCategories: string[];
};

type ComponentResult = {
  name: string;
  totalUsages: number;
  files: Set<string>;
  variants: Record<string, number>;
  classNameOverrides: number;
  locations: ComponentLocation[];
};

type RawHtmlComponentResult = {
  name: string;
  totalUsages: number;
  styledUsages: number;
  files: Set<string>;
  locations: RawHtmlLocation[];
};

type NonBackpackComponentResult = {
  name: string;
  totalUsages: number;
  files: Set<string>;
  locations: SimpleLocation[];
};

type AnalyzerResults = {
  repository: string;
  filesAnalyzed: number;
  components: Record<string, ComponentResult>;
  totalUsages: number;
  classNameOverrides: number;
  backpackUsages: number;
  nonBackpackUsages: number;
  nonBackpackComponents: {
    visual: Record<string, NonBackpackComponentResult>;
    nonVisual: Record<string, NonBackpackComponentResult>;
  };
  rawHtmlUsages: number;
  rawHtmlComponents: Record<string, RawHtmlComponentResult>;
  excludedUsages: number;
  excludedComponents: Record<string, number>;
  backpackPercentage: number;
  rawHtmlPercentage: number;
};

type AnalyzerOptions = {
  pattern?: string;
  ignore?: string[];
  components?: string[] | null;
};

function buildLocation(
  node: any,
  relativePath: string,
  contentLines: string[],
): SimpleLocation {
  const lineNum = node.loc?.start?.line || 0;
  const endLine = node.loc?.end?.line || lineNum;
  let source: string | null = null;
  if (lineNum > 0) {
    const lines = contentLines.slice(lineNum - 1, endLine);
    const indents = lines
      .filter((l) => l.trim())
      .map((l) => l.match(/^(\s*)/)![1].length);
    const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
    source = lines.map((l) => l.slice(minIndent)).join("\n").trimEnd();
  }
  return {
    file: relativePath,
    line: lineNum,
    column: node.loc?.start?.column || 0,
    source,
  };
}

/**
 * Verbatim port of analyzeFile from ds-analyser.
 */
function analyzeFile(
  content: string,
  filePath: string,
  repoPath: string,
  targetComponents: string[] | null,
  visualComponentRegistry: Set<string>,
) {
  let ast: any;
  try {
    ast = parse(content, {
      sourceType: "module",
      plugins: PARSER_PLUGINS as any,
    });
  } catch (error) {
    throw new Error(
      `Failed to parse ${filePath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  const relativePath = relative(repoPath, filePath);
  const contentLines = content.split("\n");
  const components: Record<string, ComponentResult> = {};
  const nonBackpackComponents: AnalyzerResults["nonBackpackComponents"] = {
    visual: {},
    nonVisual: {},
  };
  let totalUsages = 0;
  let classNameOverrides = 0;
  let backpackUsages = 0;
  let nonBackpackUsages = 0;
  let rawHtmlUsages = 0;
  const rawHtmlComponents: Record<string, RawHtmlComponentResult> = {};
  let excludedUsages = 0;
  const excludedComponents: Record<string, number> = {};

  const importedComponents = new Map<string, any>();
  const namespaceImports = new Map<string, any>();
  const designSystemImports = new Set<string>();
  const cssModuleImports = new Map<string, CSSModuleImportInfo>();
  const nonVisualImports = new Set<string>();

  traverse(ast, {
    ImportDeclaration(path: any) {
      const source = path.node.source.value;

      if (isDesignSystemImport(source)) {
        designSystemImports.add(source);

        path.node.specifiers.forEach((spec: any) => {
          if (spec.type === "ImportDefaultSpecifier") {
            importedComponents.set(spec.local.name, { source, default: true });
          } else if (spec.type === "ImportSpecifier") {
            const importedName = spec.imported.name;
            const localName = spec.local.name;
            if (
              isBackpackComponent(importedName) ||
              isBackpackComponent(localName)
            ) {
              importedComponents.set(localName, { source, imported: importedName });
            }
          } else if (spec.type === "ImportNamespaceSpecifier") {
            namespaceImports.set(spec.local.name, { source });
          }
        });
      }

      if (isCSSModuleImport(source)) {
        const resolvedPath = resolveCSSModulePath(source, filePath, repoPath);
        if (resolvedPath) {
          path.node.specifiers.forEach((spec: any) => {
            if (spec.type === "ImportDefaultSpecifier") {
              const localName = spec.local?.name;
              if (localName) {
                cssModuleImports.set(localName, {
                  modulePath: source,
                  filePath: resolvedPath,
                  sourceFile: filePath,
                });
              }
            }
          });
        }
      }

      if (source === "react" || source === "react-dom") {
        path.node.specifiers.forEach((spec: any) => {
          if (spec.type === "ImportSpecifier") {
            const importedName = spec.imported.name;
            const localName = spec.local.name;
            if (isNonVisualComponentName(importedName)) {
              nonVisualImports.add(localName);
            }
          }
        });
      }
    },

    JSXFragment() {
      excludedUsages += 1;
      if (!nonBackpackComponents.nonVisual["Fragment"]) {
        nonBackpackComponents.nonVisual["Fragment"] = {
          name: "Fragment",
          totalUsages: 0,
          files: new Set(),
          locations: [],
        };
      }
      nonBackpackComponents.nonVisual["Fragment"].totalUsages += 1;
      nonBackpackComponents.nonVisual["Fragment"].files.add(relativePath);
      excludedComponents["Fragment"] = (excludedComponents["Fragment"] || 0) + 1;
    },

    JSXOpeningElement(path: any) {
      const elementName = getJSXElementName(path.node.name);
      const elementNode = path.node.name;

      if (!elementName) return;

      if (isNonVisualComponent(elementName, elementNode, nonVisualImports)) {
        excludedUsages += 1;
        if (!nonBackpackComponents.nonVisual[elementName]) {
          nonBackpackComponents.nonVisual[elementName] = {
            name: elementName,
            totalUsages: 0,
            files: new Set(),
            locations: [],
          };
        }
        nonBackpackComponents.nonVisual[elementName].totalUsages += 1;
        nonBackpackComponents.nonVisual[elementName].files.add(relativePath);
        excludedComponents[elementName] = (excludedComponents[elementName] || 0) + 1;
        return;
      }

      let isTracked = false;
      let componentName = elementName;

      if (elementNode.type === "JSXMemberExpression") {
        const namespace = elementNode.object.name;
        const property = elementNode.property.name;

        if (namespaceImports.has(namespace)) {
          isTracked = targetComponents === null || targetComponents.includes(property);
          componentName = property;
          backpackUsages += 1;
        } else {
          const classNameInfo = extractClassNameInfo(
            path.node.attributes,
            cssModuleImports,
            filePath,
            repoPath,
          );
          const hasClassName = classNameInfo.hasOverride;
          const isVisual = hasClassName || visualComponentRegistry.has(elementName);

          if (isVisual) {
            nonBackpackUsages += 1;

            if (!nonBackpackComponents.visual[elementName]) {
              nonBackpackComponents.visual[elementName] = {
                name: elementName,
                totalUsages: 0,
                files: new Set(),
                locations: [],
              };
            }
            nonBackpackComponents.visual[elementName].totalUsages += 1;
            nonBackpackComponents.visual[elementName].files.add(relativePath);
            nonBackpackComponents.visual[elementName].locations.push(
              buildLocation(path.node, relativePath, contentLines),
            );
          } else {
            if (!nonBackpackComponents.nonVisual[elementName]) {
              nonBackpackComponents.nonVisual[elementName] = {
                name: elementName,
                totalUsages: 0,
                files: new Set(),
                locations: [],
              };
            }
            nonBackpackComponents.nonVisual[elementName].totalUsages += 1;
            nonBackpackComponents.nonVisual[elementName].files.add(relativePath);
            nonBackpackComponents.nonVisual[elementName].locations.push(
              buildLocation(path.node, relativePath, contentLines),
            );
          }
        }
      } else {
        const isRawHtml = isRawHTMLElement(elementName);
        const isBpkComponent = isBackpackComponent(elementName);
        const isImported = importedComponents.has(elementName);

        if (isRawHtml) {
          rawHtmlUsages += 1;

          if (!rawHtmlComponents[elementName]) {
            rawHtmlComponents[elementName] = {
              name: elementName,
              totalUsages: 0,
              styledUsages: 0,
              files: new Set(),
              locations: [],
            };
          }
          rawHtmlComponents[elementName].totalUsages += 1;
          rawHtmlComponents[elementName].files.add(relativePath);

          const rawClassInfo = extractClassNameInfo(
            path.node.attributes,
            cssModuleImports,
            filePath,
            repoPath,
          );
          const hasClassName = rawClassInfo.hasOverride;
          if (hasClassName) {
            rawHtmlComponents[elementName].styledUsages += 1;
          }

          rawHtmlComponents[elementName].locations.push({
            ...buildLocation(path.node, relativePath, contentLines),
            hasClassName,
            cssCategories: hasClassName ? rawClassInfo.cssCategories || [] : [],
          });
        } else if (isBpkComponent || isImported) {
          backpackUsages += 1;

          if (targetComponents !== null) {
            isTracked = targetComponents.includes(elementName);
          } else {
            isTracked = isImported || isBpkComponent;
          }
        } else if (isNonBackpackComponent(elementName)) {
          const classNameInfo = extractClassNameInfo(
            path.node.attributes,
            cssModuleImports,
            filePath,
            repoPath,
          );
          const hasClassName = classNameInfo.hasOverride;
          const isVisual = hasClassName || visualComponentRegistry.has(elementName);

          if (isVisual) {
            nonBackpackUsages += 1;

            if (!nonBackpackComponents.visual[elementName]) {
              nonBackpackComponents.visual[elementName] = {
                name: elementName,
                totalUsages: 0,
                files: new Set(),
                locations: [],
              };
            }
            nonBackpackComponents.visual[elementName].totalUsages += 1;
            nonBackpackComponents.visual[elementName].files.add(relativePath);
            nonBackpackComponents.visual[elementName].locations.push(
              buildLocation(path.node, relativePath, contentLines),
            );
          } else {
            if (!nonBackpackComponents.nonVisual[elementName]) {
              nonBackpackComponents.nonVisual[elementName] = {
                name: elementName,
                totalUsages: 0,
                files: new Set(),
                locations: [],
              };
            }
            nonBackpackComponents.nonVisual[elementName].totalUsages += 1;
            nonBackpackComponents.nonVisual[elementName].files.add(relativePath);
            nonBackpackComponents.nonVisual[elementName].locations.push(
              buildLocation(path.node, relativePath, contentLines),
            );
          }
        }
      }

      if (!isTracked) return;

      totalUsages += 1;

      if (!components[componentName]) {
        components[componentName] = {
          name: componentName,
          totalUsages: 0,
          files: new Set(),
          variants: {},
          classNameOverrides: 0,
          locations: [],
        };
      }

      const comp = components[componentName];
      comp.totalUsages += 1;
      comp.files.add(relativePath);

      const props = extractProps(path.node.attributes);
      const variant = detectVariant(props, componentName, path.node.attributes);
      if (variant) {
        comp.variants[variant] = (comp.variants[variant] || 0) + 1;
      }

      const classNameInfo = extractClassNameInfo(
        path.node.attributes,
        cssModuleImports,
        filePath,
        repoPath,
      );
      if (classNameInfo.hasOverride) {
        const overrideCount = classNameInfo.overrideCount || 1;
        comp.classNameOverrides += overrideCount;
        classNameOverrides += overrideCount;
      }

      const line = path.node.loc?.start?.line || 0;
      const column = path.node.loc?.start?.column || 0;
      comp.locations.push({
        file: relativePath,
        line,
        column,
        variant: variant || null,
        hasClassNameOverride: classNameInfo.hasOverride,
        classNameValue: classNameInfo.value,
        classNameType: classNameInfo.type,
        cssCategories: classNameInfo.cssCategories || [],
        cssModule: classNameInfo.cssModule || null,
        cssModules: classNameInfo.cssModules || null,
        classNames: classNameInfo.classNames || null,
        overrideCount: classNameInfo.overrideCount || (classNameInfo.hasOverride ? 1 : 0),
      });
    },
  });

  return {
    components,
    totalUsages,
    classNameOverrides,
    backpackUsages,
    nonBackpackUsages,
    nonBackpackComponents,
    rawHtmlUsages,
    rawHtmlComponents,
    excludedUsages,
    excludedComponents,
  };
}

/**
 * Verbatim port of analyzeRepository from ds-analyser. Returns the raw analyser
 * results so callers can build the report shape they need.
 */
async function runAnalyzer(
  repoPath: string,
  options: AnalyzerOptions,
): Promise<AnalyzerResults & { parseErrors: Array<{ file: string; message: string }> }> {
  const {
    pattern = DEFAULT_PATTERN,
    ignore = DEFAULT_IGNORE_PATTERNS,
    components = null,
  } = options;

  const files = await glob(pattern, {
    cwd: repoPath,
    ignore,
    absolute: true,
    nodir: true,
  });

  const visualComponentRegistry = buildVisualComponentRegistry(files);

  const results: AnalyzerResults = {
    repository: basename(repoPath),
    filesAnalyzed: files.length,
    components: {},
    totalUsages: 0,
    classNameOverrides: 0,
    backpackUsages: 0,
    nonBackpackUsages: 0,
    nonBackpackComponents: { visual: {}, nonVisual: {} },
    rawHtmlUsages: 0,
    rawHtmlComponents: {},
    excludedUsages: 0,
    excludedComponents: {},
    backpackPercentage: 0,
    rawHtmlPercentage: 0,
  };

  const parseErrors: Array<{ file: string; message: string }> = [];

  for (let i = 0; i < files.length; i += 1) {
    const filePath = files[i];

    try {
      const content = readFileSync(filePath, "utf-8");
      const fileResults = analyzeFile(
        content,
        filePath,
        repoPath,
        components,
        visualComponentRegistry,
      );

      for (const [componentName, usage] of Object.entries(fileResults.components)) {
        if (!results.components[componentName]) {
          results.components[componentName] = {
            name: componentName,
            totalUsages: 0,
            files: new Set(),
            variants: {},
            classNameOverrides: 0,
            locations: [],
          };
        }
        const comp = results.components[componentName];
        comp.totalUsages += usage.totalUsages;
        comp.classNameOverrides += usage.classNameOverrides;
        usage.files.forEach((f: string) => comp.files.add(f));
        comp.locations.push(...usage.locations);

        for (const [variant, count] of Object.entries(usage.variants)) {
          comp.variants[variant] = (comp.variants[variant] || 0) + (count as number);
        }
      }

      results.totalUsages += fileResults.totalUsages;
      results.classNameOverrides += fileResults.classNameOverrides;
      results.backpackUsages += fileResults.backpackUsages || 0;
      results.nonBackpackUsages += fileResults.nonBackpackUsages || 0;
      results.rawHtmlUsages += fileResults.rawHtmlUsages || 0;
      results.excludedUsages += fileResults.excludedUsages || 0;

      if (fileResults.rawHtmlComponents) {
        for (const [tagName, usage] of Object.entries(fileResults.rawHtmlComponents)) {
          if (!results.rawHtmlComponents[tagName]) {
            results.rawHtmlComponents[tagName] = {
              name: tagName,
              totalUsages: 0,
              styledUsages: 0,
              files: new Set(),
              locations: [],
            };
          }
          const comp = results.rawHtmlComponents[tagName];
          comp.totalUsages += usage.totalUsages;
          comp.styledUsages += usage.styledUsages || 0;
          usage.files.forEach((f: string) => comp.files.add(f));
          comp.locations.push(...usage.locations);
        }
      }

      if (fileResults.nonBackpackComponents) {
        for (const [componentName, usage] of Object.entries(
          fileResults.nonBackpackComponents.visual || {},
        )) {
          if (!results.nonBackpackComponents.visual[componentName]) {
            results.nonBackpackComponents.visual[componentName] = {
              name: componentName,
              totalUsages: 0,
              files: new Set(),
              locations: [],
            };
          }
          const comp = results.nonBackpackComponents.visual[componentName];
          comp.totalUsages += usage.totalUsages;
          usage.files.forEach((f: string) => comp.files.add(f));
          comp.locations.push(...(usage.locations || []));
        }

        for (const [componentName, usage] of Object.entries(
          fileResults.nonBackpackComponents.nonVisual || {},
        )) {
          if (!results.nonBackpackComponents.nonVisual[componentName]) {
            results.nonBackpackComponents.nonVisual[componentName] = {
              name: componentName,
              totalUsages: 0,
              files: new Set(),
              locations: [],
            };
          }
          const comp = results.nonBackpackComponents.nonVisual[componentName];
          comp.totalUsages += usage.totalUsages;
          usage.files.forEach((f: string) => comp.files.add(f));
          comp.locations.push(...(usage.locations || []));
        }
      }

      if (fileResults.excludedComponents) {
        for (const [componentName, count] of Object.entries(fileResults.excludedComponents)) {
          results.excludedComponents[componentName] =
            (results.excludedComponents[componentName] || 0) + (count as number);
        }
      }
    } catch (error) {
      parseErrors.push({
        file: relative(repoPath, filePath),
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const totalElementUsages =
    results.backpackUsages + results.nonBackpackUsages + results.rawHtmlUsages;
  if (totalElementUsages > 0) {
    results.backpackPercentage =
      (results.backpackUsages / totalElementUsages) * 100;
    results.rawHtmlPercentage =
      (results.rawHtmlUsages / totalElementUsages) * 100;
  }

  return { ...results, parseErrors };
}

/**
 * Locates the @skyscanner/backpack-web version in the consumer repo.
 *
 * Search order mirrors ds-analyser report-json-api.js: try the root
 * package.json first, then fall back to other package.json files (limited via
 * the same ignore patterns the analyser uses).
 */
async function findBackpackWebVersion(repoPath: string): Promise<string | null> {
  const tryRead = (filePath: string): string | null => {
    try {
      const pkg = JSON.parse(readFileSync(filePath, "utf8")) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
      return (
        pkg.dependencies?.["@skyscanner/backpack-web"] ||
        pkg.devDependencies?.["@skyscanner/backpack-web"] ||
        null
      );
    } catch {
      return null;
    }
  };

  const rootPackageJson = join(repoPath, "package.json");
  if (existsSync(rootPackageJson)) {
    const rootVersion = tryRead(rootPackageJson);
    if (rootVersion) return rootVersion;
  }

  const packageJsonFiles = await glob("**/package.json", {
    cwd: repoPath,
    absolute: true,
    ignore: DEFAULT_IGNORE_PATTERNS,
  });

  for (const filePath of packageJsonFiles) {
    if (filePath === rootPackageJson) continue;
    const version = tryRead(filePath);
    if (version) return version;
  }

  return null;
}

const roundPercentage = (value: number) => Number(value.toFixed(2));

/**
 * Public entry point used by the action's run.ts. Wraps the ds-analyser-style
 * analyzer in our AdoptionReport shape so the guard logic and writer stay
 * stable.
 */
export const analyzeRepository = async (
  repoPath: string,
  options: AnalyzerOptions = {},
): Promise<AdoptionReport> => {
  const analyzer = await runAnalyzer(repoPath, options);

  const totalElementUsages =
    analyzer.backpackUsages + analyzer.nonBackpackUsages + analyzer.rawHtmlUsages;

  // Mirror ds-analyser report-json-api.js pure / non-pure split:
  //   pureBackpackUsages = backpackUsages - classNameOverrides
  //   nonPureBackpackUsages = classNameOverrides
  // Note: this can produce a negative pure count when a single Backpack
  // component has multiple classNames(...) overrides. We preserve the formula
  // verbatim so the output matches ds-analyser.
  const pureBackpackUsages = analyzer.backpackUsages - analyzer.classNameOverrides;
  const nonPureBackpackUsages = analyzer.classNameOverrides;

  const percentage = (count: number) =>
    totalElementUsages > 0
      ? roundPercentage((count / totalElementUsages) * 100)
      : 0;

  const componentCounts: Record<string, number> = {};
  for (const [name, comp] of Object.entries(analyzer.components)) {
    componentCounts[name] = comp.totalUsages;
  }

  return {
    repository: basename(repoPath),
    generatedAt: new Date().toISOString(),
    filesAnalyzed: analyzer.filesAnalyzed,
    parseErrors: analyzer.parseErrors,
    backpackWebVersion: await findBackpackWebVersion(repoPath),
    usage: {
      backpack: {
        count: analyzer.backpackUsages,
        percentage: percentage(analyzer.backpackUsages),
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
        count: analyzer.nonBackpackUsages,
        percentage: percentage(analyzer.nonBackpackUsages),
      },
      rawHtml: {
        count: analyzer.rawHtmlUsages,
        percentage: percentage(analyzer.rawHtmlUsages),
      },
    },
    componentCounts,
  };
};
