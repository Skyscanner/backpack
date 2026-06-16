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
// Verbatim port of extractClassNameInfo + extractClassNamesFromFunction from
// Skyscanner/ds-analyser src/analyzer.js. The classNames(variable) → no-override
// behaviour and per-class overrideCount accounting are critical for matching
// pure / non-pure Backpack splits with ds-analyser.
import {
  analyzeCSSCategories,
  analyzeCSSRulesCategories,
  parseCSSModule,
  type CSSRule,
} from "./css-helpers";

export type CSSModuleImportInfo = {
  modulePath: string;
  filePath: string;
  sourceFile: string;
};

export type ClassNameInfo = {
  hasOverride: boolean;
  value: string | null;
  type: string | null;
  cssCategories?: string[];
  cssModule?: {
    modulePath: string;
    className: string;
    cssRules: CSSRule[];
    mixins: string[];
  } | null;
  cssModules?: Array<{
    modulePath: string;
    className: string;
    cssRules: CSSRule[];
    mixins: string[];
  }> | null;
  classNames?: string[] | null;
  overrideCount?: number;
};

export function extractClassNamesFromFunction(
  callExpr: any,
  cssModuleImports: Map<string, CSSModuleImportInfo>,
  _filePath: string,
  _repoPath: string,
  funcName: string,
): ClassNameInfo {
  if (!callExpr.arguments || callExpr.arguments.length === 0) {
    return {
      hasOverride: false,
      value: `${funcName}(...)`,
      type: "function",
      cssCategories: [],
    };
  }

  const allClassNames: string[] = [];
  const allCssCategories: string[] = [];
  const cssModules: NonNullable<ClassNameInfo["cssModules"]> = [];

  for (const arg of callExpr.arguments) {
    if (arg.type === "StringLiteral") {
      const className = arg.value;
      allClassNames.push(className);
      const categories = analyzeCSSCategories(className);
      allCssCategories.push(...categories);
    } else if (arg.type === "MemberExpression") {
      const objectName = arg.object.name;
      const propertyName = arg.property?.name;

      if (cssModuleImports.has(objectName) && propertyName) {
        const moduleInfo = cssModuleImports.get(objectName)!;
        allClassNames.push(propertyName);

        const cssInfo = parseCSSModule(moduleInfo.filePath, propertyName);
        const cssCategories = analyzeCSSRulesCategories(cssInfo.rules);
        allCssCategories.push(...cssCategories);

        cssModules.push({
          modulePath: moduleInfo.modulePath,
          className: propertyName,
          cssRules: cssInfo.rules,
          mixins: cssInfo.mixins,
        });
      } else {
        const memberValue = `${objectName}.${propertyName || "?"}`;
        allClassNames.push(memberValue);
        const categories = analyzeCSSCategories(memberValue);
        allCssCategories.push(...categories);
      }
    } else if (arg.type === "TemplateLiteral") {
      const parts = arg.quasis
        .map((q: any) => q.value.raw)
        .filter((p: string) => p.trim());
      const templateValue = parts.join("...");
      allClassNames.push(templateValue);
      const categories = analyzeCSSCategories(templateValue);
      allCssCategories.push(...categories);
    } else if (arg.type === "ConditionalExpression") {
      if (arg.consequent.type === "StringLiteral") {
        allClassNames.push(arg.consequent.value);
        const categories = analyzeCSSCategories(arg.consequent.value);
        allCssCategories.push(...categories);
      }
      if (arg.alternate.type === "StringLiteral") {
        allClassNames.push(arg.alternate.value);
        const categories = analyzeCSSCategories(arg.alternate.value);
        allCssCategories.push(...categories);
      }
    }
    // Ignore other argument types (variables, complex expressions, etc.)
  }

  if (allClassNames.length === 0) {
    return {
      hasOverride: false,
      value: `${funcName}(...)`,
      type: "function",
      cssCategories: [],
    };
  }

  return {
    hasOverride: true,
    value: allClassNames.join(", "),
    type: "function",
    cssCategories: allCssCategories,
    cssModules: cssModules.length > 0 ? cssModules : null,
    classNames: allClassNames,
    overrideCount: allClassNames.length,
  };
}

export function extractClassNameInfo(
  attributes: any[] | null | undefined,
  cssModuleImports: Map<string, CSSModuleImportInfo>,
  filePath: string,
  repoPath: string,
): ClassNameInfo {
  if (!attributes || !Array.isArray(attributes)) {
    return { hasOverride: false, value: null, type: null };
  }

  const classNameAttr = attributes.find((attr) => {
    if (attr.type === "JSXAttribute" && attr.name) {
      return attr.name.name === "className";
    }
    return false;
  });

  if (!classNameAttr || !classNameAttr.value) {
    return { hasOverride: false, value: null, type: null };
  }

  const value = classNameAttr.value;
  let classNameValue: string | null = null;
  let classNameType: string | null = "unknown";

  if (value.type === "StringLiteral") {
    classNameValue = value.value;
    classNameType = "string";
  } else if (value.type === "JSXExpressionContainer") {
    const expr = value.expression;

    if (expr.type === "StringLiteral") {
      classNameValue = expr.value;
      classNameType = "string";
    } else if (expr.type === "TemplateLiteral") {
      classNameType = "template";
      const parts = expr.quasis
        .map((q: any) => q.value.raw)
        .filter((p: string) => p.trim());
      classNameValue = parts.join("...");
    } else if (expr.type === "CallExpression") {
      classNameType = "function";
      const funcName =
        expr.callee.name ||
        (expr.callee.property && expr.callee.property.name) ||
        "function";

      if (funcName === "cls" || funcName === "classNames") {
        return extractClassNamesFromFunction(
          expr,
          cssModuleImports,
          filePath,
          repoPath,
          funcName,
        );
      }

      classNameValue = `${funcName}(...)`;
    } else if (expr.type === "ConditionalExpression") {
      classNameType = "conditional";
      classNameValue = "conditional";
    } else if (expr.type === "BinaryExpression" && expr.operator === "+") {
      classNameType = "concatenation";
      classNameValue = "concatenation";
    } else if (expr.type === "Identifier") {
      classNameType = "variable";
      classNameValue = expr.name;
    } else if (expr.type === "MemberExpression") {
      classNameType = "css-module";
      const objectName = expr.object.name;
      const propertyName = expr.property?.name;

      if (cssModuleImports.has(objectName) && propertyName) {
        const moduleInfo = cssModuleImports.get(objectName)!;
        classNameValue = propertyName;

        const cssInfo = parseCSSModule(moduleInfo.filePath, propertyName);
        const cssCategories = analyzeCSSRulesCategories(cssInfo.rules);

        return {
          hasOverride: true,
          value: classNameValue,
          type: classNameType,
          cssCategories,
          cssModule: {
            modulePath: moduleInfo.modulePath,
            className: propertyName,
            cssRules: cssInfo.rules,
            mixins: cssInfo.mixins,
          },
        };
      } else {
        classNameValue = `${objectName}.${propertyName || "?"}`;
      }
    } else {
      classNameType = "expression";
      classNameValue = "complex expression";
    }
  }

  const cssCategories = analyzeCSSCategories(classNameValue);

  return {
    hasOverride: true,
    value: classNameValue,
    type: classNameType,
    cssCategories,
  };
}
