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
The dropdown chip component is just a selectable chip component
with a trailing accessory view of a chevron down icon.
*/

import React from 'react';

import ChevronDownIconSm from '../../bpk-component-icon/sm/chevron-down';

import BpkSelectableChip from './BpkSelectableChip';
import {
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
  type CommonProps,
} from './commonTypes';

export type Props = CommonProps;

const BpkDropdownChip = (props: Props) => {
  const { ...rest } = props;

  return (
    <BpkSelectableChip
      {...rest}
      trailingAccessoryView={<ChevronDownIconSm />}
    />
  );
};

BpkDropdownChip.propTypes = COMMON_PROP_TYPES;
BpkDropdownChip.defaultProps = COMMON_DEFAULT_PROPS;

export default BpkDropdownChip;
