import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View, Platform } from 'react-native';
import BpkBannerAlert, { ALERT_TYPES } from './index';
import BpkText from 'react-native-bpk-component-text';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  spacingSm,
  spacingBase,
  spacingXs,
} = tokens;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacingSm,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  bannerAlert: {
    marginBottom: spacingBase,
  },
});

storiesOf('BpkBannerAlert', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
  )
  .add('docs:banner-alerts', () => (
    <View style={styles.container}>
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.SUCCESS}
        message="test"
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.WARN}
        message="test"
        dismissable
      />
      <BpkBannerAlert
        style={styles.bannerAlert}
        type={ALERT_TYPES.ERROR}
        message="test"
        toggleButtonLabel="Expand"
      >
        <BpkText>ASDF</BpkText>
      </BpkBannerAlert>
    </View>
  ));
