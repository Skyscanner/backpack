# BpkLink

`BpkLink` — a polymorphic styled hyperlink/text-action element; renders as `a` (navigation), `button` (action, no navigation), or `span`/`div` (static styled text).

## When to use

Use `BpkLink` for inline text links and link-styled actions. Always use `BpkLink` from `@skyscanner/backpack-web/bpk-component-link`, never a raw `<a>`. For a fully button-styled action (not link-styled), use `BpkButton` instead.

## Variants

There is no `variant`/`type` enum — `as` selects the rendered element, and two booleans adjust styling:

| `as` value | Use for |
| --- | --- |
| `'a'` (default) | Navigation to another page/URL |
| `'button'` | A link-styled action with no navigation (auto-sets native `type="button"`) |
| `'span'` / `'div'` | Static styled text with no click semantics |

`alternate` (boolean) — light styling for use on a dark background. `implicit` (boolean) — underline appears only on hover, not by default.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `'a'\|'button'\|'span'\|'div'` | `'a'` | Rendered element |
| `href` | `string \| null` | required when `as="a"` | Only valid for `as="a"` |
| `blank` | `boolean` | `false` | Only when `as="a"` — sets `target="_blank"`, default `rel="noopener noreferrer"` |
| `alternate` | `boolean` | `false` | Light styling for dark backgrounds |
| `implicit` | `boolean` | `false` | Underline only on hover |
| `children` | `ReactNode` | required | Link text |
| `className` | `string \| null` | `null` | Additional CSS class |

## Examples

```tsx
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

{/* CORRECT — navigation link */}
<BpkLink href="/help">Get help</BpkLink>

{/* CORRECT — link-styled action, no navigation */}
<BpkLink as="button" onClick={handleAction}>Show more</BpkLink>
```

```tsx
{/* WRONG — href has no effect when as="button"; it's typed as anchor-only */}
<BpkLink as="button" href="/help">Get help</BpkLink>
```

## Rules

- `href`/`blank` only apply when `as="a"` (the default) — don't pass them with `as="button"`.
- Use `as="span"`/`as="div"` for non-interactive styled text that visually resembles a link but has no click behavior.
- `BpkButtonLink` is deprecated — use `<BpkLink as="button">` instead.
