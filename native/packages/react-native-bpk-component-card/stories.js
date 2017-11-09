/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { storiesOf, action } from '@storybook/react-native';

import BpkCard from './index';

const content = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
    et magnis dis parturient montes, nascetur ridiculus mus.
  </BpkText>
);

const onPress = action('Card press');

const styles = StyleSheet.create({
  cardListScrollView: {
    overflow: 'visible',
  },
  cardListItem: {
    marginTop: 20,
  },
});

storiesOf('BpkCard', module)
  .add('docs:default', () => (
    <BpkCard onPress={onPress}>{content}</BpkCard>
  ))
  .add('docs:without-padding', () => (
    <BpkCard onPress={onPress} padded={false}>{content}</BpkCard>
  ))
  .add('docs:focused', () => (
    <BpkCard onPress={onPress} focused>{content}</BpkCard>
  ))
  .add('All Cards', () => (
    <ScrollView style={styles.cardListScrollView}>
      <BpkCard
        onPress={onPress}
        accessibilityLabel="Example Card"
        style={styles.cardListItem}
      >
        {content}
      </BpkCard>
      <BpkCard
        onPress={onPress}
        accessibilityLabel="Example Card"
        style={styles.cardListItem}
        padded={false}
      >
        {content}
      </BpkCard>
      <BpkCard
        onPress={onPress}
        accessibilityLabel="Example Card"
        style={styles.cardListItem}
        focused
      >
        {content}
      </BpkCard>
    </ScrollView>
  ))
  .add('Card list (perf)', () => (
    <ScrollView style={styles.cardListScrollView}>
      {Array(100).fill(content).map((ticketContent, index) => (
        <BpkCard
          key={index} // eslint-disable-line react/no-array-index-key
          onPress={onPress}
          accessibilityLabel="Example Ticket"
          style={styles.cardListItem}
        >
          {ticketContent}
        </BpkCard>
      ))}
    </ScrollView>
  ));
