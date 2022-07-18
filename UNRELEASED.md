**Changed:**

- `bpk-component-floating-notification`: `1.0.0` => `1.1.0`
  - Added new prop `onExit` which executes a function after the component has finished the exit animation.

**Fixed:**

- `bpk-component-floating-notification`: `1.0.0` => `1.1.0`
  - Fixed accessibility issue where screen reader would only read out notification once after triggering. Subsequent triggers wouldn't engage screen reader.
  - Fixed the `<Icon>` and `<BpkAriaLive>` components being selectable by screen readers.

- bpk-component-horizontal-nav:
  - Removed `findDOMNode` usage from the component which was causing an error when mounting the component and migrated to using `ref` to manage the component rendering when scrolling to the selected item.