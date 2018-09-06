/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';

import STYLES from './bpk-chip.css';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  onClose: (event: SyntheticEvent<>) => mixed,
  closeLabel: ((children: Node) => string) | string,
  className: ?string,
};

const BpkChip = (props: Props) => {
  const classNames = [getClassName('bpk-chip')];
  const { children, className, onClose, closeLabel, ...rest } = props;

  if (className) {
    classNames.push(className);
  }

  const label =
    typeof closeLabel === 'function' ? closeLabel(children) : closeLabel;

  return (
    <div className={classNames.join(' ')} {...rest}>
      <span className={getClassName('bpk-chip__label')}>{children}</span>
      <BpkCloseButton label={label} onClick={onClose} />
    </div>
  );
};

BpkChip.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  closeLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    .isRequired,
  className: PropTypes.string,
};

BpkChip.defaultProps = {
  className: null,
};

export default BpkChip;
