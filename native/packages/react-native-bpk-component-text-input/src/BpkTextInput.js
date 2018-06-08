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

import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import {
  Animated,
  type AnimatedValue,
  TextInput,
  View,
  ViewPropTypes,
} from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';
import { ValidIcon, InvalidIcon } from './BpkTextInputIcons';
import { getLabelStyle, getInputContainerStyle, styles } from './styles';

export type Props = {
  label: string,
  value: string,
  clearButtonMode: 'never' | 'while-editing' | 'unless-editing' | 'always',
  editable: boolean,
  description: ?string,
  inputRef: ?(Node) => void,
  onBlur: ?() => void,
  onFocus: ?() => void,
  placeholder: ?string,
  style: ?(Object | Array<Object>),
  valid: ?boolean,
  validationMessage: ?string,
  accessoryView: ?Node,
};

type State = {
  isFocused: boolean,
};

class BpkTextInput extends Component<Props, State> {
  animatedValues: { color: AnimatedValue, labelPosition: AnimatedValue };

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    clearButtonMode: TextInput.propTypes.clearButtonMode,
    description: PropTypes.string,
    editable: PropTypes.bool,
    inputRef: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    style: ViewPropTypes.style,
    valid: PropTypes.oneOf([true, false, null]),
    validationMessage: PropTypes.string,
    accessoryView: PropTypes.node,
  };

  static defaultProps = {
    clearButtonMode: 'while-editing',
    description: null,
    editable: true,
    inputRef: null,
    onBlur: null,
    onFocus: null,
    placeholder: null,
    style: null,
    valid: null,
    validationMessage: null,
    accessoryView: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.animatedValues = {
      color: new Animated.Value(this.getColorAnimatedValue()),
      labelPosition: new Animated.Value(this.getLabelPositionAnimatedValue()),
    };
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

  onFocus = () => {
    this.setState(
      () => ({ isFocused: true }),
      () => {
        if (this.props.onFocus) {
          this.props.onFocus();
        }
      },
    );
  };

  onBlur = () => {
    this.setState(
      () => ({ isFocused: false }),
      () => {
        if (this.props.onBlur) {
          this.props.onBlur();
        }
      },
    );
  };

  getColorAnimatedValue() {
    return this.state.isFocused ? 1 : 0;
  }

  getLabelPositionAnimatedValue() {
    return this.props.value || this.state.isFocused ? 0 : 1;
  }

  render() {
    const { isFocused } = this.state;
    const {
      description,
      inputRef,
      placeholder,
      validationMessage,
      editable,
      label,
      value,
      style: userStyle,
      valid,
      onFocus,
      onBlur,
      accessoryView,
      ...rest
    } = this.props;
    const hasAccessoryView = accessoryView !== null;
    const placeholderValue = isFocused || hasAccessoryView ? placeholder : null;

    const validityIcon = valid ? (
      <ValidIcon />
    ) : (
      valid === false && <InvalidIcon />
    );

    const animatedLabelStyle = getLabelStyle(
      this.animatedValues.color,
      this.animatedValues.labelPosition,
      { value, valid, editable, hasAccessoryView },
    );

    const animatedInputStyle = getInputContainerStyle(
      this.animatedValues.color,
      hasAccessoryView,
      valid,
    );

    const renderExtraInfo = () => {
      if (valid === false && validationMessage) {
        return (
          <BpkText textStyle="xs" style={styles.validationMessage}>
            {validationMessage}
          </BpkText>
        );
      }
      if (description) {
        return (
          <BpkText textStyle="xs" style={styles.description}>
            {description}
          </BpkText>
        );
      }
      return null;
    };

    return (
      <View style={[styles.container, userStyle]}>
        <View style={styles.rowContainer}>
          <Animated.Text style={animatedLabelStyle}>{label}</Animated.Text>
          {accessoryView}
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
              placeholder={placeholderValue}
            />
            {!isFocused && validityIcon}
          </Animated.View>
        </View>
        {renderExtraInfo()}
      </View>
    );
  }
}

export default BpkTextInput;
