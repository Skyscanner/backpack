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

import type { ResponsiveValue, SpacingValue } from './BpkBox/BpkBox.types';
import type {
  FlexDirectionValue,
  FlexWrapValue,
  AlignItemsValue,
  JustifyContentValue,
} from './layoutPropTypes';

/**
 * Flexbox shorthand props that are common across multiple components
 * Used by BpkFlex, BpkStack, and BpkWrap
 */
export interface BpkFlexboxShorthandProps {
  /**
   * Shorthand for `alignItems` style prop
   */
  align?: ResponsiveValue<AlignItemsValue>;

  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: ResponsiveValue<JustifyContentValue>;

  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: ResponsiveValue<FlexWrapValue>;

  /**
   * Shorthand for `flexDirection` style prop
   */
  direction?: ResponsiveValue<FlexDirectionValue>;
}

/**
 * Spacing props that are common across multiple components
 * Used by BpkStack and BpkWrap
 */
export interface BpkSpacingProps {
  /**
   * The space between items
   * Accepts Backpack spacing tokens as strings
   */
  spacing?: SpacingValue;
}

