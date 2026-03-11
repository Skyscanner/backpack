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
import { BpkSpinner, BpkLargeSpinner, SPINNER_TYPES } from '../../../bpk-component-spinner';
import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import { BUTTON_TYPES, SIZE_TYPES } from './common-types';

import type { ButtonType, Props } from './common-types';

import COMMON_STYLES from './BpkButton.module.scss';

const getCommonClassName = cssModules(COMMON_STYLES);

const getSpinnerType = (buttonType: ButtonType) => {
  switch (buttonType) {
    case BUTTON_TYPES.secondary:
    case BUTTON_TYPES.destructive:
    case BUTTON_TYPES.link:
    case BUTTON_TYPES.primaryOnDark:
      return SPINNER_TYPES.dark;
    default:
      return SPINNER_TYPES.light;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const BpkButtonV2 = ({
  blank = false,
  children,
  className = null,
  disabled = false,
  fullWidth = false,
  href = null,
  iconOnly = false,
  implicit = false,
  loading = false,
  onClick = () => {},
  rel: propRel = undefined,
  size = SIZE_TYPES.small,
  submit = false,
  type = BUTTON_TYPES.primary,
  ...rest
}: Props) => {
  const isDisabled = disabled || loading;
  const isLinkType = type === BUTTON_TYPES.link || type === BUTTON_TYPES.linkOnDark;
  const alternate = type === BUTTON_TYPES.linkOnDark;
  const shouldUnderline = isLinkType && !iconOnly && !isDisabled;

  const classNames = getCommonClassName(
    'bpk-button',
    size === SIZE_TYPES.large && 'bpk-button--large',
    iconOnly && 'bpk-button--icon-only',
    iconOnly && size === SIZE_TYPES.large && 'bpk-button--large-icon-only',
    `bpk-button--${type}`,
    loading && 'bpk-button--loading',
    fullWidth && 'bpk-button--full-width',
    isLinkType && iconOnly && 'bpk-button--link--icon-only',
    isLinkType && implicit && 'bpk-button--link--implicit',
    className,
  );

  const underlinedClassName = shouldUnderline
    ? getCommonClassName(
        'bpk-button--link-underlined',
        implicit && !alternate && 'bpk-button--link-underlined--implicit',
        alternate && !implicit && 'bpk-button--link-underlined--alternate',
        implicit && alternate && 'bpk-button--link-underlined--implicit--alternate',
      )
    : null;

  const innerContent = underlinedClassName
    ? <span className={underlinedClassName}>{children}</span>
    : children;

  const content = loading ? (
    <div className={getCommonClassName('bpk-button__loading-container')}>
      <span className={getCommonClassName('bpk-button__loading-icon')} aria-hidden="true">
        {size === SIZE_TYPES.large
          ? <BpkLargeSpinner type={getSpinnerType(type)} alignToButton />
          : <BpkSpinner type={getSpinnerType(type)} alignToButton />}
      </span>
      <div className={getCommonClassName('bpk-button__content--hidden')}>
        {innerContent}
      </div>
    </div>
  ) : innerContent;

  const target = blank ? '_blank' : '';
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;

  if (!isDisabled && href) {
    return (
      <a
        href={href}
        className={classNames}
        {...getDataComponentAttribute('Button')}
        aria-busy={loading || undefined}
        onClick={onClick}
        target={target}
        rel={rel}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={isDisabled}
      className={classNames}
      {...getDataComponentAttribute('Button')}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};
