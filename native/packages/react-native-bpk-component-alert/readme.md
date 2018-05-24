# react-native-bpk-component-alert

> Backpack React Native alert component.

## Installation

```sh
npm install react-native-bpk-component-alert --save-dev
```

## Usage

```js
import BpkAlert
import React, { Component } from 'react';
import BpkAlert from 'react-native-bpk-component-alert';

BpkAlert.alert(
  'Alert title',
  'Alert message',
  [
    {
      text: 'Cancel',
      onPress: () => action('negative button pressed'),
      style: 'cancel',
    },
    { text: 'Default', onPress: () => action('positive button press') },
    {
      text: 'Destructive',
      onPress: () => action('Destructive button press'),
      style: 'destructive',
    },
  ],
  { cancelable: false },
);
```
