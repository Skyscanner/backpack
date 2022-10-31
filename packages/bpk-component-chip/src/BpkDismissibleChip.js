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

/* @flow strict */

/*
The dismissible chip component is just a selectable chip that's
been hard coded to have disabled={false}, selected and a trailing
accessory view of a close icon.
*/

import React from 'react';

import { cssModules } from '../../bpk-react-utils';
import CloseCircleIconSm from '../../bpk-component-icon/sm/close-circle';

import BpkSelectableChip from './BpkSelectableChip';
import {
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
  type CommonProps,
} from './commonTypes';
import STYLES from './BpkSelectableChip.module.scss';

export type Props = CommonProps;

const getClassName = cssModules(STYLES);

const BpkDismissibleChip = (props: Props) => {
  const { className, type, ...rest } = props;
  const iconClassNames = getClassName(
    `bpk-chip--${type}-dismissible__trailing-accessory-view`,
  );
  const classNames = getClassName(`bpk-chip--${type}-dismissible`, className);

  return (
    <BpkSelectableChip
      {...rest}
      disabled={false}
      trailingAccessoryView={<CloseCircleIconSm className={iconClassNames} />}
      selected
      type={type}
      role="button" // Override role="checkbox" because this chip is not selectable.
      className={classNames}
    />
  );
};

BpkDismissibleChip.propTypes = COMMON_PROP_TYPES;
BpkDismissibleChip.defaultProps = COMMON_DEFAULT_PROPS;

export default BpkDismissibleChip;
