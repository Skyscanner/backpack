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

import { View, StyleSheet, SectionList } from 'react-native';
import React from 'react';
import { groupBy } from 'lodash';
import BpkText from 'react-native-bpk-component-text';
import {
  colorGray50,
  colorGray100,
  spacingSm,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import BpkDialingCodeListItem from './BpkDialingCodeListItem';
import {
  type ListCommonProps,
  LIST_COMMON_PROP_TYPES,
  LIST_COMMON_DEFAULT_PROPS,
} from './common-types';

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: spacingSm,
    paddingHorizontal: spacingBase,
    backgroundColor: colorGray50,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: colorGray100,
    marginLeft: spacingBase,
  },
});

/*
Takes data in the format:
[
  {name: 'Foo'},
  {name: 'Bar'},
  {name: 'Baz'},
]

and returns:
[
  {
    title: 'F',
    data: [{name: 'Foo'}],
  },
  {
    title: 'B',
    data: [{name: 'Bar'}, {name: 'Baz'}],
  },
]
*/
const convertCodesIntoSections = data => {
  const alphabetisedList = groupBy(data, x => x.name[0].toLowerCase());
  return Object.keys(alphabetisedList).map(letter => ({
    title: letter.toUpperCase(),
    data: alphabetisedList[letter],
  }));
};

export type Props = {
  ...$Exact<ListCommonProps>,
};

const BpkDialingCodeList = ({
  codes,
  onItemPress,
  renderFlag,
  selectedId,
}: Props) => (
  <SectionList
    sections={convertCodesIntoSections(codes)}
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
    renderSectionHeader={({ section }) => (
      <BpkText emphasize textStyle="lg" style={styles.sectionHeader}>
        {section.title}
      </BpkText>
    )}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

BpkDialingCodeList.propTypes = LIST_COMMON_PROP_TYPES;
BpkDialingCodeList.defaultProps = LIST_COMMON_DEFAULT_PROPS;

export default BpkDialingCodeList;
