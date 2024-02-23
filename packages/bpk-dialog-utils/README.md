# bpk-dialog-utils

> Higher order component that adds a scrim behind components, manages focus and handles appearing and disappearing animations

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

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
