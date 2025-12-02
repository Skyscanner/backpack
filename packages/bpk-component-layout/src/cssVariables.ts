/*
 * CSS variable helpers for Backpack layout tokens.
 * Converts Backpack tokens into `var(--bpk-...)` references and updates
 * the document root with actual values so Chakra/Emotion can consume them.
 */

import type { BpkColorToken, BpkSpacingToken } from './tokens';
import { colorMap, spacingMap } from './theme';

const CSS_VAR_PREFIX = '--bpk-';
const SPACING_VAR_PREFIX = `${CSS_VAR_PREFIX}spacing-`;
const COLOR_VAR_PREFIX = `${CSS_VAR_PREFIX}color-`;

const sanitizeToken = (token: string) => token.replace(/[^a-z0-9-]/gi, '-');

export const getSpacingCssVarName = (token: BpkSpacingToken) =>
  `${SPACING_VAR_PREFIX}${token.replace('bpk-spacing-', '')}`;

export const getColorCssVarName = (token: BpkColorToken) =>
  `${COLOR_VAR_PREFIX}${sanitizeToken(token)}`;

export const getSpacingCssVar = (token: BpkSpacingToken) =>
  `var(${getSpacingCssVarName(token)})`;

export const getColorCssVar = (token: BpkColorToken) =>
  `var(${getColorCssVarName(token)})`;

export const getSpacingCssVariablePairs = (
  overrides?: Partial<Record<BpkSpacingToken, string>>
): Record<string, string> => {
  const pairs: Record<string, string> = {};
  Object.keys(spacingMap).forEach((token) => {
    const normalizedToken = token as BpkSpacingToken;
    const value = overrides?.[normalizedToken] ?? spacingMap[normalizedToken]?.value;
    if (value !== undefined) {
      pairs[getSpacingCssVarName(normalizedToken)] = value;
    }
  });
  return pairs;
};

export const getColorCssVariablePairs = (
  overrides?: Partial<Record<BpkColorToken, string>>
): Record<string, string> => {
  const pairs: Record<string, string> = {};
  Object.keys(colorMap).forEach((token) => {
    const normalizedToken = token as BpkColorToken;
    const value = overrides?.[normalizedToken] ?? colorMap[normalizedToken];
    if (value !== undefined) {
      pairs[getColorCssVarName(normalizedToken)] = value;
    }
  });
  return pairs;
};

export const applyCssVariables = (
  variables: Record<string, string>,
  target: CSSStyleDeclaration
) => {
  Object.entries(variables).forEach(([key, value]) => {
    target.setProperty(key, value);
  });
};

export const updateCssVariables = (overrides?: {
  spacing?: Partial<Record<BpkSpacingToken, string>>;
  colors?: Partial<Record<BpkColorToken, string>>;
}) => {
  if (typeof document === 'undefined') {
    return;
  }
  const rootStyle = document.documentElement.style;
  applyCssVariables(getSpacingCssVariablePairs(overrides?.spacing), rootStyle);
  applyCssVariables(getColorCssVariablePairs(overrides?.colors), rootStyle);
};

