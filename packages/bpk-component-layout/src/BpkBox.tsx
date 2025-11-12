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

import { Box } from '@chakra-ui/react';

import { transformColorProps } from './colorTokenTransformers';
import { transformSpacingProps } from './tokenTransformers';

import type { BpkBoxProps } from './BpkBox.types';

export type Props = BpkBoxProps;

/**
 * BpkBox is a layout component that provides a flexible container using Chakra UI's Box component.
 * It follows the facade pattern, wrapping Chakra UI's Box to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - Accepts Backpack spacing tokens as strings (e.g., `padding="base"` instead of `padding={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props (e.g., `{ mobile: "base", desktop: "lg" }`)
 * - Still supports Chakra UI values for flexibility
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkBox component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkBox padding="base" margin="lg" bg="blue.500">
 *   Content here
 * </BpkBox>
 *
 * // Using responsive props with Backpack breakpoints
 * <BpkBox padding={{ mobile: "base", desktop: "xl" }}>
 *   Responsive content
 * </BpkBox>
 *
 * // Still supports Chakra UI values
 * <BpkBox padding={4} margin={2}>
 *   Content
 * </BpkBox>
 * ```
 */
const BpkBox = ({
  as,
  children,
  ...rest
}: Props) => {
  // Filter out any disallowed props (defensive programming)
  // This ensures only explicitly allowed props are passed to Chakra UI Box
  // TypeScript will catch invalid props at compile time, this is runtime safety
  const allowedProps = { ...rest };
  const disallowedProps = ['className']; // Explicitly disallowed props

  disallowedProps.forEach((prop) => {
     
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  // Transform Backpack spacing tokens to Chakra UI values
  const spacingTransformed = transformSpacingProps(allowedProps);

  // Transform Backpack color tokens to CSS custom properties
  const transformedProps = transformColorProps(spacingTransformed);

  return (
    <Box
      as={as}
      {...transformedProps}
    >
      {children}
    </Box>
  );
};

export default BpkBox;

