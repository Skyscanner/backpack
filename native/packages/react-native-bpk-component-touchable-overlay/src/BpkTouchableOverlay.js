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
import PropTypes from 'prop-types';
import { View, ViewPropTypes, TouchableWithoutFeedback, Platform, StyleSheet } from 'react-native';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: tokens.touchableOverlayColor,
    opacity: 0,
  },
  showOverlay: {
    opacity: tokens.touchableOverlayOpacity,
  },
});

const BpkTouchableOverlay = (props) => {
  const {
    children,
    style,
    onPressIn,
    onPressOut,
    ...rest
  } = props;

  let overlayRef = null;

  return (
    <TouchableWithoutFeedback
      {...rest}
      onPressIn={() => {
        overlayRef.setNativeProps({ style: [styles.overlay, styles.showOverlay] });
        if (onPressIn) { onPressIn(); }
      }}
      onPressOut={() => {
        overlayRef.setNativeProps({ style: [styles.overlay] });
        if (onPressOut) { onPressOut(); }
      }}
    >
      <View style={style}>
        {children}
        <View
          style={styles.overlay}
          ref={(ref) => { overlayRef = ref; }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

BpkTouchableOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
};

BpkTouchableOverlay.defaultProps = {
  style: null,
  onPressIn: null,
  onPressOut: null,
};

export default BpkTouchableOverlay;
