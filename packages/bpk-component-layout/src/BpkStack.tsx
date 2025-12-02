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

import { Stack, HStack, VStack } from './styled-system/jsx';

import { processBpkProps } from './tokenUtils';

import type { BpkStackProps } from './types';

export const BpkStack = ({ children, ...props }: BpkStackProps) => {
  // Process props to convert Backpack tokens to runtime style props
  const processedProps = processBpkProps(props);

  // className is explicitly excluded from props to prevent style overrides
  return <Stack {...processedProps}>{children}</Stack>;
};

export const BpkHStack = ({ children, ...props }: BpkStackProps) => {
  // Process props to convert Backpack tokens to runtime style props
  const processedProps = processBpkProps(props);

  // className is explicitly excluded from props to prevent style overrides
  return <HStack {...processedProps}>{children}</HStack>;
};

export const BpkVStack = ({ children, ...props }: BpkStackProps) => {
  // Process props to convert Backpack tokens to runtime style props
  const processedProps = processBpkProps(props);

  // className is explicitly excluded from props to prevent style overrides
  return <VStack {...processedProps}>{children}</VStack>;
};

export type { BpkStackProps };
