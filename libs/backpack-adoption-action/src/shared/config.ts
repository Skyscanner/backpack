export const ADOPTION_GUARD_THRESHOLD = 60;

export const BACKPACK_ADOPTION_CORTEX_KEY = "backpack-adoption";

export const DEFAULT_PATTERN = "**/*.{jsx,tsx}";

export const DEFAULT_OUTPUT_PATH = "backpack-adoption-results.json";

export const DEFAULT_IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/*.test.*",
  "**/*.spec.*",
  "**/*.stories.*",
  "**/__mocks__/**",
  "**/__mock__/**",
  "**/mocks/**",
];

export const CSS_CATEGORY_NAMES = [
  "color",
  "layout",
  "typography",
  "size",
  "position",
  "visibility",
  "border",
  "shadow",
  "transform",
  "custom",
] as const;
