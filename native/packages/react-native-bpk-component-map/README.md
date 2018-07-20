# react-native-bpk-component-map

> Backpack React Native map component.

## Installation

```sh
npm install react-native-bpk-component-map --save-dev
```

This package depends on [`react-native-maps`](https://github.com/react-community/react-native-maps) and its native components need to be integrated manually by following their [instructions](https://github.com/react-community/react-native-maps/blob/master/docs/installation.md).

## Usage

`react-native-bpk-component-map` is a thin wrapper around `react-native-maps`. It exports all the same components and values as `react-native-maps` so you should read their [documentation](https://github.com/react-community/react-native-maps).

```js
import React from 'react';
import BpkMapView from 'react-native-bpk-component-map';


export default class App extends Component {
  render() {
    return (
      <BpkMapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
```

