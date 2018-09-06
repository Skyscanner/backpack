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

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './Heading.css';

const getClassName = cssModules(STYLES);

const Heading = props => {
  const { level: TagName, className, ...rest } = props;

  const classNames = [
    getClassName('bpk-docs-heading'),
    getClassName(`bpk-docs-heading--${TagName}`),
  ];

  if (className) {
    classNames.push(className);
  }

  return <TagName className={classNames.join(' ')} {...rest} />;
};

Heading.propTypes = {
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: null,
};

export default Heading;
