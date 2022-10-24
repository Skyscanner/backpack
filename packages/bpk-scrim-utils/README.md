# bpk-scrim-utils

> Higher order component that adds a scrim behind components and manages scroll states

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

```js
import { withScrim } from '@skyscanner/backpack-web/bpk-scrim-utils';

const Box = props => (
  <div ref={props.dialogRef}>
    <BpkButton onClick={props.onClose}>Close</BpkButton>
    Hello
  </div>
);

const BoxWithScrim = withScrim(Box);
```

`withScrim` sends all props it receives down to the component, except `getApplicationElement` and `padded`. It also adds some props that are used for a11y and closing the modal:

* `dialogRef` should be set as the ref on the visible container on top of the scrim; it is used to set focus
* `onClose` should be set as the `onClick` action on a button or a link
* `isIphone` can be used to apply iPhone only styles or behaviour, as it has different scrolling behaviour

`containerClassName` can be used to apply styles to the full-screen container into which the enriched component is inserted
(e.g. `display: flex` or `display: grid`)

> **Note:** the `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".

### Props

| Property              | PropType | Required | Default Value                                                                    |
| --------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| onClose               | func     | true     | See prop details                                                                 |
| getApplicationElement | func     | true     | -                                                                                |
| isIphone              | bool     | false    | `/iPhone/i.test(typeof window !== 'undefined' ? window.navigator.platform : '')` |
| containerClassName    | string   | false    | ''                                                                               |
| closeOnScrimClick     | bool     | false    | true                                                                             |

### Prop Details

#### onClose

This is required unless `closeOnScrimClick` is false.
