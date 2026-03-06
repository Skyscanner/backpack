<!--
==============================================================================
DOCUMENT PURPOSE: Phase 0 — Research & Discovery
Feature: BpkButton v1.1 — Corner Radius CSS-Variable Theming
Branch: CLOV-1327
Date: 2026-03-06
Scope: Strictly limited to making border-radius themeable. No other changes.
==============================================================================
-->

# Research: BpkButton v1.1 — Corner Radius Theming

## Summary of Change

Expose `border-radius` via `utils.bpk-themeable-property` so it can be overridden at runtime through the `bpk-theming` mechanism, identical to how colour properties are currently handled. The default visual appearance is unchanged.

---

## Finding 1 — `bpk-themeable-property` pattern

**Decision**: Use `@include utils.bpk-themeable-property(border-radius, --bpk-button-border-radius, tokens.$bpk-button-border-radius)`.

**Rationale**: This is the established Backpack pattern for all other themeable properties in `_buttons.scss` (colour, background-colour). The mixin emits two declarations:

```scss
border-radius: tokens.$bpk-button-border-radius;          // compiled fallback
border-radius: var(--bpk-button-border-radius, tokens.$bpk-button-border-radius); // CSS variable override
```

Older browsers that do not support CSS custom properties use the first declaration as a reliable fallback.

**Alternatives considered**: Using a CSS custom property directly without the mixin (`border-radius: var(--bpk-button-border-radius, ...)`) — rejected because it omits the compiled-token fallback the mixin provides, inconsistent with existing pattern.

**Reference**: `packages/bpk-mixins/_utils.scss` lines 200–203.

---

## Finding 2 — Base declaration location

**Decision**: Replace the single static declaration at line 42 of `packages/bpk-mixins/_buttons.scss` (inside the `bpk-button` base mixin).

**Rationale**: `border-radius` is declared once in the base mixin and inherited by all nine button types and both sizes through the cascade. There is no per-type or per-size override needed.

**Current code**:
```scss
// packages/bpk-mixins/_buttons.scss line 42
border-radius: tokens.$bpk-button-border-radius;
```

**Required change**:
```scss
@include utils.bpk-themeable-property(
  border-radius,
  --bpk-button-border-radius,
  tokens.$bpk-button-border-radius
);
```

---

## Finding 3 — Duplicate declarations in icon-only mixins

**Decision**: Remove the `border-radius` declarations from `bpk-button--icon-only` (line 535) and `bpk-button--large-icon-only` (line 558).

**Rationale**: Both mixins currently re-declare `border-radius: tokens.$bpk-button-border-radius;`. These are identical to the base value and appear to have been carried over as defensive copies. If left in place after the base mixin change, they would **override the CSS variable** with the static token value, silently defeating the theming mechanism for icon-only buttons.

**Current code (both mixins)**:
```scss
border-radius: tokens.$bpk-button-border-radius;
```

**Required change**: Delete these lines. The value cascades correctly from the base mixin.

**No visual regression**: Token value is identical; default appearance is unchanged. Icon-only buttons inherit the same computed value they had before.

---

## Finding 4 — Theme attribute registration

**Decision**: Add `'buttonBorderRadius'` to the `buttonThemeAttributes` array in `packages/bpk-component-button/src/themeAttributes.ts`.

**Rationale**: The `bpk-theming` package uses the `themeAttributes` arrays to map human-readable attribute names to CSS variable names via a predictable convention (`buttonBorderRadius` → `--bpk-button-border-radius`). Without this registration, the CSS variable cannot be set through the standard theming API.

**Current**:
```typescript
export const buttonThemeAttributes = ['buttonFontSize'];
```

**Required change**:
```typescript
export const buttonThemeAttributes = ['buttonFontSize', 'buttonBorderRadius'];
```

**Pattern reference**: Compare with `buttonFontSize` already in the array — follows identical camelCase naming convention.

---

## Finding 5 — Versioning

**Decision**: **MINOR** version bump for `bpk-component-button`.

**Rationale**: Per `decisions/versioning-rules.md`, a MINOR bump is appropriate when new optional capabilities are added in a backwards-compatible manner. This change:
- Adds a new theme attribute (`buttonBorderRadius`) — opt-in, no existing usage broken.
- Default appearance is unchanged (token fallback preserves existing rendered output).
- No breaking changes to any prop or public API.

---

## Finding 6 — Test impact

**Decision**: Regenerate snapshot tests only.

**Rationale**: The compiled CSS for snapshots will change: the `border-radius` declaration will appear twice (token fallback + `var(...)`) instead of once. No new rendering branches are introduced and no new component behaviour exists to test behaviourally. Existing accessibility tests and interaction tests remain valid without changes.

Affected test file: `packages/bpk-component-button/src/BpkButtonV2/BpkButton-test.tsx` (snapshots) and the `__snapshots__/` directory.

---

## Finding 7 — RTL impact

**Decision**: No RTL changes required.

**Rationale**: `border-radius` is not a directional property and requires no RTL override. The existing RTL handling in the button component is unaffected.

---

## Finding 8 — No new Storybook examples required

**Decision**: No new stories or examples files.

**Rationale**: The theming mechanism is tested via the existing theming test infrastructure. The Storybook stories cover visual states; corner radius is a visual property but the change does not introduce new visible variants — it only makes the existing radius runtime-configurable. Adding a story for "themed corner radius" would require consumer-side theme setup that is outside this component's scope.

---

## Scope Boundary Confirmation

The following are explicitly **out of scope** for this plan and must not appear in any implementation task:

| Area | Reason |
|---|---|
| Disabled state colour theming | Known Limitation — separate future work |
| `link` type colour theming | Known Limitation — separate future work |
| Loading behaviour consolidation | Known Limitation — separate future work |
| Focus ring styling | Known Limitation — separate future work |
| New component props | Not required by spec v1.1 |
| New Storybook examples | Not needed for this change |
