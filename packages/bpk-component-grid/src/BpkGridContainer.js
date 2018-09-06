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

import STYLES from './bpk-grid-container.css';

const getClassName = cssModules(STYLES);

const BpkGridContainer = props => {
  const { children, className, debug, fullWidth, ...rest } = props;
  const classNames = [getClassName('bpk-grid__container')];

  if (debug) {
    classNames.push(getClassName('bpk-grid__container--debug'));
  }
  if (fullWidth) {
    classNames.push(getClassName('bpk-grid__container--full-width'));
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

BpkGridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  debug: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

BpkGridContainer.defaultProps = {
  debug: false,
  fullWidth: false,
  className: null,
};

export default BpkGridContainer;
