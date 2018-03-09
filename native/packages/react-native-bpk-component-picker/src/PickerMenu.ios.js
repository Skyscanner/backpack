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
import {
  Modal,
  Picker,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import BpkButtonLink from 'react-native-bpk-component-button-link';
import {
  colorGray50,
  colorGray200,
  spacingSm,
  spacingMd,
} from 'bpk-tokens/tokens/base.react.native';

const ownStyles = StyleSheet.create({
  dismissOverlay: {
    flex: 1,
  },

  overlay: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colorGray200,
    position: 'absolute',
    bottom: 0,
  },

  overlayHeader: {
    flex: 1,
    paddingVertical: spacingSm * 0.5,
    paddingHorizontal: spacingMd,
    flexDirection: 'row',
    backgroundColor: colorGray50,
    borderTopWidth: 1,
    borderColor: colorGray200,
  },

  spacer: {
    flex: 1,
  },

  spacerSmall: {
    flex: 0,
    padding: spacingSm,
  },
});

const PickerMenu = ({
  visible,
  selectedOption,
  options,
  onChange,
  onPrevItem,
  onNextItem,
  onClose,
  prevLabel,
  nextLabel,
  doneLabel,
}) => (
  <Modal transparent visible={visible} animationType="slide">
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={ownStyles.dismissOverlay} />
    </TouchableWithoutFeedback>
    <View style={ownStyles.overlay}>
      <View style={ownStyles.overlayHeader}>
        <BpkButtonLink title={prevLabel} onPress={() => onPrevItem()} />
        <View style={ownStyles.spacerSmall} />
        <BpkButtonLink title={nextLabel} onPress={() => onNextItem()} />
        <View style={ownStyles.spacer} />
        <BpkButtonLink title={doneLabel} onPress={() => onClose()} />
      </View>
      <Picker
        style={ownStyles.picker}
        selectedValue={selectedOption}
        onValueChange={(itemValue, itemIndex) => onChange(itemIndex)}
      >
        {options.map(option => (
          <Picker.Item
            key={option}
            label={option.pickerLabel ? option.pickerLabel : option.label}
            value={option}
          />
        ))}
      </Picker>
    </View>
  </Modal>
);

PickerMenu.defaultProps = {
  visible: false,
  selectedOption: null,
  prevLabel: 'PREV',
  nextLabel: 'NEXT',
  doneLabel: 'DONE',
};

PickerMenu.propTypes = {
  visible: PropTypes.bool,
  selectedOption: PropTypes.shape({}),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      pickerLabel: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onPrevItem: PropTypes.func.isRequired,
  onNextItem: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  doneLabel: PropTypes.string,
};

export default PickerMenu;
