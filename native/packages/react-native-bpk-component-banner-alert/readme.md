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
import BpkText, {ALERT_TYPES} from 'react-native-bpk-component-text';
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
  constructor() {
    super();

    this.state = {
      showDismissable: true,
      expanded: false,
    };

    this.onDismissablePress = this.onDismissablePress.bind(this);
    this.onExpandablePress = this.onExpandablePress.bind(this);
  }

  onDismissablePress() {
    this.setState({ showDismissable: false });
  }

  onExpandablePress() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <View style={styles.container}>
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.SUCCESS}
          message={translationHelper.translate('SUCCESS_MESSAGE')}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.WARN}
          message={translationHelper.translate('WARN_MESSAGE')}
          actionButtonLabel="Dismiss"
          onPress={this.onDismissablePress}
          dismissable={this.state.showDismissable}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.ERROR}
          message={translationHelper.translate('ERROR_MESSAGE')}
          actionButtonLabel={translationHelper.translate('EXPAND')}
          onPress={this.onExpandablePress}
          expanded={this.state.expanded}
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

| Property           | PropType            | Required | Default Value |
| ------------------ | ------------------- | -------- | ------------- |
| message            | string              | yes      | -             |
| type               | oneOf(ALERT_TYPES)  | yes      | -             |
| actionButtonLabel  | oneOf(string, func) | no       | null          |
| children           | node                | no       | null          |
| dismissable        | boolean             | no       | false         |
| expanded           | boolean             | no       | false         |
| onPress            | func                | no       | () => null    |
