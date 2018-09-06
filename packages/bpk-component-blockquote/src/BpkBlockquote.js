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

import STYLES from './bpk-blockquote.css';

const getClassName = cssModules(STYLES);

const BpkBlockquote = props => {
  const classNames = [getClassName('bpk-blockquote')];
  if (props.extraSpace) {
    classNames.push(getClassName('bpk-blockquote--extra-spacing'));
  }

  return (
    <blockquote className={classNames.join(' ')}>{props.children}</blockquote>
  );
};

BpkBlockquote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  extraSpace: PropTypes.bool,
};

BpkBlockquote.defaultProps = {
  extraSpace: false,
};

export default BpkBlockquote;
