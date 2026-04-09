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

import type { ComponentType } from 'react';

import { cssModules, wrapDisplayName } from '../../bpk-react-utils';

import STYLES from './BpkIcon.module.scss';

const getClassName = cssModules(STYLES);

export type BpkIconColor =
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'onDark'
  | 'accent'
  | 'error'
  | 'success';

export type BpkIconSize = 'sm' | 'lg' | 'xl' | 'xxl' | 'xxxl';

const COLOR_CLASS_MAP: Record<BpkIconColor, string> = {
  primary: getClassName('bpk-icon--color-primary'),
  secondary: getClassName('bpk-icon--color-secondary'),
  disabled: getClassName('bpk-icon--color-disabled'),
  onDark: getClassName('bpk-icon--color-on-dark'),
  accent: getClassName('bpk-icon--color-accent'),
  error: getClassName('bpk-icon--color-error'),
  success: getClassName('bpk-icon--color-success'),
};

const SIZE_CLASS_MAP: Record<BpkIconSize, string> = {
  sm: getClassName('bpk-icon--size-sm'),
  lg: getClassName('bpk-icon--size-lg'),
  xl: getClassName('bpk-icon--size-xl'),
  xxl: getClassName('bpk-icon--size-xxl'),
  xxxl: getClassName('bpk-icon--size-xxxl'),
};

export default function withColorAndSize(Component: ComponentType<any>) {
  const WithColorAndSize = ({
    className,
    color,
    size,
    ...rest
  }: {
    color?: BpkIconColor;
    size?: BpkIconSize;
    className?: string;
    [key: string]: any;
  }) => {
    const classNames = [
      className,
      color ? COLOR_CLASS_MAP[color] : null,
      size ? SIZE_CLASS_MAP[size] : null,
    ]
      .filter(Boolean)
      .join(' ');

    const classNameProp = classNames ? { className: classNames } : {};

    return <Component {...classNameProp} {...rest} />;
  };

  WithColorAndSize.displayName = wrapDisplayName(Component, 'withColorAndSize');

  return WithColorAndSize;
}
