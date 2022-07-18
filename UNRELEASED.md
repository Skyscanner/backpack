**Fixed:**

- bpk-component-horizontal-nav:
  - Removed `findDOMNode` usage from the component which was causing an error when mounting the component and migrated to using `ref` to manage the component rendering when scrolling to the selected item.