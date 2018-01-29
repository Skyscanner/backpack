# bpk-scrim-utils

> Higher order component that adds a scrim behind components and manages scroll states

## Installation

```sh
npm install bpk-scrim-utils --save-dev
```

```js
import { withScrim } from 'bpk-scrim-utils';

const Box = props => (
  <div
    ref={props.dialogRef}
    {...props.closeEvents}
  >
    <BpkButton onClick={props.onClose}>Close</BpkButton>
    Hello
  </div>
);

const BoxWithScrim = withScrim(Box);
```

`withScrim` sends all props it receives down to the component, except `getApplicationElement` and `padded`. It also adds some props that are used for a11y and closing the modal:
- `dialogRef` should be set as the ref on the visible container on top of the scrim; it is used to set focus
- `closeEvents` should be spread on the visible container on top of the scrim; they are used to close handle clicking, tapping, or dragging between component and scrim
- `onClose` should be set as the `onClick` action on a button or a link
- `isIphone` can be used to apply iPhone only styles or behaviour, as it has different scrolling behaviour

`containerClassName` can be used to apply styles to the full-screen container into which the enriched component is inserted
 (eg. `display: flex` or `display: grid`)

### Props

| Property              | PropType | Required | Default Value                                                                  |
| --------------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| onClose               | func     | true     | See prop details                                                               |
| getApplicationElement | func     | true     | -                                                                              |
| isIphone              | bool     | false    | /iPhone/i.test(typeof window !== 'undefined' ? window.navigator.platform : '') |
| containerClassName    | string   | false    | ''                                                                             |
| closeOnScrimClick     | bool     | false    | true                                                                           |

### Prop Details

#### onClose

This is required unless `closeOnScrimClick` is false.
