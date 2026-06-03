import { CSS_CATEGORY_NAMES } from "../../shared/config";
import type { CssCategoryCounts } from "../../shared/types";

export type CssRule = {
  property: string;
  value: string;
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
