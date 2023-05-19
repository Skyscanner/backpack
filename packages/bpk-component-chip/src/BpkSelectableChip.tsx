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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { cssModules } from '../../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import STYLES from './BpkSelectableChip.module.scss';
import type { CommonProps } from './commonTypes';
import { CHIP_TYPES } from './commonTypes';

const getClassName = cssModules(STYLES);

export interface Props extends CommonProps {
  role?: string;
  trailingAccessoryView?: ReactNode;
}

const BpkSelectableChip = ({
  role = 'checkbox',
  selected = false,
  trailingAccessoryView = null,
  className,
  disabled = false,
  leadingAccessoryView = null,
  type = CHIP_TYPES.default,
  accessibilityLabel,
  children,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-chip',
    `bpk-chip--${type}`,
    disabled && 'bpk-chip--disabled',
    disabled && `bpk-chip--${type}-disabled`,
    !disabled && selected && `bpk-chip--${type}-selected`,
    className,
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'
    <button
      aria-checked={role === 'button' ? undefined : selected}
      className={classNames}
      disabled={disabled}
      role={role}
      title={accessibilityLabel}
      type="button"
      {...rest}
    >
      {leadingAccessoryView && (
        <span className={getClassName('bpk-chip__leading-accessory-view')}>
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
  );
};

export default BpkSelectableChip;
