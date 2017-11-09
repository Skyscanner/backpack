import React from 'react';
import { View, StyleSheet } from 'react-native';
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
  allCardsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    <View style={styles.allCardsContainer}>
      <BpkCard
        onPress={onPress}
        accessibilityLabel="Example Card"
      >
        {content}
      </BpkCard>
      <BpkCard
        onPress={onPress}
        padded={false}
        accessibilityLabel="Example Card"
      >
        {content}
      </BpkCard>
      <BpkCard
        onPress={onPress}
        focused
        accessibilityLabel="Example Card"
      >
        {content}
      </BpkCard>
    </View>
  ));
