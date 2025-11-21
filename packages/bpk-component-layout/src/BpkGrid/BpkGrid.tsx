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

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkGridProps } from './BpkGrid.types';

import STYLES from './BpkGrid.module.scss';

export type Props = BpkGridProps;

/**
 * BpkGrid is a layout component that provides a grid container using Chakra UI's Grid component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Grid component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Accepts Backpack spacing tokens as strings (e.g., `padding="base"`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
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
 *     smallMobile: "1fr",
 *     mobile: "repeat(2, 1fr)",
 *     desktop: "repeat(3, 1fr)"
 *   }}
 *   gap={{ smallMobile: "sm", desktop: "lg" }}
 * >
 *   Responsive grid layout
 * </BpkGrid>
 * ```
 */
const BpkGrid = createBpkLayoutComponent<BpkGridProps>({
  componentName: 'grid',
  ChakraComponent: Grid,
  styles: STYLES,
});

export default BpkGrid;
