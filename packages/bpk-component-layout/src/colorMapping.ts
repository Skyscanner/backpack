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

/**
 * Color Mapping Configuration
 * 
 * This file defines the mapping between Backpack color tokens and their actual values.
 * The mapping ensures that Backpack colors are correctly registered in Chakra UI's theme
 * and can be accessed via token paths like 'bpk.bpk-core-primary-day'.
 * 
 * All color values come from @skyscanner/bpk-foundations-web and are in RGB format.
 */

// Import tokens from Backpack foundations
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const bpkTokens = require('@skyscanner/bpk-foundations-web/tokens/base.es6');

/**
 * Backpack Color Token to Value Mapping
 * 
 * This mapping contains all Backpack color tokens and their corresponding RGB values.
 * These values are used to populate Chakra UI's theme.colors.bpk object.
 */
export const BACKPACK_COLOR_MAPPING: Record<string, string> = {
  // Text colors
  'bpk-text-primary-day': bpkTokens.textPrimaryDay, // rgb(22, 22, 22)
  'bpk-text-secondary-day': bpkTokens.textSecondaryDay, // rgb(98, 105, 113)
  'bpk-text-disabled-day': bpkTokens.textDisabledDay, // rgba(0, 0, 0, 0.2)
  'bpk-text-on-dark-day': bpkTokens.textOnDarkDay, // rgb(255, 255, 255)
  'bpk-text-link-day': bpkTokens.textLinkDay, // rgb(0, 98, 227)
  'bpk-text-error-day': bpkTokens.textErrorDay, // rgb(231, 8, 102)
  'bpk-text-success-day': bpkTokens.textSuccessDay, // rgb(12, 131, 138)
  'bpk-text-hero-day': bpkTokens.textHeroDay, // rgb(0, 98, 227)

  // Background colors
  'bpk-canvas-day': bpkTokens.canvasDay, // rgb(255, 255, 255)
  'bpk-canvas-contrast-day': bpkTokens.canvasContrastDay, // rgb(239, 243, 248)
  'bpk-surface-highlight-day': bpkTokens.surfaceHighlightDay, // rgb(224, 228, 233)
  'bpk-surface-default-day': bpkTokens.surfaceDefaultDay, // rgb(255, 255, 255)
  'bpk-surface-elevated-day': bpkTokens.surfaceElevatedDay, // rgb(255, 255, 255)

  // Brand colors
  'bpk-core-primary-day': bpkTokens.corePrimaryDay, // rgb(5, 32, 60)
  'bpk-core-accent-day': bpkTokens.coreAccentDay, // rgb(0, 98, 227)

  // Border colors
  'bpk-line-day': bpkTokens.lineDay, // rgb(193, 199, 207)
  'bpk-line-on-dark-day': bpkTokens.lineOnDarkDay, // rgba(255, 255, 255, 0.5)
};

/**
 * Gets the Chakra UI token path for a Backpack color token
 * 
 * @param {string} bpkToken - Backpack color token (e.g., 'bpk-core-primary-day')
 * @returns {string} Chakra UI token path (e.g., 'bpk.bpk-core-primary-day')
 */
export function getChakraColorTokenPath(bpkToken: string): string {
  return `bpk.${bpkToken}`;
}

/**
 * Gets the actual color value for a Backpack color token
 * 
 * @param {string} bpkToken - Backpack color token (e.g., 'bpk-core-primary-day')
 * @returns {string | undefined} The actual color value (e.g., 'rgb(5, 32, 60)')
 */
export function getBackpackColorValue(bpkToken: string): string | undefined {
  return BACKPACK_COLOR_MAPPING[bpkToken];
}

/**
 * Validates that a Backpack color token exists in the mapping
 * 
 * @param {string} bpkToken - Backpack color token to validate
 * @returns {boolean} True if the token exists in the mapping
 */
export function isValidBackpackColorToken(bpkToken: string): boolean {
  return bpkToken in BACKPACK_COLOR_MAPPING;
}

