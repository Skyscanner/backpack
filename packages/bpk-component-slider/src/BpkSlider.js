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
import Slider from 'react-slider';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-slider.css';

const getClassName = cssModules(STYLES);

const getScriptDirection = () => {
  if (typeof document === 'undefined') {
    return null;
  }
  const html = document.querySelector('html');
  return window.getComputedStyle(html, null).getPropertyValue('direction');
};

const BpkSlider = props => {
  const { large, className, ...rest } = props;
  const invert = getScriptDirection() === 'rtl';
  const classNames = [getClassName('bpk-slider')];
  const handleClassNames = [getClassName('bpk-slider__handle')];
  const barClassNames = [getClassName('bpk-slider__bar')];

  const isRange = (rest.value || rest.defaultValue || []).length > 1;

  if (isRange) {
    classNames.push(getClassName('bpk-slider--range'));
  }
  if (className) {
    classNames.push(getClassName(className));
  }
  if (large) {
    classNames.push(getClassName('bpk-slider--large'));
    handleClassNames.push(getClassName('bpk-slider__handle--large'));
  }

  return (
    <Slider
      {...rest}
      withBars
      invert={invert}
      className={classNames.join(' ')}
      handleClassName={handleClassNames.join(' ')}
      handleActiveClassName={getClassName('bpk-slider__handle--active')}
      barClassName={barClassNames.join(' ')}
    />
  );
};

BpkSlider.propTypes = {
  className: PropTypes.string,
  large: PropTypes.bool,
};

BpkSlider.defaultProps = {
  className: null,
  large: false,
};

export default BpkSlider;
