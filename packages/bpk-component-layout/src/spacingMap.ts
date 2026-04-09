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

// Note: Spacing tokens are defined as SCSS functions in Backpack foundations,
// not as direct values. We need to use the actual rem values from the SCSS functions.
// Based on @skyscanner/bpk-foundations-web/tokens/base.default.scss:
// - bpk-spacing-sm() returns .25rem
// - bpk-spacing-md() returns .5rem
// - bpk-spacing-lg() returns 1.5rem
// - bpk-spacing-xl() returns 2rem (needs verification)
// - bpk-spacing-xxl() returns 2.5rem
// - bpk-spacing-base() returns 1rem (standard base spacing)
// TODO: CLOV-1021 - will add spacing tokens to Backpack Foundations package and use them here after we ship the PoC
const spacingXs = '.125rem'; // 2px
const spacingSm = '.25rem';
const spacingBase = '1rem'; // Standard base spacing
const spacingMd = '.5rem';
const spacingLg = '1.5rem';
const spacingXl = '2rem';
const spacingXxl = '2.5rem';

/**
 * Maps Backpack spacing tokens to actual rem values.
 * These come directly from @skyscanner/bpk-foundations-web.
 */
export const spacingMap: Record<string, { value: string }> = {
  'bpk-spacing-none': { value: '0' },
  // Temporary: Foundations does not yet export a 2px spacing token. This will be
  // replaced with a foundations value once available.
  'bpk-spacing-xs': { value: spacingXs },
  'bpk-spacing-sm': { value: spacingSm },
  'bpk-spacing-base': { value: spacingBase },
  'bpk-spacing-md': { value: spacingMd },
  'bpk-spacing-lg': { value: spacingLg },
  'bpk-spacing-xl': { value: spacingXl },
  'bpk-spacing-xxl': { value: spacingXxl },
};

/**
 * Exports spacing map for use in tokenUtils
 * This allows tokenUtils to look up actual spacing values
 *
 * @returns {Record<string, string>} A map of spacing token names to values.
 */
export function getSpacingMap(): Record<string, string> {
  const simpleMap: Record<string, string> = {};
  Object.entries(spacingMap).forEach(([key, obj]) => {
    simpleMap[key] = obj.value;
  });
  return simpleMap;
}

/**
 * Gets the actual spacing value for a Backpack spacing token
 *
 * @param {string} token - Backpack spacing token name.
 * @returns {string | undefined} The actual spacing value.
 */
export function getSpacingValue(token: string): string | undefined {
  return spacingMap[token]?.value;
}
