# Backpack Design System

> Backpack is Skyscanner's living style guide and organic design system.

# Documentation

http://backpack.prod.aws.skyscnr.com/

## Usage

Install the module using the git url like so, where `VERSION` is the tag version you want e.g. `v2.0.1`:

```shell
npm install git+http://git.prod.skyscanner.local/backpack/backpack.git#VERSION --save-dev
```

> Note: If you're seeing problems like this
> ```
> npm ERR! fetch failed http://git.prod.skyscanner.local/backpack/backpack.git#v2.2.0
> npm WARN retry will retry, error on last attempt: Error: fetch failed with status code 406
> ```
> under npm 3 make sure you're using the `git+http` schema.

Import the Sass mixins like so:

```scss
@import '~backpack/backpack';
```

> Note: The tilde import syntax (`~`) is webpack/sass-loader specific, otherwise adjust the import path relative to
your `node_modules` folder i.e. `@import './node_modules/backpack/backpack';`

## Contact
- backpack@skyscanner.net
