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

/*
The dismissible chip component is just a selectable chip that's
been hard coded to have disabled={false}, selected and a trailing
accessory view of a close icon.
*/

import type { ReactNode } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import CloseCircleIconSm from '../../bpk-component-icon/sm/close-circle';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { CHIP_TYPES } from './commonTypes';

import type { CommonProps as Props } from './commonTypes';

import STYLES from './BpkSelectableChip.module.scss';

const getClassName = cssModules(STYLES);

type BpkDismissibleChipProps = Props;

const BpkDismissibleChip = ({
  children,
  className,
  disabled = false,
  leadingAccessoryView = null,
  selected = true,
  type = CHIP_TYPES.default,
  ...rest
}: BpkDismissibleChipProps) => {

  const classNames = getClassName(
    'bpk-chip',
    `bpk-chip--${type}`,
    disabled && 'bpk-chip--disabled',
    disabled && `bpk-chip--${type}-disabled`,
    !children && 'bpk-chip--icon-only',
    !disabled && selected && `bpk-chip--${type}-selected`,
    `bpk-chip--${type}-dismissible`,
  );

  return (
    <div className={getClassName(className)}>
      <button
        disabled={false}
        type="button"
        className={classNames}
        {...rest}
      >
        {leadingAccessoryView && (
          <span
            className={getClassName(
              'bpk-chip__leading-accessory-view',
              !children && 'bpk-chip--icon-only__leading-accessory-view',
            )}
          >
            {leadingAccessoryView}
          </span>
        )}
        <BpkText textStyle={TEXT_STYLES.footnote}>{children}</BpkText>

        <span
          className={getClassName(
            'bpk-chip__trailing-accessory-view',
            `bpk-chip--${type}-dismissible__trailing-accessory-view`,
          )}
        >
          <CloseCircleIconSm
            fill={
              type === CHIP_TYPES.default || type === CHIP_TYPES.onImage
                ? '#ffffff80'
                : '#626971'
            }
          />
        </span>
      </button>
    </div>
  );
};

export default BpkDismissibleChip;
