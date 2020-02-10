# bpk-stylesheets

> Backpack's stylesheets.

## Installation

```sh
npm install bpk-stylesheets --save-dev
```

## Usage

```scss
@import '~bpk-stylesheets';
```

By default font rendering is not included if you need to include Skyscanner Relative in your styles, import it using the following:

```scss
@import '~bpk-stylesheets/font';
```

## Contributing

Don't forget to rebuild and commit `base.js` after you make changes to this package.

To build the `base.js` file run `npm run build:stylesheet` in the root folder.
Any other command that requires babel or `webpack` should be run in the root folder as well, e.g. `npx lerna run build --scope bpk-stylesheets`.
