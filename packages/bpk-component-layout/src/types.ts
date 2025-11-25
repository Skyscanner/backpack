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

import type { BoxProps, FlexProps, GridProps, StackProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import type { BpkCommonLayoutProps } from './commonProps';

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
 * Props for BpkBox component
 * Combines Box-specific props with Backpack common layout props
 */
export interface BpkBoxProps extends BpkCommonLayoutProps, RemoveCommonProps<BoxProps> {
  children?: ReactNode;
}

/**
 * Props for BpkFlex component
 * Combines Flex-specific props with Backpack common layout props
 */
export interface BpkFlexProps extends BpkCommonLayoutProps, RemoveCommonProps<FlexProps> {
  children?: ReactNode;
}

/**
 * Props for BpkGrid component
 * Combines Grid-specific props with Backpack common layout props
 */
export interface BpkGridProps extends BpkCommonLayoutProps, RemoveCommonProps<GridProps> {
  children?: ReactNode;
}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps extends BpkCommonLayoutProps, RemoveCommonProps<StackProps> {
  children?: ReactNode;
}
