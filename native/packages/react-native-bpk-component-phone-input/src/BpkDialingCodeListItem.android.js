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

import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import BpkText from 'react-native-bpk-component-text';
import {
  spacingMd,
  spacingBase,
  spacingLg,
  colorBlue500,
  colorGray100,
} from 'bpk-tokens/tokens/base.react.native';
import BpkFlag from './BpkFlag';
import BpkRadioIcon from './BpkRadioIcon';
import {
  type ListItemProps,
  LIST_ITEM_PROP_TYPES,
  LIST_ITEM_COMMON_DEFAULT_PROPS,
} from './common-types';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacingMd,
    paddingVertical: spacingBase,
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

    const iconStyles = [styles.tick];
    if (selected) {
      iconStyles.push(styles.tickSelected);
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        accessibilityComponentType="button"
        accessibilityLabel={`${dialingCode} ${name}`}
        accessibilityTraits={['button']}
        {...rest}
      >
        <View style={styles.listItem}>
          <View style={styles.content}>
            <BpkFlag image={flag} />
            <BpkText
              textStyle="base"
              style={[styles.text, selected ? styles.selected : null]}
            >
              {dialingCode} {name}
            </BpkText>
          </View>
          <BpkRadioIcon selected={selected} />
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default BpkDialingCodeListItem;
