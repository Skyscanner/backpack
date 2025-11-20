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

import { getClassName, processClassName } from '../styleUtils';
import { transformBpkLayoutProps } from '../useBpkLayoutProps';

import type { BpkAspectRatioProps } from './BpkAspectRatio.types';

import STYLES from './BpkAspectRatio.module.scss';

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
  // Pass ratio to transformBpkLayoutProps so it's included in hash and CSS generation
  const propsWithRatio = {
    ...rest,
    ratio,
  };

  const { className, restProps, style } = transformBpkLayoutProps(propsWithRatio, {
    componentName: 'aspect-ratio',
  });
  const Component = as as ElementType;

  // Process className: split space-separated string and map through CSS Modules
  const finalClassName = processClassName(getClass, className, 'bpk-aspect-ratio');

  return (
    // Allowed, Component is always a dom element.
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <Component
      {...restProps}
      className={finalClassName || undefined}
      style={style || undefined}
    >
      {children}
    </Component>
  );
};

export default BpkAspectRatio;
