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

import { Flex } from '@chakra-ui/react';

import { transformBpkLayoutProps } from '../useBpkLayoutProps';

import type { BpkFlexProps } from './BpkFlex.types';

export type Props = BpkFlexProps;

/**
 * BpkFlex is a layout component that provides a flexbox container using Chakra UI's Flex component.
 * It follows the facade pattern, wrapping Chakra UI's Flex to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - Accepts Backpack spacing tokens as strings (e.g., `padding="base"` instead of `padding={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props (e.g., `{ mobile: "base", desktop: "lg" }`)
 * - Accepts Backpack color tokens for color-related props
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkFlex component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkFlex padding="base" gap="md" alignItems="center">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkFlex>
 *
 * // Using responsive props with Backpack breakpoints
 * <BpkFlex
 *   flexDirection={{ base: "column", mobile: "row" }}
 *   gap={{ base: "sm", desktop: "lg" }}
 * >
 *   Responsive flex layout
 * </BpkFlex>
 * ```
 */
const BpkFlex = ({
  as,
  children,
  ...rest
}: Props) => {
  const transformedProps = transformBpkLayoutProps(rest);

  return (
    <Flex
      as={as}
      {...transformedProps}
    >
      {children}
    </Flex>
  );
};

export default BpkFlex;

