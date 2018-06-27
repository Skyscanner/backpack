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

  handleToggle = () => {
    this.setState({
      flightsSelected: !this.state.flightsSelected,
    });
  };

  handleDismiss = () => {
    this.setState({
      showHotels: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <BpkChip
          accessibilityLabel="Toggle flights"
          label="Flights"
          onPress={this.handleToggle}
          selected={this.state.flightsSelected}
        />
        { this.state.showHotels &&
          <BpkDismissibleChip
            dismissButtonLabel="Remove hotels"
            label="Hotels"
            onDismiss={this.handleDismiss}
            large
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
| dismissButtonLabel    | string                                                                    | true     | -             |
| label                 | string                                                                    | true     | -             |
| onDismiss             | func                                                                      | true     | -             |
| large                 | bool                                                                      | false    | false         |

