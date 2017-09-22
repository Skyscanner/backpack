import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View, Platform } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkCard from './index';


const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  spacingBase,
  colorGray50,
  colorRed500,
  colorGreen500,
  colorYellow500,
  colorBlue700,
  colorGray500,
} = tokens;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacingBase,
    width: '100%',
    backgroundColor: colorGray50,
  },
  container: {
    marginBottom: spacingBase,
  },
});

const cardContent = (
  <View>
    <BpkText textStyle="xxl" style={{ color: colorBlue700 }}>Flights to Edinburgh</BpkText>
    <BpkText textStyle="xl" style={{ color: colorRed500 }}>Flights to Edinburgh</BpkText>
    <BpkText textStyle="lg" style={{ color: colorGreen500 }}>Flights to Edinburgh</BpkText>
    <BpkText textStyle="base" style={{ color: colorYellow500 }}>Flights to Edinburgh</BpkText>
    <BpkText textStyle="sm" style={{ color: colorBlue700 }}>Flights to Edinburgh</BpkText>
    <BpkText textStyle="xs" style={{ color: colorGray500 }}>Flights to Edinburgh</BpkText>
  </View>
);

const press = () => null;

storiesOf('BpkCard', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
)
  .add('docs:default', () => (
    <BpkCard onPress={press}>{cardContent}</BpkCard>
  ))
  .add('docs:without-padding', () => (
    <BpkCard onPress={press} padded={false}>{cardContent}</BpkCard>
  ))
  .add('All Cards', () => (
    <View>
      <View>
        <BpkCard
          onPress={press}
          style={styles.container}
          accessibilityLabel="Example Card"
        >
          {cardContent}
        </BpkCard>
      </View>
      <View>
        <BpkCard
          onPress={press}
          padded={false}
          style={styles.container}
          accessibilityLabel="Example Card"
        >
          {cardContent}
        </BpkCard>
      </View>
    </View>
  ));
