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
// Verbatim port of CSS helpers from Skyscanner/ds-analyser src/analyzer.js.
// Algorithm preserved exactly so override counts and category attributions
// match ds-analyser regardless of how brittle the underlying SCSS parser is.
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";

export type CSSRule = { property: string; value: string };
export type CSSModuleParseResult = { rules: CSSRule[]; mixins: string[] };

export function isCSSModuleImport(source: string): boolean {
  return /\.(module\.)?(css|scss|sass|less)$/.test(source);
}

export function resolveCSSModulePath(
  modulePath: string,
  sourceFile: string,
  _repoPath: string,
): string | null {
  try {
    const sourceDir = dirname(sourceFile);
    const resolved = resolve(sourceDir, modulePath);

    const extensions = ["", ".css", ".scss", ".sass", ".less"];
    for (const ext of extensions) {
      const withExt = resolved + ext;
      if (existsSync(withExt)) {
        return withExt;
      }
    }

    if (existsSync(resolved)) {
      return resolved;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Maps CSS property names to category buckets. Verbatim from ds-analyser.
 */
export function getCSSPropertyCategories(propertyName: string | null | undefined): string[] {
  if (!propertyName || typeof propertyName !== "string") return [];

  const categories = new Set<string>();
  const lowerProperty = propertyName.toLowerCase();

  if (
    lowerProperty === "color" ||
    lowerProperty.includes("background") ||
    lowerProperty.startsWith("bg-") ||
    lowerProperty === "background-color" ||
    lowerProperty === "background-image" ||
    lowerProperty.includes("border-color") ||
    lowerProperty === "border-top-color" ||
    lowerProperty === "border-right-color" ||
    lowerProperty === "border-bottom-color" ||
    lowerProperty === "border-left-color"
  ) {
    categories.add("color");
  }

  if (
    lowerProperty === "display" ||
    lowerProperty === "position" ||
    lowerProperty === "float" ||
    lowerProperty === "clear" ||
    lowerProperty.includes("flex") ||
    lowerProperty.includes("grid") ||
    lowerProperty === "align-items" ||
    lowerProperty === "justify-content" ||
    lowerProperty === "align-content" ||
    lowerProperty === "align-self" ||
    lowerProperty === "justify-items" ||
    lowerProperty === "justify-self" ||
    lowerProperty === "grid-template" ||
    lowerProperty.includes("grid-") ||
    lowerProperty === "flex-direction" ||
    lowerProperty === "flex-wrap" ||
    lowerProperty === "flex-flow" ||
    lowerProperty.startsWith("margin") ||
    lowerProperty.startsWith("padding") ||
    lowerProperty === "gap" ||
    lowerProperty === "row-gap" ||
    lowerProperty === "column-gap" ||
    lowerProperty === "grid-gap"
  ) {
    categories.add("layout");
  }

  if (
    lowerProperty.includes("font") ||
    lowerProperty.includes("text") ||
    lowerProperty === "line-height" ||
    lowerProperty === "letter-spacing" ||
    lowerProperty === "word-spacing" ||
    lowerProperty === "text-align" ||
    lowerProperty === "text-decoration" ||
    lowerProperty === "text-transform" ||
    lowerProperty === "text-indent" ||
    lowerProperty === "white-space" ||
    lowerProperty === "word-wrap" ||
    lowerProperty === "word-break" ||
    lowerProperty === "vertical-align"
  ) {
    categories.add("typography");
  }

  if (
    lowerProperty === "width" ||
    lowerProperty === "height" ||
    lowerProperty === "min-width" ||
    lowerProperty === "max-width" ||
    lowerProperty === "min-height" ||
    lowerProperty === "max-height" ||
    lowerProperty === "size" ||
    lowerProperty === "box-sizing"
  ) {
    categories.add("size");
  }

  if (
    lowerProperty === "top" ||
    lowerProperty === "right" ||
    lowerProperty === "bottom" ||
    lowerProperty === "left" ||
    lowerProperty === "inset" ||
    lowerProperty === "z-index"
  ) {
    categories.add("position");
  }

  if (
    lowerProperty === "visibility" ||
    lowerProperty === "opacity" ||
    lowerProperty === "display" ||
    lowerProperty === "overflow" ||
    lowerProperty === "overflow-x" ||
    lowerProperty === "overflow-y"
  ) {
    categories.add("visibility");
  }

  if (
    lowerProperty === "border" ||
    lowerProperty === "border-style" ||
    lowerProperty === "border-width" ||
    lowerProperty === "border-radius" ||
    lowerProperty === "border-top" ||
    lowerProperty === "border-right" ||
    lowerProperty === "border-bottom" ||
    lowerProperty === "border-left" ||
    lowerProperty === "border-top-width" ||
    lowerProperty === "border-right-width" ||
    lowerProperty === "border-bottom-width" ||
    lowerProperty === "border-left-width" ||
    lowerProperty === "border-top-style" ||
    lowerProperty === "border-right-style" ||
    lowerProperty === "border-bottom-style" ||
    lowerProperty === "border-left-style" ||
    lowerProperty === "border-top-left-radius" ||
    lowerProperty === "border-top-right-radius" ||
    lowerProperty === "border-bottom-left-radius" ||
    lowerProperty === "border-bottom-right-radius" ||
    lowerProperty === "outline" ||
    lowerProperty === "outline-width" ||
    lowerProperty === "outline-style" ||
    lowerProperty === "outline-offset"
  ) {
    categories.add("border");
  }

  if (
    lowerProperty.includes("shadow") ||
    lowerProperty === "box-shadow" ||
    lowerProperty === "text-shadow"
  ) {
    categories.add("shadow");
  }

  if (
    lowerProperty.includes("transform") ||
    lowerProperty.includes("transition") ||
    lowerProperty.includes("animation") ||
    lowerProperty === "rotate" ||
    lowerProperty === "scale" ||
    lowerProperty === "translate" ||
    lowerProperty === "translate-x" ||
    lowerProperty === "translate-y" ||
    lowerProperty === "transform-origin" ||
    lowerProperty === "transition-property" ||
    lowerProperty === "transition-duration" ||
    lowerProperty === "transition-timing-function" ||
    lowerProperty === "transition-delay" ||
    lowerProperty === "animation-name" ||
    lowerProperty === "animation-duration" ||
    lowerProperty === "animation-timing-function" ||
    lowerProperty === "animation-delay" ||
    lowerProperty === "animation-iteration-count" ||
    lowerProperty === "animation-direction"
  ) {
    categories.add("transform");
  }

  return Array.from(categories);
}

export function analyzeCSSRulesCategories(cssRules: CSSRule[] | null | undefined): string[] {
  if (!cssRules || !Array.isArray(cssRules)) return [];

  const categories: string[] = [];
  cssRules.forEach((rule) => {
    if (rule.property) {
      const ruleCategories = getCSSPropertyCategories(rule.property);
      ruleCategories.forEach((cat) => categories.push(cat));
    }
  });
  return categories;
}

/**
 * className-pattern based category inference. Each match counts once, can
 * produce duplicates. Verbatim from ds-analyser.
 */
export function analyzeCSSCategories(classNameValue: string | null | undefined): string[] {
  if (!classNameValue || typeof classNameValue !== "string") return [];

  const categories: string[] = [];
  const lowerValue = classNameValue.toLowerCase();

  const colorMatches =
    (lowerValue.match(/\b(text|text-|color|fg-|text-color)\b/g) || []).length +
    (lowerValue.match(/\b(bg|background|bg-)\b/g) || []).length +
    (lowerValue.match(/\b(border|border-)\b/g) || []).length;
  for (let i = 0; i < colorMatches; i += 1) categories.push("color");

  const layoutMatches =
    (lowerValue.match(/\b(flex|grid|block|inline|absolute|relative|fixed|sticky)\b/g) || []).length +
    (lowerValue.match(/\b(container|wrapper|layout)\b/g) || []).length;
  for (let i = 0; i < layoutMatches; i += 1) categories.push("layout");

  const spacingMatches =
    (lowerValue.match(/\b(m|margin|p|padding|gap|space)\b/g) || []).length +
    (lowerValue.match(/\b(mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py)\b/g) || []).length;
  for (let i = 0; i < spacingMatches; i += 1) categories.push("layout");

  const typographyMatches =
    (lowerValue.match(
      /\b(font|text-|text-size|text-lg|text-sm|text-xs|text-xl|text-2xl|text-3xl|text-4xl|text-5xl|text-6xl|text-base|leading|line-height|tracking|letter-spacing)\b/g,
    ) || []).length +
    (lowerValue.match(
      /\b(bold|semibold|medium|light|italic|underline|uppercase|lowercase|capitalize)\b/g,
    ) || []).length;
  for (let i = 0; i < typographyMatches; i += 1) categories.push("typography");

  const sizeMatches = (lowerValue.match(/\b(w|width|h|height|size|min-|max-|w-|h-)\b/g) || []).length;
  for (let i = 0; i < sizeMatches; i += 1) categories.push("size");

  const positionMatches = (lowerValue.match(/\b(top|bottom|left|right|inset|z-|z-index)\b/g) || []).length;
  for (let i = 0; i < positionMatches; i += 1) categories.push("position");

  const visibilityMatches = (lowerValue.match(/\b(hidden|visible|display|show|hide|opacity)\b/g) || []).length;
  for (let i = 0; i < visibilityMatches; i += 1) categories.push("visibility");

  const borderMatches = (lowerValue.match(/\b(rounded|border|radius|ring)\b/g) || []).length;
  for (let i = 0; i < borderMatches; i += 1) categories.push("border");

  const shadowMatches = (lowerValue.match(/\b(shadow|drop-shadow)\b/g) || []).length;
  for (let i = 0; i < shadowMatches; i += 1) categories.push("shadow");

  const transformMatches = (lowerValue.match(/\b(transform|transition|animate|animation|rotate|scale|translate)\b/g) || []).length;
  for (let i = 0; i < transformMatches; i += 1) categories.push("transform");

  if (
    categories.length === 0 &&
    classNameValue !== "conditional" &&
    classNameValue !== "concatenation" &&
    classNameValue !== "complex expression"
  ) {
    categories.push("custom");
  }

  return categories;
}

/**
 * Extracts CSS rules and mixins for one class from a CSS Module file. Handles
 * BEM (block__element--modifier) the same way ds-analyser does.
 */
export function parseCSSModule(cssFilePath: string, className: string): CSSModuleParseResult {
  try {
    if (!existsSync(cssFilePath)) return { rules: [], mixins: [] };

    const content = readFileSync(cssFilePath, "utf-8");
    const extension = extname(cssFilePath).toLowerCase();
    const isSCSS = extension === ".scss" || extension === ".sass";

    const rules: CSSRule[] = [];
    const mixins: string[] = [];

    const bemMatch = className.match(/^(.+?)(__(.+?))?(--(.+?))?$/);

    if (bemMatch && (bemMatch[3] || bemMatch[5])) {
      const blockName = bemMatch[1];
      const elementName = bemMatch[3] ? `__${bemMatch[3]}` : null;
      const modifierName = bemMatch[5] ? `--${bemMatch[5]}` : null;

      const escapedBlockName = blockName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const blockRegex = new RegExp(`\\.${escapedBlockName}\\s*\\{`, "g");
      let blockMatch: RegExpExecArray | null;

      // eslint-disable-next-line no-cond-assign
      while ((blockMatch = blockRegex.exec(content)) !== null) {
        const blockStartPos = blockMatch.index + blockMatch[0].length;
        const blockContent = extractBlockContent(content, blockStartPos);

        if (blockContent) {
          const blockResults = extractRulesAndMixins(blockContent, isSCSS);
          rules.push(...blockResults.rules);
          mixins.push(...blockResults.mixins);

          const targetSelector = elementName || modifierName;
          if (targetSelector) {
            const escapedSelector = targetSelector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const nestedRegex = new RegExp(`&${escapedSelector}\\s*\\{`, "g");
            let nestedMatch: RegExpExecArray | null;

            // eslint-disable-next-line no-cond-assign
            while ((nestedMatch = nestedRegex.exec(blockContent)) !== null) {
              const nestedStartPos = nestedMatch.index + nestedMatch[0].length;
              const nestedContent = extractBlockContent(blockContent, nestedStartPos);

              if (nestedContent) {
                const nestedResults = extractRulesAndMixins(nestedContent, isSCSS);
                rules.push(...nestedResults.rules);
                mixins.push(...nestedResults.mixins);
              }
            }
          }
        }
      }
    } else {
      const escapedClassName = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const classRegex = new RegExp(`\\.${escapedClassName}\\s*\\{`, "g");
      let match: RegExpExecArray | null;

      // eslint-disable-next-line no-cond-assign
      while ((match = classRegex.exec(content)) !== null) {
        const startPos = match.index + match[0].length;
        const blockContent = extractBlockContent(content, startPos);

        if (blockContent) {
          const results = extractRulesAndMixins(blockContent, isSCSS);
          rules.push(...results.rules);
          mixins.push(...results.mixins);
        }
      }
    }

    return { rules, mixins: [...new Set(mixins)] };
  } catch {
    return { rules: [], mixins: [] };
  }
}

function extractRulesAndMixins(
  blockContent: string,
  isSCSS: boolean,
): CSSModuleParseResult {
  const rules: CSSRule[] = [];
  const mixins: string[] = [];

  if (isSCSS) {
    const mixinRegex = /@include\s+([a-zA-Z0-9_-]+(?:\s*\([^)]*\))?)/g;
    let mixinMatch: RegExpExecArray | null;
    // eslint-disable-next-line no-cond-assign
    while ((mixinMatch = mixinRegex.exec(blockContent)) !== null) {
      const mixinName = mixinMatch[1].split("(")[0].trim();
      if (mixinName) mixins.push(mixinName);
    }
  }

  extractPropertiesRecursively(blockContent, rules, isSCSS);

  return { rules, mixins };
}

function extractPropertiesRecursively(content: string, rules: CSSRule[], isSCSS: boolean): void {
  if (!content || !content.trim()) return;

  let pos = 0;
  const contentLength = content.length;

  while (pos < contentLength) {
    while (pos < contentLength && /\s/.test(content[pos])) pos += 1;
    if (pos >= contentLength) break;

    if (content.substring(pos).startsWith("//")) {
      while (pos < contentLength && content[pos] !== "\n") pos += 1;
      continue;
    }

    if (content.substring(pos).startsWith("/*")) {
      const commentEnd = content.indexOf("*/", pos);
      if (commentEnd !== -1) {
        pos = commentEnd + 2;
        continue;
      } else {
        break;
      }
    }

    if (content[pos] === "@") {
      const directiveMatch = /^@[a-zA-Z-]+\s/.exec(content.substring(pos));
      if (directiveMatch && !content.substring(pos).startsWith("@include")) {
        while (pos < contentLength && content[pos] !== "\n") pos += 1;
        continue;
      }
    }

    const nestedBlockMatch = /^([&a-zA-Z0-9_-]+(?:\s+[&a-zA-Z0-9_-]+)*)\s*\{/.exec(
      content.substring(pos),
    );

    if (nestedBlockMatch) {
      const blockStart = pos + nestedBlockMatch[0].length;
      const nestedContent = extractBlockContent(content, blockStart);

      if (nestedContent) {
        extractPropertiesRecursively(nestedContent, rules, isSCSS);
        pos = blockStart + nestedContent.length + 1;
        continue;
      }
    }

    const propertyMatch = /^([a-zA-Z-]+)\s*:\s*([^;]+?)\s*;/.exec(content.substring(pos));

    if (propertyMatch) {
      const property = propertyMatch[1].trim();
      const value = propertyMatch[2].trim();

      if (property && !property.startsWith("@") && property !== "include") {
        rules.push({ property, value });
      }

      pos += propertyMatch[0].length;
      continue;
    }

    pos += 1;
  }
}

function extractBlockContent(content: string, startPos: number): string {
  let depth = 1;
  let pos = startPos;
  let result = "";

  while (pos < content.length && depth > 0) {
    const char = content[pos];

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) break;
    }

    result += char;
    pos += 1;
  }

  return result;
}
