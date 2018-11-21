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
import BpkText from 'react-native-bpk-component-text';
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
        <BpkBadge alt="Badge" type={BADGE_TYPES.success}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" type={BADGE_TYPES.warning}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" type={BADGE_TYPES.destructive}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" type={BADGE_TYPES.inverse}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" type={BADGE_TYPES.light}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" type={BADGE_TYPES.outline}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" type={BADGE_TYPES.success}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" docked={BADGE_DOCKED_TYPES.start} type={BADGE_TYPES.warning}><BpkText>Badge</BpkText></BpkBadge>
        <BpkBadge alt="Badge" docked={BADGE_DOCKED_TYPES.end} type={BADGE_TYPES.destructive}><BpkText>Badge</BpkText></BpkBadge>

      </View >
    );
  }
}
```
## Props

| Property              | PropType                                                                  | Required | Default Value |
| --------------------- | --------------------------------------------------------------------------| -------- | ------------- |
| alt                   | string                                                                    | true     | -             |
| children              | node                                                                      | true     | -             |
| docked                | oneOf('start', 'end')                                                     | false    | null          |
| type                  | oneOf('success', 'warning', 'destructive', 'light', 'inverse', 'outline') | false    | warning       |
