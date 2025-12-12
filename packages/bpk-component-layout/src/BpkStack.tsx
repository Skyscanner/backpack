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

<<<<<<< HEAD
import { BpkBox } from './BpkBox';
import { BpkSpacing } from './tokens';

import type { BpkStackProps } from './types';

export const BpkStack = ({
  children,
  direction = 'column',
  spacing = BpkSpacing.MD,
  ...rest
}: BpkStackProps) => (
  <BpkBox
    display="flex"
    flexDirection={direction}
    gap={spacing}
    {...rest}
  >
    {children}
  </BpkBox>
);

export default BpkStack;
=======
import { Stack, VStack, HStack } from '@chakra-ui/react';

import { processBpkStackProps } from './BpkStack.tokenUtils';

import type { BpkStackProps } from './BpkStack.types';

export const BpkStack = ({ children, ...props }: BpkStackProps) => {
  const processedProps = processBpkStackProps(props);
  return <Stack {...processedProps}>{children}</Stack>;
};

export const BpkHStack = ({ children, ...props }: BpkStackProps) => {
  const processedProps = processBpkStackProps(props);
  return <HStack {...processedProps}>{children}</HStack>;
};

export const BpkVStack = ({ children, ...props }: BpkStackProps) => {
  const processedProps = processBpkStackProps(props);
  return <VStack {...processedProps}>{children}</VStack>;
};

export type { BpkStackProps };
>>>>>>> CLOV-989

