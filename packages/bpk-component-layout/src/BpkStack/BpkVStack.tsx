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

import { VStack } from '@chakra-ui/react';

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkVStackProps } from './BpkStack.types';

import STYLES from './BpkStack.module.scss';

export type Props = BpkVStackProps;

/**
 * BpkVStack is a layout component that arranges its children in a vertical line.
 * It's a convenience component that sets `direction="column"` by default.
 *
 * **Key Features:**
 * - Uses Chakra UI's VStack component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Automatically sets `direction="column"` for vertical stacking
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkStack.VStack spacing="base" alignItems="stretch">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack.VStack>
 *
 * // Equivalent to:
 * <BpkStack direction="column" spacing="base" alignItems="stretch">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack>
 * ```
 */
const BpkVStack = createBpkLayoutComponent<BpkVStackProps>({
  componentName: 'stack',
  ChakraComponent: VStack,
  styles: STYLES,
  transformProps: (props) => {
    // Map spacing prop to gap prop and set direction to column
    const { spacing, ...rest } = props;
    return {
      ...rest,
      gap: spacing,
      flexDirection: 'column' as const,
    };
  },
});

export default BpkVStack;
