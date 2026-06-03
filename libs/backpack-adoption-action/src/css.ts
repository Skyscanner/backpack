import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";

import { CSS_CATEGORY_NAMES } from "./constants";
import type { CssCategoryCounts } from "./types";

type CssRule = {
  property: string;
  value: string;
};

type CssModuleInfo = {
  rules: CssRule[];
  mixins: string[];
};

export const createEmptyCategoryCounts = (): CssCategoryCounts => ({
  color: 0,
  layout: 0,
  typography: 0,
  size: 0,
  position: 0,
  visibility: 0,
  border: 0,
  shadow: 0,
  transform: 0,
  custom: 0,
});

export const addCategories = (
  counts: CssCategoryCounts,
  categories: string[],
) => {
  categories.forEach((category) => {
    if (CSS_CATEGORY_NAMES.includes(category as keyof CssCategoryCounts)) {
      counts[category as keyof CssCategoryCounts] += 1;
    } else {
      counts.custom += 1;
    }
  });
};

export const categoryTotal = (counts: CssCategoryCounts) =>
  CSS_CATEGORY_NAMES.reduce((total, category) => total + counts[category], 0);

const propertyCategories = (propertyName: string) => {
  const categories = new Set<string>();
  const lowerProperty = propertyName.toLowerCase();

  if (
    lowerProperty === "color" ||
    lowerProperty.includes("background") ||
    lowerProperty.startsWith("bg-") ||
    lowerProperty.includes("border-color")
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
    lowerProperty.startsWith("margin") ||
    lowerProperty.startsWith("padding") ||
    lowerProperty === "gap" ||
    lowerProperty === "row-gap" ||
    lowerProperty === "column-gap"
  ) {
    categories.add("layout");
  }

  if (
    lowerProperty.includes("font") ||
    lowerProperty.includes("text") ||
    lowerProperty === "line-height" ||
    lowerProperty === "letter-spacing" ||
    lowerProperty === "word-spacing" ||
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
    lowerProperty.includes("border-") ||
    lowerProperty === "border-radius" ||
    lowerProperty === "outline" ||
    lowerProperty.includes("outline-")
  ) {
    categories.add("border");
  }

  if (lowerProperty.includes("shadow")) {
    categories.add("shadow");
  }

  if (
    lowerProperty.includes("transform") ||
    lowerProperty.includes("transition") ||
    lowerProperty.includes("animation") ||
    lowerProperty === "rotate" ||
    lowerProperty === "scale" ||
    lowerProperty === "translate"
  ) {
    categories.add("transform");
  }

  return Array.from(categories);
};

export const analyzeCssRulesCategories = (rules: CssRule[]) =>
  rules.flatMap((rule) => propertyCategories(rule.property));

export const analyzeClassNameCategories = (classNameValue: string | null) => {
  if (!classNameValue) {
    return [];
  }

  const categories: string[] = [];
  const lowerValue = classNameValue.toLowerCase();
  const pushMatches = (category: string, count: number) => {
    for (let index = 0; index < count; index += 1) {
      categories.push(category);
    }
  };

  pushMatches(
    "color",
    (lowerValue.match(/\b(text|text-|color|fg-|text-color)\b/g) || [])
      .length +
      (lowerValue.match(/\b(bg|background|bg-)\b/g) || []).length +
      (lowerValue.match(/\b(border|border-)\b/g) || []).length,
  );

  pushMatches(
    "layout",
    (lowerValue.match(/\b(flex|grid|block|inline|absolute|relative|fixed|sticky)\b/g) ||
      []).length +
      (lowerValue.match(/\b(container|wrapper|layout)\b/g) || []).length +
      (lowerValue.match(/\b(m|margin|p|padding|gap|space)\b/g) || [])
        .length +
      (lowerValue.match(/\b(mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py)\b/g) ||
        []).length,
  );

  pushMatches(
    "typography",
    (lowerValue.match(/\b(font|text-|text-size|text-lg|text-sm|text-xs|text-xl|text-2xl|text-3xl|text-4xl|text-5xl|text-6xl|text-base|leading|line-height|tracking|letter-spacing)\b/g) ||
      []).length +
      (lowerValue.match(/\b(bold|semibold|medium|light|italic|underline|uppercase|lowercase|capitalize)\b/g) ||
        []).length,
  );

  pushMatches(
    "size",
    (lowerValue.match(/\b(w|width|h|height|size|min-|max-|w-|h-)\b/g) ||
      []).length,
  );
  pushMatches(
    "position",
    (lowerValue.match(/\b(top|bottom|left|right|inset|z-|z-index)\b/g) ||
      []).length,
  );
  pushMatches(
    "visibility",
    (lowerValue.match(/\b(hidden|visible|display|show|hide|opacity)\b/g) ||
      []).length,
  );
  pushMatches(
    "border",
    (lowerValue.match(/\b(rounded|border|radius|ring)\b/g) || []).length,
  );
  pushMatches(
    "shadow",
    (lowerValue.match(/\b(shadow|drop-shadow)\b/g) || []).length,
  );
  pushMatches(
    "transform",
    (lowerValue.match(/\b(transform|transition|animate|animation|rotate|scale|translate)\b/g) ||
      []).length,
  );

  if (
    categories.length === 0 &&
    classNameValue !== "conditional" &&
    classNameValue !== "concatenation" &&
    classNameValue !== "complex expression"
  ) {
    categories.push("custom");
  }

  return categories;
};

const extractBlockContent = (content: string, startPosition: number) => {
  let depth = 1;
  let position = startPosition;
  let result = "";

  while (position < content.length && depth > 0) {
    const character = content[position];

    if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        break;
      }
    }

    result += character;
    position += 1;
  }

  return result;
};

const extractPropertiesRecursively = (
  content: string,
  rules: CssRule[],
) => {
  let position = 0;

  while (position < content.length) {
    while (position < content.length && /\s/.test(content[position])) {
      position += 1;
    }

    if (position >= content.length) {
      break;
    }

    if (content.substring(position).startsWith("//")) {
      while (position < content.length && content[position] !== "\n") {
        position += 1;
      }
      continue;
    }

    if (content.substring(position).startsWith("/*")) {
      const commentEnd = content.indexOf("*/", position);
      if (commentEnd === -1) {
        break;
      }
      position = commentEnd + 2;
      continue;
    }

    if (content[position] === "@") {
      const directiveMatch = /^@[a-zA-Z-]+\s/.exec(
        content.substring(position),
      );
      if (
        directiveMatch &&
        !content.substring(position).startsWith("@include")
      ) {
        while (position < content.length && content[position] !== "\n") {
          position += 1;
        }
        continue;
      }
    }

    const nestedBlockMatch =
      /^([&a-zA-Z0-9_-]+(?:\s+[&a-zA-Z0-9_-]+)*)\s*\{/.exec(
        content.substring(position),
      );

    if (nestedBlockMatch) {
      const blockStart = position + nestedBlockMatch[0].length;
      const nestedContent = extractBlockContent(content, blockStart);
      if (nestedContent) {
        extractPropertiesRecursively(nestedContent, rules);
        position = blockStart + nestedContent.length + 1;
        continue;
      }
    }

    const propertyMatch = /^([a-zA-Z-]+)\s*:\s*([^;]+?)\s*;/.exec(
      content.substring(position),
    );

    if (propertyMatch) {
      rules.push({
        property: propertyMatch[1].trim(),
        value: propertyMatch[2].trim(),
      });
      position += propertyMatch[0].length;
      continue;
    }

    position += 1;
  }
};

const extractRulesAndMixins = (blockContent: string, isScss: boolean) => {
  const rules: CssRule[] = [];
  const mixins: string[] = [];

  if (isScss) {
    const mixinRegex = /@include\s+([a-zA-Z0-9_-]+(?:\s*\([^)]*\))?)/g;
    let mixinMatch = mixinRegex.exec(blockContent);
    while (mixinMatch) {
      const mixinName = mixinMatch[1].split("(")[0].trim();
      if (mixinName) {
        mixins.push(mixinName);
      }
      mixinMatch = mixinRegex.exec(blockContent);
    }
  }

  extractPropertiesRecursively(blockContent, rules);

  return { rules, mixins };
};

export const parseCssModule = (
  cssFilePath: string,
  className: string,
): CssModuleInfo => {
  if (!existsSync(cssFilePath)) {
    return { rules: [], mixins: [] };
  }

  try {
    const content = readFileSync(cssFilePath, "utf8");
    const extension = extname(cssFilePath).toLowerCase();
    const isScss = extension === ".scss" || extension === ".sass";
    const rules: CssRule[] = [];
    const mixins: string[] = [];
    const bemMatch = className.match(/^(.+?)(__(.+?))?(--(.+?))?$/);

    if (bemMatch && (bemMatch[3] || bemMatch[5])) {
      const blockName = bemMatch[1];
      const targetSelector = bemMatch[3]
        ? `__${bemMatch[3]}`
        : `--${bemMatch[5]}`;
      const escapedBlockName = blockName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const blockRegex = new RegExp(`\\.${escapedBlockName}\\s*\\{`, "g");
      let blockMatch = blockRegex.exec(content);

      while (blockMatch) {
        const blockStart = blockMatch.index + blockMatch[0].length;
        const blockContent = extractBlockContent(content, blockStart);
        const blockResults = extractRulesAndMixins(blockContent, isScss);
        rules.push(...blockResults.rules);
        mixins.push(...blockResults.mixins);

        const escapedSelector = targetSelector.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        const nestedRegex = new RegExp(`&${escapedSelector}\\s*\\{`, "g");
        let nestedMatch = nestedRegex.exec(blockContent);
        while (nestedMatch) {
          const nestedStart = nestedMatch.index + nestedMatch[0].length;
          const nestedContent = extractBlockContent(
            blockContent,
            nestedStart,
          );
          const nestedResults = extractRulesAndMixins(nestedContent, isScss);
          rules.push(...nestedResults.rules);
          mixins.push(...nestedResults.mixins);
          nestedMatch = nestedRegex.exec(blockContent);
        }

        blockMatch = blockRegex.exec(content);
      }
    } else {
      const escapedClassName = className.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );
      const classRegex = new RegExp(`\\.${escapedClassName}\\s*\\{`, "g");
      let match = classRegex.exec(content);

      while (match) {
        const blockStart = match.index + match[0].length;
        const blockContent = extractBlockContent(content, blockStart);
        const result = extractRulesAndMixins(blockContent, isScss);
        rules.push(...result.rules);
        mixins.push(...result.mixins);
        match = classRegex.exec(content);
      }
    }

    return { rules, mixins: Array.from(new Set(mixins)) };
  } catch {
    return { rules: [], mixins: [] };
  }
};
