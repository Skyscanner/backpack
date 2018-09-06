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

import STYLES from './color-swatch.css';

const getClassName = cssModules(STYLES);

const ColorSwatch = props => {
  const style = {
    backgroundColor: props.color,
    backgroundImage: props.gradient,
  };

  const classNames = [getClassName('bpkdocs-color-swatch')];

  if (props.whiteColor) {
    classNames.push(getClassName('bpkdocs-color-swatch--light'));
  }
  if (props.border) {
    classNames.push(getClassName('bpkdocs-color-swatch--border'));
  }

  return (
    <div style={style} className={classNames.join(' ')}>
      {props.name}
    </div>
  );
};

ColorSwatch.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  whiteColor: PropTypes.bool,
  border: PropTypes.bool,
  gradient: PropTypes.string,
};

ColorSwatch.defaultProps = {
  color: null,
  whiteColor: false,
  border: false,
  gradient: null,
};

export default ColorSwatch;
