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
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';
import { Animated, TouchableOpacity, View } from 'react-native';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';

import { propTypes, defaultProps } from './propTypes';
import { getInputContainerStyle, getLabelStyle, styles } from './styles';
import PickerMenu from './PickerMenu';

class BpkPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };

    this.animatedValues = {
      color: new Animated.Value(this.getColorAnimatedValue()),
      labelPosition: new Animated.Value(this.getLabelPositionAnimatedValue()),
    };
  }

  componentDidMount() {
    this.props.ref(this);
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

  onSelectedItemChange(itemIndex) {
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(this.props.options[itemIndex]);
    }
  }

  getColorAnimatedValue() {
    return this.state.modalVisible ? 1 : 0;
  }

  getLabelPositionAnimatedValue() {
    return this.props.selectedOption ? 0 : 1;
  }

  getSelectedOption() {
    return this.props.options.find(
      option =>
        option.value === this.props.selectedOption ||
        (this.props.selectedOption &&
          option.value === this.props.selectedOption.value),
    );
  }

  focus() {
    this.showMenu();
  }

  showMenu() {
    if (!this.props.selectedOption && this.props.onSelectionChange) {
      this.props.onSelectionChange(this.props.options[0]);
    }
    this.setState({
      modalVisible: true,
    });
    this.props.onFocus();
  }

  hideMenu() {
    this.setState({
      modalVisible: false,
    });
    this.props.onBlur();
  }

  selectItem(delta) {
    if (!this.props.onSelectionChange) {
      return;
    }
    const { options } = this.props;
    const selectedOption = this.getSelectedOption();
    const itemIndex = Math.min(
      Math.max(options.indexOf(selectedOption) + delta, 0),
      options.length - 1,
    );
    this.props.onSelectionChange(options[itemIndex]);
  }

  render() {
    const { valid, validationMessage, style, label, options } = this.props;

    const buttonLabels = {
      prevLabel: this.props.prevLabel,
      nextLabel: this.props.nextLabel,
      doneLabel: this.props.doneLabel,
    };

    const selectedOption = this.getSelectedOption();
    const labelText = selectedOption ? selectedOption.label : ' ';
    const hintText =
      selectedOption && selectedOption.hint ? selectedOption.hint : null;

    const animatedLabelStyle = getLabelStyle(
      this.animatedValues.color,
      this.animatedValues.labelPosition,
      { value: selectedOption, valid },
    );

    const animatedInputStyle = getInputContainerStyle(
      this.animatedValues.color,
      valid,
    );

    return (
      <View style={[styles.containerStyle, style]}>
        <TouchableOpacity
          onPress={() => {
            this.showMenu();
          }}
        >
          <Animated.Text style={animatedLabelStyle}>{label}</Animated.Text>
          <Animated.View style={[animatedInputStyle, styles.container]}>
            <BpkText style={styles.valueText}>{labelText}</BpkText>
            {hintText ? (
              <BpkText style={styles.hintText} textStyle="sm">
                {hintText}
              </BpkText>
            ) : null}
            <BpkIcon icon="arrow-down" small />
          </Animated.View>
          {valid === false &&
            !!validationMessage && (
              <BpkText textStyle="xs" style={styles.validationMessage}>
                {validationMessage}
              </BpkText>
            )}
        </TouchableOpacity>
        <PickerMenu
          visible={this.state.modalVisible}
          selectedOption={selectedOption}
          options={options}
          onPrevItem={() => this.selectItem(-1)}
          onNextItem={() => this.selectItem(+1)}
          onClose={() => this.hideMenu()}
          onChange={itemIndex => this.onSelectedItemChange(itemIndex)}
          {...buttonLabels}
        />
      </View>
    );
  }
}

BpkPicker.defaultProps = defaultProps;

BpkPicker.propTypes = propTypes;

export default BpkPicker;
