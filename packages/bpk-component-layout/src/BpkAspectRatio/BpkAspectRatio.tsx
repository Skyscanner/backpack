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

import type { ElementType } from 'react';

import { getClassName } from '../styleUtils';
import { transformBpkLayoutProps } from '../useBpkLayoutProps';

import STYLES from './BpkAspectRatio.module.scss';

import type { BpkAspectRatioProps } from './BpkAspectRatio.types';

export type Props = BpkAspectRatioProps;

const getClass = getClassName(STYLES);

/**
 * BpkAspectRatio is a layout component that maintains aspect ratio using CSS Modules.
 * It uses static CSS classes compiled at build time for optimal performance and SSR support.
 *
 * **Key Features:**
 * - Maintains a desired aspect ratio for its child
 * - Commonly used for cropping media (videos, images, maps)
 * - Accepts Backpack spacing and color tokens
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkAspectRatio component
 * @example
 * ```tsx
 * <BpkAspectRatio ratio={16 / 9}>
 *   <img src="image.jpg" alt="Image" />
 * </BpkAspectRatio>
 * ```
 */
const BpkAspectRatio = ({
  as = 'div',
  children,
  ratio,
  ...rest
}: Props) => {
  const { className, style, restProps } = transformBpkLayoutProps(rest);
  const Component = as as ElementType;

  // Calculate padding-bottom percentage for aspect ratio
  // ratio = width / height, so padding-bottom = (1 / ratio) * 100%
  let paddingBottom = '56.25%'; // Default 16:9

  if (ratio !== undefined) {
    if (typeof ratio === 'number') {
      paddingBottom = `${(1 / ratio) * 100}%`;
    } else if (typeof ratio === 'object' && ratio !== null) {
      // For responsive ratio, use the first breakpoint value as default
      const firstValue = Object.values(ratio)[0];
      if (typeof firstValue === 'number') {
        paddingBottom = `${(1 / firstValue) * 100}%`;
      }
    }
  }

  // Split className string into individual class names for CSS Modules mapping
  const classNameParts = className ? className.split(/\s+/).filter(Boolean) : [];
  const finalClassName = getClass('bpk-aspect-ratio', ...classNameParts);

  return (
    <Component
      className={finalClassName || undefined}
      style={{
        ...style,
        '--bpk-aspect-ratio': paddingBottom,
      } as React.CSSProperties}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default BpkAspectRatio;
