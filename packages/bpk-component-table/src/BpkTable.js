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

const BpkTable = props => {
  const classNames = [getClassName('bpk-table')];
  const { children, className, alternate, ...rest } = props;
  if (className) {
    classNames.push(className);
  }

  if (alternate) {
    classNames.push(getClassName('bpk-table--alternate'));
  }

  return (
    <table className={classNames.join(' ')} {...rest}>
      {children}
    </table>
  );
};

BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alternate: PropTypes.bool,
};

BpkTable.defaultProps = {
  className: null,
  alternate: false,
};

export default BpkTable;
