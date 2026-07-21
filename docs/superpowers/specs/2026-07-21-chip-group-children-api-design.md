# BpkChipGroup children API — Design

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

Introduce a **composable `children` API** on `BpkMultiSelectChipGroup`, in
addition to the existing `chips` array API. When chips are passed as children,
each chip is a real React element, so a caller can wrap any chip in
`<BpkPopover target={<Chip/>}>…</BpkPopover>` and the popover anchors precisely
to that chip.

The group is responsible only for layout, scrolling, and group-level
accessibility. The caller controls popover composition and placement.

## Scope

**In scope:**
- Backward-compatible: the existing `chips` array API is fully preserved. Existing
  callers need zero changes.
- Both `rail` and `wrap` chip group types accept children.
- `BpkMultiSelectChipGroup` only.

**Out of scope (YAGNI):**
- `BpkSingleSelectChipGroup` children support (its `selectedIndex`/`onItemClick`
  single-select semantics need separate design).
- Group-internal popover support (e.g. a `popoverContent` field on chip items).
  The caller controls the popover — deliberately.
- A wrap-only interim variant.

## Design

### 1. Types — mutually exclusive content source

`chips` and `children` are mutually exclusive, enforced at compile time via a
discriminated union.

```ts
// Content source: exactly one of chips OR children
type ChipsContentProps =
  | { chips: ChipItem[]; children?: never }
  | { children: ReactNode; chips?: never };

// CommonProps no longer declares `chips`
type CommonProps = {
  label?: string;
  ariaLabel?: string;
  chipStyle?: ChipStyleType;
  ariaMultiselectable?: boolean;
};

type RailChipGroupProps = {
  stickyChip?: ChipItem;
  leadingNudgerLabel: string;
  trailingNudgerLabel: string;
} & CommonProps & ChipsContentProps;

type WrapChipGroupProps = CommonProps & ChipsContentProps;
```

Effects:
- `<BpkMultiSelectChipGroup chips={[...]} />` — old usage, unchanged.
- `<BpkMultiSelectChipGroup>{children}</BpkMultiSelectChipGroup>` — new usage.
- Passing both `chips` and `children` — TS error.
- Passing neither — TS error.

`stickyChip` stays a `ChipItem` (it is independent of scroll content) and works
in both modes.

#### Shared-type risk: `SingleSelectProps` intersects `MultiSelectProps`

`BpkSingleSelectChipGroup` is out of scope functionally, but its type is coupled:

```ts
// BpkSingleSelectChipGroup.tsx
export type SingleSelectProps = {
  chips: SingleSelectChipItem[];
  ...
} & MultiSelectProps;
```

Turning `MultiSelectProps`'s `chips` into a `chips XOR children` discriminated
union means `SingleSelectProps` intersects its own `chips: SingleSelectChipItem[]`
with the new union, which can degrade to `SingleSelectChipItem[] & (… | never)`
and break type inference on the single-select path — even though multi-select
compiles fine.

Mitigation: after changing `MultiSelectProps`, the implementation must run `tsc`
against the single-select path (see verification) and, if inference breaks,
adjust `SingleSelectProps` to pick from `MultiSelectProps` without inheriting the
`chips XOR children` union (e.g. intersect with the non-content part only). This
stays within scope — it is a type-compatibility fix, not adding single-select
children support.

### 2. Rendering — branch in `ChipGroupContent`

`ChipGroupContent` currently renders `chips.map(<Chip>)`. It branches on
`children`:

```tsx
{children
  ? children
  : chips?.map((chip, index) => (
      <Chip
        key={chip.text}
        chipItem={chip}
        chipStyle={chipStyle}
        ariaMultiselectable={ariaMultiselectable}
        chipIndex={index}
      />
    ))}
```

- `<fieldset>`, `role` (`group`/`radiogroup`), hidden `legend`, and `label` are
  preserved for both modes. In children mode the group still provides group-level
  accessibility; the caller sets per-chip `role`/`selected`.
- `chips` becomes optional in `ChipGroupContent`'s props; `children` is added.
- `RailChipGroup` / `WrapChipGroup` pass `children` through to `ChipGroupContent`.
- `BpkMultiSelectChipGroup` passes `children` down from its props.
- rail machinery (`BpkMobileScrollContainer` + `scrollContainerRef` + two
  `Nudger`s + `stickyChip`) is unchanged — it wraps `ChipGroupContent` and does
  not care what is inside.

### Data flow

```
BpkMultiSelectChipGroup(props + children)
  → RailChipGroup / WrapChipGroup (pass children through)
    → [rail: wrapped by BpkMobileScrollContainer]
      → ChipGroupContent (children ? children : chips.map)
        → <fieldset> (group-level a11y preserved)
          → caller's <BpkPopover target={<Chip/>}> or bare <Chip/>
```

Why positioning now works: `BpkPopover` clones the chip in place and injects a
ref → `@floating-ui/react` reads that chip's real bounding rect → the dialog
renders through a portal anchored to it. Each chip's popover positions
independently.

### 3. Storybook

- Delete the standalone demo files:
  `BpkChipGroupPopoverExample.stories.tsx` and
  `BpkChipGroupPopoverExample.stories.module.scss`.
- Add a working popover story to the main `BpkChipGroup.stories.tsx`, merging any
  needed styles into `BpkChipGroup.stories.module.scss`.
- The story uses `rail` + `onImage` + Nudger (same scenario as the old demo) and
  wraps each `BpkDropdownChip` in its own `BpkPopover`, proving precise anchoring
  and unaffected scrolling.
- No explicit `role` is set on the chip: `BpkSelectableChip` (which
  `BpkDropdownChip` wraps) defaults `role` to `'checkbox'`
  (`BpkSelectableChip.tsx:44`), which is correct for multi-select. `role` is not
  a chip-specific prop — it is a native `<button>` attribute that flows through
  `CommonProps extends ComponentProps<'button'>` and the chip's `{...rest}`
  spread, so callers can override it when needed (verified in source, not the
  CLI props list).

Reference example:

```tsx
<BpkMultiSelectChipGroup
  type={CHIP_GROUP_TYPES.rail}
  chipStyle={CHIP_TYPES.onImage}
  ariaLabel="Filter results"
  leadingNudgerLabel="Scroll back"
  trailingNudgerLabel="Scroll forward"
>
  {Object.keys(FILTER_CONTENT).map((label) => (
    <BpkPopover
      key={label}
      id={`popover-${label}`}
      isOpen={activeLabel === label}
      label={label}
      labelAsTitle
      closeButtonLabel="Close"
      onClose={() => setActiveLabel(null)}
      placement="bottom-start"
      target={
        <BpkDropdownChip
          type={CHIP_TYPES.onImage}
          selected={activeLabel === label}
          accessibilityLabel={label}
          onClick={() => toggle(label)}
        >
          {label}
        </BpkDropdownChip>
      }
    >
      <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
        {FILTER_CONTENT[label]}
      </BpkText>
    </BpkPopover>
  ))}
</BpkMultiSelectChipGroup>
```

### 4. Tests, docs, verification

Tests (`BpkMultiSelectChipGroup-test.tsx`):
- children mode renders children, not `chips.map()`; `<fieldset>`/`role`/`legend`
  still present.
- rail + children still renders scroll container and Nudgers.
- existing `chips` array cases stay green (backward-compat evidence).
- update snapshots if any.

Docs:
- Update `bpk-component-chip-group/README.md` with the composable children usage,
  noting that per-chip `selected` state and, when overriding the default,
  `role` accessibility are the caller's responsibility in this mode. `role`
  defaults to `'checkbox'` via `BpkSelectableChip` and is a native `<button>`
  attribute, not a chip-specific prop.

Verification (direct commands, not nx cached tasks):
- `pnpm eslint <changed files>`
- `pnpm tsc` (or the project's tsc)
- `pnpm jest bpk-component-chip-group`
- **`tsc` on the single-select path specifically** — see the shared-type risk
  below. Confirm `SingleSelectProps` still type-checks after the union change.
- Manual Storybook check: rail horizontal scroll + click different chips, each
  popover anchors correctly.

### Changed files

1. `BpkMultiSelectChipGroup.tsx` — type union + `ChipGroupContent` render branch +
   children passthrough.
2. `BpkChipGroup.stories.tsx` — new working popover story.
3. `BpkChipGroup.stories.module.scss` — merge needed styles.
4. Delete `BpkChipGroupPopoverExample.stories.tsx` + `.stories.module.scss`.
5. `BpkMultiSelectChipGroup-test.tsx` — children cases.
6. `README.md` — children usage.
7. Recompile the corresponding `.module.css` if the scss changes (per
   new-component-workflow rules).
