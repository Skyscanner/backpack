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
import { forwardRef } from 'react';
import type { ReactNode, Ref, AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from 'react';

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

type SpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> & {
  as?: 'span';
};

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'type' | 'disabled'> & {
  as: 'button';
};

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'style' | 'disabled'> & {
  as: 'a';
  href: string;
  /** Open link in a new tab. Sets target="_blank" and rel="noopener noreferrer". */
  blank?: boolean;
};

type CommonProps = {
  children: string | ReactNode;
  type?: BadgeType;
  docked?: 'right' | 'left' | null;
  centered?: boolean;
  className?: string | null;
};

export type Props = CommonProps & (
  | SpanProps
  | ButtonProps
  | AnchorProps
);

const BadgeInfoCircleIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M10.7002 6C10.7002 3.40426 8.59574 1.2998 6 1.2998C3.40426 1.2998 1.2998 3.40426 1.2998 6C1.2998 8.59574 3.40426 10.7002 6 10.7002V12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12V10.7002C8.59574 10.7002 10.7002 8.59574 10.7002 6Z" />
    <path
      d="M6.60645 8.87728C6.60645 9.04297 6.47213 9.17728 6.30645 9.17728H5.70625C5.54056 9.17728 5.40625 9.04297 5.40625 8.87728V5.47188C5.40625 5.30619 5.54056 5.17188 5.70625 5.17188H6.30645C6.47213 5.17188 6.60645 5.30619 6.60645 5.47188V8.87728Z" />
    <path
      d="M6.64375 3.68125C6.64375 4.04024 6.35274 4.33125 5.99375 4.33125C5.63477 4.33125 5.34375 4.04024 5.34375 3.68125C5.34375 3.32227 5.63477 3.03125 5.99375 3.03125C6.35274 3.03125 6.64375 3.32227 6.64375 3.68125Z" />
  </svg>
);

const BpkBadgeInner = (
  {
    as = 'span',
    centered = false,
    children,
    className = null,
    docked = null,
    type = BADGE_TYPES.normal,
    ...rest
  }: Props,
  ref: Ref<HTMLButtonElement | HTMLAnchorElement >,
) => {
  const classNames = getClassName(
    'bpk-badge',
    badgeTypeClassNames[type],
    (as === 'button' || as === 'a') && 'bpk-badge--interactive',
    docked === 'right' && 'bpk-badge--docked-right',
    docked === 'left' && 'bpk-badge--docked-left',
    centered && 'bpk-badge--centered',
    className,
  );

  if (as === 'a') {
    const {
      blank,
      rel,
      target,
      ...anchorRest
    } = rest as Omit<AnchorProps, 'as' | 'children'>;

    // Always include noopener noreferrer when blank=true; merge with consumer rel if provided.
    const resolvedRel = blank
      ? [rel, 'noopener noreferrer'].filter(Boolean).join(' ')
      : rel;
    const resolvedTarget = blank ? '_blank' : target;

    return (<a
      ref={ref as Ref<HTMLAnchorElement>}
      rel={resolvedRel}
      {...anchorRest}
      className={classNames}
      target={resolvedTarget}
      {...getDataComponentAttribute('Badge')}
    >
      {children}
      <BadgeInfoCircleIcon />
    </a>);
  }

  if (as === 'button') {
    const buttonRest = rest as Omit<ButtonProps, 'as' | 'children'>;
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        {...buttonRest}
        className={classNames}
        {...getDataComponentAttribute('Badge')}
      >
        {children}
        <BadgeInfoCircleIcon />
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

const BpkBadge = forwardRef(BpkBadgeInner);

export default BpkBadge;
