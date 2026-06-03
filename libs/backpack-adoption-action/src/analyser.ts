import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

import { glob } from "glob";
import ts from "typescript";

import { DEFAULT_IGNORE_PATTERNS, DEFAULT_PATTERN } from "./constants";
import {
  addCategories,
  analyzeClassNameCategories,
  analyzeCssRulesCategories,
  categoryTotal,
  createEmptyCategoryCounts,
  parseCssModule,
} from "./css";
import type { AdoptionReport, CssCategoryCounts } from "./types";

type CssModuleImport = {
  modulePath: string;
  filePath: string;
};

type ClassNameInfo = {
  hasOverride: boolean;
  value: string | null;
  type: string | null;
  cssCategories: string[];
  overrideCount: number;
};

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

const HTML_ELEMENTS = new Set([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
]);

const NON_VISUAL_REACT_COMPONENTS = new Set([
  "Fragment",
  "StrictMode",
  "Suspense",
  "Profiler",
  "Portal",
]);

const roundPercentage = (value: number) => Number(value.toFixed(2));

const sourceFileFor = (filePath: string, content: string) => {
  const scriptKind = filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : ts.ScriptKind.JSX;

  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
};

const isDesignSystemImport = (source: string) =>
  source.startsWith("@skyscanner/backpack-web");

const isBackpackComponent = (componentName: string | null) =>
  !!componentName && componentName.startsWith("Bpk");

const isRawHtmlElement = (elementName: string | null) =>
  !!elementName &&
  elementName === elementName.toLowerCase() &&
  HTML_ELEMENTS.has(elementName);

const isNonBackpackComponent = (componentName: string | null) =>
  !!componentName &&
  /^[A-Z][a-zA-Z0-9]*$/.test(componentName) &&
  !isBackpackComponent(componentName) &&
  !isRawHtmlElement(componentName);

const tagNameText = (name: ts.JsxTagNameExpression): string | null => {
  if (ts.isIdentifier(name)) {
    return name.text;
  }

  if (ts.isPropertyAccessExpression(name)) {
    const left = tagNameText(name.expression as ts.JsxTagNameExpression);
    return left ? `${left}.${name.name.text}` : name.name.text;
  }

  if (ts.isJsxNamespacedName(name)) {
    return `${name.namespace.text}:${name.name.text}`;
  }

  return null;
};

const lastMemberName = (elementName: string) => {
  const segments = elementName.split(".");
  return segments[segments.length - 1];
};

const firstMemberName = (elementName: string) => elementName.split(".")[0];

const isCssModuleImport = (source: string) =>
  /\.(module\.)?(css|scss|sass|less)$/.test(source);

const resolveCssModulePath = (
  modulePath: string,
  sourceFilePath: string,
) => {
  const resolved = resolve(dirname(sourceFilePath), modulePath);
  const extensions = ["", ".css", ".scss", ".sass", ".less"];

  for (const extension of extensions) {
    const candidate = `${resolved}${extension}`;
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return existsSync(resolved) ? resolved : null;
};

const collectImports = (
  sourceFile: ts.SourceFile,
  filePath: string,
  importedComponents: Set<string>,
  namespaceImports: Set<string>,
  cssModuleImports: Map<string, CssModuleImport>,
  nonVisualImports: Set<string>,
) => {
  sourceFile.statements.forEach((statement) => {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      return;
    }

    const source = statement.moduleSpecifier.text;
    const importClause = statement.importClause;

    if (!importClause) {
      return;
    }

    if (isDesignSystemImport(source)) {
      if (importClause.name) {
        importedComponents.add(importClause.name.text);
      }

      const namedBindings = importClause.namedBindings;
      if (namedBindings && ts.isNamespaceImport(namedBindings)) {
        namespaceImports.add(namedBindings.name.text);
      } else if (namedBindings && ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach((element) => {
          const importedName = element.propertyName?.text || element.name.text;
          const localName = element.name.text;
          if (
            isBackpackComponent(importedName) ||
            isBackpackComponent(localName)
          ) {
            importedComponents.add(localName);
          }
        });
      }
    }

    if (isCssModuleImport(source) && importClause.name) {
      const resolvedPath = resolveCssModulePath(source, filePath);
      if (resolvedPath) {
        cssModuleImports.set(importClause.name.text, {
          modulePath: source,
          filePath: resolvedPath,
        });
      }
    }

    if (source === "react" || source === "react-dom") {
      const namedBindings = importClause.namedBindings;
      if (namedBindings && ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach((element) => {
          const importedName = element.propertyName?.text || element.name.text;
          if (NON_VISUAL_REACT_COMPONENTS.has(importedName)) {
            nonVisualImports.add(element.name.text);
          }
        });
      }
    }
  });
};

const isNonVisualComponent = (
  elementName: string,
  nonVisualImports: Set<string>,
) => {
  if (nonVisualImports.has(elementName)) {
    return true;
  }

  if (!elementName.includes(".")) {
    return false;
  }

  const owner = firstMemberName(elementName);
  const property = lastMemberName(elementName);

  return (
    property === "Provider" ||
    (owner === "React" && NON_VISUAL_REACT_COMPONENTS.has(property))
  );
};

const expressionName = (expression: ts.Expression): string | null => {
  if (ts.isIdentifier(expression)) {
    return expression.text;
  }

  if (ts.isPropertyAccessExpression(expression)) {
    return expression.name.text;
  }

  return null;
};

const stringFromExpression = (expression: ts.Expression): string | null => {
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
    return expression.text;
  }

  if (ts.isTemplateExpression(expression)) {
    return [
      expression.head.text,
      ...expression.templateSpans.map((span) => span.literal.text),
    ]
      .filter((part) => part.trim())
      .join("...");
  }

  return null;
};

const cssModuleClassName = (
  expression: ts.Expression,
  cssModuleImports: Map<string, CssModuleImport>,
) => {
  if (
    ts.isPropertyAccessExpression(expression) &&
    ts.isIdentifier(expression.expression)
  ) {
    const objectName = expression.expression.text;
    if (cssModuleImports.has(objectName)) {
      return {
        objectName,
        className: expression.name.text,
      };
    }
  }

  if (
    ts.isElementAccessExpression(expression) &&
    ts.isIdentifier(expression.expression) &&
    ts.isStringLiteralLike(expression.argumentExpression)
  ) {
    const objectName = expression.expression.text;
    if (cssModuleImports.has(objectName)) {
      return {
        objectName,
        className: expression.argumentExpression.text,
      };
    }
  }

  return null;
};

const categoriesForCssModuleClass = (
  moduleImport: CssModuleImport,
  className: string,
) => {
  const cssInfo = parseCssModule(moduleImport.filePath, className);
  return analyzeCssRulesCategories(cssInfo.rules);
};

const classNameFromPropertyName = (
  name: ts.PropertyName,
  cssModuleImports: Map<string, CssModuleImport>,
) => {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
    return {
      className: name.text,
      categories: analyzeClassNameCategories(name.text),
    };
  }

  if (ts.isComputedPropertyName(name)) {
    const cssClass = cssModuleClassName(name.expression, cssModuleImports);
    if (cssClass) {
      const moduleImport = cssModuleImports.get(cssClass.objectName);
      return {
        className: cssClass.className,
        categories: moduleImport
          ? categoriesForCssModuleClass(moduleImport, cssClass.className)
          : [],
      };
    }

    const stringValue = stringFromExpression(name.expression);
    if (stringValue) {
      return {
        className: stringValue,
        categories: analyzeClassNameCategories(stringValue),
      };
    }
  }

  return null;
};

const extractClassNameParts = (
  expression: ts.Expression,
  cssModuleImports: Map<string, CssModuleImport>,
): Array<{ className: string; categories: string[] }> => {
  const stringValue = stringFromExpression(expression);
  if (stringValue) {
    return [
      {
        className: stringValue,
        categories: analyzeClassNameCategories(stringValue),
      },
    ];
  }

  const cssClass = cssModuleClassName(expression, cssModuleImports);
  if (cssClass) {
    const moduleImport = cssModuleImports.get(cssClass.objectName);
    return [
      {
        className: cssClass.className,
        categories: moduleImport
          ? categoriesForCssModuleClass(moduleImport, cssClass.className)
          : [],
      },
    ];
  }

  if (ts.isConditionalExpression(expression)) {
    return [
      ...extractClassNameParts(expression.whenTrue, cssModuleImports),
      ...extractClassNameParts(expression.whenFalse, cssModuleImports),
    ];
  }

  if (ts.isArrayLiteralExpression(expression)) {
    return expression.elements.flatMap((element) =>
      ts.isSpreadElement(element)
        ? []
        : extractClassNameParts(element, cssModuleImports),
    );
  }

  if (ts.isObjectLiteralExpression(expression)) {
    return expression.properties.flatMap((property) => {
      if (
        ts.isPropertyAssignment(property) ||
        ts.isShorthandPropertyAssignment(property)
      ) {
        const part = classNameFromPropertyName(property.name, cssModuleImports);
        return part ? [part] : [];
      }
      return [];
    });
  }

  return [];
};

const extractClassNamesFromFunction = (
  callExpression: ts.CallExpression,
  cssModuleImports: Map<string, CssModuleImport>,
): ClassNameInfo => {
  const parts = callExpression.arguments.flatMap((argument) =>
    ts.isSpreadElement(argument)
      ? []
      : extractClassNameParts(argument, cssModuleImports),
  );

  if (parts.length === 0) {
    return {
      hasOverride: false,
      value: "classNames(...)",
      type: "function",
      cssCategories: [],
      overrideCount: 0,
    };
  }

  return {
    hasOverride: true,
    value: parts.map((part) => part.className).join(", "),
    type: "function",
    cssCategories: parts.flatMap((part) => part.categories),
    overrideCount: parts.length,
  };
};

const extractClassNameInfo = (
  attributes: ts.JsxAttributes,
  cssModuleImports: Map<string, CssModuleImport>,
): ClassNameInfo => {
  const classNameAttribute = attributes.properties.find(
    (attribute): attribute is ts.JsxAttribute =>
      ts.isJsxAttribute(attribute) &&
      ts.isIdentifier(attribute.name) &&
      attribute.name.text === "className",
  );

  if (!classNameAttribute) {
    return {
      hasOverride: false,
      value: null,
      type: null,
      cssCategories: [],
      overrideCount: 0,
    };
  }

  if (!classNameAttribute.initializer) {
    return {
      hasOverride: true,
      value: "className",
      type: "boolean",
      cssCategories: ["custom"],
      overrideCount: 1,
    };
  }

  const initializer = classNameAttribute.initializer;

  if (ts.isStringLiteral(initializer)) {
    return {
      hasOverride: true,
      value: initializer.text,
      type: "string",
      cssCategories: analyzeClassNameCategories(initializer.text),
      overrideCount: 1,
    };
  }

  if (!ts.isJsxExpression(initializer) || !initializer.expression) {
    return {
      hasOverride: true,
      value: "complex expression",
      type: "expression",
      cssCategories: [],
      overrideCount: 1,
    };
  }

  const expression = initializer.expression;
  const stringValue = stringFromExpression(expression);
  if (stringValue) {
    return {
      hasOverride: true,
      value: stringValue,
      type: "string",
      cssCategories: analyzeClassNameCategories(stringValue),
      overrideCount: 1,
    };
  }

  if (ts.isCallExpression(expression)) {
    const functionName = expressionName(expression.expression);
    if (functionName === "cls" || functionName === "classNames") {
      return extractClassNamesFromFunction(expression, cssModuleImports);
    }

    return {
      hasOverride: true,
      value: `${functionName || "function"}(...)`,
      type: "function",
      cssCategories: [],
      overrideCount: 1,
    };
  }

  const cssClass = cssModuleClassName(expression, cssModuleImports);
  if (cssClass) {
    const moduleImport = cssModuleImports.get(cssClass.objectName);
    return {
      hasOverride: true,
      value: cssClass.className,
      type: "css-module",
      cssCategories: moduleImport
        ? categoriesForCssModuleClass(moduleImport, cssClass.className)
        : [],
      overrideCount: 1,
    };
  }

  if (ts.isConditionalExpression(expression)) {
    const parts = extractClassNameParts(expression, cssModuleImports);
    return {
      hasOverride: true,
      value: parts.map((part) => part.className).join(", ") || "conditional",
      type: "conditional",
      cssCategories: parts.flatMap((part) => part.categories),
      overrideCount: Math.max(parts.length, 1),
    };
  }

  if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    return {
      hasOverride: true,
      value: "concatenation",
      type: "concatenation",
      cssCategories: [],
      overrideCount: 1,
    };
  }

  if (ts.isIdentifier(expression)) {
    return {
      hasOverride: true,
      value: expression.text,
      type: "variable",
      cssCategories: analyzeClassNameCategories(expression.text),
      overrideCount: 1,
    };
  }

  return {
    hasOverride: true,
    value: "complex expression",
    type: "expression",
    cssCategories: [],
    overrideCount: 1,
  };
};

const hasVisualJsx = (node: ts.Node): boolean => {
  let found = false;

  const visit = (child: ts.Node) => {
    if (found) {
      return;
    }

    if (
      child !== node &&
      (ts.isFunctionDeclaration(child) ||
        ts.isFunctionExpression(child) ||
        ts.isArrowFunction(child) ||
        ts.isClassDeclaration(child) ||
        ts.isClassExpression(child))
    ) {
      return;
    }

    if (ts.isJsxOpeningElement(child) || ts.isJsxSelfClosingElement(child)) {
      const name = tagNameText(child.tagName);
      if (isRawHtmlElement(name) || isBackpackComponent(name)) {
        found = true;
        return;
      }
    }

    ts.forEachChild(child, visit);
  };

  ts.forEachChild(node, visit);

  return found;
};

const buildVisualComponentRegistry = (files: string[]) => {
  const registry = new Set<string>();

  files.forEach((filePath) => {
    try {
      const content = readFileSync(filePath, "utf8");
      const sourceFile = sourceFileFor(filePath, content);

      const visit = (node: ts.Node) => {
        if (
          ts.isFunctionDeclaration(node) &&
          node.name &&
          /^[A-Z]/.test(node.name.text) &&
          hasVisualJsx(node.body || node)
        ) {
          registry.add(node.name.text);
        }

        if (
          ts.isVariableDeclaration(node) &&
          ts.isIdentifier(node.name) &&
          /^[A-Z]/.test(node.name.text) &&
          node.initializer
        ) {
          const initializer = node.initializer;

          if (
            (ts.isArrowFunction(initializer) ||
              ts.isFunctionExpression(initializer)) &&
            hasVisualJsx(initializer.body)
          ) {
            registry.add(node.name.text);
          }

          if (ts.isCallExpression(initializer)) {
            const functionName = expressionName(initializer.expression);
            const isForwardRef = functionName === "forwardRef";
            const callback = initializer.arguments.find(
              (argument) =>
                ts.isArrowFunction(argument) || ts.isFunctionExpression(argument),
            );

            if (isForwardRef && callback && hasVisualJsx(callback)) {
              registry.add(node.name.text);
            }
          }
        }

        ts.forEachChild(node, visit);
      };

      visit(sourceFile);
    } catch {
      // Parse errors are recorded during the main analysis pass.
    }
  });

  return registry;
};

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

const analyzeFile = (
  filePath: string,
  repoPath: string,
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
      const fileResult = analyzeFile(filePath, repoPath, visualComponentRegistry);
      totals.backpackUsages += fileResult.backpackUsages;
      totals.classNameOverrides += fileResult.classNameOverrides;
      totals.nonBackpackUsages += fileResult.nonBackpackUsages;
      totals.rawHtmlUsages += fileResult.rawHtmlUsages;
      addCategories(
        totals.cssOverrides,
        Object.entries(fileResult.cssOverrides).flatMap(([category, count]) =>
          Array.from({ length: count }, () => category),
        ),
      );
      addCategories(
        totals.rawHtmlCssOverrides,
        Object.entries(fileResult.rawHtmlCssOverrides).flatMap(
          ([category, count]) => Array.from({ length: count }, () => category),
        ),
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
