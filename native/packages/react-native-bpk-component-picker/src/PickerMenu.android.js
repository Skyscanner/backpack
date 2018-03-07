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
import BpkText from 'react-native-bpk-component-text';
import {
  Modal,
  View,
  StyleSheet,
  ListView,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import * as TOKENS from 'bpk-tokens/tokens/base.react.native';

const rowsToDisplay = 6;

const maxListHeight =
  // eslint-disable-next-line no-mixed-operators
  (2 * TOKENS.spacingBase + TOKENS.lineHeightBase) * rowsToDisplay;

const ownStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
  },

  list: {
    backgroundColor: TOKENS.colorWhite,
    borderRadius: TOKENS.borderRadiusSm,
    maxHeight: maxListHeight,
    margin: TOKENS.spacingBase,
    flex: 0,
  },

  listItem: {
    padding: TOKENS.spacingBase,
  },
});

const rowItemPropTypes = PropTypes.shape({
  pickerLabel: PropTypes.string,
  label: PropTypes.string,
});

const ListRow = ({ option, onPress }) => (
  <TouchableNativeFeedback onPress={() => onPress && onPress(option)}>
    <View style={ownStyles.listItem}>
      <BpkText>
        {option.pickerLabel ? option.pickerLabel : option.label}
      </BpkText>
    </View>
  </TouchableNativeFeedback>
);

ListRow.propTypes = {
  option: rowItemPropTypes.isRequired,
  onPress: PropTypes.func.isRequired,
};

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const PickerMenu = ({ visible, options, onChange, onClose }) => {
  const listData = dataSource.cloneWithRows(options);
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <View style={ownStyles.overlay}>
        <ListView
          style={ownStyles.list}
          dataSource={listData}
          renderRow={option => (
            <ListRow
              option={option}
              onPress={item => {
                onChange(options.indexOf(item));
                onClose();
              }}
            />
          )}
        />
      </View>
    </Modal>
  );
};

PickerMenu.defaultProps = {
  visible: false,
  selectedOption: null,
};

PickerMenu.propTypes = {
  visible: PropTypes.bool,
  options: PropTypes.arrayOf(rowItemPropTypes).isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PickerMenu;
