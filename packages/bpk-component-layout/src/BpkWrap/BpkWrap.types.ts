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

import type { ResponsiveValue, SpacingValue } from '../BpkBox/BpkBox.types';
import type { BpkBaseLayoutProps } from '../BpkBaseLayoutProps.types';
import type { BpkFlexboxShorthandProps, BpkSpacingProps } from '../commonProps.types';

/**
 * Wrap-specific props for BpkWrap
 * Includes all Chakra UI Wrap component props
 */
export interface BpkWrapSpecificProps extends BpkFlexboxShorthandProps, BpkSpacingProps {
  /**
   * The horizontal space between each child (even if it wraps)
   * Defaults to `spacing` if not defined
   * Accepts Backpack spacing tokens as strings
   */
  spacingX?: SpacingValue;

  /**
   * The vertical space between each child (even if it wraps)
   * Defaults to `spacing` if not defined
   * Accepts Backpack spacing tokens as strings
   */
  spacingY?: SpacingValue;
}

/**
 * Complete props interface for BpkWrap
 * Combines base layout props with Wrap-specific props
 */
export interface BpkWrapProps extends BpkBaseLayoutProps, BpkWrapSpecificProps {}

