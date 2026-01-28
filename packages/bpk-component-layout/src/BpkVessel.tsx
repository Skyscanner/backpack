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

import type { BpkVesselProps } from './types';

/**
 * A "migration hatch" layout primitive designed to ease component migration.
 *
 * BpkVessel renders an HTML element (default: div) and only accepts
 * className and style props for legacy styling during migration.
 *
 * **When to use:**
 * - During component migration when you need to maintain existing className/style usage
 * - As a temporary solution while refactoring components
 *
 * **Important:**
 * - This is a temporary migration tool, not a permanent solution
 * - Only accepts: `as`, `className`, `style`, and `children` props
 *
 * @example
 * ```tsx
 * <BpkVessel
 *   className="legacy-class"
 *   style={{ padding: '16px', transition: 'opacity 0.3s' }}
 * >
 *   Content
 * </BpkVessel>
 *
 * <BpkVessel
 *   as="section"
 *   className="legacy-section"
 * >
 *   Section Content
 * </BpkVessel>
 * ```
 *
 * @returns {JSX.Element} An HTML element with className and style applied.
 */
export const BpkVessel = ({
  as: Element = 'div',
  children,
  className,
  style,
}: BpkVesselProps) => (
  // Allowed, Element is always a DOM element.
  // eslint-disable-next-line @skyscanner/rules/forbid-component-props
  <Element className={className} style={style}>
    {children}
  </Element>
);

export type { BpkVesselProps };
