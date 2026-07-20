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
// Verbatim port of helpers from Skyscanner/ds-analyser src/analyzer.js.
// Function shapes and order intentionally mirror the source so behaviour can
// be diffed against ds-analyser line-by-line.

export const PARSER_PLUGINS = [
  "jsx",
  "typescript",
  "decorators-legacy",
  "classProperties",
  "objectRestSpread",
  "asyncGenerators",
  "functionBind",
  "exportDefaultFrom",
  "exportNamespaceFrom",
  "dynamicImport",
  "nullishCoalescingOperator",
  "optionalChaining",
] as const;

/**
 * Determines if an import source is from the design system.
 * Supports @skyscanner/backpack-web (mirrors ds-analyser).
 */
export function isDesignSystemImport(source: string): boolean {
  return source.startsWith("@skyscanner/backpack-web");
}

/**
 * Backpack components start with "Bpk" (e.g., BpkBadge, BpkText).
 */
export function isBackpackComponent(componentName: string | null | undefined): boolean {
  return Boolean(componentName && componentName.startsWith("Bpk"));
}

/**
 * Common HTML elements list copied verbatim from ds-analyser.
 */
const HTML_ELEMENTS = [
  "a", "abbr", "address", "area", "article", "aside", "audio",
  "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button",
  "canvas", "caption", "cite", "code", "col", "colgroup",
  "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt",
  "em", "embed",
  "fieldset", "figcaption", "figure", "footer", "form",
  "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html",
  "i", "iframe", "img", "input", "ins",
  "kbd",
  "label", "legend", "li", "link",
  "main", "map", "mark", "menu", "meta", "meter",
  "nav", "noscript",
  "object", "ol", "optgroup", "option", "output",
  "p", "param", "picture", "pre", "progress",
  "q",
  "rp", "rt", "ruby",
  "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg",
  "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track",
  "u", "ul",
  "var", "video",
  "wbr",
];

export function isRawHTMLElement(elementName: string | null | undefined): boolean {
  if (!elementName) return false;
  if (elementName !== elementName.toLowerCase()) return false;
  return HTML_ELEMENTS.includes(elementName);
}

/**
 * PascalCase, not Backpack, not raw HTML.
 */
export function isNonBackpackComponent(componentName: string | null | undefined): boolean {
  if (!componentName) return false;
  const isPascalCase = /^[A-Z][a-zA-Z0-9]*$/.test(componentName);
  return isPascalCase && !isBackpackComponent(componentName) && !isRawHTMLElement(componentName);
}

/**
 * Names that are React utility wrappers and never render visual JSX themselves.
 */
export function isNonVisualComponentName(componentName: string | null | undefined): boolean {
  if (!componentName) return false;
  return ["Fragment", "StrictMode", "Suspense", "Profiler", "Portal"].includes(componentName);
}

/**
 * Detects non-visual JSX (Fragment, StrictMode, Provider, React.X, etc.).
 */
export function isNonVisualComponent(
  elementName: string | null | undefined,
  elementNode: any,
  nonVisualImports: Set<string>,
): boolean {
  if (!elementName) return false;
  if (nonVisualImports.has(elementName)) return true;

  if (elementNode && elementNode.type === "JSXMemberExpression") {
    const property = elementNode.property?.name;
    if (property === "Provider") return true;
    if (elementNode.object?.name === "React" && isNonVisualComponentName(property)) {
      return true;
    }
  }

  return false;
}

/**
 * Returns the full namespaced JSX name (e.g., "BP.Button") or simple name.
 */
export function getJSXElementName(name: any): string | null {
  if (!name) return null;
  if (name.type === "JSXIdentifier") {
    return name.name;
  }
  if (name.type === "JSXMemberExpression") {
    return `${name.object.name}.${name.property.name}`;
  }
  return null;
}

/**
 * Extracts a flat props map from JSX attributes. Mirrors ds-analyser semantics:
 * - StringLiteral attribute values become strings.
 * - JSXExpressionContainer with StringLiteral / BooleanLiteral / Identifier /
 *   MemberExpression are unwrapped to a primitive or property name.
 * - All other expressions become null.
 */
export function extractProps(attributes: any[]): Record<string, any> {
  const props: Record<string, any> = {};

  attributes.forEach((attr) => {
    if (attr.type === "JSXAttribute" && attr.name) {
      const name = attr.name.name;
      let value: any = null;

      if (attr.value) {
        if (attr.value.type === "StringLiteral") {
          value = attr.value.value;
        } else if (attr.value.type === "JSXExpressionContainer") {
          const expr = attr.value.expression;
          if (expr.type === "StringLiteral") {
            value = expr.value;
          } else if (expr.type === "BooleanLiteral") {
            value = expr.value;
          } else if (expr.type === "Identifier") {
            value = expr.name;
          } else if (expr.type === "MemberExpression") {
            if (expr.property && expr.property.name) {
              value = expr.property.name;
            }
          }
        }
      }

      props[name] = value;
    }
  });

  return props;
}

/**
 * Variant detection rules — verbatim from ds-analyser.
 */
export function detectVariant(
  props: Record<string, any>,
  componentName: string,
  attributes: any[] | undefined,
): string | null {
  if (componentName === "BpkButtonV2") {
    const typeAttr = attributes?.find(
      (attr) => attr.type === "JSXAttribute" && attr.name?.name === "type",
    );

    if (typeAttr && typeAttr.value) {
      let typeValue: string | null = null;

      if (typeAttr.value.type === "StringLiteral") {
        typeValue = typeAttr.value.value;
      } else if (typeAttr.value.type === "JSXExpressionContainer") {
        const expr = typeAttr.value.expression;
        if (expr.type === "StringLiteral") {
          typeValue = expr.value;
        } else if (expr.type === "MemberExpression") {
          if (expr.property && expr.property.name) {
            typeValue = expr.property.name;
          }
        } else if (expr.type === "Identifier") {
          typeValue = expr.name;
        }
      }

      if (typeValue) {
        return `type:${typeValue}`;
      }
    }

    if (props.type) return `type:${props.type}`;
    return null;
  }

  if (componentName === "BpkText") {
    const textStyleAttr = attributes?.find(
      (attr) => attr.type === "JSXAttribute" && attr.name?.name === "textStyle",
    );

    if (textStyleAttr && textStyleAttr.value) {
      let textStyleValue: string | null = null;

      if (textStyleAttr.value.type === "StringLiteral") {
        textStyleValue = textStyleAttr.value.value;
      } else if (textStyleAttr.value.type === "JSXExpressionContainer") {
        const expr = textStyleAttr.value.expression;
        if (expr.type === "StringLiteral") {
          textStyleValue = expr.value;
        } else if (expr.type === "MemberExpression") {
          if (expr.property && expr.property.name) {
            textStyleValue = expr.property.name;
          }
        } else if (expr.type === "Identifier") {
          textStyleValue = expr.name;
        }
      }

      if (textStyleValue) {
        return `textStyle:${textStyleValue}`;
      }
    }

    if (props.textStyle) return `textStyle:${props.textStyle}`;
    return null;
  }

  const variantProps = ["variant", "size", "type", "appearance", "color", "intent"];
  for (const propName of variantProps) {
    if (props[propName]) {
      return `${propName}:${props[propName]}`;
    }
  }

  return null;
}
