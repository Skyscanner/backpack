# Styling Guide: BpkSegmentedControlV2

**Branch**: `001-composable-segmented-control`
**Date**: 2026-03-03
**Spec**: [spec.md](./spec.md) | **Research**: [research.md](./research.md)

---

## 1. File: `BpkSegmentedControlV2.module.scss`

### Sass Imports

```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/utils';
@use '../../../bpk-mixins/typography';
@use '../../../bpk-mixins/radii';
```

> `shadows` is no longer imported — the shadow is now a CSS custom property (`--bpk-segmented-control-shadow`) rather than a mixin include, making it consumer-overridable.
>
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

## 3. CSS Custom Properties (Public Theming API)

All ten public CSS custom properties are declared on `.bpk-segmented-control-v2` with Backpack token defaults. Consumers override them at any ancestor element.

| Property | Default (canvas-default) | Controls |
|---|---|---|
| `--bpk-segmented-control-bg` | `$bpk-surface-default-day` | Group background |
| `--bpk-segmented-control-item-color` | `$bpk-text-primary-day` | Unselected item text/icon |
| `--bpk-segmented-control-item-disabled-color` | `$bpk-text-disabled-day` | Disabled item text/icon |
| `--bpk-segmented-control-indicator-bg` | `$bpk-core-primary-day` | Selected item background |
| `--bpk-segmented-control-indicator-color` | `$bpk-text-on-dark-day` | Selected item text/icon |
| `--bpk-segmented-control-border-radius` | `$bpk-border-radius-sm` | Group + item corner radius |
| `--bpk-segmented-control-padding-x` | `tokens.bpk-spacing-base()` | Horizontal item padding |
| `--bpk-segmented-control-padding-y` | `tokens.bpk-spacing-md()` | Vertical item padding |
| `--bpk-segmented-control-divider-color` | `$bpk-line-day` | Divider between items |
| `--bpk-segmented-control-shadow` | `inset 0 0 20px 0 rgb(0,0,0,0.1)` | `box-shadow` value applied when `shadow` prop is true |

---

## 4. Full SCSS Implementation

```scss
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/utils';
@use '../../../bpk-mixins/typography';
@use '../../../bpk-mixins/radii';

.bpk-segmented-control-v2 {
  --bpk-segmented-control-bg: #{tokens.$bpk-surface-default-day};
  --bpk-segmented-control-item-color: #{tokens.$bpk-text-primary-day};
  --bpk-segmented-control-item-disabled-color: #{tokens.$bpk-text-disabled-day};
  --bpk-segmented-control-indicator-bg: #{tokens.$bpk-core-primary-day};
  --bpk-segmented-control-indicator-color: #{tokens.$bpk-text-on-dark-day};
  --bpk-segmented-control-border-radius: #{tokens.$bpk-border-radius-sm};
  --bpk-segmented-control-padding-x: #{tokens.bpk-spacing-base()};
  --bpk-segmented-control-padding-y: #{tokens.bpk-spacing-md()};
  --bpk-segmented-control-divider-color: #{tokens.$bpk-line-day};
  --bpk-segmented-control-shadow: inset 0 0 20px 0 rgb(0, 0, 0, 0.1);

  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  border-radius: var(--bpk-segmented-control-border-radius);
  background-color: var(--bpk-segmented-control-bg);
  overflow: hidden;

  &--canvas-default {
    --bpk-segmented-control-bg: #{tokens.$bpk-surface-default-day};
  }

  &--canvas-contrast {
    --bpk-segmented-control-bg: #{tokens.$bpk-surface-default-day};
  }

  &--surface-default {
    --bpk-segmented-control-bg: #{tokens.$bpk-canvas-contrast-day};
  }

  &--surface-contrast {
    --bpk-segmented-control-bg: #{tokens.$bpk-private-segmented-control-surface-contrast-day};
    --bpk-segmented-control-item-color: #{tokens.$bpk-text-on-dark-day};
    --bpk-segmented-control-indicator-bg: #{tokens.$bpk-private-segmented-control-surface-contrast-on-day};
    --bpk-segmented-control-indicator-color: #{tokens.$bpk-text-on-dark-day};
    --bpk-segmented-control-divider-color: #{tokens.$bpk-line-on-dark-day};
  }

  &--shadow {
    box-shadow: var(--bpk-segmented-control-shadow);
  }
}

.bpk-segmented-control-v2__item {
  // Ark-UI renders Item as a <label>. Reset label defaults.
  display: contents;
  cursor: pointer;

  &[data-disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }
}

.bpk-segmented-control-v2__item-control {
  display: flex;
  min-height: tokens.bpk-spacing-xl();
  padding: var(--bpk-segmented-control-padding-y)
    var(--bpk-segmented-control-padding-x);
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

  // Divider between adjacent items.
  // Use logical property for RTL support without the bpk-rtl mixin.
  border-inline-start: tokens.$bpk-one-pixel-rem solid
    var(
      --bpk-segmented-control-item-divider-color,
      var(--bpk-segmented-control-divider-color)
    );

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

  &:focus-visible {
    z-index: 1;

    @include utils.bpk-focus-indicator;
  }
}

.bpk-segmented-control-v2__item:first-child
  .bpk-segmented-control-v2__item-control {
  border-end-start-radius: var(--bpk-segmented-control-border-radius);
  border-inline-start: none;
  border-start-start-radius: var(--bpk-segmented-control-border-radius);
}

// Remove divider on the item immediately after a selected item,
// matching V1's `rightOfOption` behaviour.
// stylelint-disable-next-line selector-pseudo-class-no-unknown
.bpk-segmented-control-v2__item:has([data-state='checked'])
  + .bpk-segmented-control-v2__item {
  --bpk-segmented-control-item-divider-color: transparent;
}

.bpk-segmented-control-v2__item:last-child
  .bpk-segmented-control-v2__item-control {
  border-end-end-radius: var(--bpk-segmented-control-border-radius);
  border-start-end-radius: var(--bpk-segmented-control-border-radius);
}

.bpk-segmented-control-v2__item-text {
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  gap: tokens.bpk-spacing-sm();
  pointer-events: none; // Prevent text from capturing mouse events
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
