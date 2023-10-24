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

import STYLES from './BpkBadge.module.scss';

export const BADGE_TYPES = {
  warning: 'warning',
  success: 'success',
  critical: 'critical',
  normal: 'normal',
  inverse: 'inverse',
  outline: 'outline',
  strong: 'strong',
  brand: 'brand',
} as const;

const getClassName = cssModules(STYLES);

const badgeTypeClassNames = {
  [BADGE_TYPES.warning]: getClassName('bpk-badge-v2--warning'),
  [BADGE_TYPES.success]: getClassName('bpk-badge-v2--success'),
  [BADGE_TYPES.critical]: getClassName('bpk-badge-v2--critical'),
  [BADGE_TYPES.normal]: getClassName('bpk-badge-v2--normal'),
  [BADGE_TYPES.inverse]: getClassName('bpk-badge-v2--inverse'),
  [BADGE_TYPES.outline]: getClassName('bpk-badge-v2--outline'),
  [BADGE_TYPES.strong]: getClassName('bpk-badge-v2--strong'),
  [BADGE_TYPES.brand]: getClassName('bpk-badge-v2--brand'),
};

export type BadgeType = (typeof BADGE_TYPES)[keyof typeof BADGE_TYPES];

export type Props = {
  type?: BadgeType;
  docked?: 'right' | 'left' | null;
  centered?: boolean;
  className?: string | null;
  children: string | ReactNode;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkBadgeV2 = ({
  centered = false,
  className = null,
  docked = null,
  type = BADGE_TYPES.normal,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-badge-v2',
    badgeTypeClassNames[type],
    docked === 'right' && 'bpk-badge-v2--docked-right',
    docked === 'left' && 'bpk-badge-v2--docked-left',
    centered && 'bpk-badge-v2--centered',
    className,
  );

  return <span className={classNames} {...rest} />;
};

export default BpkBadgeV2;
