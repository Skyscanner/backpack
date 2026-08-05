# BpkText

`BpkText` — the single typography primitive for all text in Backpack; renders as a configurable tag with a design-system text style applied.

## When to use

Use `BpkText` for every piece of user-facing text — headings, body copy, labels, captions. Always use `BpkText` from `@skyscanner/backpack-web/bpk-component-text`, never a raw `<p>`, `<span>`, or `<h1>`–`<h6>` with hand-set styles.

## Variants

See `foundations/typography.md` for the full `TEXT_STYLES` scale and decision tree (`heading1`–`5`, `bodyDefault`, `bodyLongform`, `label1`–`3`, `caption`, `footnote`, `subheading`, `editorial1`–`3`, `hero1`–`6`, and the raw `xs`–`xxxxxl` scale).

IMPORTANT: Valid `textStyle` values are exactly the `TEXT_STYLES` keys — do NOT invent a style name.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `textStyle` | `TextStyle` | `body-default` | One of `TEXT_STYLES` — see `foundations/typography.md` |
| `tagName` | `'span'\|'p'\|'text'\|'h1'-'h6'` | `'span'` | The rendered DOM tag — set for document semantics, independent of visual size |
| `color` | `TextColor \| null` | `null` | One of `TEXT_COLORS` (see `foundations/color.md`) |
| `textAlign` | `'start'\|'end'\|'center'\|'justify' \| null` | `null` | |
| `strikethrough` | `boolean` | `false` | |
| `children` | `ReactNode` | required | Text content |
| `className` | `string \| null` | `null` | Additional CSS class |

## Examples

```tsx
import BpkText, { TEXT_STYLES, TEXT_COLORS } from '@skyscanner/backpack-web/bpk-component-text';

{/* CORRECT — semantic style, tagName matches heading level */}
<BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
  Flights to Paris
</BpkText>
<BpkText textStyle={TEXT_STYLES.bodyDefault} color={TEXT_COLORS.textSecondary}>
  Prices include taxes and fees.
</BpkText>
```

```tsx
{/* WRONG — bold/weight props were removed in Backpack v24; don't invent them */}
<BpkText textStyle={TEXT_STYLES.bodyDefault} bold>
  Prices include taxes and fees.
</BpkText>
```

## Rules

- There is no `bold`/`weight` prop — weight is fixed by the chosen `textStyle`; pick a bolder semantic style (e.g. `label1`) instead of trying to bold `bodyDefault`.
- Prefer semantic styles (`heading*`, `bodyDefault`, `label*`, `caption`, `footnote`) over the raw size scale (`xs`–`xxxxxl`).
- `tagName` should match document outline/semantics (heading level, paragraph vs span), not be chosen for visual size — visual size comes from `textStyle`.
- Do not wrap `BpkButton`, `BpkBadge`, or other components that manage their own typography in `BpkText` — they already set their own text style internally.
