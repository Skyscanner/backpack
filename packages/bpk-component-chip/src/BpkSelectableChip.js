/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkSelectableChip.scss';
import {
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
  type CommonProps,
} from './commonTypes';

const getClassName = cssModules(STYLES);

export type Props = {
  ...CommonProps,
  selected: boolean,
  trailingAccessoryView: ?Node,
};

const BpkSelectableChip = (props: Props) => {
  const {
    accessibilityLabel,
    children,
    className,
    disabled,
    leadingAccessoryView,
    selected,
    trailingAccessoryView,
    type,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-chip',
    `bpk-chip--${type}`,
    disabled && 'bpk-chip--disabled',
    !disabled && selected && `bpk-chip--${type}-selected`,
    className,
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'
    <button
      aria-checked={selected}
      className={classNames}
      disabled={disabled}
      role="checkbox"
      title={accessibilityLabel}
      type="button"
      {...rest}
    >
      {leadingAccessoryView && (
        <span className={getClassName('bpk-chip__leading-accessory-view')}>
          {leadingAccessoryView}
        </span>
      )}
      {children}
      {trailingAccessoryView && (
        <span className={getClassName('bpk-chip__trailing-accessory-view')}>
          {trailingAccessoryView}
        </span>
      )}
    </button>
  );
};

BpkSelectableChip.propTypes = {
  ...COMMON_PROP_TYPES,
  selected: PropTypes.bool,
  trailingAccessoryView: PropTypes.node,
};

BpkSelectableChip.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  selected: false,
  trailingAccessoryView: null,
};

export default BpkSelectableChip;
