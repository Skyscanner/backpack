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
import React, { Component } from 'react';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import {
  spacingSm,

  colorRed500,
  colorBlue500,
  colorGreen500,
  colorGray100,
  colorGray300,
  colorGray500,
  colorGray700,

  fontFamily,

  textSmFontSize,
  textSmFontWeight,
  textSmLineHeight,

  textBaseFontSize,
  textBaseFontWeight,
  textBaseLineHeight,

  borderSizeSm,

  animationDurationSm,
} from 'bpk-tokens/tokens/base.react.native';
import { View, TextInput, Animated, ViewPropTypes, Platform } from 'react-native';

class BpkTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.animatedValues = {
      isFocused: new Animated.Value(this.isFocusedAnimatedValue()),
      labelPosition: new Animated.Value(this.labelPositionAnimatedValue()),
    };

    this.onClearText = this.onClearText.bind(this);
  }

  componentDidUpdate() {
    Animated.parallel([
      Animated.timing(this.animatedValues.isFocused, {
        toValue: this.isFocusedAnimatedValue(),
        duration: animationDurationSm,
      }),
      Animated.timing(this.animatedValues.labelPosition, {
        toValue: this.labelPositionAnimatedValue(),
        duration: animationDurationSm,
      }),
    ]).start();
  }

  onClearText() {
    this.inputRef.setNativeProps({ text: '' });

    if (this.props.onChangeText) {
      this.props.onChangeText('');
    }
  }

  isFocusedAnimatedValue() {
    return this.state.isFocused ? 1 : 0;
  }

  labelPositionAnimatedValue() {
    const { isFocused } = this.state;
    const { value } = this.props;

    return value || isFocused ? 0 : 1;
  }

  labelColorValue() {
    const { value, valid, disabled } = this.props;

    if (disabled) { return colorGray100; }
    if (!value) { return colorGray300; }

    return valid === false ? colorRed500 : colorGray500;
  }

  underlineColorValue() {
    return this.props.valid === false ? colorRed500 : colorGray100;
  }

  render() {
    const { isFocused } = this.state;
    const {
      label,
      value,
      style: userStyle,
      disabled,
      editable,
      valid,
      onFocus,
      onBlur,
      ...rest
    } = this.props;

    return (
      <View
        style={[
          {
            paddingTop: textSmLineHeight,
          },
          userStyle,
        ]}
      >
        <Animated.Text
          style={{
            position: 'absolute',
            fontFamily,
            color: this.animatedValues.isFocused.interpolate({
              inputRange: [0, 1],
              outputRange: [this.labelColorValue(), colorBlue500],
            }),
            top: this.animatedValues.labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [0, textSmLineHeight + (spacingSm - borderSizeSm)],
            }),
            fontSize: this.animatedValues.labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [textSmFontSize, textBaseFontSize],
            }),
            lineHeight: this.animatedValues.labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [textSmLineHeight, textBaseLineHeight],
            }),
            fontWeight: this.animatedValues.labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [textSmFontWeight, textBaseFontWeight],
            }),
          }}
        >
          {label}
        </Animated.Text>
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: borderSizeSm,
            borderBottomColor: this.animatedValues.isFocused.interpolate({
              inputRange: [0, 1],
              outputRange: [this.underlineColorValue(), colorBlue500],
            }),
          }}
        >
          <TextInput
            value={value || ''}
            style={{
              flex: 1,
              paddingTop: spacingSm,
              paddingRight: 0,
              paddingBottom: spacingSm,
              paddingLeft: 0,
              minHeight: textBaseLineHeight + (spacingSm * 2),
              fontSize: textBaseFontSize,
              fontWeight: textBaseFontWeight,
              lineHeight: textBaseLineHeight,
              color: colorGray700,
              borderBottomWidth: 0,
            }}
            onFocus={() => this.setState(() => ({ isFocused: true }), onFocus)}
            onBlur={() => this.setState(() => ({ isFocused: false }), onBlur)}
            editable={!disabled && editable}
            ref={(ref) => { this.inputRef = ref; }}
            underlineColorAndroid="transparent"
            {...rest}
          />
          {Platform.OS === 'ios' && isFocused ? (
            <BpkTouchableOverlay
              onPress={this.onClearText}
            >
              <BpkIcon
                icon="close-circle"
                small
                style={{
                  color: colorGray300,
                }}
              />
            </BpkTouchableOverlay>
          ) : (
            valid ? (
              <BpkIcon
                icon="tick"
                small
                style={{
                  color: colorGreen500,
                }}
              />
            ) : (
              valid === false && (
                <BpkIcon
                  icon="exclamation-circle"
                  small
                  style={{
                    color: colorRed500,
                  }}
                />
              )
            )
          )}
        </Animated.View>
      </View>
    );
  }
}

BpkTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  disabled: PropTypes.bool,
  editable: PropTypes.bool,
  style: ViewPropTypes.style,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
};

BpkTextInput.defaultProps = {
  valid: null,
  disabled: false,
  editable: true,
  style: null,
  onFocus: null,
  onBlur: null,
  onChangeText: null,
};

export default BpkTextInput;
