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

import React from 'react';
import {
  Animated,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from 'react-native-bpk-theming';
import { colorBlue700, borderSizeLg } from 'bpk-tokens/tokens/base.react.native';

import { THEMING_ATTRIBUTE, themePropType } from './theming';


const styles = StyleSheet.create({
  selectedIndicator: {
    backgroundColor: colorBlue700,
    height: borderSizeLg,
  },
});

const BpkHorizontalNavSelectedIndicator = (props) => {
  const { theme, xOffset, width } = props;
  const style = [styles.selectedIndicator];
  if (theme && theme[THEMING_ATTRIBUTE]) { style.push({ backgroundColor: theme[THEMING_ATTRIBUTE] }); }
  const animationStyles = {
    transform: [{
      translateX: xOffset,
    }],
    width,
  };
  return <Animated.View style={[style, animationStyles]} />;
};

const propTypes = {
  theme: themePropType,
  xOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Object)]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Object)]).isRequired,
};

BpkHorizontalNavSelectedIndicator.propTypes = propTypes;

BpkHorizontalNavSelectedIndicator.defaultProps = {
  theme: null,
};

export default withTheme(BpkHorizontalNavSelectedIndicator);
export {
  propTypes,
};
