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

import type { ReactNode } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxCardStackProps = {
  /**
   * Child components to stack vertically
   */
  children: ReactNode;

  /**
   * Gap between stacked items
   * Uses Backpack spacing tokens
   * @default "md"
   */
  gap?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Horizontal alignment of items
   * @default "center"
   */
  align?: 'start' | 'center' | 'end';
};

/**
 * BpkCheckboxCard.Stack - Vertical layout primitive
 *
 * Arranges child components vertically with consistent spacing
 * using Backpack design tokens.
 *
 * This primitive is useful for creating vertical layouts within
 * checkbox cards, such as stacking labels and descriptions.
 *
 * @example
 * <BpkCheckboxCard.Stack gap="sm" align="center">
 *   <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   <BpkCheckboxCard.Description>Central location</BpkCheckboxCard.Description>
 *   <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
 * </BpkCheckboxCard.Stack>
 *
 * @returns {JSX.Element} Rendered stack layout container.
 */
export function BpkCheckboxCardStack({
  align = 'center',
  children,
  gap = 'md',
}: BpkCheckboxCardStackProps) {
  const className = getClassName(
    'bpk-checkbox-card-stack',
    `bpk-checkbox-card-stack--gap-${gap}`,
    `bpk-checkbox-card-stack--align-${align}`
  );

  return <div className={className}>{children}</div>;
}
