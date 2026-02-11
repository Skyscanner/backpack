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

// TODO: CLOV-1021 - will add spacing tokens to Backpack Foundations package and use them here after we ship the PoC
const spacingXs = '.125rem'; // 2px
const spacingSm = '.25rem';
const spacingBase = '1rem';
const spacingMd = '.5rem';
const spacingLg = '1.5rem';
const spacingXl = '2rem';
const spacingXxl = '2.5rem';

const spacingMap: Record<string, string> = {
  'bpk-spacing-none': '0',
  'bpk-spacing-xs': spacingXs,
  'bpk-spacing-sm': spacingSm,
  'bpk-spacing-base': spacingBase,
  'bpk-spacing-md': spacingMd,
  'bpk-spacing-lg': spacingLg,
  'bpk-spacing-xl': spacingXl,
  'bpk-spacing-xxl': spacingXxl,
};

export function getSpacingMap(): Record<string, string> {
  return spacingMap;
}

export function getSpacingValue(token: string): string | undefined {
  return spacingMap[token];
}
