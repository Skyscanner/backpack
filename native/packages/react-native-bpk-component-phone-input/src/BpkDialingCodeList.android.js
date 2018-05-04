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
import BpkFlatList, {
  BpkFlatListItem,
  BpkFlatListItemSeparator,
} from 'react-native-bpk-component-flat-list';
import BpkFlag from './BpkFlag';
import {
  type ListCommonProps,
  LIST_COMMON_PROP_TYPES,
  LIST_COMMON_DEFAULT_PROPS,
} from './common-types';

export type Props = {
  ...$Exact<ListCommonProps>,
};

const BpkDialingCodeList = ({
  dialingCodes,
  onItemPress,
  renderFlag,
  selectedId,
}: Props) => (
  <BpkFlatList
    data={dialingCodes}
    renderItem={({ item }) => (
      <BpkFlatListItem
        title={`${item.dialingCode} ${item.name}`}
        selected={selectedId === item.id}
        onPress={() => {
          onItemPress(item);
        }}
        image={<BpkFlag flag={renderFlag(item)} />}
      />
    )}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={BpkFlatListItemSeparator}
    extraData={selectedId}
  />
);

BpkDialingCodeList.propTypes = LIST_COMMON_PROP_TYPES;
BpkDialingCodeList.defaultProps = LIST_COMMON_DEFAULT_PROPS;

export default BpkDialingCodeList;
