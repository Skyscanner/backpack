# bpk-stylesheets

> Backpack's stylesheets.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

Within your Javascript (usually the entrypoint or top-most JS file)

### Webpack
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

### Vite

As Vite will not transpile the SCSS files, you will need to import the CSS files directly:

```js
import '@skyscanner/backpack-web/bpk-stylesheets/base';
import '@skyscanner/backpack-web/bpk-stylesheets/base.css';
```

By default font rendering is not included if you need to include Skyscanner Relative in your styles, import it using the following:

```js
import '@skyscanner/backpack-web/bpk-stylesheets/font.css';
```

### Larken font

For Editorial text, the Larken font will also need to be imported:

```js
import '@skyscanner/backpack-web/bpk-stylesheets/larken.css';
```

### Repositories overview

Font updates involve coordination between three repositories:
- [Backpack Foundations](https://github.com/Skyscanner/backpack-foundations): defines shared design tokens and font-family values.
- [Backpack](https://github.com/Skyscanner/backpack): implements stylesheet updates and changelogs.
- [bpk-fonts](https://github.com/Skyscanner/bpk-fonts): hosts the actual font files deployed to the CDN.

## How to update Backpack fallback fonts

Backpack uses two font bundles:
- UI text: `font.scss` (Skyscanner Relative)
- Editorial text: `larken.scss` (Larken + Noto fallbacks)

Fallbacks are needed for non‑Latin scripts so text renders correctly everywhere.

### Where to change
- Update Skyscanner Relative files and Noto fallback files in `packages/bpk-stylesheets/font.scss`.
- Update Larken and Noto fallback files in `packages/bpk-stylesheets/larken.scss`.

### Script mapping
Defined in `font.scss`, `larken.scss`
- Arabic → `Noto Sans Arabic`
- Hebrew → `Noto Sans Hebrew`
- Devanagari → `Noto Serif Devanagari`
- Thai → `Noto Serif Thai`
- Simplified Chinese → `Noto Sans SC`
- Traditional Chinese → `Noto Sans TC`
- Japanese → `Noto Sans JP`
- Korean → `Noto Sans KR`
- Generic serif coverage → `Noto Serif`

### Update in 5 steps
1. Prepare files
   - Verify Skyscanner Relative includes Noto fonts for Arabic / Hebrew / Devanagari / Thai / Simplified Chinese / Traditional Chinese / Japanese / Korean fallbacks, as defined in [$bpk-font-family-base](https://github.com/Skyscanner/backpack-foundations/blob/74e2e6644abadb9e95842ff5797b1f9669208cbb/packages/bpk-foundations-web/tokens/base.default.scss#L781C1-L781C22).
   - Prefer `woff2`; include `woff`/`ttf` only if needed.
   - Add the files to [Skyscanner/bpk-fonts](https://github.com/Skyscanner/bpk-fonts) using hashed filenames. After merge and deploy, they are served from `https://js.skyscnr.com/sttc/bpk-fonts`.
   - Cross-repo change clarification:
     - If the change involves updating token values or adding new script fallbacks, make changes in Backpack Foundations.
     - If the change only affects Backpack stylesheets (e.g. font.scss, $base-url, changelog), update within Backpack.
2. Edit SCSS
   - In `font.scss` and/or `larken.scss`, update each `@font-face` URL.
   - Keep `font-family` names and weights the same unless design says otherwise.
   - If the CDN path changes, update `$base-url` at the top of the file.
3. Build
   
   ```bash
   npm run build:stylesheets
   ```
4) Verify
  - Import bundles:
    
    ```js
    import '@skyscanner/backpack-web/bpk-stylesheets/font';
    import '@skyscanner/backpack-web/bpk-stylesheets/larken';
    ```
  - Visual & glyph validation:
    - Check that Arabic / Hebrew / Devanagari / Thai / SC / TC / JP / KR scripts show no missing glyphs.
    - Verify all font weights and styles (normal / italic) render correctly.
    - For RTL languages (Arabic / Hebrew), test with `dir="rtl"` and appropriate `lang` attributes.
  - DevTools checks:
    - Computed: Confirm actual `font-family` and `font-weight`.
    - Network: Ensure fonts load from the CDN and the `woff2` format is used.
  - Visual regression:
    - Use [bpk-stylesheets-fonts](https://backpack.github.io/storybook/?path=/story/bpk-stylesheets-fonts--skyscanner-relative-font) storybook to capture before-and-after snapshots for visual verification.
  - Performance tips:
    - Use `font-display: swap` for better perceived performance.
    - Add `preconnect` or `preload` to the CDN when appropriate to reduce FOUT/FOIT.
5) Submit
  - Describe the change and include screenshots where helpful.

### Notes on weights
- Browsers pick the closest available weight if an exact one is missing.
- Always provide an explicit `@font-face` for each weight/style combination you depend on.
- Provide fallback font files for every weight you plan to use across scripts. For example:
  - Relative (in `font.scss`): 400, 400 italic, 500, 500 italic, 700, 700 italic, 900, 900 italic.
  - Larken + fallbacks (in `larken.scss`): Larken 300 and 400. If editorial styles use more weights, add matching `@font-face` for each Noto fallback as well.
- If you introduce a new weight, add the corresponding `@font-face` entries.
- In verification, check each used weight renders from the expected family in DevTools.

## Contributing

Don't forget to rebuild and commit `base.js` after you make changes to this package.

To build the `base.js` file run `npm run build:stylesheets` in the root folder.
