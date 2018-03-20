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
import { Modal, View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import {
  borderRadiusSm,
  colorGray900,
  colorWhite,
  lineHeightBase,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

const rowsToDisplay = 6;

const maxListHeight =
  // eslint-disable-next-line no-mixed-operators
  (2 * spacingBase + lineHeightBase) * rowsToDisplay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: setOpacity(colorGray900, 0.8),
    justifyContent: 'center',
  },
  list: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    maxHeight: maxListHeight,
    margin: spacingBase,
    flex: 0,
  },
});

const PickerMenu = props => {
  const { visible, children, onValueChange, onClose, selectedValue } = props;
  const pickerItems = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      selected: selectedValue && selectedValue === child.props.value,
      onPress: value => {
        onValueChange(value, index);
        onClose();
      },
    }),
  );
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.list}>{pickerItems}</ScrollView>
      </View>
    </Modal>
  );
};

PickerMenu.propTypes = {
  visible: PropTypes.bool,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

PickerMenu.defaultProps = {
  visible: false,
  selectedValue: null,
};

export default PickerMenu;
