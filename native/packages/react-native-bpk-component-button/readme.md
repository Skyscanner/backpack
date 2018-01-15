# react-native-bpk-component-button

> Backpack React Native button component.

## Installation

1. Install the NPM package:
```sh
npm install react-native-bpk-component-button --save-dev
```

2. Add some dependencies to your Podfile (iOS Only):
```sh
pod 'Yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
pod 'React', :path => '../node_modules/react-native'
pod 'BVLinearGradient', :path => '../node_modules/react-native-bpk-component-button/node_modules/react-native-linear-gradient'
```

3. `react-native-bpk-component-button` depends on [react-native-bpk-component-icon](https://github.com/Skyscanner/backpack/tree/master/native/packages/react-native-bpk-component-icon) make sure to follow the installation guide for the icon component for the different platforms

**Note:** This is necessary because `react-native-bpk-component-button` depends on [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient).

## Usage

```js
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import BpkButton from 'react-native-bpk-component-button';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import { translationHelper } from 'translations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkButton type="primary" title={translationHelper.translate('BOOK_FLIGHT')} onPress={() => {}} />
        <BpkButton type="featured" title={translationHelper.translate('BOOK_FLIGHT')} onPress={() => {}} />
        <BpkButton disabled type="destructive" title={translationHelper.translate('BOOK_FLIGHT')} onPress={() => {}} />
        <BpkButton large type="primary" title={translationHelper.translate('BOOK_FLIGHT')} onPress={() => {}} />

        <BpkButton type="featured" title={translationHelper.translate('BOOK_FLIGHT')} icon="baggage" onPress={() => {}} />

        <BpkButton type="featured" title={translationHelper.translate('BOOK_FLIGHT')} icon="baggage" iconOnly onPress={() => {}} />
      </View>
    );
  }
}
```

## Props

| Property              | PropType                                                                  | Required | Default Value |
| --------------------- | ------------------------------------------------------------------------- | -------- | ------------- |
| onPress               | func                                                                      | true     | -             |
| title                 | string                                                                    | true     | -             |
| accessibilityLabel    | string                                                                    | false    | props.title   |
| disabled              | bool                                                                      | false    | false         |
| icon                  | oneOf(string, element) Strings must be a [BpkIcon](/components/web/icons) | false    | null          |
| iconOnly              | bool                                                                      | false    | false         |
| large                 | bool                                                                      | false    | false         |
| theme                 | See [Theme Props](#theme-props) below                                     | false    | null          |
| type                  | oneOf('primary', 'featured', 'secondary', 'destructive')                  | false    | null          |

## Theme Props

### Primary

* `buttonPrimaryTextColor`
* `buttonPrimaryGradientStartColor`
* `buttonPrimaryGradientEndColor`

### Secondary

* `buttonSecondaryTextColor`
* `buttonSecondaryBackgroundColor`
* `buttonSecondaryBorderColor`
