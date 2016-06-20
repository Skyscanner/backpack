# Living Styles
> Up-to-date sass mixins for use on Skyscanner's web products.

## Usage

Install the module using the git url like so:

```shell
npm install git+http://git.prod.skyscanner.local/design/living-styles.git#v2.1.0 --save-dev
```

> Note: If you're seeing problems like this
> ```
> npm ERR! fetch failed http://git.prod.skyscanner.local/design/living-styles.git#v2.1.0
> npm WARN retry will retry, error on last attempt: Error: fetch failed with status code 406
> ```
> under npm 3 make sure you're using the `git+http` schema.

Import the styles that you want to consume:

```scss
@import "~/living-styles/colours";
```

> Note: The tilde import syntax (`~/`) is webpack specific, otherwise adjust the import path relative to your `node_modules` folder.

Available imports:

- `colours` - hex code variables for every colour in Skyscanner's palette
- `forms` - mixins for form elements (light & dark backgrounds)
- `icons` - mixins for Skyscanner's icon pack
- `logos` - data uri variables for Skyscanner's logos
- `spinners` - mixins for spinners
- `units` - incremental unit variables for properties such as padding and border-radius
- `all` - all of the above

# Colours

`@import "~/living-styles/colours";`

Simply reference the variables as and when needed. Each variable uses the same naming convention of color name + intensity. The higher the intensity value, the darker the color.
- `$ls-color-blue-100`
- `$ls-color-yellow-800`

# Icons

`@import "~/living-styles/icons";`

Icons are available in two sizes, small @ 16px and large @ 24px. These are available in any colour using the following mixins.
- `@include ls-icon-lg(ls-icon-account-blue-500);`
- `@include ls-icon-sm(ls-icon-account-blue-500);`

# Forms
`@import "~/living-styles/forms";`

We currently have support for form elements on dark and light backgrounds

For example: `@include ls-label-dark();` will generate the relevant CSS properties for labels on dark backgrounds, whereas `@include ls-label();` will generate CSS properties for labels on light backgrounds.
- `@include ls-label();`
- `@include ls-input-text();`
- `@include ls-input-radio();`
- `@include ls-input-checkbox();`
- `@include ls-select();`
- `@include ls-textarea();`
- `@include ls-label-dark();`
- `@include ls-input-text-dark();`
- `@include ls-input-radio-dark();`
- `@include ls-input-checkbox-dark();`
- `@include ls-select-dark();`
- `@include ls-textarea-dark();`

# Units

`@import "~/living-styles/units";`

Simply reference the variables as and when needed e.g. for padding, margins, widths and heights.
- `$ls-spacing-sixth`
- `$ls-spacing-quarter`
- `$ls-spacing-half`
- `$ls-spacing`
- `$ls-border-radius-double`
- `$ls-border-radius-triple`
- `$ls-border-radius-quadruple`

# Logos

`@import "~/living-styles/logo";`

Logos are available in the 4 formats above You can use these like so...
- `$ls-logo-inline-blue-600`
- `$ls-logo-stacked-gray-900`
- `$ls-logo-cloud-blue-600`
- `$ls-logo-tianxun-white`

# Spinners

`@import "~/living-styles/spinners";`

Spinners are available in the 3 sizes above and can be coloured just like icons.
- `@include ls-spinner-sm(ls-spinner-gray-800);`
- `@include ls-spinner-lg(ls-spinner-blue-500);`
- `@include ls-spinner-xl(ls-spinner-white);`

# Contact
- james.ferguson@skyscanner.net
- matthew.davidson@skyscanner.net
