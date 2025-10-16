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

## How to update Backpack fallback fonts

Backpack uses two font bundles:
- UI text: `font.scss` (Skyscanner Relative)
- Editorial text: `larken.scss` (Larken + Noto fallbacks)

Fallbacks are needed for non‑Latin scripts so text renders correctly everywhere.

### Where to change
- Update Skyscanner Relative files and Noto fallback files in `packages/bpk-stylesheets/font.scss`.
- Update Larken and Noto fallback files in `packages/bpk-stylesheets/larken.scss`.

### Script mapping (in `font.scss`, `larken.scss`)
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
   - Verify Skyscanner Relative includes Noto fonts for Arabic / Hebrew / Devanagari / Thai / Simplified Chinese / Traditional Chinese / Japanese / Korean fallbacks, as defined in [$bpk-font-family-base] (https://github.com/Skyscanner/backpack-foundations/blob/74e2e6644abadb9e95842ff5797b1f9669208cbb/packages/bpk-foundations-web/tokens/base.default.scss#L781C1-L781C22).
   - Prefer `woff2`; include `woff`/`ttf` only if needed.
   - Add the files to [Skyscanner/bpk-fonts](https://github.com/Skyscanner/bpk-fonts) using hashed filenames. After merge and deploy, they are served from `https://js.skyscnr.com/sttc/bpk-fonts`.
2. Edit SCSS
   - In `font.scss` and/or `larken.scss`, update each `@font-face` URL.
   - Keep `font-family` names and weights the same unless design says otherwise.
   - If the CDN path changes, update `$base-url` at the top of the file.
3. Build
   ```bash
   npm run build:stylesheets
   ```
4. Verify
   - Import bundles:
     ```js
     import '@skyscanner/backpack-web/bpk-stylesheets/font';
     import '@skyscanner/backpack-web/bpk-stylesheets/larken';
     ```
   - Check Arabic/Hebrew/Devanagari/Thai/SC/TC/JP/KR show no missing glyphs and all font weights render correctly.
   - DevTools → Computed: confirm actual font family and `font-weight`.
   - Network: fonts load from the CDN and `woff2` is used.
5. Submit
   - Describe the change and include screenshots where helpful.

### Notes on weights
- Browsers pick the closest available weight if an exact one is missing.
- Provide fallback font files for every weight you plan to use across scripts. For example:
  - Relative (in `font.scss`): 400, 400 italic, 500, 500 italic, 700, 700 italic, 900, 900 italic.
  - Larken + fallbacks (in `larken.scss`): Larken 300 and 400 today. If editorial styles use more weights, add matching `@font-face` for each Noto fallback as well.
- If you introduce a new weight, add the corresponding `@font-face` entries.
- In verification, check each used weight renders from the expected family in DevTools.

## Contributing

Don't forget to rebuild and commit `base.js` after you make changes to this package.

To build the `base.js` file run `npm run build:stylesheets` in the root folder.
