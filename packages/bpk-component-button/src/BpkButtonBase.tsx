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

import { type Props, propTypes } from './common-types';

import COMMON_STYLES from './BpkButtonBase.module.scss';

const getClassName = cssModules(COMMON_STYLES);

const noop = () => null;
// This is a duplicate of BpkButtonV2
// Better to duplicate rather than prematurely align the abstraction between Button and ButtonV2
export const BUTTON_TYPES = {
  primary: 'primary',
  primaryOnDark: 'primary-on-dark',
  primaryOnLight: 'primary-on-light',
  secondary: 'secondary',
  secondaryOnDark: 'secondary-on-dark',
  destructive: 'destructive',
  featured: 'featured',
  link: 'link',
  linkOnDark: 'link-on-dark',
} as const;

type ValueOf<T> = T[keyof T];
const BpkButtonBase = (
  {
    blank = false,
    children,
    className = '',
    disabled = false,
    href = '',
    iconOnly = false,
    large = false,
    onClick = noop,
    rel: propRel = undefined,
    submit = false,
    type,
    ...rest
  }: Props & { type?: ValueOf<typeof BUTTON_TYPES> },
) => {

  const classNames = [];
  if (type === undefined) {
    classNames.push('bpk-button');
  }
  if (type === BUTTON_TYPES.featured) {
    classNames.push('bpk-button--featured');
  }
  if (type === BUTTON_TYPES.destructive) {
    classNames.push('bpk-button--destructive');
  }
  if (type === BUTTON_TYPES.link) {
    classNames.push('bpk-button--link');
  }
  if (type === BUTTON_TYPES.linkOnDark) {
    classNames.push('bpk-button--linkOnDark');
  }
  if (type === BUTTON_TYPES.primaryOnDark) {
    classNames.push('bpk-button--primaryOnDark');
  }
  if (type === BUTTON_TYPES.primaryOnLight) {
    classNames.push('bpk-button--primaryOnLight');
  }
  if (type === BUTTON_TYPES.secondary) {
    classNames.push('bpk-button--secondary');
  }
  if (type === BUTTON_TYPES.secondaryOnDark) {
    classNames.push('bpk-button--secondaryOnDark');
  }

  if (large) {
    classNames.push('bpk-button--large');
  }

  if (iconOnly) {
    classNames.push(
      large ? 'bpk-button--large-icon-only' : 'bpk-button--icon-only',
    );
  }
  if (className) {
    classNames.push(className);
  }

  const classNameFinal = getClassName(...classNames);

  const target = blank ? '_blank' : null;
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;

  if (!disabled && href) {
    return (
      <a
        href={href}
        className={classNameFinal}
        onClick={onClick}
        target={target || undefined}
        rel={rel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const buttonType = submit ? 'submit' : 'button';

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
      disabled={disabled}
      className={classNameFinal}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

BpkButtonBase.propTypes = { ...propTypes };

export default BpkButtonBase;
