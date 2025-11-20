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


import BpkHStack from './BpkHStack';
import BpkVStack from './BpkVStack';

import type { BpkStackComponent, BpkStackProps } from './BpkStack.types';

import STYLES from './BpkStack.module.scss';

export type Props = BpkStackProps;

const getClass = getClassName(STYLES);

/**
 * BpkStack is a layout component that provides a stack layout using CSS Modules.
 * It uses static CSS classes compiled at build time for optimal performance and SSR support.
 *
 * **Key Features:**
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"` instead of `spacing={4}`)
 * - Accepts Backpack breakpoint tokens in responsive props
 * - Accepts Backpack color tokens for color-related props
 * - Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
 * - Supports SSR out of the box
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkStack component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkStack spacing="base" direction="column">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkStack>
 * ```
 */
const BpkStack = ({
  as = 'div',
  children,
  direction = 'column',
  spacing,
  ...rest
}: Props) => {
  // Map spacing prop to gap prop for CSS Modules
  const propsWithGap = {
    ...rest,
    gap: spacing,
    flexDirection: direction,
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

// Attach HStack and VStack as sub-components
const BpkStackWithSubComponents = BpkStack as BpkStackComponent;
BpkStackWithSubComponents.HStack = BpkHStack;
BpkStackWithSubComponents.VStack = BpkVStack;

export default BpkStackWithSubComponents;
