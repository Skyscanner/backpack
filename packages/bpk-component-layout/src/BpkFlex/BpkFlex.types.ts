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
import type { ResponsiveValue } from '../BpkBox/BpkBox.types';
import type { BpkFlexboxShorthandProps } from '../commonProps.types';
import type {
  FlexDirectionValue,
  FlexWrapValue,
  AlignItemsValue,
  AlignContentValue,
  AlignSelfValue,
  JustifyContentValue,
  JustifyItemsValue,
  JustifySelfValue,
} from '../layoutPropTypes';

/**
 * Flexbox-specific props for BpkFlex
 * Includes all Chakra UI Flex component props
 */
export interface BpkFlexSpecificProps extends BpkFlexboxShorthandProps {
  // Flexbox props (full set)
  flex?: ResponsiveValue<string | number>;
  flexDirection?: ResponsiveValue<FlexDirectionValue>;
  flexWrap?: ResponsiveValue<FlexWrapValue>;
  flexGrow?: ResponsiveValue<string | number>;
  flexShrink?: ResponsiveValue<string | number>;
  flexBasis?: ResponsiveValue<string | number>;
  alignItems?: ResponsiveValue<AlignItemsValue>;
  alignContent?: ResponsiveValue<AlignContentValue>;
  alignSelf?: ResponsiveValue<AlignSelfValue>;
  justifyContent?: ResponsiveValue<JustifyContentValue>;
  justifyItems?: ResponsiveValue<JustifyItemsValue>;
  justifySelf?: ResponsiveValue<JustifySelfValue>;
  order?: ResponsiveValue<string | number>;

  // Additional Chakra UI Flex shorthand props (beyond common ones)
  basis?: ResponsiveValue<string | number>; // Shorthand for flexBasis
  grow?: ResponsiveValue<string | number>; // Shorthand for flexGrow
  shrink?: ResponsiveValue<string | number>; // Shorthand for flexShrink
}

/**
 * Complete props interface for BpkFlex
 * Combines base layout props with Flex-specific props
 */
export interface BpkFlexProps extends BpkBaseLayoutProps, BpkFlexSpecificProps {}

