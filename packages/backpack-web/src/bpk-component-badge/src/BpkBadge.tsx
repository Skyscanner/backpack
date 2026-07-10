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

import BpkInformationCircleIcon from '../../bpk-component-icon/sm/information-circle';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

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
  subtle: 'subtle',
} as const;

export const BADGE_VARIANTS = {
  default: 'default',
  interactive: 'interactive',
};

const getClassName = cssModules(STYLES);

const badgeTypeClassNames = {
  [BADGE_TYPES.warning]: getClassName('bpk-badge--warning'),
  [BADGE_TYPES.success]: getClassName('bpk-badge--success'),
  [BADGE_TYPES.critical]: getClassName('bpk-badge--critical'),
  [BADGE_TYPES.normal]: getClassName('bpk-badge--normal'),
  [BADGE_TYPES.inverse]: getClassName('bpk-badge--inverse'),
  [BADGE_TYPES.outline]: getClassName('bpk-badge--outline'),
  [BADGE_TYPES.strong]: getClassName('bpk-badge--strong'),
  [BADGE_TYPES.brand]: getClassName('bpk-badge--brand'),
  [BADGE_TYPES.subtle]: getClassName('bpk-badge--subtle'),
};

export type BadgeType = (typeof BADGE_TYPES)[keyof typeof BADGE_TYPES];

export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS];

export type Props = {
  type?: BadgeType;
  variant?: BadgeVariant;
  docked?: 'right' | 'left' | null;
  centered?: boolean;
  className?: string | null;
  children: string | ReactNode;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const BpkBadge = ({
  centered = false,
  children,
  className = null,
  docked = null,
  type = BADGE_TYPES.normal,
  variant = BADGE_VARIANTS.default,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-badge',
    badgeTypeClassNames[type],
    docked === 'right' && 'bpk-badge--docked-right',
    docked === 'left' && 'bpk-badge--docked-left',
    centered && 'bpk-badge--centered',
    className,
  );

  // TODO: should this really be a button? it makes sense for accessibility
  if (variant === BADGE_VARIANTS.interactive) {
    return (
      <button
        type="button"
        {...getDataComponentAttribute('Badge')}
        // TODO: reduce some duplication
        className={getClassName(
          'bpk-badge',
          'bpk-badge--interactive',
          badgeTypeClassNames[type],
          docked === 'right' && 'bpk-badge--docked-right',
          docked === 'left' && 'bpk-badge--docked-left',
          centered && 'bpk-badge--centered',
          className,
        )}
      >
        {children}
        <BpkInformationCircleIcon />
      </button>
    );
  }

  return (
    <span
      className={classNames}
      {...getDataComponentAttribute('Badge')}
      {...rest}
    >{children}</span>
  );
};

export default BpkBadge;
