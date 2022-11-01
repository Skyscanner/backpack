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

import PropTypes from 'prop-types';
import React, { type Node } from 'react';

import { cssModules } from '../../bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import STYLES from './BpkSelectableChip.module.scss';
import {
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
  type CommonProps,
} from './commonTypes';

const getClassName = cssModules(STYLES);

export type Props = {
  ...CommonProps,
  role: string,
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
    role,
    selected,
    trailingAccessoryView,
    type,
    ...rest
  } = props;

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
      aria-checked={role === 'button' ? null : selected}
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

BpkSelectableChip.propTypes = {
  ...COMMON_PROP_TYPES,
  role: PropTypes.string,
  selected: PropTypes.bool,
  trailingAccessoryView: PropTypes.node,
};

BpkSelectableChip.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  role: 'checkbox',
  selected: false,
  trailingAccessoryView: null,
};

export default BpkSelectableChip;
