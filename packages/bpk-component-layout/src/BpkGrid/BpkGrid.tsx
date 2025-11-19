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

import STYLES from './BpkGrid.module.scss';

import type { BpkGridProps } from './BpkGrid.types';

export type Props = BpkGridProps;

const getClass = getClassName(STYLES);

/**
 * BpkGrid is a layout component that provides a grid container using CSS Modules.
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
 * @returns {JSX.Element} The rendered BpkGrid component
 * @example
 * ```tsx
 * // Using Backpack tokens
 * <BpkGrid
 *   gridTemplateColumns="repeat(3, 1fr)"
 *   gap="base"
 *   padding="lg"
 * >
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 *   <BpkBox>Item 3</BpkBox>
 * </BpkGrid>
 *
 * // Using responsive props with Backpack breakpoints
 * <BpkGrid
 *   gridTemplateColumns={{
 *     smallMobile: "1fr",
 *     mobile: "repeat(2, 1fr)",
 *     desktop: "repeat(3, 1fr)"
 *   }}
 *   gap={{ smallMobile: "sm", desktop: "lg" }}
 * >
 *   Responsive grid layout
 * </BpkGrid>
 * ```
 */
const BpkGrid = ({
  as = 'div',
  children,
  ...rest
}: Props) => {
  const { className, style, restProps } = transformBpkLayoutProps(rest);
  const Component = as as ElementType;

  // Handle gridTemplateColumns specially if it's a string
  if (rest.gridTemplateColumns && typeof rest.gridTemplateColumns === 'string') {
    style.gridTemplateColumns = rest.gridTemplateColumns;
  }

  // Split className string into individual class names for CSS Modules mapping
  const classNameParts = className ? className.split(/\s+/).filter(Boolean) : [];
  const finalClassName = getClass('bpk-grid', ...classNameParts);

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

export default BpkGrid;
