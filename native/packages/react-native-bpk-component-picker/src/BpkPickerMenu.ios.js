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
import {
  PICKER_MENU_PROP_TYPE,
  PICKER_MENU_DEFAULT_PROPS,
  type PickerMenuProps,
} from './common-types';

const styles = StyleSheet.create({
  dismissOverlay: {
    flex: 1,
  },
  modal: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colorGray200,
    position: 'absolute',
    bottom: 0,
  },
  modalHeader: {
    flex: 1,
    paddingVertical: spacingSm * 0.5,
    paddingHorizontal: spacingMd,
    flexDirection: 'row',
    backgroundColor: colorGray50,
    borderTopWidth: 1,
    borderColor: colorGray200,
    justifyContent: 'flex-end',
  },
});

type Props = {
  ...$Exact<PickerMenuProps>,
  doneLabel: string,
};

const BpkPickerMenu = (props: Props) => {
  const {
    visible,
    selectedValue,
    children,
    onValueChange,
    onClose,
    doneLabel,
  } = props;
  const pickerItems = React.Children.map(children, child =>
    React.cloneElement(child, { key: child.props.value }),
  );
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      transparent
      visible={visible}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.dismissOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <BpkButtonLink title={doneLabel} onPress={onClose} />
        </View>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {pickerItems}
        </Picker>
      </View>
    </Modal>
  );
};

BpkPickerMenu.propTypes = {
  ...PICKER_MENU_PROP_TYPE,
  doneLabel: PropTypes.string.isRequired,
};

BpkPickerMenu.defaultProps = PICKER_MENU_DEFAULT_PROPS;

export default BpkPickerMenu;
