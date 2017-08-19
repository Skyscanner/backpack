/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';

import STYLES from './bpk-chip.scss';

const getClassName = cssModules(STYLES);

const BpkChip = (props) => {
  const classNames = [getClassName('bpk-chip')];
  const { children, className, onClose, closeLabel, selected, ...rest } = props;

  if (className) { classNames.push(className); }

  if (selected) { classNames.push(getClassName('bpk-chip--selected')); }

  const classNameFinal = classNames.join(' ');

  const getCloseLabel = typeof closeLabel === 'string'
    ? () => closeLabel
    : closeLabel;

  return (
    <div
      className={classNameFinal}
      {...rest}
    >
      <span className={getClassName('bpk-chip__label')} >
        {children}
      </span>
      <BpkCloseButton
        label={getCloseLabel(children)}
        onClick={onClose}
      />
    </div>
  );
};

BpkChip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeLabel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  onClose: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

BpkChip.defaultProps = {
  className: null,
  closeLabel: children => `close ${children.toString().toLowerCase()}`,
  selected: false,
};

export default BpkChip;
