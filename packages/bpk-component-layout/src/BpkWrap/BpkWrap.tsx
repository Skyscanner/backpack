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

import type { BpkWrapProps } from './BpkWrap.types';

import STYLES from './BpkWrap.module.scss';

export type Props = BpkWrapProps;

const getClass = getClassName(STYLES);

/**
 * BpkWrap is a layout component that provides a wrap layout using CSS Modules.
 * It uses static CSS classes compiled at build time for optimal performance and SSR support.
 *
 * **Key Features:**
 * - Wraps children and provides spacing between them
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"`)
 * - Accepts Backpack color tokens for color-related props
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkWrap component
 * @example
 * ```tsx
 * <BpkWrap spacing="base">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkWrap>
 * ```
 */
const BpkWrap = ({
  as = 'div',
  children,
  spacing,
  spacingX,
  spacingY,
  ...rest
}: Props) => {
  // Map spacing prop to gap prop, and pass spacingX/spacingY to transformBpkLayoutProps
  const propsWithGap = {
    ...rest,
    gap: spacing,
    spacingX,
    spacingY,
    flexWrap: 'wrap',
  };

  const { className, restProps, style } = transformBpkLayoutProps(propsWithGap, {
    componentName: 'wrap',
  });
  const Component = as as ElementType;

  // Process className: split space-separated string and map through CSS Modules
  const finalClassName = processClassName(getClass, className, 'bpk-wrap');

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

export default BpkWrap;
