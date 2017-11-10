# react-native-bpk-component-banner-alert

> Backpack React Native banner alert component.

## Installation

```sh
npm install react-native-bpk-component-banner-alert --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkBannerAlert, {ALERT_TYPES} from 'react-native-bpk-component-banner-alert';
import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';

import { translationHelper } from 'translations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: TOKENS.spacingBase,
  },
  bannerAlert: {
    marginBottom: TOKENS.spacingBase,
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.NEUTRAL}
          message={translationHelper.translate('NEUTRAL_MESSAGE')}
        />
          <BpkBannerAlert
            style={styles.bannerAlert}
            type={ALERT_TYPES.SUCCESS}
            message={translationHelper.translate('SUCCESS_MESSAGE')}
          />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.WARN}
          message={translationHelper.translate('WARN_MESSAGE')}
          actionButtonLabel={translationHelper.translate('DISMISS_MESSAGE')}
          dismissable
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.ERROR}
          message={translationHelper.translate('ERROR_MESSAGE')}
          actionButtonLabel={translationHelper.translate('EXPAND_MESSAGE')}
        >
          <BpkText textStyle="sm" style={styles.child}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum.
            Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi.
            Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at.
          </BpkText>
        </BpkBannerAlert>
      </View>
    );
  }
}
```

## Props

| Property          | PropType           | Required | Default Value |
| ----------------- | ------------------ | -------- | ------------- |
| message           | string             | yes      | -             |
| type              | oneOf(ALERT_TYPES) | yes      | -             |
| actionButtonLabel | string             | no       | null          |
| children          | node               | no       | null          |
| dismissable       | boolean            | no       | false         |
| onAction          | func               | no       | () => null    |
