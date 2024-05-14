# bpk-stylesheets

> Backpack's stylesheets.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

Within your Javascript (usually the entrypoint or top-most JS file)

```js
import '@skyscanner/backpack-web/bpk-stylesheets';
```

By default font rendering is not included if you need to include Skyscanner Relative in your styles, import it using the following:

```js
import '@skyscanner/backpack-web/bpk-stylesheets/font';
```

### Larken font

For Editorial text, the Larken font will also need to be imported:

```js
import '@skyscanner/backpack-web/bpk-stylesheets/larken';
```

## Contributing

Don't forget to rebuild and commit `base.js` after you make changes to this package.

To build the `base.js` file run `npm run build:stylesheets` in the root folder.
