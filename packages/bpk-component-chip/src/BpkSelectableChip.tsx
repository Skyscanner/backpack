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

import React, { useState, ChangeEvent, MouseEvent } from 'react';
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
}

const BpkSelectableChip = ({
                             accessibilityLabel,
                             children,
                             className,
                             disabled = false,
                             dismissible = false,
                             leadingAccessoryView = null,
                             role = 'checkbox',
                             selected = false,
                             trailingAccessoryView = null,
                             type = CHIP_TYPES.default,
                             ...rest
                           }: Props) => {
  const [isSelected, setIsSelected] = useState(selected);

  // Testing
  const classNames = getClassName(
    'bpk-chip',
    `bpk-chip--${type}`,
    disabled && 'bpk-chip--disabled',
    disabled && `bpk-chip--${type}-disabled`,
    !children && 'bpk-chip--icon-only',
    !disabled && isSelected && `bpk-chip--${type}-selected`,
    dismissible && `bpk-chip--${type}-dismissible`,
    className
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setIsSelected(!isSelected);
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsSelected(!isSelected);
    }
  };

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        className={getClassName('bpk-chip__hidden-input')}
        checked={isSelected}
        onChange={handleInputChange}
        aria-label={accessibilityLabel}
        disabled={disabled}
        {...rest}
        style={{ display: 'none' }} // To have this input Hidden
      />
      <button
        aria-checked={role === 'button' || role === 'tab' ? undefined : isSelected}
        className={getClassName('bpk-chip__button')}
        disabled={disabled}
        role={role}
        title={accessibilityLabel}
        type="button"
        onClick={handleButtonClick}
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
      </button>
    </label>
  );
};

export default BpkSelectableChip;
