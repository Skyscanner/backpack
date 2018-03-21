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
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { setOpacity } from 'bpk-tokens';
import {
  borderRadiusSm,
  colorGray900,
  colorWhite,
  lineHeightBase,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import BpkPickerItem from './BpkPickerItem';
import {
  PICKER_MENU_PROP_TYPE,
  PICKER_MENU_DEFAULT_PROPS,
  type PickerMenuProps,
} from './common-types';

const MAX_ROWS_TO_DISPLAY = 6;

const styles = StyleSheet.create({
  overlay: {
    left: 0,
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: setOpacity(colorGray900, 0.8),
  },
  list: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    alignSelf: 'center',
    top: '50%',
    width: '90%',
    elevation: 5,
  },
});

const BpkPickerMenu = (props: PickerMenuProps) => {
  const { visible, children, onValueChange, onClose, selectedValue } = props;

  // Instead of passing children through, we have to turn them into a data structure
  // in order to pass them to FlatList.
  let initialScrollIndex = 0;
  const pickerItems = React.Children.map(children, (child, index) => {
    const { label, value } = child.props;

    let selected = false;
    if (selectedValue && selectedValue === value) {
      selected = true;

      // If selected item will be off-screen, set initialScrollIndex. -2 is so it
      // appears nearer to the middle of the list.
      if (index >= MAX_ROWS_TO_DISPLAY) {
        initialScrollIndex = index - 2;
      }
    }
    return { index, label, value, selected };
  });

  const rowsToDisplay =
    pickerItems.length > MAX_ROWS_TO_DISPLAY
      ? MAX_ROWS_TO_DISPLAY
      : pickerItems.length;
  const heightOfOneItem = spacingBase * 2 + lineHeightBase;
  const maxListHeight = heightOfOneItem * rowsToDisplay;

  const listStyle = [styles.list];

  // To vertically centre the list, as we can't currently do this with Flexbox.
  listStyle.push({
    maxHeight: maxListHeight,
    marginTop: -(maxListHeight / 2),
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <FlatList
        data={pickerItems}
        getItemLayout={(data, index) => ({
          offset: heightOfOneItem * index,
          length: heightOfOneItem,
          index,
        })}
        initialScrollIndex={initialScrollIndex}
        initialNumToRender={MAX_ROWS_TO_DISPLAY}
        keyExtractor={item => item.index}
        renderItem={({ item }) => {
          const { index } = item;
          return (
            <BpkPickerItem
              {...item}
              onPress={value => {
                onValueChange(value, index);
                onClose();
              }}
            />
          );
        }}
        style={listStyle}
      />
    </Modal>
  );
};

BpkPickerMenu.propTypes = PICKER_MENU_PROP_TYPE;
BpkPickerMenu.defaultProps = PICKER_MENU_DEFAULT_PROPS;

export default BpkPickerMenu;
