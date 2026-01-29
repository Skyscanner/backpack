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

export type BpkCheckboxCardContentProps = {
  /**
   * Child components (slots, Stack layout primitives, etc.)
   */
  children: ReactNode;
};

/**
 * BpkCheckboxCard.Content - Main content container
 *
 * This component provides a simple wrapper container for organizing
 * checkbox card content. Use Stack for vertical layout control.
 *
 * @example Basic usage
 * <BpkCheckboxCard.Content>
 *   <BpkCheckboxCard.Stack gap="md" align="center">
 *     <BpkCheckboxCard.Icon><LandmarkIcon /></BpkCheckboxCard.Icon>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *     <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
 *   </BpkCheckboxCard.Stack>
 * </BpkCheckboxCard.Content>
 */
export function BpkCheckboxCardContent({
  children,
}: BpkCheckboxCardContentProps) {
  const className = getClassName('bpk-checkbox-card-content');

  return <div className={className}>{children}</div>;
}
