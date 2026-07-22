# Project Setup

## Install

```bash
npm install @skyscanner/backpack-web
```

React 18.3.1–19.2.5 is required as a peer dependency (both React 18 and React 19 are supported).

## CSS / styles

Import the base stylesheet once at the application entry point so all design tokens and component styles are available globally:

```tsx
import '@skyscanner/backpack-web/bpk-stylesheets';
```

This import provides:

- All Backpack design tokens as CSS custom properties on `:root` (light theme) and `:root[data-theme="dark"]` (dark theme overrides)
- Base/normalize styles and component class styles

Two additional stylesheets are optional and must be imported separately if used:

```tsx
import '@skyscanner/backpack-web/bpk-stylesheets/font';    // Skyscanner Relative font (UI text)
import '@skyscanner/backpack-web/bpk-stylesheets/larken';   // Larken font (editorial text styles only)
```

If the target bundler is Vite (no SCSS transpilation), use the `.css` variants instead: `@skyscanner/backpack-web/bpk-stylesheets/base.css`, `/font.css`, `/larken.css`.

Do NOT add `@source`/`@tailwind` rules for this package — Backpack ships its own pre-compiled CSS and does not integrate with a Tailwind pipeline.

## Using components

Backpack does not have a single barrel export — each component is its own package, imported by its own path:

```tsx
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
```

Never import from a package's internal `/src/...` path — only the package root (`@skyscanner/backpack-web/bpk-component-{name}`) is part of the public API.

## BpkProvider (required for layout primitives and some components)

Unlike a global theme provider, `BpkProvider` is **scoped** — it is required only by:

- The layout primitive family: `BpkBox`, `BpkFlex`, `BpkGrid`/`BpkGridItem`, `BpkStack`/`BpkHStack`/`BpkVStack` (from `bpk-component-layout`)
- Ark UI–based components that need correct RTL behaviour, currently including `BpkCheckboxCard` and `BpkCollapsible` (check a component's own README for "requires BpkProvider" as more components migrate to Ark UI)

Simple presentational components (`BpkButton`, `BpkText`, `BpkBadge`, etc.) do **not** require a provider and work standalone.

```tsx
import { BpkProvider, BpkBox, BpkFlex, BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';

function App({ children }) {
  return (
    <BpkProvider>
      <BpkFlex direction="column" gap={BpkSpacing.MD}>
        {children}
      </BpkFlex>
    </BpkProvider>
  );
}
```

Wrap the app root in `BpkProvider` by default — it's harmless for components that don't need it, and required for layout primitives.

## Dark mode

Dark mode is a **DOM attribute + CSS custom property switch**, not a React context/provider:

```html
<html data-theme="dark">
```

Setting `data-theme="dark"` on `<html>` flips every Backpack component to its dark-theme CSS variables (shipped in the base stylesheet). `BpkThemeToggle` (`bpk-component-theme-toggle`) is a ready-made switch component for toggling this attribute; `BpkThemeProvider` (`bpk-theming`) is a **separate, unrelated** mechanism for overriding individual theme values (e.g. link color) on a per-subtree basis — don't confuse the two.

## Build configuration

No special bundler configuration is required for webpack-based projects (Backpack ships CSS-in-JS-free, pre-compiled styles plus SCSS sources). Vite projects must use the `.css`-suffixed stylesheet imports noted above since Vite does not transpile `.scss` from `node_modules`.

## Rules

- Always import `@skyscanner/backpack-web/bpk-stylesheets` once at the app root — no component will look correct without it.
- Wrap the app root in `BpkProvider` (from `bpk-component-layout`) — required for layout primitives and Ark UI-based components, harmless otherwise.
- Import every component from its own `@skyscanner/backpack-web/bpk-component-{name}` path — there is no single barrel import.
- Dark mode is controlled via `data-theme="dark"` on `<html>`, not a React provider — don't invent a `<ThemeProvider theme="dark">`-style API.
- All component CSS classes are namespaced with `bpk-` to avoid collisions.
