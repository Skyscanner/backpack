# Living Styles
> Up-to-date globally applicable styles for use on Skyscanner's web products.

## Usage

> Note: Living Styles is currently defined as an npm module to make it easy to install and manage dependencies. We are open to 
making this project easy to use with other package managers too (Bower etc).

Install the module using the git url like so:

```shell
npm install git+http://git.prod.skyscanner.local/design/living-styles.git#v0.2.1 --save-dev
```

Import the styles that you want to consume:

```scss
@import "../node_modules/living-styles/colours";
```

> Note: Remember to adjust the import path relative to your `node_modules` folder.

Available imports:

- `living-styles/colours` - variables for every colour in Skyscanner's palette
- `living-styles/icons` - mixins for Skyscanner's icon pack
- `living-styles/forms` - mixins for Form elements
- `living-styles/units` - variables for commonly used properties such as padding and border-radius
- `living-styles/all` - everything

## Contact
- james.ferguson@skyscanner.net
- matthew.davidson@skyscanner.net