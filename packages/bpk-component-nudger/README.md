# bpk-component-nudger

> Backpack nudger component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### `BpkNudger`

```js
import { Component } from 'react';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';
import BpkNudger from '@skyscanner/backpack-web/bpk-component-nudger';

class App extends Component {
  constructor() {
    super();

    this.state = {
      value: 1,
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

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

### `BpkConfigurableNudger`

```js
import { Component } from 'react';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';
import { BpkConfigurableNudger } from '@skyscanner/backpack-web/bpk-component-nudger';

const options = ['economy', 'premium', 'business', 'first'];

const compareValues = (value1, value2) => {
    const [aIndex, bIndex] = [options.indexOf(value1), options.indexOf(value2)];
    return aIndex - bIndex;
  };

const incrementValue = currentValue => {
    const [aIndex] = [options.indexOf(currentValue) + 1];
    return options[aIndex];
  };

const decrementValue = currentValue => {
    const [aIndex] = [options.indexOf(currentValue) - 1];
    return options[aIndex];
  };

const formatValue = currentValue => currentValue.toString();

class App extends Component {
  constructor() {
    super();

    this.state = {
      value: 1,
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <BpkLabel htmlFor="nudger">Number of passengers</BpkLabel>
        <BpkConfigurableNudger
          id="nudger"
          min="economy"
          max="first"
          value={this.state.value}
          onChange={this.handleChange}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          compareValues={compareValues}
          incrementValue={incrementValue}
          decrementValue={decrementValue}
          formatValue={formatValue}
        />
      </div>
    );
  }
}
```