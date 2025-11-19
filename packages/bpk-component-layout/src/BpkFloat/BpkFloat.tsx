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

import STYLES from './BpkFloat.module.scss';

import type { BpkFloatProps } from './BpkFloat.types';

export type Props = BpkFloatProps;

const getClass = getClassName(STYLES);

/**
 * BpkFloat is a layout component that provides floating positioning using CSS Modules.
 * It uses static CSS classes compiled at build time for optimal performance and SSR support.
 *
 * **Key Features:**
 * - Floats content to the left or right
 * - Accepts Backpack spacing and color tokens
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkFloat component
 * @example
 * ```tsx
 * <BpkFloat float="right" margin="base">
 *   Floating content
 * </BpkFloat>
 * ```
 */
const BpkFloat = ({
  as = 'div',
  children,
  float,
  ...rest
}: Props) => {
  const { className, style, restProps } = transformBpkLayoutProps(rest);
  const Component = as as ElementType;

  const floatClass = float ? `float-${float}` : '';

  // Split className string into individual class names for CSS Modules mapping
  const classNameParts = className ? className.split(/\s+/).filter(Boolean) : [];
  const finalClassName = getClass('bpk-float', floatClass, ...classNameParts);

  return (
    <Component
      className={finalClassName || undefined}
      style={style}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default BpkFloat;
