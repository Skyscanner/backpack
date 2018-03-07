# react-native-bpk-component-badge

> Backpack React Native badge component.

## Installation

```sh
npm install react-native-bpk-component-badge --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkBadge, { BADGE_TYPES, BADGE_DOCKED_TYPES } from 'react-native-bpk-component-badge';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

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
        <BpkBadge message="Badge" type={BADGE_TYPES.success} />
        <BpkBadge message="Badge" type={BADGE_TYPES.warning} />
        <BpkBadge message="Badge" type={BADGE_TYPES.destructive} />
        <BpkBadge message="Badge" type={BADGE_TYPES.inverse} />
        <BpkBadge message="Badge" type={BADGE_TYPES.light} />
        <BpkBadge message="Badge" type={BADGE_TYPES.outline} />
        <BpkBadge message="Badge" type={BADGE_TYPES.success} />
        <BpkBadge message="Badge" docked={BADGE_DOCKED_TYPES.start} type={BADGE_TYPES.warning} />
        <BpkBadge message="Badge" docked={BADGE_DOCKED_TYPES.end} type={BADGE_TYPES.destructive} />
      </View >
    );
  }
}
```
## Props

| Property              | PropType                                                                 | Required | Default Value |
| --------------------- | --------------------------------------------------------------------------| -------- | ------------- |
| message               | string                                                                    | true     | -             |
| docked                | oneOf('start', 'end')                                                     | false    | null          |
| type                  | oneOf('success', 'warning', 'destructive', 'light', 'inverse', 'outline') | false    | warning       |
