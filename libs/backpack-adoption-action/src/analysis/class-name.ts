import ts from "typescript";

import {
  analyzeClassNameCategories,
  analyzeCssRulesCategories,
} from "./css/categories";
import { parseCssModule } from "./css/module-parser";
import type { CssModuleImport } from "./imports";
import {
  expressionName,
  stringFromExpression,
} from "./jsx";

type ClassNameInfo = {
  hasOverride: boolean;
  value: string | null;
  type: string | null;
  cssCategories: string[];
  overrideCount: number;
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

export const extractClassNameInfo = (
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
