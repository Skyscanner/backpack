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
import { parse } from "@babel/parser";
import type { File } from "@babel/types";
import * as t from "@babel/types";

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

const PARSER_PLUGINS = [
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

export const parseSourceFile = (content: string): File =>
  parse(content, {
    sourceType: "module",
    plugins: [...PARSER_PLUGINS],
    errorRecovery: false,
  });

export const isBackpackComponent = (componentName: string | null) =>
  !!componentName && componentName.startsWith("Bpk");

export const isRawHtmlElement = (elementName: string | null) =>
  !!elementName &&
  elementName === elementName.toLowerCase() &&
  HTML_ELEMENTS.has(elementName);

export const isNonBackpackComponent = (componentName: string | null) =>
  !!componentName &&
  /^[A-Z][a-zA-Z0-9]*$/.test(componentName) &&
  !isBackpackComponent(componentName) &&
  !isRawHtmlElement(componentName);

export const tagNameText = (
  name: t.JSXOpeningElement["name"],
): string | null => {
  if (t.isJSXIdentifier(name)) {
    return name.name;
  }

  if (t.isJSXMemberExpression(name)) {
    const left = tagNameText(name.object);
    return left ? `${left}.${name.property.name}` : name.property.name;
  }

  if (t.isJSXNamespacedName(name)) {
    return `${name.namespace.name}:${name.name.name}`;
  }

  return null;
};

export const lastMemberName = (elementName: string) => {
  const segments = elementName.split(".");
  return segments[segments.length - 1];
};

export const firstMemberName = (elementName: string) =>
  elementName.split(".")[0];

export const isNonVisualReactComponentName = (componentName: string) =>
  NON_VISUAL_REACT_COMPONENTS.has(componentName);

export const isNonVisualComponent = (
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

export const expressionName = (expression: t.Expression): string | null => {
  if (t.isIdentifier(expression)) {
    return expression.name;
  }

  if (t.isMemberExpression(expression) && t.isIdentifier(expression.property)) {
    return expression.property.name;
  }

  return null;
};

export const stringFromExpression = (
  expression: t.Expression,
): string | null => {
  if (t.isStringLiteral(expression)) {
    return expression.value;
  }

  if (t.isTemplateLiteral(expression)) {
    if (expression.expressions.length === 0 && expression.quasis.length === 1) {
      return expression.quasis[0].value.cooked ?? expression.quasis[0].value.raw;
    }

    return expression.quasis
      .map((quasi) => quasi.value.cooked ?? quasi.value.raw)
      .filter((part) => part.trim())
      .join("...");
  }

  return null;
};