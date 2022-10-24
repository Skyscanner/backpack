# bpk-component-nudger

> Backpack nudger component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### `BpkNudger`

```js
import React, { Component } from 'react';
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
import React, { Component } from 'react';
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
| buttonType          | oneOf('secondary', 'secondaryOnDark') | false    | secondary     |

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
| buttonType          | oneOf('secondary', 'secondaryOnDark') | false    | secondary     |

### `compareValues`

Given `a` and `b`:
- If `a` is less than `b` then `compareValues(a, b)` should return a value less than `0`
- If  `a` and `b` are equal then `compareValues(a, b)` should return exactly `0`
- If `a` is greater than `b` then `compareValues(a, b)` should return a value greater than `0`

We use this along with the `min` and `max` values to determine when we should disable the increment and decrement buttons. This is inspired by the `compareFunction` in [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)

For integer numbers the following is a correct implementation `const compareValues = (a: number, b: number): number => a - b;`

### `incrementValue` & `decrementValue`

Functions that handle the incrementing or decrementing of the current selected value.

### `formatValue`

A simple function that will allow you to set the format of the display value e.g. local dates or times.

## Theme Props

Same as [secondary button](/components/web/buttons#theme-props)
