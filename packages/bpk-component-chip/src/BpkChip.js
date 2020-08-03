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
import BpkCloseButton from 'bpk-component-close-button';

import STYLES from './BpkChip.scss';

const getClassName = cssModules(STYLES);

export const CHIP_TYPES = {
  neutral: 'neutral',
  light: 'light',
  primary: 'primary',
  success: 'success',
};

export type Props = {
  children: Node,
  closeLabel: ((children: Node) => string) | string,
  disabled: boolean,
  onClose: (event: SyntheticEvent<>) => mixed,
  type: $Keys<typeof CHIP_TYPES>,
  className: ?string,
  dismissible: ?boolean,
};

const BpkChip = (props: Props) => {
  const {
    children,
    className,
    closeLabel,
    disabled,
    dismissible,
    onClose,
    type,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-chip',
    !disabled && type === CHIP_TYPES.primary && 'bpk-chip--primary',
    !disabled && type === CHIP_TYPES.success && 'bpk-chip--success',
    !disabled && type === CHIP_TYPES.light && 'bpk-chip--light',
    disabled && 'bpk-chip--disabled',
    className,
  );

  const labelClassNames = getClassName(
    'bpk-chip__label',
    !disabled && type === CHIP_TYPES.primary && 'bpk-chip__label--primary',
    !disabled && type === CHIP_TYPES.success && 'bpk-chip__label--success',
    !disabled && type === CHIP_TYPES.light && 'bpk-chip__label--light',
    disabled && 'bpk-chip__label--disabled',
  );

  const iconClassNames = getClassName(
    'bpk-chip__close-button',
    !disabled &&
      type === CHIP_TYPES.primary &&
      'bpk-chip__close-button--primary',
    !disabled &&
      type === CHIP_TYPES.success &&
      'bpk-chip__close-button--success',
    !disabled && type === CHIP_TYPES.light && 'bpk-chip__close-button--light',
    disabled && 'bpk-chip__close-button--disabled',
  );

  const label =
    typeof closeLabel === 'function' ? closeLabel(children) : closeLabel;

  return (
    // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'
    <div className={classNames} {...rest}>
      <span className={labelClassNames}>{children}</span>
      {dismissible && (
        <BpkCloseButton
          disabled={disabled}
          className={iconClassNames}
          label={label}
          onClick={onClose}
        />
      )}
    </div>
  );
};

BpkChip.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  closeLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    .isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dismissible: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(CHIP_TYPES)),
};

BpkChip.defaultProps = {
  className: null,
  disabled: false,
  dismissible: true,
  type: CHIP_TYPES.neutral,
};

export default BpkChip;
