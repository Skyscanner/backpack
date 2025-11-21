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

import { Wrap } from '@chakra-ui/react';

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkWrapProps } from './BpkWrap.types';

import STYLES from './BpkWrap.module.scss';

export type Props = BpkWrapProps;

/**
 * BpkWrap is a layout component that provides a wrap layout using Chakra UI's Wrap component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Wrap component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Wraps children and provides spacing between them
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"`)
 * - Accepts Backpack color tokens for color-related props
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * <BpkWrap spacing="base">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkWrap>
 * ```
 */
const BpkWrap = createBpkLayoutComponent<BpkWrapProps>({
  componentName: 'wrap',
  ChakraComponent: Wrap,
  styles: STYLES,
  transformProps: (props) => {
    // Map spacing prop to gap prop, and pass spacingX/spacingY to transformBpkLayoutProps
    const { spacing, spacingX, spacingY, ...rest } = props;
    return {
      ...rest,
      gap: spacing,
      spacingX,
      spacingY,
      flexWrap: 'wrap',
    };
  },
});

export default BpkWrap;
