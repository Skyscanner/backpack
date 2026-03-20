# BPK Component Reuse Rules

**Before writing any non-trivial HTML element, search `packages/` to see if Backpack already provides a component for it.**

## How to search

```bash
# List all BPK component packages
ls packages/ | grep bpk-component

# Filter by concept keyword
ls packages/ | grep -i "card\|chip\|badge\|notification"

# Inspect what a package exports
cat packages/bpk-component-{name}/index.ts
```

## Common mappings (non-exhaustive — always search first)

| Element / pattern | BPK Component | Import |
|-------------------|--------------|--------|
| `<button>` | `BpkButton` | `import BpkButton, { BUTTON_TYPES } from '../../bpk-component-button'` |
| `<a>` | `BpkLink` | `import BpkLink from '../../bpk-component-link'` |
| `<label>` | `BpkLabel` | `import BpkLabel from '../../bpk-component-label'` |
| `<p>`, `<span>`, `<h1>`–`<h5>` | `BpkText` | `import BpkText, { TEXT_STYLES } from '../../bpk-component-text'` |
| `<svg>` icon | BPK Icon | see `.claude/rules/bpk-icon-usage.md` |
| `<ul>` / `<ol>` + `<li>` | `BpkList` + `BpkListItem` | `import { BpkList, BpkListItem } from '../../bpk-component-list'` |
| card / content surface | `BpkCard` | `import BpkCard from '../../bpk-component-card'` |
| layout `<div>` | layout component | see `.claude/rules/bpk-layout-components.md` |

After finding a candidate, read its `index.ts` to confirm the API before using it.

## Visually-hidden content → `BpkVisuallyHidden`

Whenever you would write the standard visually-hidden CSS pattern:

```scss
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border-width: 0;
```

use `BpkVisuallyHidden` instead:

```tsx
import BpkVisuallyHidden from '../../bpk-component-visually-hidden';

<BpkVisuallyHidden>
  {/* any content that should be hidden visually but readable by screen readers */}
</BpkVisuallyHidden>
```

This also composes cleanly with `BpkLabel` when you need an accessible label for an input that has no visible label:

```tsx
<BpkVisuallyHidden>
  <BpkLabel htmlFor={inputId}>{labelText}</BpkLabel>
</BpkVisuallyHidden>
```

## When it's acceptable to use raw HTML

- Semantic page-structure elements: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<aside>`
- `<form>` — no `BpkForm` exists
- An element whose required behaviour conflicts with a BPK component's built-in styling and wrapping would add unnecessary complexity
