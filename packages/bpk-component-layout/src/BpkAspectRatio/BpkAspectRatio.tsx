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

import { AspectRatio } from '@chakra-ui/react';

import { createBpkLayoutComponent } from '../createBpkLayoutComponent';

import type { BpkAspectRatioProps } from './BpkAspectRatio.types';

import STYLES from './BpkAspectRatio.module.scss';

export type Props = BpkAspectRatioProps;

/**
 * BpkAspectRatio is a layout component that maintains aspect ratio using Chakra UI's AspectRatio component
 * with CSS Modules styling. It uses Chakra UI for component logic but CSS Modules for all styling.
 *
 * **Key Features:**
 * - Uses Chakra UI's AspectRatio component (for `as` prop, component logic)
 * - All styling handled by CSS Modules (zero CSS-in-runtime)
 * - Maintains a desired aspect ratio for its child
 * - Commonly used for cropping media (videos, images, maps)
 * - Accepts Backpack spacing and color tokens
 * - Requires BpkProvider to disable Chakra UI's CSS-in-JS
 *
 * @example
 * ```tsx
 * <BpkAspectRatio ratio={16 / 9}>
 *   <img src="image.jpg" alt="Image" />
 * </BpkAspectRatio>
 * ```
 */
const BpkAspectRatioBase = createBpkLayoutComponent<BpkAspectRatioProps>({
  componentName: 'aspect-ratio',
  ChakraComponent: AspectRatio,
  styles: STYLES,
  transformProps: (props) => {
    // Pass ratio to transformation so it's included in CSS generation
    const { ratio, ...rest } = props;
    return { ...rest, ratio };
  },
});

// AspectRatio needs ratio prop passed directly to Chakra component
const BpkAspectRatio = ({ ratio, ...props }: BpkAspectRatioProps) => (
  <BpkAspectRatioBase {...props} ratio={ratio} />
);

export default BpkAspectRatio;
