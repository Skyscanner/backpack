# bpk-storybook-utils

This package contains convenience utilities for use with storybook.

## Installation

```sh
npm install bpk-storybook-utils --save-dev
```

## Included utilities

### `action`

`action` uses `@storybook/addon-actions` if available. If the module is not available, it will fall back to `console.log` instead.
This makes it possible to use the `action` both within and without environments using storybook.

#### Usage

```js
import { action } from 'bpk-storybook-utils';

...

action("Thing");
```

### `BpkDarkExampleWrapper`

Adds a dark background, useful for displaying components that don't appear on a light background.

#### Usage

```js
import { BpkDarkExampleWrapper } from 'bpk-storybook-utils';

...

<BpkDarkExampleWrapper>
  <p style={{ color: 'white' }}>
    This white text is only visible on dark backgrounds.
  </p>
</BpkDarkExampleWrapper>
```
