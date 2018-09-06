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

import STYLES from './bpk-accordion.css';

const getClassName = cssModules(STYLES);

const BpkAccordion = props => {
  const classNames = [getClassName('bpk-accordion')];
  const { children, className, ...rest } = props;

  if (className) {
    classNames.push(className);
  }

  return (
    <dl className={classNames.join(' ')} {...rest}>
      {children}
    </dl>
  );
};

BpkAccordion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkAccordion.defaultProps = {
  className: null,
};

export default BpkAccordion;
