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

import { HStack } from '@chakra-ui/react';

import { transformBpkLayoutProps } from '../useBpkLayoutProps';

import type { BpkHStackProps } from './BpkStack.types';

export type Props = BpkHStackProps;

/**
 * BpkHStack is a layout component that arranges its children in a horizontal line.
 * It's a convenience component that wraps Chakra UI's HStack with Backpack-specific API.
 *
 * **Key Features:**
 * - Automatically sets `direction="row"` for horizontal stacking
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"` instead of `spacing={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkHStack component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkStack.HStack spacing="base" alignItems="center">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack.HStack>
 *
 * // Equivalent to:
 * <BpkStack direction="row" spacing="base" alignItems="center">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack>
 * ```
 */
const BpkHStack = ({
  as,
  children,
  ...rest
}: Props) => {
  const transformedProps = transformBpkLayoutProps(rest);

  return (
    <HStack
      as={as}
      {...transformedProps}
    >
      {children}
    </HStack>
  );
};

export default BpkHStack;

