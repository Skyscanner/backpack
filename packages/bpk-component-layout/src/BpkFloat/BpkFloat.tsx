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

import type { BpkFloatProps } from './BpkFloat.types';

import STYLES from './BpkFloat.module.scss';

export type Props = BpkFloatProps;

/**
 * BpkFloat is a layout component that provides floating positioning using Chakra UI's Box component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Box component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Floats content to the left or right
 * - Accepts Backpack spacing and color tokens
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * <BpkFloat float="right" margin="base">
 *   Floating content
 * </BpkFloat>
 * ```
 */
const BpkFloat = createBpkLayoutComponent<BpkFloatProps>({
  componentName: 'float',
  ChakraComponent: Box,
  styles: STYLES,
  transformProps: (props) => {
    // Include float prop in transformation
    const { float, ...rest } = props;
    return { ...rest, float };
  },
});

export default BpkFloat;
