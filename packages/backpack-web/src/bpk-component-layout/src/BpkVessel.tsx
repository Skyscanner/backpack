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

import { getDataComponentAttribute } from '../../bpk-react-utils';

import type { BpkVesselProps } from './types';

/**
 * A "migration hatch" layout primitive designed to ease component migration.
 *
 * BpkVessel renders an HTML element (default: div) and accepts all standard
 * HTML attributes for maximum migration flexibility.
 *
 * **When to use:**
 * - During component migration when you need to maintain existing className/style usage
 * - When you need to pass testing attributes (data-testid) or accessibility props
 * - As a temporary solution while refactoring components
 *
 * **Important:**
 * - This is a temporary migration tool, not a permanent solution
 * - Accepts all React.HTMLAttributes (styling, events, aria, data-*, etc.)
 * - Plan to migrate to BpkBox once legacy styling is removed
 *
 * @example
 * ```tsx
 * <BpkVessel
 *   className="legacy-class"
 *   style={{ padding: '16px', transition: 'opacity 0.3s' }}
 *   data-testid="migration-wrapper"
 *   onClick={handleClick}
 * >
 *   Content
 * </BpkVessel>
 *
 * <BpkVessel
 *   as="section"
 *   className="legacy-section"
 *   aria-label="Main content"
 *   role="region"
 *   dir="rtl"
 * >
 *   Section Content
 * </BpkVessel>
 * ```
 *
 * @todo Migration component - pending removal after component migration is complete.
 *       Replace usages with BpkBox once legacy className/style dependencies are refactored.
 *
 * @returns {JSX.Element} An HTML element with all props applied.
 */
export const BpkVessel = ({
  as: Element = 'div',
  children,
  ...restProps
}: BpkVesselProps) => (
  <Element {...getDataComponentAttribute('Vessel')} {...restProps}>
    {children}
  </Element>
);

export type { BpkVesselProps };
