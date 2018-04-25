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
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import {
  spacingBase,
  colorBlue500,
  colorGray100,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';
import BpkRadioIcon from './BpkRadioIcon.android';
import BpkListItemImage from './BpkListItemImage';
import {
  type ListItemProps,
  LIST_ITEM_PROP_TYPES,
  LIST_ITEM_DEFAULT_PROPS,
} from './common-types';

const ANDROID_LIST_ITEM_HEIGHT = 48;
const ANDROID_LIST_ITEM_IMAGE_MARGIN = 32;

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: spacingBase,
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ANDROID_LIST_ITEM_HEIGHT,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colorGray700,
    flex: 1,
  },
  image: {
    marginRight: ANDROID_LIST_ITEM_IMAGE_MARGIN,
  },
  selected: {
    color: colorBlue500,
  },
  tick: {
    color: colorGray100,
  },
  tickSelected: {
    color: colorBlue500,
  },
});

const BpkSectionListItem = (props: ListItemProps) => {
  const { image, title, selected, ...rest } = props;

  const iconStyles = [styles.tick];
  if (selected) {
    iconStyles.push(styles.tickSelected);
  }

  return (
    <BpkTouchableNativeFeedback
      borderlessBackground={false}
      accessibilityComponentType="button"
      accessibilityLabel={title}
      accessibilityTraits={['button']}
      {...rest}
    >
      <View style={styles.listItem}>
        <View style={styles.content}>
          {image && <BpkListItemImage image={image} style={styles.image} />}
          <BpkText
            textStyle="base"
            style={[styles.text, selected ? styles.selected : null]}
          >
            {title}
          </BpkText>
        </View>
        <BpkRadioIcon selected={selected} />
      </View>
    </BpkTouchableNativeFeedback>
  );
};

BpkSectionListItem.propTypes = LIST_ITEM_PROP_TYPES;
BpkSectionListItem.defaultProps = LIST_ITEM_DEFAULT_PROPS;

export default BpkSectionListItem;
