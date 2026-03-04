<!--
==============================================================================
DOCUMENT PURPOSE: Design HOW to implement spec.md requirements (Implementation)
==============================================================================

FOCUS: HOW
- How to implement the requirements
- What technologies and patterns to use
- How files should be organized
==============================================================================
-->

# Implementation Plan: BpkSegmentedControlV2

**Package Branch**: `001-composable-segmented-control` | **Date**: 2026-03-03 | **Spec**: [spec.md](./spec.md)

## Summary

Rebuild the existing `BpkSegmentedControl` as a fully composable V2 component (`BpkSegmentedControlV2`) built on Ark-UI's `SegmentGroup` primitive. The component ships as a new named export alongside V1 (unchanged), uses CSS custom properties for VDL 2.0 theming support, and adopts the WAI-ARIA radiogroup pattern. V1 remains the default export during a minimum 3-month deprecation window.

---

## Technical Context

**Framework**: React 18.3.1 with TypeScript 5.9.2
**Styling**: CSS Modules + Sass (modern `@use` API)
**Testing**: Jest 30 + Testing Library + jest-axe
**Build Tools**: Webpack 5, Babel 7
**Linting**: ESLint (`@skyscanner/eslint-config-skyscanner`), Stylelint
**Component Library**: Backpack Design System (Monorepo)
**Package Manager**: npm ≥ 10.7.0
**Node Version**: ≥ 18.20.4
**Target Browsers**: Chrome 109+, Edge 142+, Firefox 145+, Safari 16+, Samsung 29+
**New External Dependency**: `@ark-ui/react` — direct dependency (in `dependencies`)
**Performance Goals**: Bundle size increase ≤ 5 kB gzipped vs V1; test coverage ≥ 70% branches, 75% functions/lines/statements
**Constraints**: Backpack constitution; V1 must remain unchanged and passing

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

- [x] **Component-First Architecture**: V2 in `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/`
- [x] **Naming Conventions**: `BpkSegmentedControlV2`, `.module.scss`, `-test.tsx`
- [x] **License Headers**: All new `.ts`, `.tsx`, `.scss` files include Apache 2.0 header
- [x] **Modern Sass**: `@use` only; granular imports from `bpk-mixins` submodules
- [x] **Accessibility-First**: `accessibility-test.tsx` with jest-axe; WAI-ARIA radiogroup
- [x] **TypeScript**: All code in TypeScript with exported types
- [x] **SemVer**: MINOR for adding V2 as opt-in export; MINOR for V1 deprecation; MAJOR for V1 removal
- [x] **Deprecation Management**: V1 gets `@deprecated` JSDoc + `console.warn` ≥ 3 months after V2 stable
- [x] **Test Coverage**: ≥ 70% branches, 75% functions/lines/statements
- [x] **Documentation**: README (V2 section), Storybook, JSDoc, Figma Code Connect

### Technology Compliance

- [x] **React Version**: React 18.3.1
- [x] **TypeScript Version**: TypeScript 5.9.2
- [x] **CSS Modules**: `.module.scss`
- [x] **rem Units**: All sizing via `tokens.bpk-spacing-*()` functions (return rem)
- [x] **Design Tokens**: `@skyscanner/bpk-foundations-web` via `bpk-mixins`
- [x] **BEM Naming**: `bpk-segmented-control-v2`, `bpk-segmented-control-v2__item`, `bpk-segmented-control-v2--shadow`
- [x] **RTL Support**: CSS logical properties; `isRTL()` for keyboard mirroring
- [x] **Browser Support**: Chrome 109+, Edge 142+, Firefox 145+, Safari 16+

### Testing Compliance

- [x] **Unit Tests**: `BpkSegmentedControlV2-test.tsx` (Jest + Testing Library)
- [x] **Accessibility Tests**: `accessibility-test.tsx` (jest-axe)
- [x] **Visual Tests**: Percy via Storybook (no image assets → tests are safe)
- [x] **Snapshot Tests**: Included for all type variants and disabled states
- [x] **Coverage Thresholds**: ≥ 70% branches, 75% functions/lines/statements

### Documentation Compliance

- [x] **British English**: README prose in British English; code in US English
- [x] **Sentence Case**: Titles use sentence case, singular
- [x] **<100 Words**: Component description under 100 words
- [x] **Storybook**: Stories in `examples/bpk-component-segmented-control/`
- [x] **JSDoc**: All public APIs documented
- [x] **Figma Connect**: `BpkSegmentedControlV2.figma.tsx`

---

## Complexity Tracking

No constitution violations. Component follows all Backpack standards.

Exception documented: `@ark-ui/react` is a new direct external dependency. Justified because Ark-UI provides a production-quality, accessibility-correct radiogroup state machine, WAI-ARIA compliance, and keyboard handling that would require significant custom code to replicate safely. The 5 kB gzipped bundle limit enforces proportionality.

---

## Project Structure

### Specs artefacts

```
specs/001-composable-segmented-control/
├── spec.md
├── plan.md              (this file)
├── research.md
├── api-design.md
├── styling-guide.md
├── examples/
│   ├── examples.tsx     (story implementations template)
│   └── stories.tsx      (Storybook story definitions template)
└── checklists/
    └── requirements.md
```

### Package structure

```
packages/bpk-component-segmented-control/
├── README.md                              (update — V2 section)
├── index.ts                               (update — add V2 exports)
└── src/
    ├── BpkSegmentedControl.tsx            (V1 — unchanged)
    ├── BpkSegmentedControl.module.scss    (V1 — unchanged)
    ├── BpkSegmentedControl-test.tsx       (V1 — unchanged)
    ├── accessibility-test.tsx             (V1 — unchanged)
    └── BpkSegmentedControlV2/             (NEW)
        ├── BpkSegmentedControlV2.tsx
        ├── BpkSegmentedControlV2.module.scss
        ├── BpkSegmentedControlV2-test.tsx
        ├── accessibility-test.tsx
        ├── BpkSegmentedControlV2.figma.tsx
        ├── common-types.ts
        └── __snapshots__/
```

### Storybook examples

```
examples/bpk-component-segmented-control/
├── examples.tsx      (update — add V2 examples)
└── stories.tsx       (update — add V2 stories)
```

### Migration codemod

```
scripts/codemods/segmented-control-v1-to-v2/
├── transform.ts
├── transform-test.ts
└── fixtures/
    ├── basic-input.tsx           (V1 usage with literal array)
    ├── basic-output.tsx          (expected V2 output)
    ├── dynamic-contents-input.tsx  (V1 usage with variable — warning case)
    └── dynamic-contents-output.tsx (unchanged — warning emitted)
```

---

## Phase 0: Research Findings

*See [research.md](./research.md) for full details.*

### Key decisions from research

| Decision | Rationale |
|---|---|
| Import: `import { SegmentGroup } from '@ark-ui/react/segment-group'` | Granular import, smaller bundle than `@ark-ui/react` |
| Ark-UI `onValueChange({value})` → Backpack `onChange(value)` | API alignment; consumers don't need to know Ark-UI's callback shape |
| Dot-notation export (`BpkSegmentedControlV2.Root`, `.Item`) | New pattern for Backpack; aligns with industry standard composable component APIs (Radix, Ark-UI itself) |
| React Context NOT needed for basic operation | Ark-UI's SegmentGroup manages its own context for selection; Backpack only needs context for cross-cutting concerns (`type` styling on items) if items need to know the type |
| Manual activation mode: custom `onKeyDown` override | Ark-UI does not natively support manual mode; V1's implementation carried forward |
| No `themeAttributes.ts` | V2 uses CSS variables, not `bpk-theming` system |
| Codemod tool: `jscodeshift` | Industry standard for React/TS AST transformations |

### Ark-UI `SegmentGroup` sub-components used in V2

| Ark-UI sub-component | V2 usage |
|---|---|
| `SegmentGroup.Root` | Wrapped by `BpkSegmentedControlV2.Root` |
| `SegmentGroup.Item` | Wrapped by `BpkSegmentedControlV2.Item` |
| `SegmentGroup.ItemControl` | Internal — holds visible content, receives focus ring |
| `SegmentGroup.ItemText` | Internal — wraps children content |
| `SegmentGroup.ItemHiddenInput` | Internal — carries `role="radio"`, `aria-checked` |
| `SegmentGroup.Indicator` | **Excluded** — animated indicator deferred |
| `SegmentGroup.Label` | Not used — Backpack uses `aria-label` on Root instead |

---

## Phase 1: Design & Contracts

*See [api-design.md](./api-design.md) and [styling-guide.md](./styling-guide.md) for full details.*

### Component API

#### `BpkSegmentedControlV2.Root` props

```typescript
type BpkSegmentedControlV2RootProps = {
  children: React.ReactNode;            // Required — Item elements
  value?: string;                       // Controlled selected value
  defaultValue?: string;                // Uncontrolled initial value
  onChange?: (value: string) => void;   // Selection callback
  type?: SegmentTypesV2;                // default: 'canvas-default'
  shadow?: boolean;                     // default: false
  disabled?: boolean;                   // default: false
  activationMode?: 'automatic' | 'manual'; // default: 'automatic'
  label?: string;                       // aria-label for the group
};
```

#### `BpkSegmentedControlV2.Item` props

```typescript
type BpkSegmentedControlV2ItemProps = {
  value: string;                        // Required — unique identifier
  children: React.ReactNode;            // Required — visible content
  disabled?: boolean;                   // default: false
  accessibilityLabel?: string;          // aria-label override for icon-only items
};
```

#### Type constant

```typescript
const SEGMENT_TYPES_V2 = {
  CanvasDefault: 'canvas-default',
  CanvasContrast: 'canvas-contrast',
  SurfaceDefault: 'surface-default',
  SurfaceContrast: 'surface-contrast',
} as const;
```

#### Composite export pattern

```typescript
const BpkSegmentedControlV2 = {
  Root: BpkSegmentedControlV2Root,
  Item: BpkSegmentedControlV2Item,
};
export default BpkSegmentedControlV2;
```

### Updated `index.ts`

```typescript
// V1 — unchanged; remains default export during deprecation window
export default BpkSegmentedControl;
export { useSegmentedControlPanels, SEGMENT_TYPES };
export type { BpkSegmentControlProps, TabPanelProps, SegmentTypes };

// V2 — new experimental named export
export { default as BpkSegmentedControlV2, SEGMENT_TYPES_V2 }
  from './src/BpkSegmentedControlV2/BpkSegmentedControlV2';
export type {
  BpkSegmentedControlV2RootProps,
  BpkSegmentedControlV2ItemProps,
  SegmentTypesV2,
} from './src/BpkSegmentedControlV2/common-types';
```

### CSS class structure (BEM)

```
.bpk-segmented-control-v2                    Root / radiogroup container
.bpk-segmented-control-v2--canvas-default    Type modifier
.bpk-segmented-control-v2--canvas-contrast
.bpk-segmented-control-v2--surface-default
.bpk-segmented-control-v2--surface-contrast
.bpk-segmented-control-v2--shadow            Shadow modifier
.bpk-segmented-control-v2__item              Ark-UI Item wrapper (<label>)
.bpk-segmented-control-v2__item-control      Visual button surface (receives focus)
.bpk-segmented-control-v2__item-text         Content wrapper (text + icons)
```

### CSS custom properties

```scss
.bpk-segmented-control-v2 {
  // Default theme (canvas-default) — all vars set from tokens:
  --bpk-segmented-control-bg:                  #{$bpk-private-segmented-control-canvas-default-day};
  --bpk-segmented-control-item-color:          #{$bpk-text-primary-day};
  --bpk-segmented-control-item-disabled-color: #{$bpk-text-disabled-day};
  --bpk-segmented-control-indicator-bg:        #{$bpk-core-primary-day};
  --bpk-segmented-control-indicator-color:     #{$bpk-text-on-dark-day};
  --bpk-segmented-control-border-radius:       #{$bpk-border-radius-sm};
  --bpk-segmented-control-padding-x:           #{bpk-spacing-base()};
  --bpk-segmented-control-padding-y:           #{bpk-spacing-md()};
  --bpk-segmented-control-divider-color:       #{$bpk-line-day};
}
```

Type variants override only the variables that differ (see [styling-guide.md](./styling-guide.md) §6 for full token mapping).

### RTL strategy

- All directional CSS uses logical properties (`border-inline-start`, `border-start-start-radius`, etc.)
- Arrow-key navigation is manually mirrored using `isRTL()` from `bpk-react-utils` in both automatic and manual modes

### Manual activation mode implementation

Since Ark-UI has no native manual activation mode:
1. Track focused item separately with a `useRef` ref array
2. Intercept `onKeyDown` on `SegmentGroup.Root`
3. On arrow keys: move DOM focus without calling `onChange`
4. On Space/Enter: call `onChange(focusedItemValue)`
5. In automatic mode: use Ark-UI's built-in arrow-key behavior (no override needed)

### Duplicate value warning

```typescript
// Development-only check in BpkSegmentedControlV2Root render:
if (process.env.NODE_ENV === 'development') {
  // Extract values from Item children and warn on duplicates
  console.warn(`BpkSegmentedControlV2: duplicate item value "${v}" found. ...`);
}
```

### ARIA model (set by Ark-UI automatically)

| Element | Role | Key attributes |
|---|---|---|
| `SegmentGroup.Root` | `radiogroup` | `aria-label`, `aria-orientation="horizontal"`, `aria-disabled` |
| `SegmentGroup.ItemHiddenInput` | `radio` | `aria-checked`, `aria-disabled`, `tabindex` (roving) |
| `SegmentGroup.ItemControl` | none | `data-state="checked/unchecked"`, `data-disabled` |

### Storybook examples (14 stories)

| Story name | What it demonstrates |
|---|---|
| Default | Controlled, canvas-default, 3 items |
| Uncontrolled | `defaultValue` usage |
| Type — canvas-contrast | Surface variant |
| Type — surface-default | Surface variant |
| Type — surface-contrast | Dark surface variant |
| With shadow | `shadow` prop |
| Root disabled | All items non-interactive |
| Individual item disabled | One item disabled |
| Icon + text content | Composable children |
| Icon-only with accessibilityLabel | `accessibilityLabel` prop |
| CSS variable override (VDL 2.0 preview) | Theming API |
| RTL layout | `dir="rtl"` wrapper |
| Edge case — 2 items | Minimum valid configuration |
| Edge case — long label text | Text truncation |
| Edge case — no initial selection | No `value` or `defaultValue` |

---

## Dependencies

### Internal Backpack

- `bpk-react-utils` — `cssModules`, `isRTL`, `getDataComponentAttribute`
- `bpk-mixins` — `tokens`, `utils`, `typography`, `radii`, `shadows`
- `@skyscanner/bpk-foundations-web` — design tokens (transitive via `bpk-mixins`)

### External (new)

- `@ark-ui/react` — direct dependency, `SegmentGroup` primitive
  - Import: `import { SegmentGroup } from '@ark-ui/react/segment-group'`
  - Version: to be pinned at implementation time; use latest stable `^3.x`

### Migration tooling (new dev dependency)

- `jscodeshift` — AST-based codemod tool
- `@babel/parser` with TypeScript plugin — for TSX parsing

---

## Testing Strategy

### Unit tests — `BpkSegmentedControlV2-test.tsx`

```
Rendering:
  ✓ Renders root + items with minimal props
  ✓ Renders each type variant with correct class names
  ✓ Renders shadow class when shadow=true
  ✓ Snapshot: each type variant
  ✓ Snapshot: disabled root
  ✓ Snapshot: individual disabled item

Controlled behaviour:
  ✓ Calls onChange with item value when item clicked
  ✓ Does not call onChange when already-selected item is clicked
  ✓ Reflects external value change when value prop updates

Uncontrolled behaviour:
  ✓ Renders first item as selected when defaultValue matches first item
  ✓ No item selected when no defaultValue provided

Keyboard navigation (automatic mode):
  ✓ ArrowRight moves focus + selection to next item
  ✓ ArrowLeft moves focus + selection to previous item
  ✓ ArrowRight wraps from last to first
  ✓ Home moves focus + selection to first item
  ✓ End moves focus + selection to last item
  ✓ ArrowRight is ArrowLeft in RTL (isRTL mock returns true)

Keyboard navigation (manual mode):
  ✓ ArrowRight moves focus but does NOT change onChange value
  ✓ Space/Enter on focused item calls onChange with that item's value

Disabled:
  ✓ Root disabled: all items non-interactive (no onChange fires)
  ✓ Item disabled: only that item non-interactive

Duplicate value warning:
  ✓ console.warn fires in development mode when two items share value
  ✓ No console.warn in production mode

accessibilityLabel:
  ✓ aria-label set on ItemControl when accessibilityLabel prop provided
```

### Accessibility tests — `accessibility-test.tsx`

```
✓ No axe violations: canvas-default, 3 items, first selected
✓ No axe violations: canvas-contrast type
✓ No axe violations: surface-contrast type
✓ No axe violations: root disabled
✓ No axe violations: individual item disabled
✓ No axe violations: icon-only with accessibilityLabel
✓ No axe violations: no initial selection
```

### Migration codemod tests — `transform-test.ts`

```
✓ Transforms literal string array buttonContents to Item children
✓ Transforms literal ReactNode array buttonContents to Item children
✓ Maps onItemClick index callback to onChange value callback correctly
✓ Preserves type, shadow, activationMode, label props
✓ Leaves dynamic buttonContents unchanged + emits warning
✓ Leaves useSegmentedControlPanels usage unchanged + emits warning
✓ Output compiles without TypeScript errors (verified against fixture output)
```

---

## Migration & Versioning

**Version bump sequence**:

1. **MINOR** — Add `BpkSegmentedControlV2` as named export; V1 unchanged
2. **MINOR** — Add `@deprecated` JSDoc + `console.warn` to V1 (≥ 3 months after step 1)
3. **MAJOR** — Remove V1; `BpkSegmentedControlV2` becomes default export (rename to `BpkSegmentedControl`)

**Breaking changes in V2 vs V1**:

| V1 API | V2 API | Migration |
|---|---|---|
| `buttonContents: string[] \| ReactNode[]` | Children composition | Codemod |
| `onItemClick: (id: number) => void` | `onChange: (value: string) => void` | Codemod: wrap with `Number(v)` if needed |
| `useSegmentedControlPanels` hook | Not available in V2 | Manual migration; use `bpk-component-horizontal-nav` for tab-panel use cases |
| `id` prop (panel linking) | Not available in V2 | Remove — V2 uses radiogroup, not tablist |

**V1 deprecation messages**:

```typescript
/**
 * @deprecated BpkSegmentedControl is deprecated. Use BpkSegmentedControlV2 instead.
 * See migration guide: [link]
 */
const BpkSegmentedControl = (props: Props) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'BpkSegmentedControl is deprecated and will be removed in the next major version. ' +
      'Use BpkSegmentedControlV2 instead. See migration guide: [link]'
    );
  }
  // ... existing implementation
};
```

---

## Release Checklist

- [ ] Constitution checks all pass
- [ ] Unit tests pass (coverage ≥ 70% branches, 75% functions/lines/statements)
- [ ] Accessibility tests pass (zero axe violations for all variants)
- [ ] TypeScript compiles without errors or `@ts-ignore` suppressions
- [ ] ESLint and Stylelint pass with zero warnings
- [ ] Bundle size increase verified ≤ 5 kB gzipped vs V1
- [ ] Storybook stories implemented and Percy tests pass
- [ ] README updated with V2 composable usage and CSS variable table
- [ ] Migration guide complete with before/after code examples
- [ ] Codemod script tested against all Skyscanner monorepo usages
- [ ] Manual accessibility testing: keyboard nav + VoiceOver + NVDA
- [ ] RTL layout verified manually
- [ ] V1 tests still passing (no regressions)

---

## References

- **Spec**: [spec.md](./spec.md)
- **Research**: [research.md](./research.md)
- **API Design**: [api-design.md](./api-design.md)
- **Styling Guide**: [styling-guide.md](./styling-guide.md)
- **Examples**: [examples/](./examples/)
- **Ark-UI SegmentGroup**: https://ark-ui.com/docs/components/segment-group
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **V1 Component**: `packages/bpk-component-segmented-control/src/BpkSegmentedControl.tsx`
- **BpkButtonV2 theming reference**: `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss`
