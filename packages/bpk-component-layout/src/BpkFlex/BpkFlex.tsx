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

import STYLES from './BpkFlex.module.scss';

import type { BpkFlexProps } from './BpkFlex.types';

export type Props = BpkFlexProps;

const getClass = getClassName(STYLES);

/**
 * BpkFlex is a layout component that provides a flexbox container using CSS Modules.
 * It uses static CSS classes compiled at build time for optimal performance and SSR support.
 *
 * **Key Features:**
 * - Accepts Backpack spacing tokens as strings (e.g., `padding="base"` instead of `padding={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props (e.g., `{ mobile: "base", desktop: "lg" }`)
 * - Accepts Backpack color tokens for color-related props
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkFlex component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkFlex padding="base" gap="md" alignItems="center">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkFlex>
 *
 * // Using responsive props with Backpack breakpoints
 * <BpkFlex
 *   flexDirection={{ mobile: "column", desktop: "row" }}
 *   gap={{ mobile: "sm", desktop: "lg" }}
 * >
 *   Responsive flex layout
 * </BpkFlex>
 * ```
 */
const BpkFlex = ({
  as = 'div',
  children,
  ...rest
}: Props) => {
  const { className, style, restProps } = transformBpkLayoutProps(rest);
  const Component = as as ElementType;

  // Split className string into individual class names for CSS Modules mapping
  const classNameParts = className ? className.split(/\s+/).filter(Boolean) : [];
  const finalClassName = getClass('bpk-flex', ...classNameParts);

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

export default BpkFlex;
