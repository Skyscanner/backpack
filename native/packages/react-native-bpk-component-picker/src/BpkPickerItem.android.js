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
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import { colorBlue500, spacingBase } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  pickerItem: {
    padding: spacingBase,
  },
  selected: {
    color: colorBlue500,
  },
});

const BpkPickerItem = props => {
  const { value, label, onPress, selected } = props;

  const accessibilityTraits = ['button'];
  if (selected) {
    accessibilityTraits.push('selected');
  }

  return (
    <BpkTouchableNativeFeedback
      onPress={() => onPress && onPress(value)}
      accessibilityComponentType="button"
      accessibilityLabel={label}
      accessibilityTraits={accessibilityTraits}
      borderlessBackground={false}
    >
      <View style={styles.pickerItem}>
        <BpkText style={selected ? styles.selected : {}}>{label}</BpkText>
      </View>
    </BpkTouchableNativeFeedback>
  );
};

BpkPickerItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

BpkPickerItem.defaultProps = {
  selected: false,
  onPress: null,
  value: null,
};

export default BpkPickerItem;
