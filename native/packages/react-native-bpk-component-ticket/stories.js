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

import BpkTicket from './index';

const mainContent = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa.
  </BpkText>
);

const stubContent = (
  <BpkText>
    Lorem ipsum dolor sit amet.
  </BpkText>
);

const onPress = action('Ticket press');

const styles = StyleSheet.create({
  ticketListScrollView: {
    overflow: 'visible',
  },
  ticketListItem: {
    marginTop: 20,
  },
  ticketMainStyle: {
    flex: 3,
  },
});

storiesOf('BpkTicket', module)
  .add('docs:default', () => (
    <BpkTicket
      onPress={onPress}
      accessibilityLabel="Example Ticket"
      stub={stubContent}
      mainStyle={styles.ticketMainStyle}
    >
      {mainContent}
    </BpkTicket>
  ))
  .add('docs:vertical', () => (
    <BpkTicket
      onPress={onPress}
      accessibilityLabel="Example Ticket"
      stub={stubContent}
      vertical
    >
      {mainContent}
    </BpkTicket>
  ))
  .add('docs:without-padding', () => (
    <BpkTicket
      onPress={onPress}
      accessibilityLabel="Example Ticket"
      stub={stubContent}
      mainStyle={styles.ticketMainStyle}
      padded={false}
    >
      {mainContent}
    </BpkTicket>
  ))
  .add('docs:focused', () => (
    <BpkTicket
      onPress={onPress}
      accessibilityLabel="Example Ticket"
      stub={stubContent}
      mainStyle={styles.ticketMainStyle}
      focused
    >
      {mainContent}
    </BpkTicket>
  ))
  .add('All Tickets', () => (
    <ScrollView style={styles.ticketListScrollView}>
      <BpkTicket
        onPress={onPress}
        accessibilityLabel="Example Ticket"
        stub={stubContent}
        style={styles.ticketListItem}
        mainStyle={styles.ticketMainStyle}
      >
        {mainContent}
      </BpkTicket>
      <BpkTicket
        onPress={onPress}
        accessibilityLabel="Example Ticket"
        stub={stubContent}
        style={styles.ticketListItem}
        mainStyle={styles.ticketMainStyle}
        padded={false}
      >
        {mainContent}
      </BpkTicket>
      <BpkTicket
        onPress={onPress}
        accessibilityLabel="Example Ticket"
        stub={stubContent}
        style={styles.ticketListItem}
        mainStyle={styles.ticketMainStyle}
        focused
      >
        {mainContent}
      </BpkTicket>
    </ScrollView>
  ))
  .add('Ticket list (perf)', () => (
    <ScrollView style={styles.ticketListScrollView}>
      {Array(100).fill({ mainContent, stubContent }).map((content, index) => {
        const isEven = index % 2 === 0;

        return (
          <BpkTicket
            key={index} // eslint-disable-line react/no-array-index-key
            onPress={onPress}
            accessibilityLabel="Example Ticket"
            stub={content.stubContent}
            style={styles.ticketListItem}
            mainStyle={isEven ? null : styles.ticketMainStyle}
            vertical={isEven}

          >
            {content.mainContent}
          </BpkTicket>
        );
      })}
    </ScrollView>
  ));
