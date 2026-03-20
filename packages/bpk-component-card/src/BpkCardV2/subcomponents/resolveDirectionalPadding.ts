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

import type { BpkFlexProps } from '../../../../bpk-component-layout';

type PaddingValue = BpkFlexProps['padding'];

/**
 * Resolves a directional padding value for Header/Footer subcomponents.
 *
 * When the shorthand `padding` prop is set, directional overrides are passed
 * through as-is (BpkFlex handles shorthand + directional merging).
 * When no shorthand is set, the directional value falls back to a default.
 *
 * @param {PaddingValue} padding - The shorthand padding prop value
 * @param {PaddingValue} directional - The directional padding override
 * @param {PaddingValue} fallback - The default value when no shorthand or directional is set
 * @returns {PaddingValue} The resolved padding value
 */
const resolveDirectionalPadding = (
  padding: PaddingValue,
  directional: PaddingValue,
  fallback: PaddingValue,
): PaddingValue => (padding !== undefined ? directional : (directional ?? fallback));

export default resolveDirectionalPadding;
