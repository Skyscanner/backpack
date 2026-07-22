# Product Keywords & Routing

## Overview

When a prompt uses Backpack- or travel-product-specific terminology, map it to the correct component or composition pattern before generating. If a term below appears in the prompt, follow the routing instruction.

## Keyword mapping table

| Designer says (keyword) | Route to | Notes |
| --- | --- | --- |
| "dropdown", "picker" | `components/select.md` → `BpkSelect` | Native `<select>` wrapper; use for a small, known set of options |
| "search bar", "search box" | `components/input.md` → `BpkInput` | Use `type={INPUT_TYPES.text}` with `clearButtonMode` if a clear (×) affordance is needed |
| "toggle", "on/off switch" | `components/switch.md` → `BpkSwitch` | Boolean on/off with no third state; distinct from `BpkCheckbox` |
| "pill", "tag" (selectable) | `components/chip.md` → `BpkSelectableChip` / `BpkChipGroup` | Use `BpkDismissibleChip` if it needs a remove (×) affordance, `BpkDropdownChip` if it opens a menu |
| "tab bar", "tabs" | `components/horizontal-nav.md` → `BpkHorizontalNav` (or `BpkNavigationTabGroup` for a data-driven tab list with icons/badges) | See `components/overview.md` selection tree — these are two distinct, non-interchangeable components |
| "toast", "snackbar" | `components/floating-notification.md` → `BpkFloatingNotification` | Transient, auto-dismissing; for a persistent in-page message use `BpkInfoBanner` instead |
| "alert banner", "info box" | `components/info-banner.md` → `BpkInfoBanner` | `BpkBannerAlert` is deprecated — always route to `BpkInfoBanner` even if the prompt says "banner alert" |
| "dialog", "popup" (blocking) | `components/modal.md` → `BpkModalV3` | Use `type={MODAL_V3_TYPES.sheet}` for a bottom sheet, `full` for full-screen, `chatbot` for a chat side-panel |
| "tooltip" (non-interactive hint) | `components/tooltip.md` → `BpkTooltip` | Hover/focus only, no interactive content inside |
| "popover" (interactive panel) | `components/popover.md` → `BpkPopover` | Use instead of Tooltip whenever the floating content has its own buttons/links |
| "badge", "status label", "counter" | `components/badge.md` → `BpkBadge` | Use the semantic `type` (`success`/`warning`/`critical`) that matches the status, not a color guess |
| "breadcrumbs" | `components/breadcrumb.md` → `BpkBreadcrumb` | Exactly one `BpkBreadcrumbItem` should have `active` |
| "card", "tile" | `components/card.md` → `BpkCardV2` | Prefer `BpkCardV2` (current) over the older `BpkCard` for new composition work |
| "spinner", "loading indicator" | `components/spinner.md` → `BpkSpinner` / `BpkLargeSpinner` / `BpkExtraLargeSpinner` | Size is chosen by which component you import, not a `size` prop |

## Fallback rule

If a product term is used but you cannot find a matching component or pattern in the catalog, **do not build it from scratch**. Follow the no-custom-builds gate in `overview.md` and ask the user how to proceed.
