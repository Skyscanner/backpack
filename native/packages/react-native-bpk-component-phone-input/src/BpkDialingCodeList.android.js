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

import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { spacingMd, colorGray100 } from 'bpk-tokens/tokens/base.react.native';
import BpkDialingCodeListItem from './BpkDialingCodeListItem';
import {
  type ListCommonProps,
  LIST_COMMON_PROP_TYPES,
  LIST_COMMON_DEFAULT_PROPS,
} from './common-types';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: colorGray100,
    marginHorizontal: spacingMd,
  },
});

export type Props = {
  ...$Exact<ListCommonProps>,
};

const BpkDialingCodeList = ({
  codes,
  onItemPress,
  renderFlag,
  selectedId,
}: Props) => (
  <FlatList
    data={codes}
    renderItem={({ item }) => (
      <BpkDialingCodeListItem
        {...item}
        selected={selectedId === item.id}
        onPress={() => {
          onItemPress(item);
        }}
        flag={renderFlag(item)}
      />
    )}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

BpkDialingCodeList.propTypes = LIST_COMMON_PROP_TYPES;
BpkDialingCodeList.defaultProps = LIST_COMMON_DEFAULT_PROPS;

export default BpkDialingCodeList;
