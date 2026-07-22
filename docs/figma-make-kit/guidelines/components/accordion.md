# BpkAccordion

`BpkAccordion` — vertically stacked expand/collapse content sections. Purely presentational — expand/collapse state must be wired up externally or via one of two provided HOCs.

## When to use

Use `BpkAccordion` for stacked, collapsible sections (e.g. filters, FAQ). It does not manage state on its own — decide up front whether only one section should be open at a time or many.

## Variants

Not a prop — a choice of composition HOC:

| Pattern | Behavior |
| --- | --- |
| `withSingleItemAccordionState(BpkAccordion)` | Only one item open at a time |
| `withAccordionItemState(BpkAccordionItem)` | Each item manages its own independent open/close state |

## Props

**`BpkAccordion`**: `children` (required, `BpkAccordionItem`s), `divider` (boolean, default `true`), `onDark` (boolean, default `false`).

**`BpkAccordionItem`**:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | required | |
| `title` | `string` | required | Header text |
| `children` | `ReactNode` | required | Collapsible content |
| `expanded` | `boolean` | `false` | Controlled open state |
| `icon` | `ReactElement` | `null` | Leading icon |
| `onClick` | `() => void` | no-op | Toggle handler |
| `tagName` | `Tag` | `'h3'` | Heading semantic tag |
| `textStyle` | `TextStyle` | `bodyDefault` | |

## Examples

```tsx
import { BpkAccordion, BpkAccordionItem, withSingleItemAccordionState } from '@skyscanner/backpack-web/bpk-component-accordion';

const SingleItemAccordion = withSingleItemAccordionState(BpkAccordion);

{/* CORRECT — state managed by the HOC */}
<SingleItemAccordion>
  <BpkAccordionItem id="stops" title="Stops" initiallyExpanded>Filter content</BpkAccordionItem>
  <BpkAccordionItem id="airlines" title="Airlines">Filter content</BpkAccordionItem>
</SingleItemAccordion>
```

```tsx
{/* WRONG — no expanded/onClick wired and no HOC; clicking the header does nothing */}
<BpkAccordion>
  <BpkAccordionItem id="stops" title="Stops">Filter content</BpkAccordionItem>
</BpkAccordion>
```

## Rules

- `BpkAccordionItem` alone is not interactive — always wire `expanded`/`onClick` yourself or use `withSingleItemAccordionState`/`withAccordionItemState`.
- Use `withSingleItemAccordionState` when only one section should be open at a time; use `withAccordionItemState` when multiple sections can be open independently.
