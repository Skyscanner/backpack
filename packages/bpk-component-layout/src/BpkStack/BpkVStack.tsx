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

import type { BpkVStackProps } from './BpkStack.types';

import STYLES from './BpkStack.module.scss';

export type Props = BpkVStackProps;

const getClass = getClassName(STYLES);

/**
 * BpkVStack is a layout component that arranges its children in a vertical line.
 * It's a convenience component that sets `direction="column"` by default.
 *
 * **Key Features:**
 * - Automatically sets `direction="column"` for vertical stacking
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"` instead of `spacing={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkVStack component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkStack.VStack spacing="base" alignItems="stretch">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack.VStack>
 *
 * // Equivalent to:
 * <BpkStack direction="column" spacing="base" alignItems="stretch">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack>
 * ```
 */
const BpkVStack = ({
  as = 'div',
  children,
  spacing,
  ...rest
}: Props) => {
  // Map spacing prop to gap prop and set direction to column
  const propsWithGap = {
    ...rest,
    gap: spacing,
    flexDirection: 'column' as const,
  };

  const { className, restProps, style } = transformBpkLayoutProps(propsWithGap, {
    componentName: 'stack',
  });
  const Component = as as ElementType;

  // Process className: split space-separated string and map through CSS Modules
  const finalClassName = processClassName(getClass, className, 'bpk-stack');

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

export default BpkVStack;
