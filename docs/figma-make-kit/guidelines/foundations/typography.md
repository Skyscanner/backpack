# Typography Tokens

## Font families

| Family | Token | Usage |
| --- | --- | --- |
| Skyscanner Relative (+ system/Noto fallbacks) | `$bpk-font-family-base` | All UI text — the default, applied at `<body>` level |
| Larken (+ Noto fallbacks) | `$bpk-font-family-larken` | Editorial text only — `TEXT_STYLES.editorial1/2/3` set this automatically |

Only one weight family is used system-wide (Skyscanner Relative). Do not introduce a different font family for UI text — Larken is reserved for the three editorial styles.

## Type scale

Backpack does not expose raw `font-size`/`font-weight`/`line-height` as separate knobs for consumers. All typography goes through **`BpkText`**'s `textStyle` prop (`TEXT_STYLES`), which bundles size + weight + line-height (and, for hero styles, letter-spacing) into one semantic class. Always prefer the semantic styles (`bodyDefault`, `heading1`–`5`, `label1`–`3`, `caption`, `footnote`, `subheading`, `editorial1`–`3`) over the raw size styles (`xs`…`xxxxxl`), per the repo's typography guidance.

| `TEXT_STYLES` value | Size | Weight | Line height | Usage |
| --- | --- | --- | --- | --- |
| `heading1` | 2.5rem | 700 (bold) | 3rem | Page-level titles |
| `heading2` | 2rem | 700 (bold) | 2.5rem | Major section headings |
| `heading3` | 1.5rem | 700 (bold) | 1.75rem (tight) | Section headings |
| `heading4` | 1.25rem | 700 (bold) | 1.5rem (tight) | Sub-section headings |
| `heading5` | 1rem | 700 (bold) | 1.25rem (tight) | Card/component titles |
| `subheading` | 1.5rem | 400 (book) | 2rem | Supporting heading under a title |
| `bodyDefault` | 1rem | 400 (book) | 1.5rem | Default body copy |
| `bodyLongform` | 1.25rem | 400 (book) | 1.75rem | Long-form reading content |
| `label1` | 1rem | 700 (bold) | 1.5rem | Form labels, button-adjacent labels |
| `label2` | 0.875rem | 700 (bold) | 1.25rem | Secondary labels |
| `label3` | 0.75rem | 700 (bold) | 1rem | Smallest labels/tags |
| `caption` | 0.75rem | 400 (book) | 1rem | Metadata, fine print |
| `footnote` | 0.875rem | 400 (book) | 1.25rem | Footnotes, secondary metadata |
| `editorial1`/`2`/`3` | 3rem / 2rem / 1.25rem | 300 (light) | matches size | Larken editorial display text |
| `hero1`–`hero6` | 7.5rem down to 3rem | 900 (black) | matches size, tight letter-spacing | Large marketing/hero display text |
| `xs`…`xxxxxl` | 0.75rem–4rem | book (bold at xxl+) | matched to size | Raw size scale — use only when no semantic style fits |

Raw font weight tokens (`$bpk-font-weight-*`, used internally by the styles above, never set directly): `light` 300, `book` 400, `bold` 700, `black` 900. **`BpkText`'s standalone `bold`/`weight` props were removed in Backpack v24** — weight is only ever set by picking the right `textStyle`, never as an independent prop.

## Decision tree

```
"What TEXT_STYLES value should I use?"

├─ Page title?                  └─ heading1 (or heading2 for a secondary page title)
├─ Section heading?             └─ heading3 / heading4
├─ Card or component title?     └─ heading5
├─ Form label / button text?    └─ label1 / label2 / label3 (buttons manage their own text style internally — don't wrap BpkButton children in BpkText)
├─ Body copy?                   └─ bodyDefault (bodyLongform for long-form reading content)
└─ Metadata / fine print?       └─ caption / footnote
```

## Common patterns

```tsx
{/* CORRECT — semantic textStyle, tagName matches visual hierarchy */}
<BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">Section title</BpkText>
<BpkText textStyle={TEXT_STYLES.bodyDefault}>Supporting paragraph copy.</BpkText>

{/* WRONG — arbitrary size/weight, or the removed bold/weight prop */}
<h1 className="text-2xl font-bold">Page title</h1>
<BpkText textStyle={TEXT_STYLES.bodyDefault} bold>Body copy</BpkText>
```

## Rules

- Always render text through `BpkText` with a `textStyle` from `TEXT_STYLES` — never a raw `<h1>`–`<h6>`/`<p>`/`<span>` with hand-set CSS.
- Do not use generic utility size classes (`text-sm`, `text-base`, etc.) — they don't exist in Backpack and defeat the token system.
- Prefer semantic styles (`heading*`, `bodyDefault`, `label*`, `caption`, `footnote`, `subheading`, `editorial*`) over the raw size scale (`xs`…`xxxxxl`); only fall back to the raw scale when no semantic style matches.
- `tagName` controls the rendered DOM element (`h1`–`h6`, `p`, `span`) independently of `textStyle` — set it to match document outline/semantics, not visual size (e.g. a `heading5`-styled card title can still render as an `h3` if that's correct for the page hierarchy).
- There is no `bold`/`weight` prop — weight is fixed by the chosen `textStyle`.
- Pair every `textStyle` with a `color` from `TEXT_COLORS` when the color isn't already implied by context (see `color.md`).
