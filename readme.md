# Living Styles
> Up-to-date globally applicable styles for use on Skyscanner's web products.

## Usage

Install the module using the git url like so:

```shell
npm install git+http://git.prod.skyscanner.local/design/living-styles.git#v0.4.0 --save-dev
```

Import the styles that you want to consume:

```scss
@import "../node_modules/living-styles/colours";
```

> Note: Remember to adjust the import path relative to your `node_modules` folder.

Available imports:

- `colours` - hex code variables for every colour in Skyscanner's palette
- `forms` - mixins for form elements (light & dark backgrounds)
- `icons` - mixins for Skyscanner's icon pack 
- `logos` - data uri variables for Skyscanner's logos
- `spinners` - mixins for spinners
- `units` - incremental unit variables for properties such as padding and border-radius
- `all` - all of the above

## Contact
- james.ferguson@skyscanner.net
- matthew.davidson@skyscanner.net
