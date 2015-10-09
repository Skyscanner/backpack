# Living Styles ![Built with Handlebars](http://pixel-cookers.github.io/built-with-badges/sass/sass-long-flat.png)

> Up-to-date globally applicable styles for use on Skyscanner's products.

## Usage
> Note: Living Styles is currently defined as an NPM module to make it easy to install and manage dependencies. We are open to 
making this project easy to use with other package managers too (Bower etc).

Install the module using the git url like so:

```shell
npm install git+http://git.prod.skyscanner.local/design/living-styles.git#v0.0.1 --save-dev
```

Import the styles that you want to consume:

```scss
@import "../node_modules/living-styles/colours";
```
> Note: Remember to adjust the import path relative to your `node_modules` folder

Available imports:

- `living-styles/colours` - variables for every colour in Skyscanner's palette 
- `living-styles/all` - everything

## Contact
- james.ferguson@skyscanner.net
- matthew.davidson@skyscanner.net
