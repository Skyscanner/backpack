# BpkChipGroup `renderChip` — Design

**Date:** 2026-07-21
**Status:** Approved (design), pending implementation
**Related:** PR #4910 (demo story showing the anchoring limitation),
PR #4918 (colleague POC — API design reference only; will not be merged)

## Problem

Combining `BpkMultiSelectChipGroup` with `BpkPopover` cannot anchor a popover to
the specific clicked chip. The popover always appears at a fixed position (the
left edge of the group).

Root cause: `BpkMultiSelectChipGroup` takes a `chips: ChipItem[]` data array and
renders each chip internally via `chips.map(<Chip>)`. Those internal chips do not
expose a `ref`, so `BpkPopover` (which clones its `target` element and injects
`ref: refs.setReference` for `@floating-ui/react`) has no way to obtain an
individual chip's bounding rect.

## Goal

Add an optional `renderChip` render prop to `ChipItem`. When provided, the group
delegates leaf rendering of that chip slot to the caller instead of picking from
the internal `CHIP_COMPONENT_MAP`. The caller can then render
`<BpkPopover target={<Chip/>}>…</BpkPopover>` in place, so the popover anchors
precisely to that chip.

This design aligns to colleague **PR #4918** (`[BpkChipGroup] POC: renderChip
render prop for custom subcomponents`), which is the reference implementation.

## Design source — PR #4918

PR #4918 already implements exactly this on official Backpack:
- Adds `renderChip?: (props: ChipRenderProps) => ReactElement | null` to `ChipItem`.
- Adds and exports a `ChipRenderProps` type from the package barrel.
- `Chip` calls `renderChip(...)` before default rendering, passing back the
  group-computed state so the caller does not rebuild it from scratch.
- Adds a `WithPopover` Storybook story.

This spec documents that design (and the earlier discovery that hotels-website
ships a simpler no-arg `() => ReactNode` variant of the same idea in its fork).

## Scope

**In scope:**
- `renderChip?: (props: ChipRenderProps) => ReactElement | null` on `ChipItem`.
- New exported `ChipRenderProps` type.
- `Chip` internal render branch that calls `renderChip` with group-computed props.
- **`forwardRef` on `BpkSelectableChip` and `BpkDropdownChip`** so `BpkPopover`
  can inject its ref into the chip target. Without this the popover cannot obtain
  the chip's DOM node and anchoring still fails — it is a hard prerequisite, not
  optional. (Added on the #4918 branch; `bpk-component-chip` package.)
- `WithPopover` Storybook story.
- Barrel export of `ChipRenderProps` from `index.ts`.

**Out of scope (explicitly dropped):**
- `content?: ReactNode` field. `content` renders *inside* the chip's `<button>`
  (as `{content || text}`), so it cannot host a popover without producing a
  button-in-button structure. It solves a different problem (rich-text chip body,
  e.g. hotels `NeighbourhoodChipsGroup`) and is not needed for popover anchoring.
  Any rich-text-chip need is a separate proposal.
- Top-level `children` composition API (earlier approach A — dropped in favour of
  the render prop, which is a smaller, fully backward-compatible change).
- `BpkSingleSelectChipGroup` behavioural change. `renderChip` lives on the shared
  `ChipItem` type; no single-select-specific logic is added.
- Hotels-specific fork extras (`mobilePadding`, `BpkVessel`, sticky-chip
  `FilterIconSm`).

Backward compatible: `renderChip` is an optional field; existing `chips` array
callers need zero changes. No change to `MultiSelectProps` / `SingleSelectProps`,
so there is no discriminated-union type risk on the single-select path.

## Design

### 1. Types

```ts
import type { ReactNode, ReactElement } from 'react';

// NEW — the group-computed state handed back to the caller's render fn
export type ChipRenderProps = {
  selected: boolean;
  chipStyle: ChipStyleType;
  accessibilityLabel: string;
  onClick: () => void;   // pre-wired toggle (calls the item's onClick(!selected, index))
  index: number;
};

export type ChipItem = {
  component?: ChipComponentType;
  renderChip?: (props: ChipRenderProps) => ReactElement | null;  // NEW
  onClick?: (selected: boolean, index: number) => void;
  selected?: boolean;
  hidden?: boolean;
} & SingleSelectChipItem;
```

Why a function taking `ChipRenderProps`, not a bare `ReactNode`:
- **Lazy / conditional**: `renderChip` is only called when the chip actually
  renders (after the `hidden` check), so a heavy stateful chip (e.g. a popover
  filter) is not instantiated for hidden or unrendered slots.
- **State handed back**: the group computes `selected`, a pre-wired `onClick`
  toggle, `chipStyle`, `accessibilityLabel`, and `index`, and passes them to the
  caller — so the caller wires its custom chip without rebuilding the default
  bindings from scratch.
- **`ReactElement | null` return** matches the `hidden ? null` contract.

### 2. Rendering — `Chip` internal component

```tsx
const {
  accessibilityLabel,
  component = CHIP_COMPONENT.selectable,
  hidden = false,
  leadingAccessoryView = null,
  onClick,
  renderChip,     // NEW
  selected,
  text,
  ...rest
} = chipItem;

if (hidden) return null;               // hoisted above the branch

const handleClick = () => {
  if (onClick) {
    onClick(!selected, chipIndex);
  }
};

if (renderChip) {                      // NEW — delegate leaf rendering to caller
  return renderChip({
    selected: selected ?? false,
    chipStyle,
    accessibilityLabel: accessibilityLabel || text,
    onClick: handleClick,
    index: chipIndex,
  });
}

const Component = CHIP_COMPONENT_MAP[component];
return (
  <Component
    selected={selected ?? false}
    type={chipStyle}
    accessibilityLabel={accessibilityLabel || text}
    onClick={handleClick}
    role={ariaMultiselectable ? 'checkbox' : 'radio'}
    leadingAccessoryView={leadingAccessoryView}
    {...rest}
  >
    {text}
  </Component>
);
```

Notes:
- `hidden` check is hoisted so both the `renderChip` and default paths honour it.
- `handleClick` is extracted so the default chip and the `renderChip` callback
  share the identical toggle behaviour.
- `renderChip` returns before any default `<Component>` render, so the caller owns
  the element `BpkPopover` clones — giving `@floating-ui/react` the chip's real
  bounding rect, which is why anchoring works.

rail machinery (`BpkMobileScrollContainer` + `scrollContainerRef` + two `Nudger`s
+ `stickyChip`) and `ChipGroupContent` are unchanged.

### 3. `forwardRef` on the chip components (`bpk-component-chip`)

**Prerequisite for popover anchoring.** `BpkPopover` positions itself by
`cloneElement(target, { ref: refs.setReference })` — it injects a ref into its
`target`. If the target is a `<BpkDropdownChip>` that does not forward that ref to
its underlying `<button>`, `@floating-ui/react` receives `null` and the popover
still cannot anchor. So the chip components used as popover targets must forward
their ref to the DOM node.

`BpkSelectableChip` (the leaf that renders the `<button>`) and `BpkDropdownChip`
(which wraps it) are wrapped in `forwardRef`:

```tsx
// BpkSelectableChip.tsx
const BpkSelectableChip = forwardRef<HTMLButtonElement, Props>(
  ({ accessibilityLabel, children, className, /* … */ role = 'checkbox', /* … */ }, ref) => {
    // …
    return (
      <button
        ref={ref}
        aria-checked={role === 'button' || role === 'tab' ? undefined : selected}
        className={classNames}
        {/* …unchanged… */}
      >
        {/* …unchanged… */}
      </button>
    );
  },
);

// BpkDropdownChip.tsx
const BpkDropdownChip = forwardRef<HTMLButtonElement, Props>(
  ({ disabled = false, leadingAccessoryView = null, selected = false, type = CHIP_TYPES.default, ...rest }, ref) => (
    <BpkSelectableChip
      ref={ref}
      disabled={disabled}
      leadingAccessoryView={leadingAccessoryView}
      selected={selected}
      type={type}
      {...getDataComponentAttribute('DropdownChip')}
      {...rest}
      trailingAccessoryView={<ChevronDownIconSm />}
    />
  ),
);
```

This is a backward-compatible, internal change — `forwardRef` does not alter the
public props. Other chip variants (`BpkDismissibleChip`, `BpkIconChip`) are out of
scope unless a caller needs them as popover targets; the design leaves them
untouched to keep the change minimal, and this limit is called out so it is not
mistaken for full coverage.

### 4. Storybook — `WithPopover` story

Add to the main `BpkChipGroup.stories.tsx` (matching PR #4918):

```tsx
const POPOVER_CHIP_LABELS = ['Flights', 'Hotels', 'Car hire', 'Trains'];

const WithPopoverExample = () => {
  const chipsWithPopover: ChipItem[] = POPOVER_CHIP_LABELS.map((label) => ({
    text: label,
    renderChip: ({
      accessibilityLabel,
      chipStyle,
      index,
      selected,
    }: ChipRenderProps) => (
      <BpkPopover
        id={`popover-chip-${index}`}
        label={`${label} options`}
        labelAsTitle
        placement="bottom"
        showArrow={false}
        closeButtonLabel={`Close ${label} options`}
        onClose={() => {}}
        target={
          <BpkDropdownChip
            accessibilityLabel={accessibilityLabel}
            type={chipStyle}
            selected={selected}
            onClick={() => {}}
          >
            {label}
          </BpkDropdownChip>
        }
      >
        <BpkText>Content for {label}</BpkText>
      </BpkPopover>
    ),
  }));

  return (
    <BpkMultiSelectChipGroup
      type={CHIP_GROUP_TYPES.wrap}
      chips={chipsWithPopover}
      ariaLabel="Select filters"
    />
  );
};

export const WithPopover = {
  render: () => <WithPopoverExample />,
};
```

Delete the standalone demo files added by PR #4910:
`BpkChipGroupPopoverExample.stories.tsx` and
`BpkChipGroupPopoverExample.stories.module.scss` — superseded by `WithPopover`.

### 5. Barrel export

Export `ChipRenderProps` from `bpk-component-chip-group/index.ts` alongside
`ChipItem` / `MultiSelectProps` / etc., so consumers can type their render fns.

### 6. Tests, docs, verification

Tests (`BpkMultiSelectChipGroup-test.tsx`):
- `renderChip` is called and its returned element is rendered instead of the
  default chip.
- the `ChipRenderProps` handed to `renderChip` carry the expected `selected`,
  `chipStyle`, `accessibilityLabel`, `index`, and a working `onClick` (invoking it
  fires the item's `onClick(!selected, index)`).
- `hidden` still suppresses a `renderChip` chip (returns null, callback not
  invoked).
- existing `chips` array cases stay green (backward-compat evidence).
- update snapshots if any.

Tests (`bpk-component-chip`): a ref passed to `BpkSelectableChip` /
`BpkDropdownChip` resolves to the underlying `<button>` element (guards the
popover-anchoring prerequisite). Existing chip tests stay green.

Docs:
- Update `bpk-component-chip-group/README.md` with the `renderChip` usage and the
  popover-anchoring example; note that `renderChip` receives group-computed props
  (`selected`, pre-wired `onClick`, `chipStyle`, `accessibilityLabel`, `index`)
  and that the caller owns the returned element (role/a11y beyond what is passed).

Verification (direct commands, not nx cached tasks):
- `pnpm eslint <changed files>`
- `pnpm tsc` (or the project's tsc)
- `pnpm jest bpk-component-chip-group bpk-component-chip`
- Manual Storybook check: the `WithPopover` story — click different chips, each
  popover anchors to its own chip.

### Changed files

**`bpk-component-chip-group`:**
1. `BpkMultiSelectChipGroup.tsx` — add `ChipRenderProps` type, `renderChip` on
   `ChipItem`, hoist `hidden`, extract `handleClick`, add the `renderChip` branch.
2. `index.ts` — export `ChipRenderProps`.
3. `BpkChipGroup.stories.tsx` — add `WithPopover` story (with `showArrow={false}`).
4. Delete `BpkChipGroupPopoverExample.stories.tsx` + `.stories.module.scss`.
5. `BpkMultiSelectChipGroup-test.tsx` — `renderChip` / `ChipRenderProps` / hidden
   cases.
6. `README.md` — `renderChip` usage.

**`bpk-component-chip`:**
7. `BpkSelectableChip.tsx` — wrap in `forwardRef`, forward `ref` to `<button>`.
8. `BpkDropdownChip.tsx` — wrap in `forwardRef`, forward `ref` to
   `BpkSelectableChip`.
9. chip tests — ref-forwarding case.

(No SCSS change expected, so no `.module.css` recompile — confirm during
implementation.)

### Relationship to PR #4918

PR #4918 is a colleague POC/demo and **will not be merged** — it is used here only
as the API design reference. This spec therefore covers the **full
implementation** independently: the `renderChip` prop and `ChipRenderProps` type,
the `WithPopover` story, plus the test / README / cleanup items the POC left
unchecked. Nothing here depends on #4918 landing; we reimplement the prop from
scratch, matching its API shape (`ChipRenderProps` render prop) because that shape
was validated as the better design (group hands back state vs. hotels' no-arg
`() => ReactNode`).
