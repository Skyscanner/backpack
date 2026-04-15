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
export type PropOverrideMap = Record<string, string>;

/**
 * Maps prop names to their override maps for a single component.
 * e.g. { type: { primary: 'secondary' }, size: { small: 'large' } }
 */
export type ComponentOverrides = Record<string, PropOverrideMap>;

/**
 * Maps component names to their prop overrides.
 * e.g. { BpkButton: { type: { primary: 'secondary' } } }
 */
export type PropOverridesConfig = Record<string, ComponentOverrides>;

const BpkPropOverridesContext = createContext<PropOverridesConfig | null>(null);

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
