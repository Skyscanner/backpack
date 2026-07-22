# BpkButton

`BpkButton` — the primary interactive action control; also covers link-styled actions and pure navigation links via `href`.

## When to use

Use `BpkButton` for any clickable action — form submission, triggering a modal, navigating (via `href`). Always use `BpkButton` from `@skyscanner/backpack-web/bpk-component-button`, never a raw `<button>` or `<a>` styled to look like one.

## Variants

| Variant (`BUTTON_TYPES`) | Use for |
| --- | --- |
| `primary` | Main/default call to action |
| `primaryOnDark` | Primary CTA on a dark background |
| `primaryOnLight` | Primary CTA variant tuned for light backgrounds |
| `secondary` | Secondary action alongside a primary |
| `secondaryOnDark` | Secondary action on a dark background |
| `destructive` | Destructive/dangerous action (delete, remove, cancel booking) |
| `featured` | Highlighted/promotional action |
| `link` | Button styled like a text link (underlined) but keeps button semantics |
| `linkOnDark` | Link-style button for dark backgrounds |

IMPORTANT: Valid `type` values are exactly the `BUTTON_TYPES` above — do NOT invent a variant name.

`SIZE_TYPES`: `small` (default) | `large`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `ButtonType` | `primary` | Visual variant, see table above |
| `size` | `SizeType` | `small` | `small` \| `large` |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows a spinner in place of the label, disables interaction, sets `aria-busy` |
| `fullWidth` | `boolean` | `false` | Stretches the button to its container's width |
| `iconOnly` | `boolean` | `false` | Icon-only button; **requires an `aria-label`** |
| `leadingIcon` / `trailingIcon` | `ReactNode` | `null` | Icon slots — auto-aligned and spaced; do not pass icons as children instead |
| `href` | `string \| null` | `null` | Renders as `<a>` instead of `<button>` when set and not disabled |
| `blank` | `boolean` | `false` | Sets `target="_blank"` with `rel="noopener noreferrer"` by default |
| `submit` | `boolean` | `false` | Native button `type="submit"` instead of `"button"` |
| `onClick` | `(e) => void` | — | Click handler |
| `children` | `string \| ReactNode` | required | Button label |
| `className` | `string` | — | Additional CSS class |

## Examples

```tsx
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkSmallLongArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';

{/* CORRECT — icon passed via trailingIcon, not as a child */}
<BpkButton type={BUTTON_TYPES.link} trailingIcon={<BpkSmallLongArrowRightIcon />}>
  Learn more
</BpkButton>
```

```tsx
{/* WRONG — deprecated icon-as-sibling pattern; use trailingIcon instead */}
<BpkButton type={BUTTON_TYPES.link}>
  Learn more <BpkSmallLongArrowRightIcon />
</BpkButton>
```

## Rules

- Icons inside `BpkButton` must use the `leadingIcon`/`trailingIcon` props — never place a raw icon as a child, and never wrap it in `withButtonAlignment` (the button already handles alignment/spacing).
- `iconOnly` requires an explicit `aria-label` — an icon-only button with no label is an accessibility failure.
- `disabled` and `loading` are functionally equivalent for interaction purposes — don't gate on one when you mean both.
- Only one `primary`/`featured` button per visible section — use `secondary` or `link` for accompanying actions.
- Do not style this component with typography or font utility classes — it manages its own type.
