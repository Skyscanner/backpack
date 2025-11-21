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

import { Container } from '@chakra-ui/react';

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkContainerProps } from './BpkContainer.types';

import STYLES from './BpkContainer.module.scss';

export type Props = BpkContainerProps;

/**
 * BpkContainer is a layout component that provides a container layout using Chakra UI's Container component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's Container component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Sets margin-left and margin-right to auto to keep content centered
 * - Sets a default max-width
 * - Accepts Backpack spacing and color tokens
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * <BpkContainer padding="base">
 *   Content here
 * </BpkContainer>
 * ```
 */
const BpkContainer = createBpkLayoutComponent<BpkContainerProps>({
  componentName: 'container',
  ChakraComponent: Container,
  styles: STYLES,
  transformProps: (props) => {
    // Pass container-specific props to transformation
    const { centerContent, maxW, size, ...rest } = props;
    return { ...rest, centerContent, maxW, size };
  },
});

export default BpkContainer;
