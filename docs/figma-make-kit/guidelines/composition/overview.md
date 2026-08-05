# Composition Patterns

Composition patterns are page-level layouts built from existing components — they are **not** single components. Read the relevant pattern file before building that surface.

## When to read these

- Building a full page or a recognizable multi-section layout.
- Combining several components into a standard arrangement (e.g. a results list, a filter panel, a confirmation dialog).

## Available patterns

| Pattern | File | Use for |
| --- | --- | --- |
| Card list | `card-list.md` | A titled, responsive grid/row/rail of result cards with an optional "see more" or pagination accessory — search results, recommendations |
| Filter panel | `filter-panel.md` | A stacked group of filter controls (chips, checkboxes, accordions) — search refinement sidebars/sheets |
| Confirmation modal | `confirmation-modal.md` | A blocking dialog confirming or reporting the outcome of an action — booking confirmation, delete confirmation |

## General composition rules

- Start from the default page structure in `overview.md` (required chrome).
- Use `BpkSpacing` tokens from `foundations/spacing.md` for inter-section spacing.
- Each logical section should be visually distinct per the surface strategy in `overview.md` — prefer surface color/elevation over borders.
- Never invent a page-level pattern that isn't in the table above without first checking whether an existing Backpack composed component (e.g. `BpkCardList`) already covers it — Backpack ships some compositions as components in their own right, not just as a documented pattern.
