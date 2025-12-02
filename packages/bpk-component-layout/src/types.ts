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

import type { ReactNode } from 'react';

import type {
  BoxProps as StyledBoxProps,
  FlexProps as StyledFlexProps,
  GridProps as StyledGridProps,
  StackProps as StyledStackProps,
} from './styled-system/jsx';
import type { ConditionalValue } from './styled-system/types';
import type { BpkCommonLayoutProps } from './commonProps';
import type { BpkSpacingValue } from './tokens';

type ResponsiveValue<T> = ConditionalValue<T>;

/**
 * Base type that removes spacing/color props and className from Chakra UI props
 * These will be replaced with Backpack-specific types
 */
type RemoveCommonProps<T> = Omit<
  T,
  | keyof BpkCommonLayoutProps
  | 'className'
  | 'children'
>;

/**
 * Component-specific props for BpkBox
 * Includes all Box props except those in BpkCommonLayoutProps
 */
export interface BpkBoxSpecificProps extends RemoveCommonProps<StyledBoxProps> {}

/**
 * Props for BpkBox component
 * Combines Box-specific props with Backpack common layout props
 */
export interface BpkBoxProps extends BpkCommonLayoutProps, BpkBoxSpecificProps {
  children?: ReactNode;
}

/**
 * Component-specific props for BpkFlex
 * Includes all Flex props except those in BpkCommonLayoutProps
 */
export interface BpkFlexSpecificProps extends RemoveCommonProps<StyledFlexProps> {}

/**
 * Props for BpkFlex component
 * Combines Flex-specific props with Backpack common layout props
 */
export interface BpkFlexProps extends BpkCommonLayoutProps, BpkFlexSpecificProps {
  children?: ReactNode;
}

/**
 * Component-specific props for BpkGrid
 * Includes all Grid props except those in BpkCommonLayoutProps
 */
export interface BpkGridSpecificProps extends RemoveCommonProps<StyledGridProps> {}

/**
 * Props for BpkGrid component
 * Combines Grid-specific props with Backpack common layout props
 */
export interface BpkGridProps extends BpkCommonLayoutProps, BpkGridSpecificProps {
  children?: ReactNode;
}

/**
 * Component-specific props for BpkStack
 * Includes all Stack props except those in BpkCommonLayoutProps
 * Explicitly overrides spacing to enforce Backpack tokens
 */
export interface BpkStackSpecificProps extends Omit<RemoveCommonProps<StyledStackProps>, 'spacing'> {
  spacing?: ResponsiveValue<BpkSpacingValue>;
}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps extends BpkCommonLayoutProps, BpkStackSpecificProps {
  children?: ReactNode;
}

export type { BpkCommonLayoutProps };
