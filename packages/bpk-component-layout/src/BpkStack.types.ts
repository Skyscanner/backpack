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

import type StackOptionKeys from './BpkStack.constant';
import type { BpkCommonLayoutProps } from './commonProps';
import type { BpkResponsiveValue } from './tokens';
import type { RemoveCommonProps, BpkFlexGridProps } from './types';
import type { StackProps } from '@chakra-ui/react';

type StackOptionKeysType = typeof StackOptionKeys[number]

/**
 * Overrides StackOptions to support BpkResponsiveValue
 */
type BpkStackOptions = {
  [K in StackOptionKeysType]?: K extends keyof StackProps
    ? BpkResponsiveValue<StackProps[K]> | StackProps[K]
    : never;
};

/**
 * Component-specific props for BpkStack
 * Includes all Stack props except those in BpkCommonLayoutProps
 * Overrides StackOptions to support BpkResponsiveValue
 */
export interface BpkStackSpecificProps
  extends Omit<RemoveCommonProps<StackProps>, StackOptionKeysType>,
    BpkStackOptions, BpkFlexGridProps {}

/**
 * Props for BpkStack component
 * Combines Stack-specific props with Backpack common layout props
 */
export interface BpkStackProps
  extends BpkCommonLayoutProps,
    BpkStackSpecificProps {
  children?: ReactNode;
}
