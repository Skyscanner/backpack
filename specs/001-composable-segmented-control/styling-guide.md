# Styling Guide: BpkSegmentedControlV2

**Branch**: `001-composable-segmented-control`
**Date**: 2026-03-03
**Spec**: [spec.md](./spec.md) | **Research**: [research.md](./research.md)

---

## 1. Files

### `packages/bpk-mixins/_segmented-control.scss` (NEW — mixin library)

Follows the `_buttons.scss` / `_chips.scss` pattern: one `@mixin` per BEM element and modifier. Contains all style logic but no class selectors.

```scss
@use 'tokens';
@use 'typography';
@use 'utils';
@use 'shadows';
```

Forwarded via `packages/bpk-mixins/_index.scss`:
```scss
@forward 'segmented-control';
```

### `BpkSegmentedControlV2.module.scss` (assembles BEM structure)

Imports the mixin module and calls each mixin in the correct BEM selector. Also contains cross-element selectors (first/last child border-radius, `:has` divider, `:has` focus) that cannot live inside a self-contained mixin.

```scss
@use '../../../bpk-mixins/segmented-control';
@use '../../../bpk-mixins/utils';
```

> Import paths are relative from `src/BpkSegmentedControlV2/` to `packages/bpk-mixins/`.

---

## 2. BEM Class Structure

```
bpk-segmented-control-v2                  Root container / radiogroup
bpk-segmented-control-v2--{type}          Type variant modifier (canvas-default, etc.)
bpk-segmented-control-v2--shadow          Shadow modifier
bpk-segmented-control-v2__item            Ark-UI Item wrapper (label element)
bpk-segmented-control-v2__item-control    Ark-UI ItemControl — the visible button surface
bpk-segmented-control-v2__item-text       Ark-UI ItemText — label/icon content
```

---

## 3. CSS Custom Properties (Internal Cascade — Not Public API)

CSS custom properties are declared on `.bpk-segmented-control-v2` and cascade to child elements (`__item-control`). They are the internal mechanism for type variant theming; they are NOT documented as a public override API for consumers.

| Property | Default (canvas-default) | Controls |
|---|---|---|
| `--bpk-segmented-control-bg` | `$bpk-private-segmented-control-canvas-default-day` | Group background |
| `--bpk-segmented-control-item-color` | `$bpk-text-primary-day` | Unselected item text/icon |
| `--bpk-segmented-control-item-disabled-color` | `$bpk-text-disabled-day` | Disabled item text/icon |
| `--bpk-segmented-control-indicator-bg` | `$bpk-core-primary-day` | Selected item background |
| `--bpk-segmented-control-indicator-color` | `$bpk-text-on-dark-day` | Selected item text/icon |
| `--bpk-segmented-control-border-radius` | `$bpk-border-radius-sm` | Group + item corner radius |
| `--bpk-segmented-control-padding-x` | `tokens.bpk-spacing-base()` | Horizontal item padding |
| `--bpk-segmented-control-divider-color` | `$bpk-line-day` | Divider between items |

> Note: `--bpk-segmented-control-padding-y` and `--bpk-segmented-control-shadow` were removed. Vertical padding defaults to `0` (set via `var(--bpk-segmented-control-padding-y, 0)`). Shadow is applied via `@include shadows.bpk-box-shadow-sm` in the `--shadow` modifier mixin, not as a CSS variable.

---

## 4. SCSS Implementation

### `packages/bpk-mixins/_segmented-control.scss`

One mixin per BEM element/modifier. No class selectors — consumed by `BpkSegmentedControlV2.module.scss`.

```scss
@use 'tokens';
@use 'typography';
@use 'utils';
@use 'shadows';

@mixin bpk-segmented-control-v2 {
  --bpk-segmented-control-bg: #{tokens.$bpk-private-segmented-control-canvas-default-day};
  --bpk-segmented-control-item-color: #{tokens.$bpk-text-primary-day};
  --bpk-segmented-control-item-disabled-color: #{tokens.$bpk-text-disabled-day};
  --bpk-segmented-control-indicator-bg: #{tokens.$bpk-core-primary-day};
  --bpk-segmented-control-indicator-color: #{tokens.$bpk-text-on-dark-day};
  --bpk-segmented-control-border-radius: #{tokens.$bpk-border-radius-sm};
  --bpk-segmented-control-padding-x: #{tokens.bpk-spacing-base()};
  --bpk-segmented-control-divider-color: #{tokens.$bpk-line-day};

  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  border-radius: var(--bpk-segmented-control-border-radius);
  background-color: var(--bpk-segmented-control-bg);
  overflow: hidden;
}

@mixin bpk-segmented-control-v2--canvas-default {
  --bpk-segmented-control-bg: #{tokens.$bpk-private-segmented-control-canvas-default-day};
}

@mixin bpk-segmented-control-v2--canvas-contrast {
  --bpk-segmented-control-bg: #{tokens.$bpk-surface-default-day};
}

@mixin bpk-segmented-control-v2--surface-default {
  --bpk-segmented-control-bg: #{tokens.$bpk-canvas-contrast-day};
}

@mixin bpk-segmented-control-v2--surface-contrast {
  --bpk-segmented-control-bg: #{tokens.$bpk-private-segmented-control-surface-contrast-day};
  --bpk-segmented-control-item-color: #{tokens.$bpk-text-on-dark-day};
  --bpk-segmented-control-indicator-bg: #{tokens.$bpk-private-segmented-control-surface-contrast-on-day};
  --bpk-segmented-control-indicator-color: #{tokens.$bpk-text-on-dark-day};
  --bpk-segmented-control-divider-color: #{tokens.$bpk-line-on-dark-day};
}

@mixin bpk-segmented-control-v2--shadow {
  @include shadows.bpk-box-shadow-sm;
}

@mixin bpk-segmented-control-v2__item {
  // Ark-UI renders Item as a <label>. Reset label defaults.
  display: contents;
  cursor: pointer;

  &[data-disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }
}

@mixin bpk-segmented-control-v2__item-control {
  display: flex;
  min-height: tokens.bpk-spacing-xl();
  padding: var(--bpk-segmented-control-padding-y, 0) var(--bpk-segmented-control-padding-x);
  justify-content: center;
  align-items: center;
  transition:
    background-color tokens.$bpk-duration-xs ease-in-out,
    color tokens.$bpk-duration-xs ease-in-out,
    border-inline-start-color tokens.$bpk-duration-xs ease-in-out;
  border: none;
  background-color: var(--bpk-segmented-control-bg);
  color: var(--bpk-segmented-control-item-color);
  overflow: hidden;
  border-inline-start: tokens.$bpk-border-size-sm solid
    var(--bpk-segmented-control-item-divider-color, var(--bpk-segmented-control-divider-color));

  @include typography.bpk-label-2;

  &[data-state='checked'] {
    background-color: var(--bpk-segmented-control-indicator-bg);
    color: var(--bpk-segmented-control-indicator-color);
    border-inline-start-color: transparent;
  }

  &[data-disabled] {
    color: var(--bpk-segmented-control-item-disabled-color);
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[data-state='checked'][data-disabled] {
    color: var(--bpk-segmented-control-indicator-color);
    // Opacity restored so the indicator background and text remain readable.
    // Non-interactivity is communicated via cursor/pointer-events on __item.
    opacity: 0.8;
  }
}

@mixin bpk-segmented-control-v2__item-text {
  display: flex;
  min-width: 0; // Allows flex children (e.g. truncation spans) to shrink below content width
  align-items: center;
  gap: tokens.bpk-spacing-sm();
  pointer-events: none;

  svg {
    flex-shrink: 0;
    fill: currentcolor;
  }
}
```

### `BpkSegmentedControlV2.module.scss`

Assembles the BEM structure. Cross-element selectors (first/last child border-radius, `:has` divider, `:has` focus indicator) are kept here because they cannot live inside a self-contained mixin.

```scss
@use '../../../bpk-mixins/segmented-control';
@use '../../../bpk-mixins/utils';

.bpk-segmented-control-v2 {
  @include segmented-control.bpk-segmented-control-v2;

  &--canvas-default { @include segmented-control.bpk-segmented-control-v2--canvas-default; }
  &--canvas-contrast { @include segmented-control.bpk-segmented-control-v2--canvas-contrast; }
  &--surface-default { @include segmented-control.bpk-segmented-control-v2--surface-default; }
  &--surface-contrast { @include segmented-control.bpk-segmented-control-v2--surface-contrast; }
  &--shadow { @include segmented-control.bpk-segmented-control-v2--shadow; }
}

.bpk-segmented-control-v2__item {
  @include segmented-control.bpk-segmented-control-v2__item;

  &:first-child .bpk-segmented-control-v2__item-control {
    border-end-start-radius: var(--bpk-segmented-control-border-radius);
    border-start-start-radius: var(--bpk-segmented-control-border-radius);
    border-inline-start: none;
  }

  &:last-child .bpk-segmented-control-v2__item-control {
    border-end-end-radius: var(--bpk-segmented-control-border-radius);
    border-start-end-radius: var(--bpk-segmented-control-border-radius);
  }

  // Remove divider on the item immediately after a selected item.
  // stylelint-disable-next-line selector-pseudo-class-no-unknown
  &:has([data-state='checked']) + .bpk-segmented-control-v2__item {
    --bpk-segmented-control-item-divider-color: transparent;
  }

  // The hidden <input type="radio"> receives keyboard focus, not __item-control.
  // Use :has to apply the focus indicator to the visible control element.
  // stylelint-disable-next-line selector-pseudo-class-no-unknown
  &:has(:focus-visible) .bpk-segmented-control-v2__item-control {
    z-index: 1;

    @include utils.bpk-focus-indicator;
  }
}

.bpk-segmented-control-v2__item-control {
  @include segmented-control.bpk-segmented-control-v2__item-control;
}

.bpk-segmented-control-v2__item-text {
  @include segmented-control.bpk-segmented-control-v2__item-text;
}
```

---

## 5. RTL Strategy

All directional CSS uses logical properties:

| Physical property (avoid) | Logical equivalent (use) |
|---|---|
| `border-left` | `border-inline-start` |
| `border-top-left-radius` | `border-start-start-radius` |
| `border-bottom-left-radius` | `border-end-start-radius` |
| `border-top-right-radius` | `border-start-end-radius` |
| `border-bottom-right-radius` | `border-end-end-radius` |
| `padding-left` | `padding-inline-start` |
| `text-align: left` | `text-align: start` |

The `@include utils.bpk-rtl` mixin is only needed if a property has no logical equivalent (none anticipated for V2).

Ark-UI's keyboard navigation (ArrowLeft/ArrowRight) does NOT automatically mirror for RTL. The manual-mode keyboard handler already uses `isRTL()` from `bpk-react-utils`. For automatic mode, the Ark-UI state machine does not handle RTL natively — the component must override keyboard handling in automatic mode too to swap ArrowLeft/ArrowRight when `isRTL()` is true. (This mirrors V1's approach.)

---

## 6. Token → CSS Variable Mapping by Type

| `type` value | `--bg` token | `--indicator-bg` token | `--item-color` | `--divider-color` |
|---|---|---|---|---|
| `canvas-default` | `$bpk-surface-default-day` | `$bpk-core-primary-day` | `$bpk-text-primary-day` | `$bpk-line-day` |
| `canvas-contrast` | `$bpk-surface-default-day` | `$bpk-core-primary-day` | `$bpk-text-primary-day` | `$bpk-line-day` |
| `surface-default` | `$bpk-canvas-contrast-day` | `$bpk-core-primary-day` | `$bpk-text-primary-day` | `$bpk-line-day` |
| `surface-contrast` | `$bpk-private-segmented-control-surface-contrast-day` | `$bpk-private-segmented-control-surface-contrast-on-day` | `$bpk-text-on-dark-day` | `$bpk-line-on-dark-day` |

> `canvas-default` and `canvas-contrast` share the same white background (`$bpk-surface-default-day`); their difference is contextual — `canvas-contrast` is used when the group sits on a `canvas-contrast` page background.
> `surface-default` uses `$bpk-canvas-contrast-day` (light grey) to stand out from a white surface background.

---

## 7. VDL 2.0 Override Example

A consumer or VDL 2.0 theme stylesheet applies overrides at a wrapper level:

```scss
// vdl2-theme.scss — applied by VDL 2.0 adopters to a wrapper element
.vdl2-wrapper {
  --bpk-segmented-control-bg: #f0f0f0;
  --bpk-segmented-control-indicator-bg: #0066cc;
  --bpk-segmented-control-indicator-color: #ffffff;
  --bpk-segmented-control-item-color: #333333;
  --bpk-segmented-control-border-radius: 0.5rem;
  --bpk-segmented-control-padding-x: 1.25rem;
  --bpk-segmented-control-padding-y: 0.75rem;
  --bpk-segmented-control-divider-color: #cccccc;
  --bpk-segmented-control-shadow: inset 0 0 16px 0 rgb(0, 0, 0, 0.08);
}
```

No JSX changes required. The component reads CSS variables via `var()` cascade.

---

## 8. Test Strategy

Unit tests use explicit assertions rather than snapshots to keep tests readable and resilient to structural changes from Ark-UI upgrades.

Key scenarios tested:
- Default rendering: verify `bpk-segmented-control-v2` and `bpk-segmented-control-v2--canvas-default` classes are present.
- Each `type` value produces the correct `bpk-segmented-control-v2--{type}` modifier class.
- Shadow enabled: `bpk-segmented-control-v2--shadow` class is added.
- Controlled selection: correct radio input is `checked` when `value` is set.
- Root disabled: all radio inputs are `disabled`.
- Individual item disabled: only that item's input is `disabled`.
