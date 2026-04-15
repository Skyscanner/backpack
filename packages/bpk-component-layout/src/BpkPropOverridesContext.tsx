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

import { createContext, useContext } from 'react';

/**
 * Maps old prop values to new prop values for a single prop.
 * e.g. { primary: 'secondary' } means "swap primary for secondary"
 */
export type PropOverrideMap<TValue extends string = string> = Partial<
  Record<TValue, TValue>
>;

/**
 * Maps prop names to their override maps for a single component.
 * e.g. { type: { primary: 'secondary' }, size: { small: 'large' } }
 */
export type ComponentOverrides<
  TPropName extends string = string,
  TValue extends string = string,
> = Partial<Record<TPropName, PropOverrideMap<TValue>>>;

/**
 * Maps component names to their prop overrides.
 * e.g. { BpkButton: { type: { primary: 'secondary' } } }
 */
export type PropOverridesConfig = Record<string, ComponentOverrides>;

const BpkPropOverridesContext = createContext<PropOverridesConfig | null>(null);

/**
 * Safely resolves an override value only when both the current value and
 * the configured replacement are present in the allowed set.
 *
 * @param {Object} overrideMap - The map of old values to new values.
 * @param {string} value - The current prop value to look up.
 * @param {Array} allowedValues - The allowed set of values for the prop.
 * @returns {string} The validated replacement value, or null if none applies.
 */
export const getValidatedPropOverride = <TValue extends string>(
  overrideMap: PropOverrideMap<TValue> | null | undefined,
  value: string,
  allowedValues: readonly TValue[],
): TValue | null => {
  if (!overrideMap) {
    return null;
  }

  const allowedValueSet = new Set<string>(allowedValues);

  if (!allowedValueSet.has(value)) {
    return null;
  }

  const overriddenValue = overrideMap[value as TValue];

  if (!overriddenValue || !allowedValueSet.has(overriddenValue)) {
    return null;
  }

  return overriddenValue;
};

/**
 * Returns the override config for a specific component, or null if
 * no overrides are configured (either no provider or no entry for
 * the given component).
 *
 * @param {string} componentName - The display name of the component, e.g. 'BpkButton'
 * @returns {ComponentOverrides | null} The override config for the component, or null
 */
export const usePropOverrides = (
  componentName: string,
): ComponentOverrides | null => {
  const config = useContext(BpkPropOverridesContext);
  return config?.[componentName] ?? null;
};

export const BpkPropOverridesProvider = BpkPropOverridesContext.Provider;
