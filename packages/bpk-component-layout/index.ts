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

import BpkBox, {
  type Props as BpkBoxProps,
} from './src/BpkBox';
import BpkFlex, {
  type Props as BpkFlexProps,
} from './src/BpkFlex';
import BpkGrid, {
  type Props as BpkGridProps,
} from './src/BpkGrid';
import {
  BpkLayoutProvider,
  type BpkLayoutProviderProps,
} from './src/BpkLayoutProvider';
import {
  BPK_SPACING_TOKENS,
  BPK_BREAKPOINT_TOKENS,
  backpackTheme,
} from './src/backpackTheme';
import { BPK_COLOR_TOKENS, BPK_COLOR_TOKEN_MAP } from './src/colorTokenTransformers';

import type {
  ResponsiveValue,
  SpacingValue,
} from './src/BpkBox.types';
import type { BpkBaseLayoutProps } from './src/BpkBaseLayoutProps.types';
import type { BpkFlexProps } from './src/BpkFlex.types';
import type { BpkGridProps } from './src/BpkGrid.types';

export type {
  BpkBoxProps,
  BpkFlexProps,
  BpkGridProps,
  BpkBaseLayoutProps,
  BpkLayoutProviderProps,
  ResponsiveValue,
  SpacingValue,
};
export default BpkBox;
export {
  BpkBox,
  BpkFlex,
  BpkGrid,
  BpkLayoutProvider,
  BPK_SPACING_TOKENS,
  BPK_BREAKPOINT_TOKENS,
  BPK_COLOR_TOKENS,
  BPK_COLOR_TOKEN_MAP,
  backpackTheme,
};

