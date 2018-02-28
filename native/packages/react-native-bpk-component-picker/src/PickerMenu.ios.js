import React from 'react';
import BpkButton from 'react-native-bpk-component-button';
import { Modal, Picker, View, StyleSheet } from 'react-native';
import {
  colorGray50,
  colorGray200,
  colorBlue500,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';

import PropTypes from 'prop-types';

const ownStyles = StyleSheet.create({
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
    paddingHorizontal: spacingSm,
    flexDirection: 'row',
    backgroundColor: colorGray50,
    borderTopWidth: 1,
    borderColor: colorGray200,
  },

  spacer: {
    flex: 1,
  },
});

const overlayButtonStyle = {
  buttonSecondaryBackgroundColor: 'rgba(0,0,0,0)',
  buttonSecondaryBorderColor: 'rgba(0,0,0,0)',
  buttonSecondaryTextColor: colorBlue500,
};

const PickerMenu = ({
  visible,
  selectedOption,
  options,
  onChange,
  onPrevItem,
  onNextItem,
  onClose,
}) => (
  <Modal transparent visible={visible} animationType="slide">
    <View style={ownStyles.overlay}>
      <View style={ownStyles.overlayHeader}>
        <BpkButton
          title="Previous"
          type="secondary"
          theme={overlayButtonStyle}
          onPress={() => onPrevItem()}
        />
        <BpkButton
          title="Next"
          type="secondary"
          theme={overlayButtonStyle}
          onPress={() => onNextItem()}
        />
        <View style={ownStyles.spacer} />
        <BpkButton
          title="Done"
          type="secondary"
          theme={overlayButtonStyle}
          onPress={() => onClose()}
        />
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
};

export default PickerMenu;
