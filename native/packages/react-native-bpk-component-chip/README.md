# react-native-bpk-component-chip

> Backpack React Native chip component.

## Installation

```sh
npm install react-native-bpk-component-chip --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkChip, { BpkDismissibleChip } from 'react-native-bpk-component-chip';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      flightsSelected: false,
      showHotels: true,
    };
  }

  dismiss = () => {
    this.setState({
      showHotels: false,
    });
  };

  toggle = () => {
    this.setState({
      flightsSelected: !this.state.flightsSelected,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <BpkChip
          accessibilityLabel="Toggle flights"
          label="Flights"
          onPress={this.toggle}
          selected={this.state.flightsSelected}
        />
        { this.state.showHotels &&
          <BpkDismissibleChip
            accessibilityLabel="Remove hotels"
            label="Hotels"
            onPress={this.dismiss}
          />
        }
      </View>
    );
  }
}
```

## Props

### BpkChip

| Property              | PropType                                                                  | Required | Default Value |
| --------------------- | ------------------------------------------------------------------------- | -------- | ------------- |
| accessibilityLabel    | string                                                                    | true     | -             |
| onPress               | func                                                                      | true     | -             |
| label                 | string                                                                    | true     | -             |
| large                 | bool                                                                      | false    | false         |
| selected              | bool                                                                      | false    | false         |

### BpkDismissibleChip

| Property              | PropType                                                                  | Required | Default Value |
| --------------------- | ------------------------------------------------------------------------- | -------- | ------------- |
| accessibilityLabel    | string                                                                    | true     | -             |
| label                 | string                                                                    | true     | -             |
| onPress               | func                                                                      | true     | -             |

