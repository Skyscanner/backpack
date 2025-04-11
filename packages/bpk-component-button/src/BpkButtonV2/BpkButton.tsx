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
import { Children } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import { BUTTON_TYPES, SIZE_TYPES } from './common-types';

import type { Props } from './common-types';

import COMMON_STYLES from './BpkButton.module.scss';

const getCommonClassName = cssModules(COMMON_STYLES);

// eslint-disable-next-line import/prefer-default-export
export const BpkButtonV2 = ({
  blank = false,
  children,
  className = null,
  disabled = false,
  fullWidth = false,
  href = null,
  iconOnly = false,
  onClick = () => {},
  rel: propRel = undefined,
  size = SIZE_TYPES.small,
  submit = false,
  type = BUTTON_TYPES.primary,
  ...rest
}: Props) => {
  const classNames = getCommonClassName(
    'bpk-button',
    size === SIZE_TYPES.large && 'bpk-button--large',
    iconOnly && 'bpk-button--icon-only',
    iconOnly && size === SIZE_TYPES.large && 'bpk-button--large-icon-only',
    `bpk-button--${type}`,
    fullWidth && 'bpk-button--full-width',
    className,
  );

  const target = blank ? '_blank' : '';
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;
  let processedChildren;
  if (!disabled && (type === BUTTON_TYPES.link || type === BUTTON_TYPES.linkOnDark)) {
    processedChildren = Children.map(children, (child) => {
      if (typeof child === 'string') {
        return <span className={getCommonClassName(`bpk-button--${type}__text`)}>{child}</span>;
      }
      return child;
    });
  } else {
    processedChildren = children;
  }

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
        {processedChildren}
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
      {processedChildren}
    </button>
  );
};
