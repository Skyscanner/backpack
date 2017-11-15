# bpk-tokens

> Design tokens for colors, spacing, font, etc.

## Installation

```sh
npm install bpk-tokens --save-dev
```

## Usage

### Sass:

```scss
@import '~bpk-tokens/tokens/base.default.scss';

.my-selector {
  padding: $bpk-spacing-base;
}
```

### JavaScript (ES6 module):

For React Native:

```js
// Individual tokens
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

console.log(spacingBase);

// Whole token categories
import { colors } from 'bpk-tokens/tokens/base.react.native';

console.log(colors.colorGray700);

// All tokens
import * as tokens from 'bpk-tokens/tokens/base.react.native';

console.log(tokens);
```

For web:

```js
// Individual tokens
import { spacingBase } from 'bpk-tokens/tokens/base.es6';

console.log(spacingBase);

// Whole token categories
import { colors } from 'bpk-tokens/tokens/base.es6';

console.log(colors.colorGray700);

// All tokens
import * as tokens from 'bpk-tokens/tokens/base.es6';

console.log(tokens);
```

### JavaScript (CommonJS):

```js
// Individual tokens
import { spacingBase } from 'bpk-tokens/tokens/base.common';

console.log(spacingBase);

// All tokens
import * as tokens from 'bpk-tokens/tokens/base.common';

console.log(tokens);
```

## Transparency

It is possible to add opacity to Backpack color tokens as follows:

```js
import { colorBlue500 } from 'bpk-tokens/tokens/base.react.native';
import { setOpacity } from 'bpk-tokens';

const transparentBlue500 = setOpacity(colorBlue500, 0.7);

console.log(transparentBlue500);
```
