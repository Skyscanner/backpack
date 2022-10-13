/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { cssModules, isRTL } from '../../bpk-react-utils';

import STYLES from './BpkSlider.module.scss';

const getClassName = cssModules(STYLES);

const BpkSlider = (props) => {
  const { className, large, ...rest } = props;
  const invert = isRTL();
  const classNames = [getClassName('bpk-slider')];
  const thumbClassNames = [getClassName('bpk-slider__handle')];
  const trackClassNames = [getClassName('bpk-slider__bar')];

  const isRange = (rest.value || rest.defaultValue || []).length > 1;

  if (isRange) {
    classNames.push(getClassName('bpk-slider--range'));
  }
  if (className) {
    classNames.push(getClassName(className));
  }
  if (large) {
    classNames.push(getClassName('bpk-slider--large'));
    thumbClassNames.push(getClassName('bpk-slider__handle--large'));
  }

  return (
    <Slider
      {...rest}
      withTracks
      invert={invert}
      className={classNames.join(' ')}
      thumbClassName={thumbClassNames.join(' ')}
      thumbActiveClassName={getClassName('bpk-slider__handle--active')}
      trackClassName={trackClassNames.join(' ')}
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
