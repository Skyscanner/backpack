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
import Slider from 'react-slider';
import { cssModules } from 'bpk-react-utils';
import React from 'react';

import STYLES from './bpk-slider.scss';

const getClassName = cssModules(STYLES);

const BpkSlider = (props) => {
  const {
    min,
    max,
    value,
    step,
    large,
    minDistance,
    className,
    onChange,
    onAfterChange,
  } = props;

  const sliderClass = [getClassName('bpk-slider')];
  const handleClass = [getClassName('bpk-slider__handle')];
  const barClass = [getClassName('bpk-slider__bar')];

  if (value.length) { sliderClass.push(getClassName('bpk-slider--range')); }
  if (className) { sliderClass.push(getClassName(className)); }
  if (large) { handleClass.push(getClassName('bpk-slider__handle--large')); }

  return (
    <Slider
      max={max}
      min={min}
      step={step}
      value={value}
      minDistance={minDistance}
      withBars
      className={sliderClass.join(' ')}
      handleClassName={handleClass.join(' ')}
      handleActiveClassName={getClassName('bpk-slider__handle--active')}
      barClassName={barClass.join(' ')}
      onChange={onChange}
      onAfterChange={onAfterChange}
    />
  );
};

BpkSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]).isRequired,
  minDistance: PropTypes.number,
  step: PropTypes.number,
  className: PropTypes.string,
  large: PropTypes.bool,
  onChange: PropTypes.func,
  onAfterChange: PropTypes.func,
};

BpkSlider.defaultProps = {
  step: 1,
  minDistance: 1,
  className: null,
  large: false,
  onChange: null,
  onAfterChange: null,
};

export default BpkSlider;
