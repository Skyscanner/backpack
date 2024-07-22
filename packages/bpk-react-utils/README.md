# bpk-react-utils

> Miscellaneous React based utilities for use in Backpack components.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## `cssModules.js`

A helpful utility which permits backwards compatibility with hard coded classes and [CSS modules](https://github.com/css-modules/css-modules).

### Usage

```js
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';

import STYLES from './MyComponent.scss';

const getClassName = cssModules(STYLES);

const MyComponent = (props) => (
  <div className={getClassName('MyComponent')}>
    <div className={getClassName('MyComponent__inner')}>{props.children}</div>
  </div>
);
```

With CSS modules:

```html
<div class="_35WloynrPDta8fhSfoHEgE">
  <div class="_1ghNYY7jOYzUneVCT4piQ9">Some text.</div>
</div>
```

Without CSS modules:

```html
<div class="MyComponent">
  <div class="MyComponent__inner">Some text.</div>
</div>
```

The returned function accepts multiple class names and ignores values other than strings. e.g:

```js
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';

import STYLES from './MyComponent.scss';

const getClassNames = cssModules(STYLES);

const MyComponent = (props) => (
  <div
    className={getClassName(
      'MyComponent',
      props.disabled && 'MyComponent--disabled',
    )}
  >
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
import { TransitionInitialMount } from '@skyscanner/backpack-web/bpk-react-utils';

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
@import '~@skyscanner/backpack-web/bpk-mixins/index.scss';

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
import { isRTL } from '@skyscanner/backpack-web/bpk-react-utils';

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
import { isDeviceIphone } from '@skyscanner/backpack-web/bpk-react-utils';

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
import { isDeviceIpad } from '@skyscanner/backpack-web/bpk-react-utils';

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
import { isDeviceIos } from '@skyscanner/backpack-web/bpk-react-utils';

if (isDeviceIos()) {
  // do iOS specific stuff
} else {
  // do other browser/device stuff
}
```

## `BpkDialogWrapper`

Higher order component that adds a scrim behind components, manages focus and handles appearing and disappearing animations.

### Usage

```js
import { BpkDialogWrapper } from '@skyscanner/backpack-web/bpk-dialog-utils';

const Component = props => (
  <BpkDialogWrapper
    ariaLabelledby='dialog-wrapper'
    closeOnEscPressed
    closeOnScrimClick
    dialogClassName='test-class'
    id="dialog-wrapper"
    isOpen
    onClose={jest.fn()}
    exiting={false}
    transitionClassNames={{
      appear: "appear-class",
      appearActive: "active-class",
      exit: "exit-class"
    }}
    timeout={{appear: 0, exit: 0}}
  >
    Dialog content
  </BpkDialogWrapper>
);

export default Component
```

By default, the wrapper doesn't enforce an appearing or disappearing animation, but with the properties `transitionClassNames`, `timeout` and `exiting` you can set and customise the animations for your component.
