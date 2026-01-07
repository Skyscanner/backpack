# bpk-component-theme-toggle

> Backpack Theme Switcher component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkThemeToggle from '@skyscanner/backpack-web/bpk-component-theme-toggle';

export default () => (
  <BpkThemeToggle />
);
```

## HOC usage

```tsx
import { updateOnThemeChange } from '@skyscanner/backpack-web/bpk-component-theme-toggle';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);
```
