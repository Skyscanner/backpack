# Component Catalog

Always prefer components from `@skyscanner/backpack-web` over plain HTML elements. Read a component's individual guidelines file BEFORE using it.

```tsx
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkInput, { INPUT_TYPES } from '@skyscanner/backpack-web/bpk-component-input';
```

## Buttons & actions

| Component | Alt names | Purpose | Guidelines |
| --- | --- | --- | --- |
| `BpkButton` | CTA, action button | Primary/secondary/destructive actions | button.md |
| `BpkLink` | text link, hyperlink, link-styled button | Navigation (`as="a"`) or a link-styled action (`as="button"`) | link.md |

## Inputs & forms

| Component | Alt names | Purpose | Guidelines |
| --- | --- | --- | --- |
| `BpkInput` | text field, text input, search box | Single-line text entry | input.md |
| `BpkTextarea` | multi-line input | Multi-line text entry | textarea.md |
| `BpkSelect` | dropdown, picker | Selection from a small, known set of options via native `<select>` | select.md |
| `BpkCheckbox` | tickbox | Independent boolean in a form | checkbox.md |
| `BpkRadio` | radio button | Mutually-exclusive choice from a visible list | radio.md |
| `BpkSwitch` | toggle, on/off switch | Standalone boolean on/off (not inside a form list) | switch.md |

## Navigation

| Component | Alt names | Purpose | Guidelines |
| --- | --- | --- | --- |
| `BpkNavigationBar` | top bar, app bar | Screen-level title bar with leading/trailing actions | navigation-bar.md |
| `BpkHorizontalNav` | tab bar, underline tabs | Uncontrolled underline-style tab bar you compose yourself | horizontal-nav.md |
| `BpkBreadcrumb` | breadcrumbs | Hierarchical page-path navigation | breadcrumb.md |

## Feedback & status

| Component | Alt names | Purpose | Guidelines |
| --- | --- | --- | --- |
| `BpkInfoBanner` | alert, banner, notice | Persistent in-page status message (success/warning/error/info/critical) | info-banner.md |
| `BpkFloatingNotification` | toast, snackbar | Transient, auto-dismissing feedback | floating-notification.md |
| `BpkBadge` | status label, tag, pill (status) | Small inline status/label indicator | badge.md |
| `BpkSpinner` | loading indicator, loader | Inline loading state | spinner.md |
| `BpkTooltip` | hint, info bubble | Non-interactive hover/focus supplementary text | tooltip.md |
| `BpkPopover` | popup (interactive) | Click-triggered floating panel with interactive content | popover.md |
| `BpkModalV3` | dialog, popup (blocking), sheet, bottom sheet | Blocking dialog that requires a decision or blocks the page | modal.md |

## Content & layout

| Component | Alt names | Purpose | Guidelines |
| --- | --- | --- | --- |
| `BpkText` | paragraph, heading, label text | The single typography primitive for all text | text.md |
| `BpkCardV2` | card, tile | Container for grouping related content | card.md |
| `BpkChip` / `BpkChipGroup` | pill (selectable), filter tag | Selectable/dismissible/dropdown filter chips | chip.md |
| `BpkAccordion` | expander, collapsible list | Vertically stacked expand/collapse sections | accordion.md |

## Selection decision trees

### Which input component?

```
"How should the user provide input?"

├─ Mutually exclusive options (visible list)?  └─ BpkRadio (manually grouped by shared `name`)
├─ Selection from a dropdown list?              └─ BpkSelect
├─ Standalone boolean on/off?                   └─ BpkSwitch
├─ Boolean inside a form (with a label)?        └─ BpkCheckbox
├─ Freeform short text?                         └─ BpkInput
├─ Freeform long/multi-line text?               └─ BpkTextarea
└─ Filterable tag-style choice?                 └─ BpkSelectableChip / BpkChipGroup
```

### Which feedback component?

```
"How should I show information to the user?"

├─ Persistent in-page status message?    └─ BpkInfoBanner (never BpkBannerAlert — deprecated)
├─ Transient, auto-dismissing feedback?   └─ BpkFloatingNotification
├─ Status label/counter next to text?     └─ BpkBadge
├─ Non-interactive hover/focus hint?       └─ BpkTooltip
├─ Interactive floating panel?             └─ BpkPopover
├─ Loading state?                          └─ BpkSpinner / BpkLargeSpinner / BpkExtraLargeSpinner
└─ Requires a decision / blocks the page?  └─ BpkModalV3
```

### Which tab/navigation component?

```
"How should I let the user switch between sibling views?"

├─ Simple underline tab bar, you manage selection state? └─ BpkHorizontalNav + BpkHorizontalNavItem
├─ Data-driven tabs with icons/badges?                    └─ BpkNavigationTabGroup
├─ Screen-level title bar with back/close actions?        └─ BpkNavigationBar
└─ Hierarchical page path?                                └─ BpkBreadcrumb
```

## Common props

Most components accept:

- `className` — additional CSS class string (not accepted by layout primitives `BpkBox`/`BpkFlex`/`BpkGrid`/`BpkStack`, or by icon components)
- `disabled` — boolean to disable the component (where applicable)

Form components additionally accept:

- A way to set a label — either a `label` prop (`BpkCheckbox`, `BpkRadio`) or a paired `BpkLabel`/`BpkFieldset` (`BpkInput`, `BpkTextarea`, `BpkSelect`)
- `onChange` — value change callback
- `valid` — `boolean | null` validity state (not available on `BpkSwitch`)

## Tips

- Read the individual `components/{name}.md` file before using a component.
- All component CSS classes use the `bpk-` prefix.
- When a component has multiple versions (e.g. `BpkCard` vs `BpkCardV2`, `BpkBannerAlert` vs `BpkInfoBanner`), the guideline file for that component states which one is current — always prefer the current version for new work.
