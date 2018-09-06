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

import STYLES from './bpk-table.css';

const getClassName = cssModules(STYLES);

const BpkTableHeadCell = props => {
  const { className, alternate, ...rest } = props;

  const classNames = [
    'bpk-table__cell',
    alternate ? 'bpk-table__cell--head-alternate' : 'bpk-table__cell--head',
  ].map(getClassName);

  if (className) {
    classNames.push(className);
  }

  return <th {...rest} className={classNames.join(' ')} />;
};

BpkTableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
  alternate: PropTypes.bool,
  className: PropTypes.string,
};

BpkTableHeadCell.defaultProps = {
  alternate: false,
  className: null,
};

export default BpkTableHeadCell;
