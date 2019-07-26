# bpk-component-nudger

> Backpack nudger component.

## Installation

```sh
npm install bpk-component-nudger --save-dev
```

## Usage

### Default `BpkNudger`

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

### Configurable `BpkConfigurableNudger`

```js
import React, { Component } from 'react';
import BpkLabel from 'bpk-component-label';
import { BpkConfigurableNudger } from 'bpk-component-nudger';

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

  compareValues = (a, b): number => {
    const options = ['economy', 'premium', 'business', 'first'];
    const [aIndex, bIndex] = [options.indexOf(a), options.indexOf(b)];
    return aIndex - bIndex;
  };

  incrementValue = (a): string => {
    const options = ['economy', 'premium', 'business', 'first'];
    const [aIndex] = [options.indexOf(a) + 1];
    return options[aIndex];
  };

  decrementValue = (a): string => {
    const options = ['economy', 'premium', 'business', 'first'];
    const [aIndex] = [options.indexOf(a) - 1];
    return options[aIndex];
  };

  formatValue = (a): string => a.toString();

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
          compareValues={this.compareValues}
          incrementValue={this.incrementValue}
          decrementValue={this.decrementValue}
          formatValue={this.formatValue}
          inputClassName={getClassName('bpk-nudger-configurable')}
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

## Theme Props

Same as [secondary button](/components/web/buttons#theme-props)
