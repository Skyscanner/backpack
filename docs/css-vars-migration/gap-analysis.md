# CSS Custom Properties Migration — Gap Analysis

Generated from token audit across all unmigrated components. Each component maps its SASS tokens to existing CSS vars, or flags gaps where no CSS var exists yet.

## Token mapping legend

- ✅ CSS var exists → use it with SASS fallback
- ❌ No CSS var → keep bare SASS token for now; log as gap

## Shared mapping table (used by many components)

| SASS token | CSS var | Status |
|---|---|---|
| `$bpk-text-primary-day` | `--bpk-text-primary` | ✅ |
| `$bpk-text-secondary-day` | `--bpk-text-secondary` | ✅ |
| `$bpk-text-on-dark-day` | `--bpk-text-on-dark` | ✅ |
| `$bpk-text-on-light-day` | `--bpk-text-on-light` | ✅ |
| `$bpk-text-primary-inverse-day` | `--bpk-text-inverse` | ✅ |
| `$bpk-text-disabled-day` | `--bpk-text-disabled` | ✅ |
| `$bpk-text-disabled-on-dark-day` | `--bpk-text-disabled-on-dark` | ✅ |
| `$bpk-text-error-day` | `--bpk-text-error` | ✅ |
| `$bpk-text-success-day` | `--bpk-text-success` | ✅ |
| `$bpk-text-hero-day` | `--bpk-text-hero` | ✅ |
| `$bpk-text-link-day` | `--bpk-text-deprecated-link` | ✅ (same value as `--bpk-core-accent`) |
| `$bpk-canvas-day` | `--bpk-surface-default` | ✅ |
| `$bpk-canvas-contrast-day` | `--bpk-canvas-contrast` | ✅ |
| `$bpk-surface-default-day` | `--bpk-surface-default` | ✅ |
| `$bpk-surface-elevated-day` | `--bpk-surface-elevated` | ✅ |
| `$bpk-surface-contrast-day` | `--bpk-surface-contrast` | ✅ |
| `$bpk-surface-hero-day` | `--bpk-surface-hero` | ✅ |
| `$bpk-surface-highlight-day` | `--bpk-surface-highlight` | ✅ |
| `$bpk-surface-low-contrast-day` | `--bpk-surface-low-contrast` | ✅ |
| `$bpk-surface-subtle-day` | `--bpk-surface-subtle` | ✅ |
| `$bpk-surface-tint-day` | `--bpk-surface-tint` | ✅ |
| `$bpk-core-primary-day` | `--bpk-core-primary` | ✅ |
| `$bpk-core-accent-day` | `--bpk-core-accent` | ✅ |
| `$bpk-status-danger-spot-day` | `--bpk-status-danger-spot` | ✅ |
| `$bpk-status-success-spot-day` | `--bpk-status-success-spot` | ✅ |
| `$bpk-status-warning-spot-day` | `--bpk-status-warning-spot` | ✅ |
| `$bpk-status-danger-fill-day` | `--bpk-surface-danger-fill` | ✅ |
| `$bpk-status-success-fill-day` | `--bpk-surface-success-fill` | ✅ |
| `$bpk-status-warning-fill-day` | `--bpk-surface-warning-fill` | ✅ |
| `$bpk-line-day` | `--bpk-other-line-default` | ✅ |
| `$bpk-line-on-dark-day` | `--bpk-other-line-on-contrast` | ✅ |
| `$bpk-scrim-day` | `--bpk-other-scrim` | ✅ |
| `bpk-spacing-*()` functions | `--bpk-spacing-*` primitives | ✅ |
| `$bpk-border-radius-xs` | `--bpk-radius-xs` | ✅ |
| `$bpk-border-radius-sm` | `--bpk-radius-sm` | ✅ |
| `$bpk-border-radius-md` | `--bpk-radius-md` | ✅ |
| `$bpk-border-radius-lg` | `--bpk-radius-lg` | ✅ |
| `$bpk-border-size-sm` (1px) | `--bpk-border-1` | ✅ |
| `$bpk-border-size-lg` (2px) | `--bpk-border-2` | ✅ |
| `$bpk-border-size-xl` (3px) | `--bpk-border-3` | ✅ |

## Gaps (no CSS var exists — keep bare SASS token)

These tokens are used across components but have **no CSS custom property** yet. Keep them as bare SASS tokens with no `var()` wrapper until the token-sync pipeline adds them.

| SASS token | Used by | Notes |
|---|---|---|
| `$bpk-duration-sm` | info-banner, bottom-sheet, dialog, modal, page-indicator, skeleton, skip-link, spinner, star-rating, switch, tooltip | Transition/animation durations — no CSS var in primitives |
| `$bpk-duration-base` | bottom-sheet, chat-notification, drawer, floating-notification, modal, progress, switch | — |
| `$bpk-duration-xs` | popover | — |
| `$bpk-zindex-modal` | bottom-sheet, dialog, modal | No z-index CSS vars |
| `$bpk-zindex-tooltip` | bottom-sheet, navigation-bar, popover | — |
| `$bpk-zindex-drawer` | drawer | — |
| `$bpk-box-shadow-lg` | autosuggest, card, floating-notification | `--bpk-private-shadow-*` parts exist but not `box-shadow` shorthand |
| `$bpk-box-shadow-sm` | map, price-range, ticket | — |
| `$bpk-box-shadow-xl` | floating-notification | — |
| `$bpk-one-pixel-rem` | autosuggest, card, chat-notification, content-cards, datatable, grid-toggle, horizontal-nav, journey-arrow, navigation-bar, navigation-tab-group, page-indicator, popover, progress, radio, rating, segmented-control, skeleton, skip-link, split-input, switch, ticket | Hairline border utility |
| `$bpk-modal-background-color` | bottom-sheet, dialog, modal | Backdrop colour |
| `$bpk-modal-initial-opacity` | bottom-sheet, dialog, drawer, modal | — |
| `$bpk-modal-opacity` | bottom-sheet, dialog, drawer, modal | — |
| `$bpk-modal-content-padding` | dialog, modal | `--bpk-modal-*` primitives are max-widths only |
| `$bpk-modal-max-width` | bottom-sheet, modal | Available as `--bpk-modal-512` etc (numeric only, different naming) |
| `$bpk-modal-wide-max-width` | bottom-sheet, modal | — |
| `$bpk-form-validation-color` | form-validation, label | — |
| `$bpk-input-background` | input | — |
| `$bpk-input-height` | select | — |
| `$bpk-input-large-height` | select | — |
| `$bpk-input-border` | card, autosuggest | Shorthand — no var for full border shorthand |
| `$bpk-flare-corner-radius` | flare | — |
| `$bpk-flare-height-desktop` | flare | — |
| `$bpk-flare-height-mobile` | flare | — |
| `$bpk-horizontal-nav-bar-selected-color` | horizontal-nav | — |
| `$bpk-color-white` | autosuggest, overlay, popover | Could use `--bpk-surface-default` contextually; raw white has no semantic var |
| `$bpk-color-sky-blue-shade-03` | overlay | Raw primitive colour — no semantic mapping |
| `$bpk-color-glencoe` | checkbox | — |
| `$bpk-icon-size-sm` | inset-banner, map, star-rating | — |
| `$bpk-icon-size-lg` | inset-banner, star-rating | — |
| `$bpk-icon-size-xxl` | inset-banner | — |
| `$bpk-icon-size-xxxl` | star-rating | — |
| `$bpk-line-height-xs` | breadcrumb, datatable | Typography line-height — no direct var |
| `$bpk-line-height-8-xl` | inset-banner | — |
| `$bpk-font-color-base` | inset-banner | — |
| `$bpk-text-primary-dark-color` | modal | — |
| `$bpk-breakpoint-mobile` | popover | — |
| `$bpk-card-background-color` | ticket | — |
| `$bpk-spacing-none` (used directly in split-input) | split-input | Maps to `--bpk-spacing-none` ✅ — not actually a gap |

## Private component token gaps

These `$bpk-private-*` SASS tokens are used by components but their CSS var counterpart does **not** exist in `theme-backpack-light/dark.css`:

| SASS token | Used by | Nearest CSS var (different name) |
|---|---|---|
| `$bpk-private-info-banner-error-day` | info-banner | none — only `--bpk-private-info-banner-default` and `--bpk-private-info-banner-on-contrast` exist |
| `$bpk-private-info-banner-success-day` | info-banner | none |
| `$bpk-private-info-banner-warning-day` | info-banner | none |
| `$bpk-private-button-link-normal-foreground-day` | inset-banner | `--bpk-private-button-colour-text-link-on-dark` exists but is different token |
| `$bpk-private-button-link-pressed-foreground-day` | inset-banner | none |
| `$bpk-private-navigation-tab-hover-day` | navigation-tab-group | `--bpk-private-navigation-tabs-hover` exists (plural name — same value) ✅ |
| `$bpk-private-navigation-tab-outline-day` | navigation-tab-group | `--bpk-private-navigation-tabs-outline` exists (plural name) ✅ |
| `$bpk-private-slider-selected-day` | slider | `--bpk-private-slider-bg-knob` + `--bpk-private-slider-bg-track` exist but map differently |
| `$bpk-private-skeleton-shimmer-center-day` | skeleton | none |
| `$bpk-private-skeleton-shimmer-start-end-day` | skeleton | none |
| `$bpk-private-switch-on-contrast-off-day` | switch | none |
| `$bpk-private-page-indicator-button-carousel-normal-background-day` | page-indicator | none |
| `$bpk-private-page-indicator-button-carousel-pressed-background-day` | page-indicator | none |
| `$bpk-private-segmented-control-canvas-default-day` | segmented-control | `--bpk-private-segmented-control-colour-bg-on-canvas-default-default` exists (different name) ✅ |
| `$bpk-private-segmented-control-surface-contrast-day` | segmented-control | `--bpk-private-segmented-control-colour-bg-on-surface-contrast-default` exists (different name) ✅ |
| `$bpk-private-segmented-control-surface-contrast-on-day` | segmented-control | `--bpk-private-segmented-control-colour-bg-on-surface-contrast-selected` exists (different name) ✅ |
| `$bpk-private-map-poi-pin-day` | map | none |
| `$bpk-private-map-previous-selection-day` | map | `--bpk-private-map-previous-selection` exists ✅ |

## Per-component migration summary

Components are ordered roughly by complexity (simplest first = good candidates for early PRs).

| Component | Tokens with CSS vars | Gaps | Notes |
|---|---|---|---|
| accordion | 5/5 | 0 | All semantic colour tokens covered |
| ai-blurb | 1/1 | 0 | — |
| graphic-promotion | 2/2 | 0 | — |
| section-header | 3/3 | 0 | — |
| fieldset | 1/1 | 0 | — |
| nudger | 3/3 | 0 | — |
| table | 1/1 | 0 | — |
| infinite-scroll | 2/2 | 0 | — |
| breadcrumb | 2/3 | `line-height-xs` | — |
| collapsible | 3/4 | `duration-sm` | — |
| rating | 1/2 | `one-pixel-rem` | — |
| mobile-scroll-container | 3/3 | 0 | — |
| tooltip | 4/5 | `duration-sm`, `zindex-tooltip` | — |
| spinner | 4/4 | 0 | — |
| panel | 5/5 | 0 | — |
| section-list | 5/5 | 0 | — |
| grid-toggle | 2/3 | `one-pixel-rem` | — |
| journey-arrow | 3/4 | `one-pixel-rem` | — |
| overlay | 2/4 | `color-sky-blue-shade-03`, `color-white` | Raw colours — no semantic mapping |
| split-input | 1/1 | 0 | `$bpk-spacing-none` → `--bpk-spacing-none` ✅ |
| form-validation | 0/1 | `form-validation-color` | Single gap token |
| label | 2/3 | `form-validation-color` | — |
| skip-link | 3/5 | `duration-sm`, `one-pixel-rem` | — |
| page-indicator | 4/9 | `one-pixel-rem`, `duration-sm`, 2× private page-indicator tokens | — |
| star-rating | 2/6 | `duration-sm`, 3× icon-size tokens | — |
| autosuggest | 4/11 | `border-radius-sm`→✅, `box-shadow-lg`, `one-pixel-rem`, `zindex-autosuggest`, `color-white` | autosuggest private vars ✅ |
| card-list | 1/1 | 0 | — |
| chat-notification | 3/5 | `duration-base`, `one-pixel-rem` | — |
| content-cards | 2/3 | `one-pixel-rem` | — |
| info-banner | 5/9 | `duration-sm`, 3× private info-banner colour gaps | — |
| navigation-tab-group | 5/8 | `one-pixel-rem` + 2 private nav-tab tokens (CSS vars exist under plural name ✅) | Rename SASS→CSS name |
| segmented-control | 9/15 | `one-pixel-rem`, `border-size-sm`→✅, 3 private segmented tokens (CSS vars exist, different name ✅) | Name mismatch |
| switch | 4/6 | `duration-sm`, `one-pixel-rem`, `private-switch-on-contrast-off` | — |
| skeleton | 4/9 | `duration-base`, `one-pixel-rem`, 2× shimmer tokens | — |
| radio | 3/5 | `one-pixel-rem`, `text-link-day`→`--bpk-text-deprecated-link` ✅ | — |
| checkbox | 6/11 | `one-pixel-rem`, `color-glencoe`, `border-size-lg`→✅ | — |
| slider | 2/4 | `line-day`→✅, `private-slider-selected` (different CSS var name) | — |
| progress | 5/8 | `duration-base`, `one-pixel-rem`, canvas-day→surface-default ✅ | — |
| select | 0/3 | `input-height`, `input-large-height`, `one-pixel-rem` | — |
| input | 0/1 | `input-background` | — |
| price-range | 5/7 | `box-shadow-sm` | — |
| horizontal-nav | 5/9 | `one-pixel-rem`, `horizontal-nav-bar-selected-color`, `status-success-fill-day`→✅, `text-link-day`→✅ | — |
| popover | 3/7 | `duration-sm`, `duration-xs`, `color-white`, `one-pixel-rem`, `breakpoint-mobile` | — |
| card | 9/17 | `box-shadow-lg`, `one-pixel-rem`, `duration-sm`, `input-border` | — |
| flare | 4/7 | 3× flare-specific dimension tokens | — |
| floating-notification | 4/8 | `duration-base`, 2× `box-shadow` | — |
| map | 6/12 | `box-shadow-sm`, `icon-size-sm`, `private-map-poi-pin`, 2× other gaps | — |
| inset-banner | 4/12 | `icon-size-*`, `line-height-*`, `font-color-base`, 2× private-button-link | — |
| barchart | 4/5 | `line-day`→✅ only; `box-shadow` not used; all map | 0 gaps actually |
| bottom-sheet | 3/10 | `duration-sm`, `modal-*` tokens (5), `zindex-*` (2) | — |
| dialog | 4/13 | `duration-sm`, `modal-*` tokens (5), `zindex-modal`, `border-size-lg`→✅ | — |
| drawer | 3/8 | `duration-base`, `modal-*` tokens (3), `zindex-drawer` | — |
| modal | 8/21 | `duration-*`, `modal-*` tokens (5), `zindex-modal`, `text-primary-dark-color`, `text-link-day`→✅ | — |
| datatable | 5/9 | `border-size-xl`→✅, `line-height-xs`, `one-pixel-rem`, `status-warning-fill-day`→✅ | — |

## Recommended PR order (simplest to most complex)

1. accordion, ai-blurb, graphic-promotion, section-header, fieldset, nudger, table, infinite-scroll — zero gaps, straightforward
2. mobile-scroll-container, spinner, panel, section-list, card-list, split-input — zero gaps
3. breadcrumb, collapsible, rating, grid-toggle, journey-arrow — 1 gap each (bare SASS fallback)
4. tooltip, skip-link, checkbox, radio, progress, price-range, slider, select, input — small gap sets
5. barchart, datatable, horizontal-nav, chat-notification, content-cards, segmented-control, switch — moderate
6. info-banner, navigation-tab-group, skeleton, page-indicator, star-rating, autosuggest, card — several gaps
7. bottom-sheet, dialog, drawer, modal, flare, floating-notification, map, inset-banner, overlay, popover, form-validation, label — most gaps
