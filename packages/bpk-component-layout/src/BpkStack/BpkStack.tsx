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

import { Stack } from '@chakra-ui/react';

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import BpkHStack from './BpkHStack';
import BpkVStack from './BpkVStack';

import type { BpkStackComponent, BpkStackProps } from './BpkStack.types';

import STYLES from './BpkStack.module.scss';

export type Props = BpkStackProps;

/**
 * BpkStack is a layout component that provides a stack layout using Chakra UI's Stack component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Stack component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkStack spacing="base" direction="column">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack>
 * ```
 */
const BpkStackBase = createBpkLayoutComponent<BpkStackProps>({
  componentName: 'stack',
  ChakraComponent: Stack,
  styles: STYLES,
  transformProps: (props) => {
    // Map spacing prop to gap prop and direction to flexDirection
    const { spacing, direction = 'column', ...rest } = props;
    return {
      ...rest,
      gap: spacing,
      flexDirection: direction,
    };
  },
});

// Attach HStack and VStack as sub-components
const BpkStack = BpkStackBase as BpkStackComponent;
BpkStack.HStack = BpkHStack;
BpkStack.VStack = BpkVStack;

export default BpkStack;
