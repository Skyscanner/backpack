---
name: backpack-storybook-global-css
description: |
  Add a global (non-scoped) stylesheet to the Backpack Storybook preview. Use when:
  (1) you need to style `html`, `body`, or any element selector in Storybook and it has
  no effect, (2) importing a plain `.css` file into `.storybook/preview.tsx` triggers
  "Module build failed (from ./node_modules/css-loader/dist/cjs.js): SyntaxError",
  (3) you're wiring up a preview-wide concern like dark-mode canvas background,
  font smoothing, or body reset that must apply outside component scope. Explains
  why the repo's webpack config forces CSS Modules on every CSS/SCSS file and how
  the `:global` escape hatch is the idiomatic workaround.
author: Claude Code
version: 1.0.0
date: 2026-04-22
---

# Backpack Storybook — Global (unscoped) stylesheets

## Problem

You want to apply a rule to `html`, `body`, or another bare element selector in
Storybook — for example to turn the canvas dark when `[data-theme="dark"]` is set,
or to add a body reset — but one of two things happens:

1. **If you use `.css`**: webpack fails with `Module build failed (from css-loader): SyntaxError`.
2. **If you use `.scss` without `:global`**: the build succeeds but the rule has no effect,
   because `css-loader`'s CSS Modules mode rewrites `body` / `html` / `.foo` selectors into
   hashed locals like `body-a3f2e`, so nothing matches the real DOM.

The CSS Modules rewrite is intentional for component styles (every `.module.scss` in the
repo relies on it), but it's hostile to preview-level global styling.

## Context / Trigger Conditions

- Touching `.storybook/preview.tsx` or adding a new stylesheet under `.storybook/`.
- Symptoms:
  - `ERROR in ./.storybook/preview.css … Module build failed … SyntaxError`
  - CSS rule is present in the emitted bundle but DOM element doesn't match (check
    `html { background: … }` → inspect `<html>` in the Storybook iframe and see no
    `background` in computed styles).
- Context markers: `.storybook/webpack.config.js`, `css-loader` with
  `modules: { localIdentName: '[local]-[hash:base64:5]' }`, `@skyscanner/backpack-web`.

## Root cause

`.storybook/webpack.config.js` in this repo pushes two rules, one for `.css` and one for
`.scss`, both routed through `css-loader` with `modules` enabled (and the same
`localIdentName`). There is **no** exception for global stylesheets — every CSS and SCSS
import is treated as a CSS Module. Plain `.css` breaks because css-loader tries to hash
element selectors it can't parse as local idents; `.scss` "succeeds" silently but scopes
the selectors.

## Solution

1. Create a `.scss` file (not `.css`) under `.storybook/`.
2. Wrap global rules in a `:global { ... }` block so css-loader leaves the selectors alone.
3. Import the file from `.storybook/preview.tsx`.

```scss
// .storybook/preview.scss
:global {
  html,
  body {
    background-color: var(--bpk-canvas-default);
    color: var(--bpk-text-primary);
  }
}
```

```tsx
// .storybook/preview.tsx
import '../packages/bpk-stylesheets';
import '../packages/bpk-stylesheets/font';
import '../packages/bpk-stylesheets/larken';
import './preview.scss';
```

## Verification

- `npm run storybook` rebuilds with no `Module build failed` / `SyntaxError` in the log.
- Open `http://localhost:9001/iframe.html?id=…` and inspect `<html>` in devtools —
  the `background-color` and `color` rules should appear in the computed styles and
  reference the intended CSS variables (e.g. `var(--bpk-canvas-default)`).
- When the `@storybook/addon-themes` toolbar flips `data-theme="dark"` on `<html>`,
  the canvas colour updates live (no reload).

## Notes

- **Don't** fix this by editing `.storybook/webpack.config.js` to exclude specific files
  from CSS Modules — it diverges from the repo's established convention and breaks the
  mental model of "all stylesheets are modules." The `:global` wrapper is the idiomatic
  fix and matches how `packages/bpk-stylesheets/index.scss` already scopes its rules
  (via `:global(body.scaffold-font-size) { … }` etc.).
- `:global` works equally well on individual selectors (`:global(body) { … }`) if you
  only need to escape one rule inside an otherwise-scoped file.
- This gotcha is Storybook-specific. Component `.module.scss` files outside `.storybook/`
  intentionally rely on the CSS Modules behaviour — do not add `:global` there.
- Same pattern applies to any preview-level concern: resets, `@keyframes` you want globally
  available, `::before`/`::after` on `body`, etc.

## References

- `.storybook/webpack.config.js` — the CSS/SCSS rules that force modules on everything.
- [css-loader `modules` docs](https://webpack.js.org/loaders/css-loader/#modules) — how
  `:global` and `:local` scoping work.
- `packages/bpk-stylesheets/index.scss` — in-repo example of the `:global(...)` escape
  hatch used on scoped selectors.
