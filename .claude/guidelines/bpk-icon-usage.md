# BPK Icon Usage Rules

**NEVER use inline `<svg>` elements in Backpack components.** Always use icons from `bpk-component-icon`.

## When you encounter an inline `<svg>`

If you see an inline `<svg>` in existing code, treat it as a violation and replace it:

1. Identify what the icon visually represents (check the SVG path or surrounding context).
2. Find the matching icon in `packages/bpk-component-icon/lg/` or `sm/`.
3. Replace the `<svg>` with the imported icon component using the pattern below.
4. If no matching icon exists in `bpk-component-icon`, leave a `// TODO: replace with Backpack icon` comment and do not modify the SVG further.

## How to find icons

Browse `packages/bpk-component-icon/lg/` (24×24) and `packages/bpk-component-icon/sm/` (16×16). The file name is the icon name (e.g. `arrow-up.jsx`, `close.jsx`).

## Import pattern

```typescript
import ArrowUpIcon from '../../bpk-component-icon/lg/arrow-up';
```

### Icons inside `BpkButton`

Use the `leadingIcon` or `trailingIcon` props — they handle alignment automatically via `inline-flex + gap`. Do **not** use `withButtonAlignment` inside a `BpkButton`.

```tsx
import BpkButton from '../../bpk-component-button';
import SmallLightningIcon from '../../bpk-component-icon/sm/lightning';

<BpkButton leadingIcon={<SmallLightningIcon />}>Submit</BpkButton>
```

### Icons next to text outside a button

Wrap with `withButtonAlignment` when the icon sits inline with text but is **not** inside a `BpkButton`:

```typescript
import { withButtonAlignment } from '../../bpk-component-icon';
const AlignedIcon = withButtonAlignment(ArrowUpIcon);
```

## className is forbidden on icon components

The ESLint rule `forbid-component-props` blocks `className` on React components. Wrap the icon in a DOM element instead:

```tsx
// ✅ Correct — className on a span (DOM element)
<span className={getClassName('bpk-my-component__icon')}>
  <AlignedIcon />
</span>

// ✅ Correct — fill prop with a token value
import { textPrimaryDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

<BpkSmallFlightIcon fill={textPrimaryDay} />

// ❌ Wrong — className on a React component
<AlignedIcon className={getClassName('bpk-my-component__icon')} />
```

## Size

- `lg/` icons (`1.5rem` / 24px) — buttons and standalone icons
- `sm/` icons (`1rem` / 16px) — inline-with-text or compact contexts
