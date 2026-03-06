# Implementation Plan: BpkButton v1.1 — Corner Radius Theming

**Package Branch**: `CLOV-1327` | **Date**: 2026-03-06 | **Spec**: [spec.md](spec.md)
**Input**: [specs/001-bpkbutton-baseline/spec.md](spec.md) — Change Log v1.1

---

## Summary

Expose `border-radius` as a runtime-configurable CSS custom property using the existing `utils.bpk-themeable-property` mechanism already in use for button colours. The change requires **4 line-level edits** across 3 files, plus snapshot regeneration. No new props, no new components, no new stories.

**Files changed**:
1. `packages/bpk-mixins/_buttons.scss` — 3 edits (1 replace, 2 removals)
2. `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss` — 1 removal
3. `packages/bpk-component-button/src/themeAttributes.ts` — 1 string added

---

## Technical Context

**Framework**: React 18.3.1 with TypeScript 5.9.2
**Styling**: CSS Modules + Sass (modern API with `@use`)
**Testing**: Jest 30 + Testing Library + jest-axe
**Build Tools**: Webpack 5, Babel 7
**Package Manager**: npm >=10.7.0
**Constraints**: Modern Sass (`@use` only), `rem` units, BEM naming, Backpack constitution

---

## Constitution Check

### Core Principles Compliance

- [x] **Component-First Architecture**: No new package; modifying existing `bpk-component-button` and `bpk-mixins`
- [x] **Naming Conventions**: CSS variable `--bpk-button-border-radius` and attribute `buttonBorderRadius` follow existing patterns
- [x] **License Headers**: No new source files — existing headers unchanged
- [x] **Modern Sass**: Using `@use` + `utils.bpk-themeable-property` — no `@import` introduced
- [x] **Accessibility-First**: `border-radius` is a visual-only property; no ARIA or keyboard behaviour changes
- [x] **TypeScript**: `themeAttributes.ts` change is a string array literal — no type regressions
- [x] **SemVer**: MINOR bump — new optional capability, backwards-compatible (see Versioning section)
- [x] **Deprecation Management**: No deprecations involved
- [x] **Test Coverage**: Snapshot update only — no new coverage gaps introduced

### Technology Compliance

- [x] **CSS Modules**: Sass mixin change in `_buttons.scss` (consumed by `BpkButton.module.scss`) — CSS Modules unaffected
- [x] **rem Units**: `border-radius` token value is already in `rem`; no unit changes introduced
- [x] **Design Tokens**: Fallback remains `tokens.$bpk-button-border-radius`; no token removed or added
- [x] **BEM Naming**: No new class names
- [x] **RTL Support**: `border-radius` is non-directional; no RTL change needed
- [x] **Browser Support**: `var()` with fallback supported on all target browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)

### No Constitution Violations

No violations. Component follows all Backpack standards.

---

## Project Structure

### Affected Files (minimal)

```text
packages/bpk-mixins/
└── _buttons.scss                ← 3 edits

packages/bpk-component-button/src/
└── themeAttributes.ts           ← 1 string added

packages/bpk-component-button/src/BpkButtonV2/
└── BpkButton.module.scss        ← 1 removal

packages/bpk-component-button/src/BpkButtonV2/
└── __snapshots__/
    └── BpkButton-test.tsx.snap  ← regenerate (jest --updateSnapshot)
```

### Documentation (this feature)

```text
specs/001-bpkbutton-baseline/
├── spec.md          ✅ Updated (v1.1 entry in Change Log)
├── plan.md          ← this file
├── research.md      ✅ Generated
├── api-design.md    ✅ Generated
└── styling-guide.md ✅ Generated
```

---

## Phase 0: Research Findings

See [research.md](research.md) for full details. Summary of key decisions:

| # | Finding | Decision |
|---|---|---|
| 1 | `bpk-themeable-property` pattern | Use `@include utils.bpk-themeable-property(border-radius, --bpk-button-border-radius, tokens.$bpk-button-border-radius)` |
| 2 | Base declaration location | Replace line 42 in `bpk-button` mixin |
| 3 | Duplicate declarations | Remove from `bpk-button--icon-only`, `bpk-button--large-icon-only`, and `BpkButton.module.scss` (icon-only classes) |
| 4 | Theme attribute registration | Add `'buttonBorderRadius'` to `buttonThemeAttributes` |
| 5 | Versioning | MINOR bump |
| 6 | Test impact | Snapshot regeneration only |
| 7 | RTL impact | None |
| 8 | Storybook examples | None needed |

---

## Phase 1: Design Decisions

### API Design

See [api-design.md](api-design.md). Summary:

- **No new props** on `BpkButton`
- Add `'buttonBorderRadius'` to `buttonThemeAttributes` in `themeAttributes.ts`
- CSS variable: `--bpk-button-border-radius`
- Theme attribute resolves to CSS variable via `bpk-theming` convention

### Styling Design

See [styling-guide.md](styling-guide.md). Summary of 4 edits to `_buttons.scss`:

**Edit 1** — Base mixin `bpk-button` (~line 42): replace static declaration

```scss
// Before
border-radius: tokens.$bpk-button-border-radius;

// After
@include utils.bpk-themeable-property(
  border-radius,
  --bpk-button-border-radius,
  tokens.$bpk-button-border-radius
);
```

**Edit 2** — `bpk-button--icon-only` (~line 535): remove duplicate

```scss
// Remove this line:
border-radius: tokens.$bpk-button-border-radius;
```

**Edit 3** — `bpk-button--large-icon-only` (~line 558): remove duplicate

```scss
// Remove this line:
border-radius: tokens.$bpk-button-border-radius;
```

**Edit 4** — `BpkButton.module.scss`: remove duplicate static `border-radius` declarations (icon-only classes) so they do not override the themeable property from the mixins.

```scss
// Remove any static border-radius declarations in icon-only module classes,
// so border-radius is controlled by the themeable mixin output.
// e.g.
// border-radius: tokens.$bpk-button-border-radius;
```

### No New Storybook Examples

The change is an invisible runtime capability. No new visual variants are introduced. Existing stories remain valid.

---

## Dependencies

### Internal (already present — no new deps)

- `bpk-mixins/_utils.scss` — provides `bpk-themeable-property` mixin (already `@use`d in `_buttons.scss`)
- `bpk-mixins/tokens` — provides `$bpk-button-border-radius` (already imported)
- `bpk-theming` — consumes `buttonThemeAttributes` at the consumer level (no change inside this package)

### External

None. No new external dependencies.

---

## Testing Strategy

### What changes in tests

**Snapshot tests** — The compiled CSS output of all button variants will change: `border-radius` will appear twice per selector instead of once. Snapshots must be regenerated.

```bash
# From repo root
npx jest packages/bpk-component-button --updateSnapshot
```

### What does NOT change

- **Behavioural tests** — No new interaction branches. Existing tests remain valid without modification.
- **Accessibility tests** (`accessibility-test.tsx`) — Border radius has no ARIA impact. No changes needed.
- **Visual regression tests** (Percy) — Default appearance is unchanged (CSS variable fallback = same token value). No new Percy failures expected.

---

## Migration & Versioning

**Version bump**: MINOR for `bpk-component-button`

**Rationale**: New opt-in theming capability. No breaking changes:
- Default appearance unchanged (token fallback preserved)
- No existing prop removed or renamed
- No CSS class removed or renamed
- `buttonBorderRadius` is a new attribute — consumers who don't use it are unaffected

**Breaking changes**: None.

**Deprecations**: None.

---

## Release Checklist

- [ ] `_buttons.scss` Edit 1: replace `border-radius` in `bpk-button` mixin with `bpk-themeable-property` include
- [ ] `_buttons.scss` Edit 2: remove `border-radius` from `bpk-button--icon-only`
- [ ] `_buttons.scss` Edit 3: remove `border-radius` from `bpk-button--large-icon-only`
- [ ] BpkButton.module.scss: remove duplicate static border-radius declaration(s) in icon-only module classes
- [ ] `themeAttributes.ts`: add `'buttonBorderRadius'` to `buttonThemeAttributes`
- [ ] Snapshots regenerated (`jest --updateSnapshot`)
- [ ] All tests pass (`npm run jest -- packages/bpk-component-button`)
- [ ] Lint passes (`npm run lint`)
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] MINOR version bump applied to `packages/bpk-component-button/package.json`
- [ ] Changelog updated

---

## References

- **Spec**: [spec.md](spec.md) — v1.1 Change Log entry
- **Research**: [research.md](research.md)
- **API Design**: [api-design.md](api-design.md)
- **Styling Guide**: [styling-guide.md](styling-guide.md)
- **Mixin source**: `packages/bpk-mixins/_utils.scss` — `bpk-themeable-property` definition
- **Button Sass**: `packages/bpk-mixins/_buttons.scss` — lines 36–559
- **Theme attributes**: `packages/bpk-component-button/src/themeAttributes.ts`
- **Constitution**: `.specify/memory/constitution.md`
</file>
