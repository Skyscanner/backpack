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

import type { BpkGroupProps } from './BpkGroup.types';

import STYLES from './BpkGroup.module.scss';

export type Props = BpkGroupProps;

/**
 * BpkGroup is a layout component that groups related elements together using Chakra UI's Box component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Box component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Groups related elements with consistent spacing
 * - Uses flexbox for layout
 * - Accepts Backpack spacing and color tokens
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * <BpkGroup gap="base">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkGroup>
 * ```
 */
const BpkGroup = createBpkLayoutComponent<BpkGroupProps>({
  componentName: 'group',
  ChakraComponent: Box,
  styles: STYLES,
  transformProps: (props) => ({
    // Set default display to flex for grouping behavior
    display: 'flex',
    ...props,
  }),
});

export default BpkGroup;
