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

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { storiesOf, action } from '@storybook/react-native';

import BpkCard, { withDivider } from './index';
import CenterDecorator from '../../storybook/CenterDecorator';

const BpkCardWithDivider = withDivider(BpkCard);

const content = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus.
  </BpkText>
);

const mainContent = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa.
  </BpkText>
);

const stubContent = <BpkText>Lorem ipsum dolor sit amet.</BpkText>;

const onPress = action('Card press');

const styles = StyleSheet.create({
  cardListScrollView: {
    overflow: 'visible',
  },
  cardListItem: {
    marginTop: 20, // eslint-disable-line backpack/use-tokens
  },
  cardMainStyle: {
    flex: 3,
  },
});

storiesOf('react-native-bpk-component-card', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => <BpkCard onPress={onPress}>{content}</BpkCard>)
  .add('docs:without-padding', () => (
    <BpkCard onPress={onPress} padded={false}>
      {content}
    </BpkCard>
  ))
  .add('docs:focused', () => (
    <BpkCard onPress={onPress} focused>
      {content}
    </BpkCard>
  ))
  .add('docs:with-divider', () => (
    <BpkCardWithDivider
      onPress={onPress}
      stub={stubContent}
      mainStyle={styles.cardMainStyle}
    >
      {mainContent}
    </BpkCardWithDivider>
  ))
  .add('docs:with-divider-arranged-vertically', () => (
    <BpkCardWithDivider onPress={onPress} stub={stubContent} vertical>
      {mainContent}
    </BpkCardWithDivider>
  ))
  .add('With divider no padding', () => (
    <BpkCardWithDivider
      onPress={onPress}
      stub={stubContent}
      mainStyle={styles.cardMainStyle}
      padded={false}
    >
      {mainContent}
    </BpkCardWithDivider>
  ))
  .add('With divider focused', () => (
    <BpkCardWithDivider
      onPress={onPress}
      stub={stubContent}
      mainStyle={styles.cardMainStyle}
      focused
    >
      {mainContent}
    </BpkCardWithDivider>
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
      <BpkCardWithDivider
        onPress={onPress}
        stub={stubContent}
        accessibilityLabel="Example Card"
        style={styles.cardListItem}
        mainStyle={styles.cardMainStyle}
      >
        {mainContent}
      </BpkCardWithDivider>
      <BpkCardWithDivider
        onPress={onPress}
        stub={stubContent}
        accessibilityLabel="Example Card"
        style={styles.cardListItem}
        mainStyle={styles.cardMainStyle}
        padded={false}
      >
        {mainContent}
      </BpkCardWithDivider>
      <BpkCardWithDivider
        onPress={onPress}
        stub={stubContent}
        accessibilityLabel="Example Card"
        style={styles.cardListItem}
        mainStyle={styles.cardMainStyle}
        focused
      >
        {mainContent}
      </BpkCardWithDivider>
    </ScrollView>
  ))
  .add('Card list (perf)', () => (
    <ScrollView style={styles.cardListScrollView}>
      {Array(100)
        .fill(content)
        .map((cardContent, index) => (
          <BpkCard
            key={index} // eslint-disable-line react/no-array-index-key
            onPress={onPress}
            accessibilityLabel="Example Card"
            style={styles.cardListItem}
          >
            {cardContent}
          </BpkCard>
        ))}
    </ScrollView>
  ))
  .add('Card with divider list (perf)', () => (
    <ScrollView style={styles.cardListScrollView}>
      {Array(100)
        .fill({ mainContent, stubContent })
        .map((cardContent, index) => {
          const isEven = index % 2 === 0;

          return (
            <BpkCardWithDivider
              key={index} // eslint-disable-line react/no-array-index-key
              onPress={onPress}
              accessibilityLabel="Example Cadrd"
              stub={cardContent.stubContent}
              style={styles.cardListItem}
              mainStyle={isEven ? null : styles.cardMainStyle}
              vertical={isEven}
            >
              {cardContent.mainContent}
            </BpkCardWithDivider>
          );
        })}
    </ScrollView>
  ));
