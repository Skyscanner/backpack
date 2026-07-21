# BpkChipGroup `renderChip` — Design

**Date:** 2026-07-21
**Status:** Approved (design), pending implementation
**Related:** PR #4910 (demo story showing the anchoring limitation)

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

Backport the `renderChip` mechanism that `hotels-website` already ships in its
fork of this component, into official Backpack. `renderChip` lets a caller supply
a custom render function for a single chip item, so the caller can render
`<BpkPopover target={<Chip/>}>…</BpkPopover>` in place — the popover then anchors
precisely to that chip.

This aligns the official component with the hotels fork so hotels can eventually
delete its fork.

## Precedent — hotels-website fork (already in production)

`hotels-website` maintains a fork at
`libs/shared/ui/src/common/BpkChipGroup/` that already implements `renderChip`.
Its `PartnersFilter` uses it to anchor a popover to a chip in production:

```tsx
// OfferFiltersChips.tsx — passes a popover-wrapped chip via renderChip
const partnersChip = {
  text: partnersFilter.title,
  renderChip: () => <PartnersFilter ... />,
};

// PartnersFilter.tsx — the chip IS a popover target
<BpkPopover
  id="offer-filter-partners-popover"
  label={title}
  target={
    <span ref={target}>
      <BpkDropdownChip accessibilityLabel={...} selected={...} onClick={onOpen}>
        {partnersFilterTitle}
      </BpkDropdownChip>
    </span>
  }
  isOpen={isOpen}
  onClose={onClose}
>
  <PartnersFilterOptionList ... />
</BpkPopover>
```

The backport keeps the exact same `renderChip` shape and semantics so this usage
ports over unchanged.

## Scope

**In scope** — three portable changes from the hotels fork:

1. `renderChip?: () => ReactNode` on `ChipItem` — the core fix.
2. `content?: ReactNode` on `SingleSelectChipItem`, rendered as `{content || text}`
   — lets a chip's body be a node, not just a string.
3. `key` de-dup bugfix — official uses `key={chip.text}`, which collides when two
   chips share the same text. Change to `key={`${chip.text}-${index}`}` (with the
   `react/no-array-index-key` eslint-disable the fork uses).

Backward compatible: existing `chips` array callers need zero changes. All three
additions are optional fields / internal keying.

**Out of scope:**
- Hotels-specific differences: `mobilePadding`, `BpkVessel` container, sticky-chip
  hardcoded `FilterIconSm` leading accessory. These are product concerns, not
  Backpack primitives.
- A top-level `children` composition API (was the earlier approach A — dropped in
  favour of matching the hotels fork).
- `BpkSingleSelectChipGroup` behavioural change. `content`/`renderChip` live on
  the shared `ChipItem`/`SingleSelectChipItem` types, so single-select inherits
  them for free — but no new single-select-specific logic is added.

## Design

### 1. Types

Add `renderChip` to `ChipItem` and `content` to `SingleSelectChipItem`:

```ts
export type SingleSelectChipItem = {
  text: string;
  content?: ReactNode;          // NEW — chip body as a node
  accessibilityLabel?: string;
  leadingAccessoryView?: ReactNode;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

export type ChipItem = {
  component?: ChipComponentType;
  onClick?: (selected: boolean, index: number) => void;
  selected?: boolean;
  hidden?: boolean;
  /**
   * Custom render function for the chip. When provided, the default chip
   * rendering (including role, accessibilityLabel, and onClick bindings) is
   * bypassed entirely. All other ChipItem props (onClick, selected, component,
   * etc.) will be ignored.
   */
  renderChip?: () => ReactNode;  // NEW — custom render escape hatch
} & SingleSelectChipItem;
```

No change to `CommonProps` / `MultiSelectProps` / `SingleSelectProps` — the `chips`
array API is untouched, so there is no discriminated-union type risk on the
single-select path.

### 2. Rendering — `Chip` internal component

Two edits inside the internal `Chip` component:

```tsx
const {
  accessibilityLabel,
  component = CHIP_COMPONENT.selectable,
  content,          // NEW — destructure
  hidden = false,
  leadingAccessoryView = null,
  onClick,
  renderChip,       // NEW — destructure
  selected,
  text,
  ...rest
} = chipItem;

// NEW — escape hatch, bypasses default chip entirely
if (renderChip) {
  return hidden ? null : <>{renderChip()}</>;
}

const Component = CHIP_COMPONENT_MAP[component];
return hidden ? null : (
  <Component
    selected={selected ?? false}
    type={chipStyle}
    accessibilityLabel={accessibilityLabel || text}
    onClick={() => { if (onClick) onClick(!selected, chipIndex); }}
    role={ariaMultiselectable ? 'checkbox' : 'radio'}
    leadingAccessoryView={leadingAccessoryView}
    {...rest}
  >
    {content || text}     {/* CHANGED — was `{text}` */}
  </Component>
);
```

`renderChip` returns before any default binding, so the caller owns everything
(role, a11y, onClick, popover). This is why `<BpkPopover target={<Chip/>}>`
anchors correctly: the caller renders a real element in place and `BpkPopover`
clones it, giving `@floating-ui/react` the chip's real bounding rect.

### 3. `key` de-dup in `ChipGroupContent`

```tsx
{chips.map((chip, index) => (
  <Chip
    // Use chip.text with index to ensure unique keys when chip.text values are duplicated
    key={`${chip.text}-${index}`} // eslint-disable-line react/no-array-index-key
    chipItem={chip}
    chipStyle={chipStyle}
    ariaMultiselectable={ariaMultiselectable}
    chipIndex={index}
  />
))}
```

rail machinery (`BpkMobileScrollContainer` + `scrollContainerRef` + two `Nudger`s
+ `stickyChip`) is unchanged.

### 4. Storybook

- Delete the standalone demo files:
  `BpkChipGroupPopoverExample.stories.tsx` and
  `BpkChipGroupPopoverExample.stories.module.scss`.
- Add a working popover story to the main `BpkChipGroup.stories.tsx`, merging any
  needed styles into `BpkChipGroup.stories.module.scss`. The story uses `rail` +
  `onImage` + Nudger (same scenario as the old demo) and supplies a
  popover-wrapped `BpkDropdownChip` via `renderChip`, proving precise anchoring
  and unaffected scrolling.

Reference example (mirrors the hotels `PartnersFilter` pattern):

```tsx
const FilterChip = ({ label, content }: { label: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BpkPopover
      id={`popover-${label}`}
      isOpen={isOpen}
      label={label}
      labelAsTitle
      closeButtonLabel="Close"
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      target={
        <BpkDropdownChip
          type={CHIP_TYPES.onImage}
          selected={isOpen}
          accessibilityLabel={label}
          onClick={() => setIsOpen((o) => !o)}
        >
          {label}
        </BpkDropdownChip>
      }
    >
      <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">{content}</BpkText>
    </BpkPopover>
  );
};

<BpkMultiSelectChipGroup
  type={CHIP_GROUP_TYPES.rail}
  chipStyle={CHIP_TYPES.onImage}
  ariaLabel="Filter results"
  leadingNudgerLabel="Scroll back"
  trailingNudgerLabel="Scroll forward"
  chips={Object.entries(FILTER_CONTENT).map(([label, content]) => ({
    text: label,
    renderChip: () => <FilterChip label={label} content={content} />,
  }))}
/>
```

Note: `role` is not set explicitly — `BpkSelectableChip` defaults it to
`'checkbox'` (`BpkSelectableChip.tsx:44`), which is correct for multi-select, and
`role` is a native `<button>` attribute, not a chip-specific prop. In a
`renderChip` chip the caller owns the element entirely anyway.

### 5. Tests, docs, verification

Tests (`BpkMultiSelectChipGroup-test.tsx`) — mirror the fork's coverage:
- `renderChip` renders the custom node and bypasses the default chip (assert the
  custom content is present; default `role`/onClick bindings are absent).
- `hidden` still suppresses a `renderChip` chip.
- `content` renders in place of `text` when provided.
- duplicate `text` values across chips no longer produce a React key warning.
- existing `chips` array cases stay green (backward-compat evidence).
- update snapshots if any.

Docs:
- Update `bpk-component-chip-group/README.md` with the `renderChip` usage,
  including the popover-anchoring example, and note that `renderChip` bypasses all
  default chip bindings so the caller owns role/a11y/onClick.

Verification (direct commands, not nx cached tasks):
- `pnpm eslint <changed files>`
- `pnpm tsc` (or the project's tsc)
- `pnpm jest bpk-component-chip-group`
- Manual Storybook check: rail horizontal scroll + click different chips, each
  popover anchors correctly.

### Changed files

1. `BpkMultiSelectChipGroup.tsx` — add `renderChip` to `ChipItem`, `content` to
   `SingleSelectChipItem`, the `renderChip` early return + `{content || text}` in
   `Chip`, and the `key` de-dup in `ChipGroupContent`.
2. `BpkChipGroup.stories.tsx` — new working popover story via `renderChip`.
3. `BpkChipGroup.stories.module.scss` — merge needed styles.
4. Delete `BpkChipGroupPopoverExample.stories.tsx` + `.stories.module.scss`.
5. `BpkMultiSelectChipGroup-test.tsx` — `renderChip` / `content` / key cases.
6. `README.md` — `renderChip` usage.
7. Recompile the corresponding `.module.css` if the scss changes (per
   new-component-workflow rules).

### Divergences from the hotels fork (intentionally not ported)

- `mobilePadding` prop + `bpk-chip-group--mobile-padding` class.
- `BpkVessel` wrapper (official uses a plain `div` +
  `getDataComponentAttribute('MultiSelectChipGroup')`).
- sticky-chip hardcoded `FilterIconSm` leading accessory.

These stay hotels-specific; hotels keeps a thin fork or passes them via existing
props until/unless a separate proposal promotes them.
