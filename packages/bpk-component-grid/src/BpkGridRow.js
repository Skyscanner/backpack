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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-grid-row.css';

const getClassName = cssModules(STYLES);

const BpkGridRow = props => {
  const classNames = [getClassName('bpk-grid__row')];
  const { children, padded, className, ...rest } = props;

  if (padded) {
    classNames.push(getClassName('bpk-grid__row--padded'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} {...rest}>
      {children}
    </div>
  );
};

BpkGridRow.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  className: PropTypes.string,
};

BpkGridRow.defaultProps = {
  padded: true,
  className: null,
};

export default BpkGridRow;
