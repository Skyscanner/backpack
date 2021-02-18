# bpk-storybook-utils

This package contains convenience utilities for use with storybook.

## Action

`action` uses `@storybook/addon-actions` if available. If the module is not available, it will fall back to `console.log` instead.
This makes it possible to use the `action` both within and without environments using storybook.

## Installation

```sh
npm install bpk-storybook-utils --save-dev
```

## Usage

```js
import {action} from 'bpk-storybook-utils';

...

action("Thing");

```
