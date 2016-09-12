# bpk-tokens

> Design tokens for colors, spacing, font, etc.

## Installation

```sh
npm install bpk-tokens --save
```

## Usage

Sass:

```scss
@import '~bpk-tokens';

.my-selector {
  padding: $bpk-spacing-base;
}
```

JavaScript:

```js
import TOKENS from 'bpk-tokens/tokens/base.common';

console.log(TOKENS.spacingBase);
```
