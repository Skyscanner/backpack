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

import { Grid } from '@chakra-ui/react';

import { transformColorProps } from '../colorTokenTransformers';
import { transformSpacingProps } from '../tokenTransformers';

import type { BpkGridProps } from './BpkGrid.types';

export type Props = BpkGridProps;

/**
 * BpkGrid is a layout component that provides a grid container using Chakra UI's Grid component.
 * It follows the facade pattern, wrapping Chakra UI's Grid to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - Accepts Backpack spacing tokens as strings (e.g., `padding="base"` instead of `padding={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props (e.g., `{ mobile: "base", desktop: "lg" }`)
 * - Accepts Backpack color tokens for color-related props
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkGrid component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkGrid
 *   gridTemplateColumns="repeat(3, 1fr)"
 *   gap="base"
 *   padding="lg"
 * >
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 *   <BpkBox>Item 3</BpkBox>
 * </BpkGrid>
 *
 * // Using responsive props with Backpack breakpoints
 * <BpkGrid
 *   gridTemplateColumns={{
 *     base: "1fr",
 *     mobile: "repeat(2, 1fr)",
 *     desktop: "repeat(3, 1fr)"
 *   }}
 *   gap={{ base: "sm", desktop: "lg" }}
 * >
 *   Responsive grid layout
 * </BpkGrid>
 * ```
 */
const BpkGrid = ({
  as,
  children,
  ...rest
}: Props) => {
  // Filter out any disallowed props (defensive programming)
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
    <Grid
      as={as}
      {...transformedProps}
    >
      {children}
    </Grid>
  );
};

export default BpkGrid;

