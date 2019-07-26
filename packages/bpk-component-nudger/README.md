# bpk-component-nudger

> Backpack nudger component.

## Installation

```sh
npm install bpk-component-nudger --save-dev
```

## Usage

### `BpkNudger`

```js
import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkNudger from 'bpk-component-nudger';

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
import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import { BpkConfigurableNudger } from 'bpk-component-nudger';

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
        <BpkLabel htmlFor="my-nudger">Number of passengers</BpkLabel>
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

## Props

### BpkNudger

| Property            | PropType                      | Required | Default Value |
| ------------------- | ----------------------------- | -------- | ------------- |
| id                  | string                        | true     | -             |
| decreaseButtonLabel | string                        | true     | -             |
| increaseButtonLabel | string                        | true     | -             |
| max                 | number                        | true     | -             |
| min                 | number                        | true     | -             |
| onChange            | func                          | true     | -             |
| value               | number                        | true     | -             |
| className           | string                        | false    | null          |
| buttonType          | oneOf('secondary', 'outline') | false    | secondary     |

### BpkConfigurableNudger

| Property            | PropType                      | Required | Default Value |
| ------------------- | ----------------------------- | -------- | ------------- |
| id                  | string                        | true     | -             |
| decreaseButtonLabel | string                        | true     | -             |
| increaseButtonLabel | string                        | true     | -             |
| max                 | number                        | true     | -             |
| min                 | number                        | true     | -             |
| onChange            | func                          | true     | -             |
| value               | number                        | true     | -             |
| compareValues       | func                          | true     | -             |
| incrementValue      | func                          | true     | -             |
| decrementValue      | func                          | true     | -             |
| formatValue         | func                          | true     | -             |
| className           | string                        | false    | null          |
| inputClassName      | string                        | false    | null          |
| buttonType          | oneOf('secondary', 'outline') | false    | secondary     |

### `compareValues`

A comparator function similar to [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description) for comparing two values in your data set.

The function is used to take either the min or max value provided and compare it to the current value to determine if the value can be incremented or decremented.

### `incrementValue` & `decrementValue`

Functions that handle the incrementing or decrementing of the current selected value.

### `formatValue`

A simple function that will allow you to set the format of the display value e.g. local dates or times.

## Theme Props

Same as [secondary button](/components/web/buttons#theme-props)
