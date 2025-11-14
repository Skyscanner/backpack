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
import type { BpkFlexboxShorthandProps, BpkSpacingProps } from '../commonProps.types';

/**
 * Stack-specific props for BpkStack
 * Includes all Chakra UI Stack component props
 */
export interface BpkStackSpecificProps extends Omit<BpkFlexboxShorthandProps, 'direction'>, BpkSpacingProps {
  /**
   * The direction to stack the items
   * @default "column"
   * Note: This overrides the common `direction` prop with specific type constraint
   */
  direction?: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
}

/**
 * Complete props interface for BpkStack
 * Combines base layout props with Stack-specific props
 */
export interface BpkStackProps extends BpkBaseLayoutProps, BpkStackSpecificProps {}

