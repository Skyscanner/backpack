# bpk-react-utils

> Miscellaneous React based utilities for use in Backpack components.

## Installation

```sh
npm install bpk-react-utils --save-dev
```

## Portal.js

Render's children into a new component tree and appends it to `document.body`. Useful for Modals, Popovers, Tooltips etc where
it's necessary in overcoming z-index issues when absolutely positioning elements.

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

  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  }

  onClose = () => {
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

| Property              | PropType                | Required | Default Value |
| --------------------- | ----------------------- | -------- | ------------- |
| children              | node                    | true     | -             |
| isOpen                | bool                    | true     | -             |
| beforeClose           | func                    | false    | null          |
| onClose               | func                    | false    | noop          |
| onOpen                | func                    | false    | noop          |
| onRender              | func                    | false    | noop          |
| renderTarget          | func                    | false    | null          |
| target                | oneOf([function, node]) | false    | null          |
| closeOnEscPressed     | bool                    | false    | true          |

## `cssModules.js`

A helpful utility which permits backwards compatibility with hard coded classes and [CSS modules](https://github.com/css-modules/css-modules).

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

With CSS modules:

```html
<div class="_35WloynrPDta8fhSfoHEgE">
  <div class="_1ghNYY7jOYzUneVCT4piQ9">
    Some text.
  </div>
</div>
```

Without CSS modules:

```html
<div class="MyComponent">
  <div class="MyComponent__inner">
    Some text.
  </div>
</div>
```

The returned function accepts multiple class names and ignores values other than strings. e.g:

```js
import { cssModules } from 'bpk-react-utils';

import STYLES from './MyComponent.scss';

const getClassNames = cssModules(STYLES);

const MyComponent = (props) => (
  <div className={getClassName('MyComponent', props.disabled && 'MyComponent--disabled')}>
   {props.children}
  </div>
);
```

Will result in `MyComponent MyComponent--disabled` if `props.disabled` is true or `MyComponent` otherwise.

## `TransitionInitialMount.js`

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
@import '~bpk-mixins/index.scss';

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

## `isRTL`

Returns true if the browser is showing content right-to-left.

### Usage

```js
import React from 'react';
import { isRTL } from 'bpk-react-utils';

if (isRTL()) {
  // do RTL stuff
} else {
  // do LTR stuff
}
```

## `isDeviceIphone`

Returns true if the device is an iPhone.

### Usage

```js
import React from 'react';
import { isDeviceIphone } from 'bpk-react-utils';

if (isDeviceIphone()) {
  // do iPhone specific stuff
} else {
  // do other browser/device stuff
}
```

## `isDeviceIpad`

Returns true if the device is an iPad.

### Usage

```js
import React from 'react';
import { isDeviceIpad } from 'bpk-react-utils';

if (isDeviceIpad()) {
  // do iPad specific stuff
} else {
  // do other browser/device stuff
}
```

## `isDeviceIos`

Returns true if the platform is iOS (iPhone/iPad).

### Usage

```js
import React from 'react';
import { isDeviceIos } from 'bpk-react-utils';

if (isDeviceIos()) {
  // do iOS specific stuff
} else {
  // do other browser/device stuff
}
```
