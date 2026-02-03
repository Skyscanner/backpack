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
// @ts-nocheck

/**
 * Returns an object containing the data-backpack-ds-component attribute.
 * Use this to ensure consistent naming and placement across all components.
 *
 * @param {string} componentName - The component name without the "Bpk" prefix (e.g., "Button", "Card")
 * @returns {{Object}} An object with the data-backpack-ds-component attribute
 *
 * @example
 * // In a component:
 * <button {...getDataComponentAttribute('Button')} {...rest}>
 *   Click me
 * </button>
 *
 * // Renders:
 * // <button data-backpack-ds-component="Button" ...>Click me</button>
 */
export const getDataComponentAttribute = (
  componentName: string,
): { 'data-backpack-ds-component': string } => ({
  'data-backpack-ds-component': componentName,
});

export default getDataComponentAttribute;