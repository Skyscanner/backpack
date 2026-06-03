import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";

import type { CssRule } from "./categories";

type CssModuleInfo = {
  rules: CssRule[];
  mixins: string[];
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
