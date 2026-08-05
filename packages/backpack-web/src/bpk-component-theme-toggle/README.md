# bpk-component-theme-toggle

> Backpack Theme Switcher component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkThemeToggle from '@skyscanner-internal/backpack-web/bpk-component-theme-toggle';

export default () => (
  <BpkThemeToggle />
);
```

## HOC usage

```tsx
import { updateOnThemeChange } from '@skyscanner-internal/backpack-web/bpk-component-theme-toggle';
import BpkThemeProvider from '@skyscanner-internal/backpack-web/bpk-theming';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);
```
