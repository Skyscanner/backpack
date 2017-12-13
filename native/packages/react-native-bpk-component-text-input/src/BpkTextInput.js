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
import {
  Animated,
  TextInput,
  View,
  ViewPropTypes,
} from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';
import { ValidIcon, InvalidIcon } from './BpkTextInputIcons';
import { getLabelStyle, getInputContainerStyle, styles } from './styles';

class BpkTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.animatedValues = {
      color: new Animated.Value(this.getColorAnimatedValue()),
      labelPosition: new Animated.Value(this.getLabelPositionAnimatedValue()),
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidUpdate() {
    Animated.parallel([
      Animated.timing(this.animatedValues.color, {
        toValue: this.getColorAnimatedValue(),
        duration: animationDurationSm,
      }),
      Animated.timing(this.animatedValues.labelPosition, {
        toValue: this.getLabelPositionAnimatedValue(),
        duration: animationDurationSm,
      }),
    ]).start();
  }

  onFocus() {
    this.setState(() => ({ isFocused: true }), this.props.onFocus);
  }

  onBlur() {
    this.setState(() => ({ isFocused: false }), this.props.onBlur);
  }

  getColorAnimatedValue() {
    return this.state.isFocused ? 1 : 0;
  }

  getLabelPositionAnimatedValue() {
    return (this.props.value || this.state.isFocused) ? 0 : 1;
  }

  render() {
    const { isFocused } = this.state;
    const {
      inputRef,
      validationMessage,
      editable,
      label,
      value,
      style: userStyle,
      valid,
      onFocus,
      onBlur,
      ...rest
    } = this.props;

    const validityIcon = valid ? <ValidIcon /> : (valid === false && <InvalidIcon />);

    const animatedLabelStyle = getLabelStyle(
      this.animatedValues.color,
      this.animatedValues.labelPosition,
      { value, valid, editable },
    );

    const animatedInputStyle = getInputContainerStyle(this.animatedValues.color, valid);

    return (
      <View style={[styles.container, userStyle]}>
        <Animated.Text style={animatedLabelStyle}>{label}</Animated.Text>
        <Animated.View style={animatedInputStyle}>
          <TextInput
            editable={editable}
            value={value || ''}
            style={styles.input}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            ref={inputRef}
            underlineColorAndroid="transparent"
            {...rest}
            placeholder={null} // Override any placeholders passed in by users.
          />
          { !isFocused && validityIcon }
        </Animated.View>
        { valid === false && validationMessage && (
          <BpkText textStyle="xs" style={styles.validationMessage}>
            {validationMessage}
          </BpkText>
        )}
      </View>
    );
  }
}

BpkTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  clearButtonMode: TextInput.propTypes.clearButtonMode,
  inputRef: PropTypes.func,
  validationMessage: PropTypes.string,
  valid: PropTypes.oneOf(true, false, null),
  editable: PropTypes.bool,
  style: ViewPropTypes.style,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

BpkTextInput.defaultProps = {
  clearButtonMode: 'while-editing',
  inputRef: null,
  validationMessage: null,
  valid: null,
  editable: true,
  style: null,
  onFocus: null,
  onBlur: null,
};

export default BpkTextInput;
