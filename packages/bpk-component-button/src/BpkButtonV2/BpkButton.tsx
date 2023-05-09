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
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { cssModules } from '../../../bpk-react-utils';

import type { Props } from './common-types';
import { BUTTON_TYPES, SIZE_TYPES } from './common-types';
import COMMON_STYLES from './BpkButtonBase.module.scss';

const getCommonClassName = cssModules(COMMON_STYLES);

const BpkButtonV2 = ({
  children,
  type = BUTTON_TYPES.primary,
  size = SIZE_TYPES.small,
  className = null,
  href = null,
  disabled = false,
  onClick = () => {},
  submit = false,
  iconOnly = false,
  blank = false,
  rel: propRel = undefined,
  ...rest
}: Props) => {
  const classNames = getCommonClassName(
    'bpk-button',
    size === SIZE_TYPES.large && 'bpk-button--large',
    iconOnly && 'bpk-button--icon-only',
    iconOnly && size === SIZE_TYPES.large && 'bpk-button--large-icon-only',
    `bpk-button--${type}`,
    className,
  );

  const target = blank ? '_blank' : '';
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;

  if (!disabled && href) {
    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
        target={target}
        rel={rel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className={classNames}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BpkButtonV2;
