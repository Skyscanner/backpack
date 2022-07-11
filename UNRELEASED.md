**Changed:**
- bpk-component-navigation-stack:
  - This component is deprecated, please avoid using this component and ensure you migrate away from this component.

- bpk-component-split-input:
  - Replace deprecated spacing tokens with new tokens. There are no visual changes as the new tokens have the exact values.

- `bpk-component-floating-notification`: `1.0.0` => `1.1.0`
  - Added new prop `onExit` which executes a function after the component has finished the exit animation.

**Fixed:**
- `bpk-component-floating-notification`: `1.0.0` => `1.1.0`
  - Fixed accessibility issue where screen reader would only read out notification once after triggering. Subsequent triggers wouldn't engage screen reader.
