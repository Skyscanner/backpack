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

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { CHIP_TYPES } from './commonTypes';

import type { CommonProps } from './commonTypes';

import STYLES from './BpkSelectableChip.module.scss';

const getClassName = cssModules(STYLES);

export interface Props extends CommonProps {
  dismissible?: boolean;
  role?: string;
  trailingAccessoryView?: ReactNode;
  inputProps?: {};
}

const BpkSelectableChip = ({
   accessibilityLabel,
   children,
   className,
   disabled = false,
   dismissible = false,
   inputProps = {},
   leadingAccessoryView = null,
   name = "",
   role = 'checkbox',
   selected = false,
   trailingAccessoryView = null,
   type = CHIP_TYPES.default,
   ...rest
 }: Props) => {

  const classNames = getClassName(
    'bpk-chip',
    `bpk-chip--${type}`,
    disabled && 'bpk-chip--disabled',
    disabled && `bpk-chip--${type}-disabled`,
    !children && 'bpk-chip--icon-only',
    !disabled && selected && `bpk-chip--${type}-selected`,
    dismissible && `bpk-chip--${type}-dismissible`,
    className
  );

  return (
    <>
    <label htmlFor={inputProps.id}>
      <span
        aria-checked={role === 'button' || role === 'tab' ? undefined : selected}
        className={classNames}
        // disabled={disabled}
        role={role}
        title={accessibilityLabel}
        // type="button"
        {...rest}
      >
        {leadingAccessoryView && (
          <span
            className={getClassName(
              'bpk-chip__leading-accessory-view',
              !children && 'bpk-chip--icon-only__leading-accessory-view'
            )}
          >
            {leadingAccessoryView}
          </span>
        )}
        <BpkText textStyle={TEXT_STYLES.footnote}>{children}</BpkText>
        {trailingAccessoryView && (
          <span className={getClassName('bpk-chip__trailing-accessory-view')}>
            {trailingAccessoryView}
          </span>
        )}
      </span>
    </label>
  <input
    type={role === 'checkbox' ? 'checkbox' : 'radio'}
    className={getClassName('bpk-chip__hidden-input')}
    name={name}
    disabled={disabled}
    defaultChecked={selected}
    aria-disabled="true"
    aria-hidden="true"
    {...inputProps}
  />
    </>
)
  ;
};

export default BpkSelectableChip;
