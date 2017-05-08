# bpk-component-nudger

> Backpack nudger component.

## Installation

```sh
npm install bpk-component-nudger --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkNudger from 'bpk-component-nudger';

class App extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 1,
    };
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <BpkLabel htmlFor="my-nudger">Number of passengers</BpkLabel>
        <BpkNudger
          id="my-nudger"
          min={1}
          max={10}
          value={this.state.value}
          onChange={this.handleChange}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
        />
      </div>
    );
  }
}
```

### Props

| Property              | PropType                      | Required | Default Value |
| --------------------- | ----------------------------- | -------- | ------------- |
| id                    | string                        | true     | -             |
| decreaseButtonLabel   | string                        | true     | -             |
| increaseButtonLabel   | string                        | true     | -             |
| max                   | number                        | true     | -             |
| min                   | number                        | true     | -             |
| onChange              | func                          | true     | -             |
| value                 | number                        | true     | -             |
| className             | string                        | false    | null          |

