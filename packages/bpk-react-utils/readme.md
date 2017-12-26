# bpk-react-utils

> Miscellaneous React based utilities for use in Backpack components.

## Installation

```sh
npm install bpk-react-utils --save-dev
```

## Portal.js

Render's children into a new component tree and appends it to `document.body`. Useful for Modals, Popovers, Tooltips etc where
it's necessary in overcoming z-index issues when absolutely positioning elemtents.

### Usage

```js
import { Portal } from 'bpk-react-utils';
import BpkButton from 'bpk-component-button';
import { BpkCode } from 'bpk-component-code';
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.beforeClose.bind(this);
  }

  onOpen() {
    this.setState({
      isOpen: true,
    });
  }

  onClose() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div>
        <BpkButton onClick={this.onOpen}>Open portal</BpkButton>
        <Portal
          isOpen={this.state.isOpen}
          onClose={this.onClose}
        >
          <div>I'm now appended to <BpkCode>document.body</BpkCode></div>
        </Portal>
      </div>
    );
  }
}
```

### Props

| Property     | PropType               | Required | Default Value |
| ------------ | ---------------------- | -------- | ------------- |
| children     | node                   | true     | -             |
| isOpen       | bool                   | true     | -             |
| beforeClose  | func                   | false    | null          |
| onClose      | func                   | false    | noop          |
| onOpen       | func                   | false    | noop          |
| onRender     | func                   | false    | noop          |
| renderTarget | func                   | false    | null          |
| target       | oneOf([node, element]) | false    | null          |

## cssModules.js

A helpful utility which permits backwards compatibility with hard coded classes and [css-modules](https://github.com/css-modules/css-modules).

### Usage

```js
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './MyComponent.scss';

const getClassName = cssModules(STYLES);

const MyComponent = (props) => (
  <div className={getClassName('MyComponent')}>
    <div className={getClassName('MyComponent__inner')}>
      {props.children}
    </div>
  </div>
);
```

With css modules:

```html
<div class="_35WloynrPDta8fhSfoHEgE">
  <div class="_1ghNYY7jOYzUneVCT4piQ9">
    Some text.
  </div>
</div>
```

Without css modules:

```html
<div class="MyComponent">
  <div class="MyComponent__inner">
    Some text.
  </div>
</div>
```

## TransitionInitialMount.js

A wrapper around `react-transition-group` which makes it easy to transition a
components initial mount. All you need to provide is two class names and a timeout.

### Usage

```js
import React from 'react';
import { TransitionInitialMount } from 'bpk-react-utils';

const MyComponent = (props) => (
  <TransitionInitialMount
    appearClassName="my-transition-class--appear"
    appearActiveClassName="my-transition-class--appear-active"
    transitionTimeout={300}
  >
    <div>Some text.</div>
  </TransitionInitialMount>
);
```

```scss
@import '~bpk-mixins/index';

.my-transition-class {
  transition: opacity $bpk-duration-sm ease-in-out;
  opacity: 1;

  &--appear {
    opacity: 0;
  }

  &--appear-active {
    opacity: 1;
  }
}
```

### Props

| Property              | PropType | Required | Default Value |
| --------------------- | -------- | -------- | ------------- |
| children              | node     | true     | -             |
| appearClassName       | string   | true     | -             |
| appearActiveClassName | string   | true     | -             |
| transitionTimeout     | number   | true     | -             |

## hasChildrenOfType.js

A prop type checker that allows you to restrict a component's children to a specific type.

### Usage

```js
import React from 'react';
import { hasChildrenOfType } from 'bpk-react-utils';

const Child = () => <span>Child</span>;

const Parent = ({ children }) => <div>{ children }</div>;
Parent.propTypes = {
  children: hasChildrenOfType(Child),
};

// Valid:
const WithValidChildren = () => (
  <Parent>
    <Child />
    <Child />
  </Parent>
);

// Invalid (will get prop type validation errors):
const WithInvalidChildren = () => (
  <Parent>
    <Child />
    <div>something else</div>
  </Parent>
);
```

### Parameters

```js
function hasChildrenOfType(Type, atLeast = 1)
```

| Parameter  | Description                     | Required | Default Value |
| ---------- | ------------------------------- | -------- | ------------- |
| `Type`     | The component type to check for | true     | -             |
| `atLeast`  | The mimumum number of children  | false    | 1             |
