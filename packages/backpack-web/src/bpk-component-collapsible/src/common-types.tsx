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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCollapsible.module.scss';

export const COLLAPSIBLE_VARIANTS = {
  default: 'default',
  onContrast: 'onContrast',
} as const;

export type BpkCollapsibleVariant =
  (typeof COLLAPSIBLE_VARIANTS)[keyof typeof COLLAPSIBLE_VARIANTS];

export type BpkCollapsibleOpenChangeDetails = { open: boolean };

const getClassName = cssModules(STYLES);

export const getRootClassName = (variant: BpkCollapsibleVariant) => {
  const variantModifier =
    variant === COLLAPSIBLE_VARIANTS.onContrast ? 'on-contrast' : 'default';
  return getClassName(
    'bpk-collapsible',
    `bpk-collapsible--${variantModifier}`,
  );
};
