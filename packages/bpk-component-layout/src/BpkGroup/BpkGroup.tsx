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

import { transformColorProps } from '../colorTokenTransformers';
import { transformSpacingProps } from '../tokenTransformers';

import type { BpkGroupProps } from './BpkGroup.types';

export type Props = BpkGroupProps;

/**
 * BpkGroup is a layout component that groups related elements together.
 * It wraps Chakra UI's Box with flexbox styling to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - Groups related elements with consistent spacing
 * - Uses flexbox for layout
 * - Accepts Backpack spacing and color tokens
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkGroup component
 * @example
 * ```tsx
 * <BpkGroup gap="base" alignItems="center">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkGroup>
 * ```
 */
const BpkGroup = ({
  as,
  children,
  ...rest
}: Props) => {
  const allowedProps = { ...rest };
  const disallowedProps = ['className'];

  disallowedProps.forEach((prop) => {
     
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  const spacingTransformed = transformSpacingProps(allowedProps);
  const transformedProps = transformColorProps(spacingTransformed);

  // Set default display to flex for grouping behavior
  const propsWithDisplay = {
    display: 'flex',
    ...transformedProps,
  };

  return (
    <Box
      as={as}
      {...propsWithDisplay}
    >
      {children}
    </Box>
  );
};

export default BpkGroup;

