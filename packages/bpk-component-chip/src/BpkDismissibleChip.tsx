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

import CloseCircleIconSm from '../../bpk-component-icon/sm/close-circle';
import { cssModules } from '../../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.

import BpkSelectableChip from './BpkSelectableChip';
import { CHIP_TYPES } from './commonTypes';

import type { CommonProps as Props } from './commonTypes';

import STYLES from './BpkSelectableChip.module.scss';

const getClassName = cssModules(STYLES);

type BpkDismissibleChipProps = Omit<Props, 'disabled' | 'selected'>;

const BpkDismissibleChip = ({
  className,
  leadingAccessoryView = null,
  type = CHIP_TYPES.default,
  ...rest
}: BpkDismissibleChipProps) => {
  const iconClassNames = getClassName(
    `bpk-chip--${type}-dismissible__trailing-accessory-view`,
  );
  const classNames = getClassName(`bpk-chip--${type}-dismissible`, className);

  return (
    <BpkSelectableChip
      {...rest}
      leadingAccessoryView={leadingAccessoryView}
      disabled={false}
      trailingAccessoryView={<CloseCircleIconSm className={iconClassNames} />}
      selected
      type={type}
      role="button" // Override role="checkbox" because this chip is not selectable.
      className={classNames}
    />
  );
};

export default BpkDismissibleChip;
