# Backpack Design System Guidelines

## Product character

Backpack is Skyscanner's **B2C, travel-booking** design system — a broad, general-purpose component library rather than a single product's bespoke UI kit. It's built for high-traffic consumer flows (search, results, booking) across web and native, so it favours clarity and speed over density.

- **Density**: breathable — generous spacing (`BpkSpacing.Base` / 16px default) over compact information density.
- **Surface strategy**: hierarchy is created primarily through **surface color and elevation** (shadow), not borders. Borders are reserved for input outlines and explicit separators (`BpkDivider`).
- **Color palette**: primarily neutral; brand blue (`core-accent`) is used sparingly for primary actions, links, and active states — never as a large background.
- **Corner style**: rounded throughout, scaling with element size (small controls ~8px, cards ~24px, pills/avatars fully round). No sharp-corner convention.
- **Typography**: Skyscanner Relative for all UI text, Larken reserved for editorial display copy; hierarchy is conveyed entirely through the `BpkText` `textStyle` scale (`heading1`–`5`, `bodyDefault`, `label1`–`3`, `caption`, etc.) — never raw font-size/weight.
- **Iconography**: `bpk-component-icon` — ~300 fixed icon components (not a dynamic name lookup), each in 16px (`sm/`) and 24px (`lg/`) fixed sizes.

## Package

| Export | Description |
| --- | --- |
| `@skyscanner/backpack-web/bpk-component-{name}` | Individual component packages (React, ES module) — there is no single barrel export |
| `@skyscanner/backpack-web/bpk-stylesheets` | Design tokens (CSS custom properties) + base/component CSS |
| `@skyscanner/backpack-web/bpk-component-layout` | Layout primitives (`BpkProvider`, `BpkBox`, `BpkFlex`, `BpkGrid`, `BpkStack`) + spacing tokens |

## Reading order

**MUST READ before writing any code:**

1. This file (`overview.md`) — product character, rules, routing
2. `setup.md` — imports, providers, build configuration
3. `foundations/` — all token files (color, typography, spacing, borders, iconography)
4. `components/overview.md` — full component catalog with alternative names

**Read on-demand:**

- `components/{name}.md` — read BEFORE using that component
- `composition/{pattern}.md` — read when building that page-level pattern
- `content-and-terminology.md` — read when writing any user-facing copy
- `keywords.md` — consult when the prompt uses product-specific jargon

## Mandatory pre-code checklist

Run this on **every** prompt before writing a single line of code:

1. **Classify intent** — new build, edit, import, or composition?
2. **Identify components** — which Backpack components does this need? Check `components/overview.md` (and `keywords.md` for jargon).
3. **Read the component file** — open `components/{name}.md` for each component before using it.
4. **Apply tokens** — plan to use foundation tokens (via component props) for all color, spacing, and typography.
5. **Check copy** — plan to validate user-facing strings against `content-and-terminology.md`.

## Priority stack

- **P0 — First-prompt obedience**: build exactly what the prompt asks; don't add unrequested scope.
- **P1 — Typography supremacy**: all text renders through `BpkText` using the `textStyle` scale from `foundations/typography.md`.
- **P2 — Component supremacy**: always use a Backpack component when one exists; never raw HTML or a non-Backpack equivalent.
- **P3 — Token supremacy**: all color/spacing/radius comes from Backpack tokens (usually via a component prop) — never hardcoded values.
- **P4 — Composition fidelity**: follow `composition/` patterns for page structure.
- **P5 — Content standards**: follow `content-and-terminology.md`.

## No-custom-builds gate

**If you cannot find a suitable Backpack component, STOP.** Do not silently build custom HTML/CSS. Instead, ask the user a multiple-choice question:

```
I couldn't find a Backpack component for [missing piece]. How would you like to proceed?
1. Search again (different terms)
2. Use a substitute ([closest component name])
3. Build it custom (I'll write custom HTML/CSS for this piece)
```

Wait for the user's choice before writing code.

## Default page structure

Backpack does not mandate a single fixed header/nav/footer chrome for every page — it's a component library used across many different product surfaces, not one product with one shell. Instead:

- Use `BpkNavigationBar` for a top app bar on any screen that needs one (title + leading/trailing actions), especially modals and full-screen views.
- Use `BpkHorizontalNav` or `BpkNavigationTabGroup` for primary in-page navigation between sibling views.
- Use `BpkBreadcrumb` for hierarchical wayfinding on deep pages.
- There is no dedicated `BpkFooter` component — a page footer is typically composed from `BpkText`/`BpkLink` inside a layout primitive (`BpkFlex`/`BpkBox`).

If the prompt implies a specific page type (e.g. "search results page," "booking confirmation"), check `composition/overview.md` for a matching pattern before improvising a layout.

## Rules

- Prefer Backpack components over raw HTML (`BpkButton` not `<button>`, `BpkInput` not `<input>`, `BpkText` not `<p>`/`<h1>`).
- All spacing/color/typography must come from Backpack tokens, applied via component props — never hardcoded values.
- Corner radius is always set by the component itself (see `foundations/borders.md`) — never override it.
- Import styles once via `import '@skyscanner/backpack-web/bpk-stylesheets'` at the app root, and wrap the app in `BpkProvider` (see `setup.md`).
- Every component is imported from its own `@skyscanner/backpack-web/bpk-component-{name}` path — there is no single barrel import.
