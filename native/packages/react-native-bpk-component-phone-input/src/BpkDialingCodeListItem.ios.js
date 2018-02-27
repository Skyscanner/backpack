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
  spacingBase,
  spacingLg,
  colorBlue600,
  colorGray100,
} from 'bpk-tokens/tokens/base.react.native';
import {
  type ListItemProps,
  LIST_ITEM_PROP_TYPES,
  LIST_ITEM_COMMON_DEFAULT_PROPS,
} from './common-types';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    padding: spacingBase,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginLeft: spacingLg,
  },
  flag: {
    borderColor: colorGray100,
    borderWidth: 1,
    width: spacingLg,
    height: spacingLg / 3 * 2, // 3:2 aspect ratio with width.
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

type Props = {
  ...$Exact<ListItemProps>,
};

/*
This is *not* a functional component for optimisation reasons.
Implementing `shouldComponentUpdate` to only take the `selected`
prop into account allows the `onPress` functionality in long lists
to be much faster.
*/
class BpkDialingCodeListItem extends React.Component<Props> {
  static propTypes = LIST_ITEM_PROP_TYPES;
  static defaultProps = LIST_ITEM_COMMON_DEFAULT_PROPS;

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.selected !== this.props.selected;
  }

  render() {
    const { dialingCode, flag, name, selected, ...rest } = this.props;

    // Add sizing to the flag element. If not defined, fall back to a placeholder.
    const styledFlag = flag ? (
      React.cloneElement(flag, {
        resizeMode: 'contain', // Preserves aspect ratio when resizing.
        style: styles.flag,
      })
    ) : (
      <View style={styles.flag} />
    );

    const iconStyles = [styles.tick];
    if (selected) {
      iconStyles.push(styles.tickVisible);
    }

    return (
      <BpkTouchableOverlay
        accessibilityComponentType="button"
        accessibilityLabel={`${dialingCode} ${name}`}
        accessibilityTraits={['button']}
        style={styles.listItem}
        {...rest}
      >
        <View style={styles.content}>
          {styledFlag}
          <BpkText
            textStyle="lg"
            style={[styles.text, selected ? styles.selected : null]}
          >
            {dialingCode} {name}
          </BpkText>
        </View>
        <BpkIcon small icon={icons.tick} style={iconStyles} />
      </BpkTouchableOverlay>
    );
  }
}

export default BpkDialingCodeListItem;
