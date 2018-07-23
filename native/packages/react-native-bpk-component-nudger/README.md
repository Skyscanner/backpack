# react-native-bpk-component-nudger

> Backpack React Native nudger component.

## Installation

```sh
npm install react-native-bpk-component-nudger --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkNudger from 'react-native-bpk-component-nudger';

export default class App extends Component {
 constructor() {
    super();
    this.state = { value: 1 };
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    return (
      <BpkNudger
        min={1}
        max={10}
        value={this.state.value}
        onChange={this.handleChange}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />
    );
  }
}
```

## Props

| Property              | PropType                              | Required | Default Value |
| --------------------- | ------------------------------------- | -------- | ------------- |
| decreaseButtonLabel   | string                                | true     | -             |
| increaseButtonLabel   | string                                | true     | -             |
| max                   | number                                | true     | -             |
| min                   | number                                | true     | -             |
| onChange              | func                                  | true     | -             |
| value                 | number                                | true     | -             |
| theme                 | See [Theme Props](#theme-props) below | false    | null          |

## Theme Props

Same as [secondary button](/components/native/button#theme-props).
