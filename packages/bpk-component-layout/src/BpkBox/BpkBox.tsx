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

import type { BpkBoxProps } from './BpkBox.types';

import STYLES from './BpkBox.module.scss';

export type Props = BpkBoxProps;

const getClass = getClassName(STYLES);

/**
 * BpkBox is a layout component that provides a flexible container using CSS Modules.
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
 * @returns {JSX.Element} The rendered BpkBox component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkBox padding="base" margin="lg" bg="surface-highlight">
 *   Content here
 * </BpkBox>
 *
 * // Using responsive props with Backpack breakpoints
 * <BpkBox padding={{ mobile: "base", desktop: "xl" }}>
 *   Responsive content
 * </BpkBox>
 *
 * // Using numeric values (converted to CSS variables)
 * <BpkBox width={300} height={200}>
 *   Custom size
 * </BpkBox>
 * ```
 */
const BpkBox = ({
  as = 'div',
  children,
  ...rest
}: Props) => {
  const { className, restProps, style } = transformBpkLayoutProps(rest, {
    componentName: 'box',
  });
  const Component = as as ElementType;

  // Process className: split space-separated string and map through CSS Modules
  const finalClassName = processClassName(getClass, className, 'bpk-box');

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

export default BpkBox;
