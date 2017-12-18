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
import {
  borderRadiusSm,
  borderRadiusPill,
  touchableOverlayColor,
  touchableOverlayOpacity,
} from 'bpk-tokens/tokens/base.react.native';
import {
  View,
  ViewPropTypes,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: touchableOverlayColor,
    opacity: 0,
  },
  overlayBorderRadiusSm: {
    borderRadius: borderRadiusSm,
  },
  overlayBorderRadiusPill: {
    borderRadius: borderRadiusPill,
  },
  overlayShow: {
    opacity: touchableOverlayOpacity,
  },
});

const BpkTouchableOverlay = props => {
  const {
    children,
    borderRadius,
    style,
    overlayStyle,
    onPressIn,
    onPressOut,
    ...rest
  } = props;

  let overlayRef = null;

  const overlayStyles = [styles.overlay];
  if (borderRadius === 'sm') {
    overlayStyles.push(styles.overlayBorderRadiusSm);
  }
  if (borderRadius === 'pill') {
    overlayStyles.push(styles.overlayBorderRadiusPill);
  }
  if (overlayStyle) {
    overlayStyles.push(overlayStyle);
  }

  return (
    <TouchableWithoutFeedback
      {...rest}
      onPressIn={() => {
        overlayRef.setNativeProps({
          style: [styles.overlay, styles.overlayShow],
        });
        if (onPressIn) {
          onPressIn();
        }
      }}
      onPressOut={() => {
        overlayRef.setNativeProps({ style: [styles.overlay] });
        if (onPressOut) {
          onPressOut();
        }
      }}
    >
      <View style={style}>
        {children}
        <View
          style={overlayStyles}
          ref={ref => {
            overlayRef = ref;
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

BpkTouchableOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  borderRadius: PropTypes.oneOf(['sm', 'pill']),
  style: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
};

BpkTouchableOverlay.defaultProps = {
  borderRadius: null,
  style: null,
  overlayStyle: null,
  onPressIn: null,
  onPressOut: null,
};

export default BpkTouchableOverlay;
