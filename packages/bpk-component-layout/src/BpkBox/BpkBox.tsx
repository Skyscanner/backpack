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

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkBoxProps } from './BpkBox.types';

import STYLES from './BpkBox.module.scss';

export type Props = BpkBoxProps;

/**
 * BpkBox is a layout component that provides a flexible container using Chakra UI's Box component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Box component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Accepts Backpack spacing tokens as strings (e.g., `padding="base"`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkBox padding="base" margin="lg" bg="surface-highlight">
 *   Content here
 * </BpkBox>
 *
 * // Using responsive props with Backpack breakpoints
 * <BpkBox padding={{ mobile: "base", desktop: "xl" }}>
 *   Responsive content
 * </BpkBox>
 *
 * // Using numeric values (converted to CSS variables)
 * <BpkBox width={300} height={200}>
 *   Custom size
 * </BpkBox>
 * ```
 */
const BpkBox = createBpkLayoutComponent<BpkBoxProps>({
  componentName: 'box',
  ChakraComponent: Box,
  styles: STYLES,
});

export default BpkBox;
