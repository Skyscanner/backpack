# bpk-component-theme-toggle

> Backpack Theme Switcher component.

## Installation

```sh
npm install bpk-component-theme-toggle --save-dev
```

## Usage

```js
import React from 'react';
import BpkThemeToggle from 'bpk-component-theme-toggle';

export default () => (
  <BpkThemeToggle />
);
```

## HoC usage

```js
import React from 'react';
import { updateOnThemeChange } from 'bpk-component-theme-toggle';
import BpkThemeProvider from 'bpk-theming';

const EnhancedThemeProvider = updateOnThemeChange(BpkThemeProvider);
