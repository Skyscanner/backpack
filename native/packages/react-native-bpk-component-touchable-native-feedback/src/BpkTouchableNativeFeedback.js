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
import { ViewPropTypes, TouchableNativeFeedback, Platform } from 'react-native';

const BpkTouchableNativeFeedback = props => {
  const { children, style, ...rest } = props;
  const preLollipop = Platform.Version < 21;

  return (
    <TouchableNativeFeedback
      style={style}
      background={
        preLollipop
          ? TouchableNativeFeedback.SelectableBackground()
          : TouchableNativeFeedback.SelectableBackgroundBorderless()
      }
      {...rest}
    >
      {React.Children.only(children)}
    </TouchableNativeFeedback>
  );
};

BpkTouchableNativeFeedback.propTypes = {
  children: PropTypes.element.isRequired,
  style: ViewPropTypes.style,
};

BpkTouchableNativeFeedback.defaultProps = {
  style: null,
};

export default BpkTouchableNativeFeedback;
