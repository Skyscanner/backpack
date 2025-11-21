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

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkFlexProps } from './BpkFlex.types';

import STYLES from './BpkFlex.module.scss';

export type Props = BpkFlexProps;

/**
 * BpkFlex is a layout component that provides a flexbox container using Chakra UI's Flex component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Flex component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Accepts Backpack spacing tokens as strings (e.g., `padding="base"`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
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
 *   flexDirection={{ mobile: "column", desktop: "row" }}
 *   gap={{ mobile: "sm", desktop: "lg" }}
 * >
 *   Responsive flex layout
 * </BpkFlex>
 * ```
 */
const BpkFlex = createBpkLayoutComponent<BpkFlexProps>({
  componentName: 'flex',
  ChakraComponent: Flex,
  styles: STYLES,
});

export default BpkFlex;
