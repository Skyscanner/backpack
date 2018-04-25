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

import { View, StyleSheet } from 'react-native';
import React from 'react';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import {
  spacingMd,
  spacingBase,
  spacingLg,
  colorBlue600,
} from 'bpk-tokens/tokens/base.react.native';
import BpkListItemImage from './BpkListItemImage';
import {
  type ListItemProps,
  LIST_ITEM_PROP_TYPES,
  LIST_ITEM_DEFAULT_PROPS,
} from './common-types';

const IOS_CELL_HEIGHT = 44;

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacingBase,
    paddingVertical: spacingMd,
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: IOS_CELL_HEIGHT,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  image: {
    marginRight: spacingLg,
  },
  selected: {
    color: colorBlue600,
  },
  tick: {
    color: colorBlue600,
    opacity: 0,
  },
  tickVisible: {
    opacity: 1,
  },
});

const BpkSectionListItem = (props: ListItemProps) => {
  const { image, title, selected, ...rest } = props;
  const iconStyles = [styles.tick];
  if (selected) {
    iconStyles.push(styles.tickVisible);
  }

  return (
    <BpkTouchableOverlay
      accessibilityComponentType="button"
      accessibilityLabel={title}
      accessibilityTraits={['button']}
      style={styles.listItem}
      {...rest}
    >
      <View style={styles.content}>
        {image && <BpkListItemImage image={image} style={styles.image} />}
        <BpkText
          textStyle="lg"
          style={[styles.text, selected ? styles.selected : null]}
        >
          {title}
        </BpkText>
      </View>
      <BpkIcon small icon={icons.tick} style={iconStyles} />
    </BpkTouchableOverlay>
  );
};

BpkSectionListItem.propTypes = LIST_ITEM_PROP_TYPES;
BpkSectionListItem.defaultProps = LIST_ITEM_DEFAULT_PROPS;

export default BpkSectionListItem;
