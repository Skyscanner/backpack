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

import type { BpkBaseLayoutProps } from '../BpkBaseLayoutProps.types';
import type { ResponsiveValue, SpacingValue } from '../BpkBox/BpkBox.types';

/**
 * Grid-specific props for BpkGrid
 * Includes all Chakra UI Grid component props
 */
export interface BpkGridSpecificProps {
  // Grid template props
  gridTemplateColumns?: ResponsiveValue<string>;
  gridTemplateRows?: ResponsiveValue<string>;
  gridTemplateAreas?: ResponsiveValue<string>;

  // Grid item placement props
  gridColumn?: ResponsiveValue<string>;
  gridRow?: ResponsiveValue<string>;
  gridArea?: ResponsiveValue<string>;
  gridColumnStart?: ResponsiveValue<string | number>;
  gridColumnEnd?: ResponsiveValue<string | number>;
  gridRowStart?: ResponsiveValue<string | number>;
  gridRowEnd?: ResponsiveValue<string | number>;

  // Grid gap props (using SpacingValue for Backpack token support)
  gridGap?: SpacingValue;
  gridColumnGap?: SpacingValue;
  gridRowGap?: SpacingValue;

  // Grid auto props
  gridAutoFlow?: ResponsiveValue<string>;
  gridAutoRows?: ResponsiveValue<string>;
  gridAutoColumns?: ResponsiveValue<string>;
}

/**
 * Complete props interface for BpkGrid
 * Combines base layout props with Grid-specific props
 */
export interface BpkGridProps extends BpkBaseLayoutProps, BpkGridSpecificProps {}

