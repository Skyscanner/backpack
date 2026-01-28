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

import { Box } from '@chakra-ui/react';

import { processBpkComponentProps } from './tokenUtils';

import type { BpkVesselProps } from './types';

/**
 * A "migration hatch" layout primitive designed to ease component migration.
 *
 * Unlike standard Backpack layout components, `BpkVessel` intentionally
 * allows passing `className` and `style` through to the underlying element,
 * enabling gradual migration from legacy styling approaches.
 *
 * **Key Features:**
 * - Supports all Backpack layout props (spacing, sizing, flex, grid, etc.)
 * - Uses Backpack token system and responsive breakpoint keys
 * - Allows `className` for custom CSS classes
 * - Allows `style` for inline styles
 * - Supports basic interaction props (onClick, onFocus, onBlur)
 *
 * **When to use:**
 * - During component migration when you need to maintain existing className/style usage
 * - As a temporary solution while refactoring to pure Backpack props
 *
 * **Migration path:**
 * Consider migrating to `BpkBox` once you can express all styling via Backpack props.
 *
 * @example
 * ```tsx
 * <BpkVessel
 *   padding={BpkSpacing.MD}
 *   className="legacy-class"
 *   style={{ transition: 'opacity 0.3s' }}
 * >
 *   Content
 * </BpkVessel>
 * ```
 *
 * @returns {JSX.Element} A Chakra `Box` element with Backpack layout processing applied.
 */
export const BpkVessel = ({
  children,
  className,
  style,
  ...props
}: BpkVesselProps) => {
  const processedProps = processBpkComponentProps(props, { component: 'BpkBox' });
  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <Box {...processedProps} className={className} style={style}>
      {children}
    </Box>
  );
};

export type { BpkVesselProps };

