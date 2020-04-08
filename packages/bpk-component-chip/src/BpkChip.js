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
  primary: 'primary',
};

export type Props = {
  children: Node,
  onClose: (event: SyntheticEvent<>) => mixed,
  closeLabel: ((children: Node) => string) | string,
  className: ?string,
  dismissible: ?boolean,
  type: $Keys<typeof CHIP_TYPES>,
};

const BpkChip = (props: Props) => {
  const {
    children,
    className,
    onClose,
    closeLabel,
    dismissible,
    type,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-chip',
    type === CHIP_TYPES.primary && 'bpk-chip--primary',
    className,
  );

  const labelClassNames = getClassName(
    'bpk-chip__label',
    type === CHIP_TYPES.primary && 'bpk-chip__label--primary',
  );

  const iconClassNames = getClassName(
    type === CHIP_TYPES.primary && 'bpk-chip--primary-icon',
  );

  const label =
    typeof closeLabel === 'function' ? closeLabel(children) : closeLabel;

  return (
    // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'
    <div className={classNames} {...rest}>
      <span className={labelClassNames}>{children}</span>
      {dismissible && (
        <BpkCloseButton
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
  dismissible: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(CHIP_TYPES)),
};

BpkChip.defaultProps = {
  className: null,
  dismissible: true,
  type: CHIP_TYPES.neutral,
};

export default BpkChip;
