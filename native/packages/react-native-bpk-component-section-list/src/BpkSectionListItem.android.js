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
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';
import BpkRadioIcon from './BpkRadioIcon.android';
import {
  type ListItemProps,
  LIST_ITEM_PROP_TYPES,
  LIST_ITEM_DEFAULT_PROPS,
} from './common-types';

const ANDROID_LIST_ITEM_HEIGHT = 48;
const ANDROID_LIST_ITEM_IMAGE_MARGIN = 32;

const styles = StyleSheet.create({
  outer: {
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
  textSelected: {
    color: colorBlue500,
  },
  image: {
    marginRight: ANDROID_LIST_ITEM_IMAGE_MARGIN,
  },
});

class BpkSectionListItem extends React.Component<ListItemProps> {
  static propTypes = LIST_ITEM_PROP_TYPES;
  static defaultProps = LIST_ITEM_DEFAULT_PROPS;

  // Compare only primitive props (not onPress) to help performance.
  shouldComponentUpdate(nextProps: ListItemProps) {
    return (
      nextProps.selected !== this.props.selected ||
      nextProps.title !== this.props.title ||
      nextProps.image !== this.props.image
    );
  }

  render() {
    const { image, title, selected, ...rest } = this.props;

    const styledImage = image
      ? React.cloneElement(image, { style: [image.props.style, styles.image] })
      : null;

    return (
      <BpkTouchableNativeFeedback
        borderlessBackground={false}
        accessibilityComponentType="button"
        accessibilityLabel={title}
        accessibilityTraits={['button']}
        {...rest}
      >
        <View style={styles.outer}>
          <View style={styles.content}>
            {styledImage}
            <BpkText
              textStyle="base"
              style={[styles.text, selected ? styles.textSelected : null]}
            >
              {title}
            </BpkText>
          </View>
          <BpkRadioIcon selected={selected} />
        </View>
      </BpkTouchableNativeFeedback>
    );
  }
}

export default BpkSectionListItem;
