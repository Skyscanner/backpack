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
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkBannerAlert, {ALERT_TYPES} from 'react-native-bpk-component-banner-alert';

import { translationHelper } from 'translations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  bannerAlert: {
    marginBottom: spacingBase,
  },
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      showDismissable: true,
      expanded: false,
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onExpandablePress = this.onExpandablePress.bind(this);
  }

  onDismiss() {
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
          message="Success message!"
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.WARN}
          message="Warn message!"
          dismissButtonLabel="Dismiss"
          onDismiss={this.onDismiss}
          dismissable
          show={this.state.showDismissable}
        />
        <BpkBannerAlert
          style={styles.bannerAlert}
          type={ALERT_TYPES.ERROR}
          message="Error message!"
          toggleExpandedButtonLabel={translationHelper.translate('EXPAND')}
          onToggleExpanded={this.onExpandablePress}
          expanded={this.state.expanded}
        >
          <BpkText textStyle="sm">
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

| Property                  | PropType           | Required | Default Value |
| ------------------------- | ------------------ | -------- | ------------- |
| message                   | string             | true     | -             |
| type                      | oneOf(ALERT_TYPES) | true     | -             |
| animateOnEnter            | bool               | false    | false         |
| animateOnLeave            | bool               | false    | false         |
| children                  | node               | false    | null          |
| dismissable               | bool               | false    | false         |
| dismissButtonLabel        | string             | false    | null          |
| expanded                  | bool               | false    | false         |
| onDismiss                 | func               | false    | null          |
| onToggleExpanded          | func               | false    | null          |
| show                      | bool               | false    | true          |
| toggleExpandedButtonLabel | string             | false    | null          |
