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
/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {
  type Element,
  Platform,
  TouchableNativeFeedback,
  ViewPropTypes,
} from 'react-native';

type Props = {
  children: Element,
  borderlessBackground: boolean,
  color: ?string,
  style: ?(Object | Array<Object>),
};

const BpkTouchableNativeFeedback = (props: Props) => {
  const { children, style, borderlessBackground, color, ...rest } = props;
  const preLollipop = Platform.Version < 21;
  let background = TouchableNativeFeedback.SelectableBackground();

  if (!preLollipop && borderlessBackground) {
    if (color) {
      background = TouchableNativeFeedback.Ripple(color, true);
    } else {
      background = TouchableNativeFeedback.SelectableBackgroundBorderless();
    }
  }

  return (
    <TouchableNativeFeedback style={style} background={background} {...rest}>
      {React.Children.only(children)}
    </TouchableNativeFeedback>
  );
};

BpkTouchableNativeFeedback.propTypes = {
  children: PropTypes.element.isRequired,
  borderlessBackground: PropTypes.bool,
  color: PropTypes.string,
  style: ViewPropTypes.style,
};

BpkTouchableNativeFeedback.defaultProps = {
  borderlessBackground: true,
  color: null,
  style: null,
};

export default BpkTouchableNativeFeedback;
