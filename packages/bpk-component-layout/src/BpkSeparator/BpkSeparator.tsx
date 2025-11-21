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

import { Separator } from '@chakra-ui/react';

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkSeparatorProps } from './BpkSeparator.types';

import STYLES from './BpkSeparator.module.scss';

export type Props = BpkSeparatorProps;

/**
 * BpkSeparator is a layout component that provides a visual separator using Chakra UI's Separator component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Separator component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Creates a visual separator line
 * - Can be horizontal or vertical
 * - Accepts Backpack spacing and color tokens
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * <BpkSeparator orientation="horizontal" borderColor="line" />
 * ```
 */
const BpkSeparator = createBpkLayoutComponent<BpkSeparatorProps>({
  componentName: 'separator',
  ChakraComponent: Separator,
  styles: STYLES,
  transformOptions: {
    disallowedProps: ['className', 'children'], // Separator doesn't accept children
  },
  transformProps: (props) => {
    // Include orientation in props for transformation
    const { orientation = 'horizontal', ...rest } = props;
    return { ...rest, orientation };
  },
});

export default BpkSeparator;
