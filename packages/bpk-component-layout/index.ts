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

import BpkAspectRatio, {
  type Props as BpkAspectRatioProps,
} from './src/BpkAspectRatio/BpkAspectRatio';
import BpkBox, {
  type Props as BpkBoxProps,
} from './src/BpkBox/BpkBox';
import BpkCenter, {
  type Props as BpkCenterProps,
} from './src/BpkCenter/BpkCenter';
import BpkContainer, {
  type Props as BpkContainerProps,
} from './src/BpkContainer/BpkContainer';
import BpkFlex, {
  type Props as BpkFlexProps,
} from './src/BpkFlex/BpkFlex';
import BpkFloat, {
  type Props as BpkFloatProps,
} from './src/BpkFloat/BpkFloat';
import BpkGrid, {
  type Props as BpkGridProps,
} from './src/BpkGrid/BpkGrid';
import BpkGroup, {
  type Props as BpkGroupProps,
} from './src/BpkGroup/BpkGroup';
import {
  BpkProvider,
  type BpkProviderProps,
} from './src/BpkProvider';
import BpkSeparator, {
  type Props as BpkSeparatorProps,
} from './src/BpkSeparator/BpkSeparator';
import BpkSpacer, {
  type Props as BpkSpacerProps,
} from './src/BpkSpacer/BpkSpacer';
import BpkStack, {
  type Props as BpkStackProps,
} from './src/BpkStack/BpkStack';
import BpkWrap, {
  type Props as BpkWrapProps,
} from './src/BpkWrap/BpkWrap';
import {
  BPK_SPACING_TOKENS,
  BPK_BREAKPOINT_TOKENS,
  backpackTheme,
} from './src/backpackTheme';
import {
  BPK_COLOR_TOKENS,
  BPK_COLOR_TOKEN_MAP,
  type BpkColorTokenEnum,
} from './src/colorTokenTransformers';

import type { BpkBaseLayoutProps } from './src/BpkBaseLayoutProps.types';
import type {
  ResponsiveValue,
  SpacingValue,
} from './src/BpkBox/BpkBox.types';
import type {
  BpkHStackProps,
  BpkVStackProps,
} from './src/BpkStack/BpkStack.types';
import type {
  BpkFlexboxShorthandProps,
  BpkSpacingProps,
} from './src/commonProps.types';

export type {
  BpkBoxProps,
  BpkFlexProps,
  BpkGridProps,
  BpkStackProps,
  BpkSpacerProps,
  BpkContainerProps,
  BpkCenterProps,
  BpkSeparatorProps,
  BpkWrapProps,
  BpkAspectRatioProps,
  BpkFloatProps,
  BpkGroupProps,
  BpkProviderProps,
  ResponsiveValue,
  SpacingValue,
  // Stack sub-components types
  BpkHStackProps,
  BpkVStackProps,
  BpkColorTokenEnum,
  BpkBaseLayoutProps,
  BpkFlexboxShorthandProps,
  BpkSpacingProps,
  // Constrained prop value types (for advanced usage)
  DisplayValue,
  FlexDirectionValue,
  FlexWrapValue,
  AlignItemsValue,
  AlignContentValue,
  AlignSelfValue,
  JustifyContentValue,
  JustifyItemsValue,
  JustifySelfValue,
  OverflowValue,
  PositionValue,
  BorderStyleValue,
  TextAlignValue,
  TextTransformValue,
  TextDecorationValue,
  CursorValue,
  PointerEventsValue,
  VisibilityValue,
} from './src/layoutPropTypes';
export default BpkBox;
export {
  BpkBox,
  BpkFlex,
  BpkGrid,
  BpkStack,
  BpkSpacer,
  BpkContainer,
  BpkCenter,
  BpkSeparator,
  BpkWrap,
  BpkAspectRatio,
  BpkFloat,
  BpkGroup,
  BpkProvider,
  BPK_SPACING_TOKENS,
  BPK_BREAKPOINT_TOKENS,
  BPK_COLOR_TOKENS,
  BPK_COLOR_TOKEN_MAP,
  backpackTheme,
};

