# Research: BpkSegmentedControlV2

**Branch**: `001-composable-segmented-control`
**Date**: 2026-03-03
**Spec**: [spec.md](./spec.md)

---

## 1. Ark-UI SegmentGroup API

**Decision**: Use `@ark-ui/react/segment-group` as the underlying primitive.

**Import path**:
```
import { SegmentGroup } from '@ark-ui/react/segment-group'
```

### Sub-components available

| Sub-component | Rendered element | Notes |
|---|---|---|
| `SegmentGroup.Root` | `<div>` | Container; radiogroup role |
| `SegmentGroup.Item` | `<label>` | Each segment; radio role |
| `SegmentGroup.ItemText` | `<span>` | Visible label text inside Item |
| `SegmentGroup.ItemControl` | `<div>` | Visual indicator (the button-like element) |
| `SegmentGroup.ItemHiddenInput` | `<input type="radio">` | Accessible hidden input, included automatically |
| `SegmentGroup.Label` | `<span>` | Group label; ties to `aria-labelledby` |
| `SegmentGroup.Indicator` | `<div>` | Animated sliding indicator (**excluded from V2 scope**) |
| `SegmentGroup.RootProvider` | — | External state control via `useSegmentGroup()` |

### Root props (key subset)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Uncontrolled initial value |
| `onValueChange` | `(details: {value: string}) => void` | — | Selection callback; note: wrapped to `onChange(value)` in Backpack API |
| `disabled` | `boolean` | `false` | Disables entire group |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | V2 is horizontal-only |
| `name` | `string` | — | HTML form `name` attribute on hidden inputs |
| `required` | `boolean` | `false` | HTML form validation |

### Item props (key subset)

| Prop | Type | Required | Notes |
|---|---|---|---|
| `value` | `string` | ✅ | Unique identifier within group |
| `disabled` | `boolean` | — | Disables this individual item |

### ARIA model

Follows WAI-ARIA Radio Group design pattern:
- `Root` → `role="radiogroup"`, `aria-orientation="horizontal"`
- `Item` → `role="radio"`, `aria-checked`, `aria-disabled`
- `ItemHiddenInput` → actual `<input type="radio">` carrying the accessible state
- Group label wired via `aria-labelledby` when `Label` sub-component is present

### Keyboard navigation (Ark-UI built-in)

| Key | Behaviour |
|---|---|
| Tab | Focus the checked item; if none, the first item |
| Space | Check the focused unchecked item |
| ArrowRight / ArrowDown | Move focus and check next item (wraps) |
| ArrowLeft / ArrowUp | Move focus and check previous item (wraps) |

> **Manual activation mode note**: Ark-UI provides only automatic activation (arrow keys move focus AND selection simultaneously). Manual mode (focus moves, selection requires Space/Enter) is **not natively supported** by Ark-UI's state machine. It must be implemented with a custom `onKeyDown` handler that intercepts arrow keys, updates DOM focus manually, and only triggers `onValueChange` on Space/Enter. This is carried forward from V1's custom implementation and is an isolated addition on top of Ark-UI.

### CSS custom properties exposed by Ark-UI (Indicator only — not used in V2)

`--transition-property`, `--left`, `--top`, `--width`, `--height` are set by `SegmentGroup.Indicator`. Since V2 excludes the animated indicator, these are irrelevant.

---

## 2. Composable Component Patterns in Backpack

**Decision**: Adopt a React Context + sub-component pattern for the composable API.

**Rationale**: The `BpkAccordion` + `BpkAccordionItem` pattern is the closest existing precedent. It uses `React.createContext` to pass parent configuration (e.g., `onDark`, `divider` in Accordion; `type`, `disabled`, `selectedValue` for V2) to child items without prop drilling. Dot-notation export (`BpkSegmentedControlV2.Root`, `.Item`) is a new pattern for Backpack but is a minor convention extension of the named-export approach.

**Dot-notation export pattern**:
```typescript
// In BpkSegmentedControlV2.tsx — compose the export object:
const BpkSegmentedControlV2 = {
  Root: BpkSegmentedControlV2Root,
  Item: BpkSegmentedControlV2Item,
};
export default BpkSegmentedControlV2;
```

**Context usage**: `BpkSegmentedControlV2Context` carries read-only state from Root to Items:
- `selectedValue: string | undefined`
- `disabled: boolean`
- `type: SegmentTypes`
- However, since Ark-UI's `SegmentGroup.Item` already reads selection state internally via its own context, Backpack's context is primarily needed for `type` (styling variant) and root-level `disabled` forwarding.

**Architecture Decision Reference**: None specific; follows `BpkAccordion` precedent.

---

## 3. Index.ts Export Strategy

**Decision**: Keep V1 as default export, add V2 as named export. Mirror the BpkButton pattern exactly.

**Rationale**: BpkButton sets `const BpkButton = BpkButtonV2; export default BpkButton;` — making V2 the default silently. For V2 of SegmentedControl, since V1 must remain the default during the deprecation window, the pattern is:

```typescript
// index.ts
// V1 (existing — unchanged)
export default BpkSegmentedControl;
export { useSegmentedControlPanels };
export type { BpkSegmentControlProps, TabPanelProps };

// V2 (new)
export { BpkSegmentedControlV2 };
export type { BpkSegmentedControlV2RootProps, BpkSegmentedControlV2ItemProps };
```

After the deprecation window, V2 becomes the default and V1 is removed.

**Architecture Decision Reference**: `decisions/future-api.md` — future components use `V{number}` suffix and are opt-in exports.

---

## 4. CSS Custom Properties Approach

**Decision**: Declare all CSS custom properties via SCSS class selectors (not inline `style` props). Use `var(--property-name, token-fallback)` pattern throughout.

**Rationale**: BpkButtonV2 SCSS sets `--bpk-button-svg-display` directly in class modifier blocks. The `bpk-themeable-property` mixin (`@include utils.bpk-themeable-property($property, $variable, $fallback)`) is available in `bpk-mixins/_utils.scss` and is the canonical way to write CSS variable + token fallback pairs.

**Pattern for V2 segmented control**:
```scss
.bpk-segmented-control-v2 {
  // Default Backpack theme: set all CSS variables from tokens
  --bpk-segmented-control-bg: #{tokens.$bpk-private-segmented-control-canvas-default-day};
  --bpk-segmented-control-item-color: #{tokens.$bpk-text-primary-day};
  --bpk-segmented-control-indicator-bg: #{tokens.$bpk-core-primary-day};
  --bpk-segmented-control-indicator-color: #{tokens.$bpk-text-on-dark-day};
  // ... etc

  background-color: var(--bpk-segmented-control-bg);
}

// Type variants override only the CSS variables they change
&--surface-contrast {
  --bpk-segmented-control-bg: #{tokens.$bpk-private-segmented-control-surface-contrast-day};
  --bpk-segmented-control-item-color: #{tokens.$bpk-text-on-dark-day};
  --bpk-segmented-control-divider-color: #{tokens.$bpk-line-on-dark-day};
}
```

**Architecture Decision Reference**: `decisions/modern-sass-api.md`.

---

## 5. Styling Mixins Available

| Need | Mixin | Import |
|---|---|---|
| Focus ring | `@include utils.bpk-focus-indicator` | `@use '../../bpk-mixins/utils'` |
| RTL flip | `@include utils.bpk-rtl { ... }` | `@use '../../bpk-mixins/utils'` |
| Border radius (group) | `@include radii.bpk-border-radius-sm` | `@use '../../bpk-mixins/radii'` |
| Box shadow | `@include shadows.bpk-box-shadow-sm` | `@use '../../bpk-mixins/shadows'` |
| Typography (item label) | `@include typography.bpk-label-2` | `@use '../../bpk-mixins/typography'` |
| CSS var + token fallback | `@include utils.bpk-themeable-property(...)` | `@use '../../bpk-mixins/utils'` |
| Touch target | `@include utils.bpk-touch-tappable` | `@use '../../bpk-mixins/utils'` |

> **RTL note**: V2 should prefer CSS logical properties (`padding-inline-start`, `border-inline-start`, `border-start-start-radius`) over the `bpk-rtl` mixin. The mixin (`html[dir='rtl'] &`) is the fallback only for properties with no logical equivalent.

---

## 6. Design Tokens Mapped to V2

### Available segmented-control-specific tokens

| Token | Value / Usage |
|---|---|
| `tokens.$bpk-private-segmented-control-canvas-default-day` | Group bg on canvas-default |
| `tokens.$bpk-private-segmented-control-surface-contrast-day` | Group bg on surface-contrast |
| `tokens.$bpk-private-segmented-control-surface-contrast-on-day` | Indicator bg on surface-contrast |
| `tokens.$bpk-core-primary-day` | Indicator bg (selected) for canvas/surface-default types |
| `tokens.$bpk-surface-default-day` | Group bg for canvas-contrast type |
| `tokens.$bpk-text-primary-day` | Item text (unselected) |
| `tokens.$bpk-text-on-dark-day` | Item text when selected (on primary indicator) |
| `tokens.$bpk-line-day` | Divider between items (light bg) |
| `tokens.$bpk-line-on-dark-day` | Divider between items (dark bg / surface-contrast) |
| `tokens.$bpk-border-radius-sm` | Corner radius (static token, not function) |
| `tokens.$bpk-one-pixel-rem` | 1px in rem for borders |

### Spacing tokens used

| Token | Rem value | Usage |
|---|---|---|
| `tokens.bpk-spacing-md()` | 1.25rem | Vertical padding inside items |
| `tokens.bpk-spacing-base()` | 1rem | Horizontal padding inside items |
| `tokens.bpk-spacing-xl()` | 2rem | Minimum item height |

---

## 7. Testing Patterns

**Unit test patterns from V1** (to carry forward and adapt):
- Mock `isRTL` from `bpk-react-utils` with `jest.mock`
- Mock `onChange` with `jest.fn()`, assert call args
- Test keyboard navigation with `fireEvent.keyDown`
- Test ARIA attributes with `getByRole`, `toHaveAttribute`
- Test focus with `expect(element).toHaveFocus()`

**V2-specific test additions**:
- Test radiogroup/radio roles (not tablist/tab)
- Test `aria-checked` on items (not `aria-selected`)
- Test CSS custom property override (via JSDOM `style` assertion on wrapper)
- Test that icon-only items with `BpkVisuallyHidden` pass axe (extractTextContent finds the hidden text)
- Test that icon-only items with no text fail axe (confirms BpkVisuallyHidden is required)

**Accessibility test pattern** (`accessibility-test.tsx`):
```tsx
// Test public API — render Root + Items together
const { container } = render(
  <BpkSegmentedControlV2.Root label="Sort by" defaultValue="price">
    <BpkSegmentedControlV2.Item value="price">Price</BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="rating">Rating</BpkSegmentedControlV2.Item>
  </BpkSegmentedControlV2.Root>
);
const results = await axe(container);
expect(results).toHaveNoViolations();
```

---

## 8. Architecture Decisions Summary

| Decision | Rule | Impact on V2 |
|---|---|---|
| `deprecated-api.md` | `@deprecated` JSDoc + runtime `console.warn` + 3-month minimum | V1 gets `@deprecated` annotation + `console.warn` after V2 stable |
| `future-api.md` | `V{N}` suffix for future components; opt-in then default | V2 = `BpkSegmentedControlV2`; becomes default after deprecation window |
| `versioning-rules.md` | API change = MAJOR; new optional feature = MINOR | V2 introduction = MINOR (V2 is additive); V1 deprecation = MINOR; V1 removal = MAJOR |
| `modern-sass-api.md` | `@use` only, granular imports, namespace prefixes | All V2 SCSS uses `@use` |
| `accessibility-tests.md` | `jest-axe` in `accessibility-test.tsx`, test public API | Test Root + Item composed together |

> **Versioning clarification**: Adding V2 as a named export alongside V1 is a **MINOR** version bump (new optional feature). Deprecating V1 is also **MINOR** (deprecation = non-breaking). Removing V1 is **MAJOR**. This is a 3-step process over two MAJOR versions.

---

## 9. Migration Script Approach

**Decision**: Implement the codemod using `jscodeshift`, which is the standard tool for AST-based JavaScript/TypeScript transformations.

**Rationale**: `jscodeshift` is the industry standard for React codemods (used by React core team, Radix-UI, etc.). It handles JSX AST transformations with proper TypeScript support via `@babel/parser`.

**Transformation rules**:
1. Find all JSX elements `<BpkSegmentedControl ... />`
2. If `buttonContents` prop is a literal array → extract each element as `<BpkSegmentedControlV2.Item value="{index}">`, map `onItemClick` to `onChange={(v) => onItemClick(Number(v))}`
3. If `buttonContents` is a variable reference → emit warning, leave unchanged
4. Map `type` prop → keep as-is (same values)
5. Map `shadow` prop → keep as-is
6. Map `activationMode` prop → keep as-is
7. Map `id` + `label` props → keep as-is on Root
8. Remove `useSegmentedControlPanels` hook usage → emit warning (no direct V2 equivalent)

**Architecture Decision Reference**: Not covered in `decisions/` — new tooling for V2 codemod.
