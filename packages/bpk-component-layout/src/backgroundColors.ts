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

import {
  statusColors,
  surfaceColors,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

/**
 * Picks only the keys ending with "Day" from a token object, preserving
 * their literal key types so the result is statically typed.
 *
 * At runtime, Night variants are excluded via the `endsWith('Day')` filter.
 * At compile time, TypeScript narrows the return type to only Day keys,
 * so `BpkBackgroundColor` gets full autocomplete without any manual list.
 */
export type DayOnly<T extends object> = Pick<
  T,
  { [K in keyof T]: K extends `${string}Day` ? K : never }[keyof T]
>;

function pickDayColors<T extends object>(colors: T): DayOnly<T> {
  return Object.fromEntries(
    Object.entries(colors).filter(([key]) => key.endsWith('Day')),
  ) as DayOnly<T>;
}

/**
 * Converts a camelCase Day token key to its Chakra semantic token name.
 *
 * @param {string} key - camelCase Day key, e.g. "surfaceDefaultDay".
 * @returns {string} kebab-case name without the Day suffix, e.g. "surface-default".
 */
function dayKeyToSemanticTokenName(key: string): string {
  return key.replace(/Day$/, '').replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

type SemanticTokenMap<T extends object> = { [K in keyof DayOnly<T>]: string };

function buildBackgroundColors<T extends object>(colors: T): SemanticTokenMap<T> {
  return Object.fromEntries(
    Object.keys(pickDayColors(colors)).map((k) => [k, dayKeyToSemanticTokenName(k)]),
  ) as SemanticTokenMap<T>;
}

/**
 * Runtime constant mapping BpkBox backgroundColor prop keys to Chakra semantic
 * token names registered in theme.ts.
 *
 * Keys are the familiar camelCase Day names (e.g. surfaceDefaultDay).
 * Values are kebab-case semantic token names (e.g. "surface-default") that
 * Chakra resolves to var(--bpk-colors-surface-default) at runtime, switching
 * automatically between light and dark values when data-theme changes.
 *
 * Derived from @skyscanner/bpk-foundations-web surfaceColors and statusColors.
 * When foundations adds a new token, it appears here with zero manual changes.
 *
 * @example
 * import { BpkBackgroundColor } from '@skyscanner/backpack-web/bpk-component-layout';
 *
 * <BpkBox backgroundColor={BpkBackgroundColor.surfaceDefaultDay} />
 */
export const BpkBackgroundColor = {
  ...buildBackgroundColors(surfaceColors),
  ...buildBackgroundColors(statusColors),
};
