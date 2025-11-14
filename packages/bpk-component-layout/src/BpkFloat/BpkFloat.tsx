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

import { transformBpkLayoutProps } from '../useBpkLayoutProps';

import type { BpkFloatProps } from './BpkFloat.types';

export type Props = BpkFloatProps;

/**
 * BpkFloat is a layout component that provides floating positioning using CSS float.
 * It wraps Chakra UI's Box with float styling to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - Floats content to the left or right
 * - Accepts Backpack spacing and color tokens
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkFloat component
 * @example
 * ```tsx
 * <BpkFloat float="right" margin="base">
 *   Floating content
 * </BpkFloat>
 * ```
 */
const BpkFloat = ({
  as,
  children,
  ...rest
}: Props) => {
  const transformedProps = transformBpkLayoutProps(rest);

  return (
    <Box
      as={as}
      {...transformedProps}
    >
      {children}
    </Box>
  );
};

export default BpkFloat;

