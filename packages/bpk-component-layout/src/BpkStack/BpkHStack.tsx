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

import STYLES from './BpkStack.module.scss';

import type { BpkHStackProps } from './BpkStack.types';

export type Props = BpkHStackProps;

const getClass = getClassName(STYLES);

/**
 * BpkHStack is a layout component that arranges its children in a horizontal line.
 * It's a convenience component that sets `direction="row"` by default.
 *
 * **Key Features:**
 * - Automatically sets `direction="row"` for horizontal stacking
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"` instead of `spacing={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkHStack component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkStack.HStack spacing="base" alignItems="center">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack.HStack>
 *
 * // Equivalent to:
 * <BpkStack direction="row" spacing="base" alignItems="center">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack>
 * ```
 */
const BpkHStack = ({
  as = 'div',
  children,
  spacing,
  ...rest
}: Props) => {
  // Map spacing prop to gap prop and set direction to row
  const propsWithGap = {
    ...rest,
    gap: spacing,
    flexDirection: 'row' as const,
  };

  const { className, style, restProps } = transformBpkLayoutProps(propsWithGap);
  const Component = as as ElementType;

  // Split className string into individual class names for CSS Modules mapping
  const classNameParts = className ? className.split(/\s+/).filter(Boolean) : [];
  const finalClassName = getClass('bpk-stack', 'stack-direction-row', ...classNameParts);

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

export default BpkHStack;
