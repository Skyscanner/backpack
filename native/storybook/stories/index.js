/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { colorBlue500 } from 'bpk-tokens/tokens/ios/base.react.native.es6';

import BpkText, { TEXT_STYLES } from '../../packages/react-native-bpk-component-text';

const styles = StyleSheet.create({
  blueText: {
    color: colorBlue500,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

storiesOf('BpkText', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
  )
  .add('Default', () => {
    const text = 'Hello from BpkText';
    const textStyles = TEXT_STYLES.map(style => <BpkText textStyle={style} key={`text-${style}`}>{text}</BpkText>);
    textStyles.reverse();

    return (
      <View>
        {textStyles}
      </View>
    );
  })
  .add('Extended Style', () =>
    <BpkText textStyle="xxl" style={styles.blueText}>
      Hello
    </BpkText>,
  );
