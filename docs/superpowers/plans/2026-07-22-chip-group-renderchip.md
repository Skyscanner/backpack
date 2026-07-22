# BpkChipGroup `renderChip` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional `renderChip` render prop to `BpkMultiSelectChipGroup`'s `ChipItem` so callers can render a chip wrapped in `BpkPopover`, anchoring the popover to that specific chip.

**Architecture:** `ChipItem` gains `renderChip?: (props: ChipRenderProps) => ReactElement | null`. The internal `Chip` component, after the `hidden` check, calls `renderChip` with group-computed state (`selected`, pre-wired `onClick`, `chipStyle`, `accessibilityLabel`, `index`) instead of picking a default component. Separately, `BpkSelectableChip` and `BpkDropdownChip` are wrapped in `forwardRef` so `BpkPopover` (which injects a ref via `cloneElement`) can obtain the chip's `<button>` DOM node — a hard prerequisite for anchoring.

**Tech Stack:** React (TypeScript), `@floating-ui/react` (via BpkPopover), Jest + React Testing Library, Storybook.

**Spec:** `docs/superpowers/specs/2026-07-21-chip-group-renderchip-design.md`

**Reference (do not merge):** PR #4918 `[BpkChipGroup] POC: renderChip render prop`.

---

## File Structure

**`packages/backpack-web/src/bpk-component-chip/` (forwardRef prerequisite):**
- `src/BpkSelectableChip.tsx` — wrap in `forwardRef`, forward `ref` to `<button>`.
- `src/BpkDropdownChip.tsx` — wrap in `forwardRef`, forward `ref` to `BpkSelectableChip`.
- `src/BpkSelectableChip-test.tsx` — ref-forwarding test.
- `src/BpkDropdownChip-test.tsx` — ref-forwarding test.

**`packages/backpack-web/src/bpk-component-chip-group/` (renderChip feature):**
- `src/BpkMultiSelectChipGroup.tsx` — `ChipRenderProps` type, `renderChip` on `ChipItem`, `Chip` render branch.
- `index.ts` — export `ChipRenderProps`.
- `src/BpkMultiSelectChipGroup-test.tsx` — renderChip / hidden tests.
- `src/BpkChipGroup.stories.tsx` — `WithPopover` story.
- `README.md` — `renderChip` usage.
- Delete `src/BpkChipGroupPopoverExample.stories.tsx` + `src/BpkChipGroupPopoverExample.stories.module.scss`.

Order: chip `forwardRef` first (prerequisite), then chip-group feature, then story + docs + cleanup.

---

## Command conventions (verified in this worktree)

These were confirmed empirically against this worktree — do **not** substitute:

- **Jest:** use `pnpm exec jest <path>` (NOT `pnpm jest`). The root `jest` npm
  script is `TZ=Etc/UTC jest --coverage`, which applies a global 70–75% coverage
  threshold and would fail a single-file run even when tests pass. `pnpm exec jest`
  invokes the binary directly with no coverage gate — verified: a single existing
  test file returns "Tests: N passed" cleanly. (A benign `jest-haste-map` naming
  collision warning about `packages/backpack-web/dist/package.json` is printed but
  does not fail the run.)
- **tsc:** `pnpm tsc` resolves to the TypeScript binary and compiles — verified.
- **ESLint — KNOWN BLOCKER in this worktree:** `pnpm eslint <file>`, `pnpm exec
  eslint <file>`, and even the repo's own `pnpm run lint:js` all fail here with
  `Please remove the "plugins" setting from either config`. Cause: the worktree
  lives at `.claude/worktrees/<name>/` and its `.eslintrc` does **not** set
  `root: true`, so ESLint walks up and also loads the main repo's `../../../.eslintrc`,
  colliding on the `@nx/eslint-plugin` plugin. This is an environment issue, not a
  code issue — see Task 0. Until resolved, lint verification steps below cannot be
  run from inside the worktree; the fallback is to lint from a normal (non-worktree)
  checkout, or fix the worktree ESLint config first.

---

## Task 0: Environment preflight (do this before any code)

**Files:** none (environment only)

- [ ] **Step 1: Confirm Node version meets `engines.node`**

Run: `node --version` and compare against `engines.node` in `package.json`.
If below requirement: `nvm use <required>` then `pnpm install` **from inside the
worktree** (required so husky's pre-commit hook is installed for this worktree).

- [ ] **Step 2: Confirm the worktree is on the right branch and clean**

Run: `git -C /Users/tuxiuluo/Documents/code/backpack/.claude/worktrees/example-chip-group-popover status`
Expected: on the worktree branch, clean tree (only the spec/plan docs already
committed).

- [ ] **Step 3: Confirm the jest command works (baseline)**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip-test.tsx`
Expected: "Tests: 17 passed" (plus the benign haste-map warning). This proves the
verified jest invocation before you rely on it.

- [ ] **Step 4: Decide the ESLint strategy**

Try: `pnpm exec eslint packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip.tsx`
If it fails with the `"plugins" setting` collision (expected in this worktree per
the note above), either (a) add `"root": true` to the worktree's `.eslintrc` after
confirming with the maintainer that this is acceptable, or (b) plan to run lint
from a non-worktree checkout before opening the PR. Record which path you took;
the lint steps in later tasks assume one of these is in place.

---

## Task 1: `forwardRef` on `BpkSelectableChip`

**Files:**
- Modify: `packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip.tsx`
- Test: `packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip-test.tsx`

- [ ] **Step 1: Write the failing test**

Append this test inside the `describe('BpkSelectableChip', ...)` block in `BpkSelectableChip-test.tsx` (add `useRef` + `createRef` as needed — use `createRef`):

```tsx
it('should forward its ref to the underlying button', () => {
  const ref = createRef<HTMLButtonElement>();
  render(
    <BpkSelectableChip ref={ref} onClick={() => null} accessibilityLabel="Toggle">
      Toggle me
    </BpkSelectableChip>,
  );
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  expect(ref.current?.tagName).toBe('BUTTON');
});
```

Add the import at the top of the test file (next to the existing React Testing Library import):

```tsx
import { createRef } from 'react';
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip-test.tsx -t "forward its ref"`
Expected: FAIL — `ref.current` is `null` (function component ignores `ref`), so `toBeInstanceOf(HTMLButtonElement)` fails.

- [ ] **Step 3: Wrap the component in `forwardRef`**

In `BpkSelectableChip.tsx`, change the import on line 19 from:

```tsx
import type { ReactNode } from 'react';
```

to:

```tsx
import { forwardRef } from 'react';

import type { ReactNode } from 'react';
```

Change the component declaration (line 38) from:

```tsx
const BpkSelectableChip = ({
  accessibilityLabel,
  children,
  className,
  disabled = false,
  dismissible = false,
  leadingAccessoryView = null,
  role = 'checkbox',
  selected = false,
  trailingAccessoryView = null,
  type = CHIP_TYPES.default,
  ...rest
}: Props) => {
```

to:

```tsx
const BpkSelectableChip = forwardRef<HTMLButtonElement, Props>(({
  accessibilityLabel,
  children,
  className,
  disabled = false,
  dismissible = false,
  leadingAccessoryView = null,
  role = 'checkbox',
  selected = false,
  trailingAccessoryView = null,
  type = CHIP_TYPES.default,
  ...rest
}, ref) => {
```

Add `ref={ref}` as the first attribute on the `<button>` element:

```tsx
    <button
      ref={ref}
      aria-checked={role === 'button' || role === 'tab' ? undefined : selected}
      className={classNames}
```

Change the component's closing from `};` to `});` (the arrow function is now a `forwardRef` call — the closing `}` of the body plus `)` of `forwardRef(` plus `;`).

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip-test.tsx -t "forward its ref"`
Expected: PASS.

- [ ] **Step 5: Run the full chip test file to confirm no regressions**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip-test.tsx`
Expected: all PASS (snapshots unchanged — `forwardRef` does not alter rendered output).

- [ ] **Step 6: Commit**

```bash
git add packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip.tsx packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip-test.tsx
git commit -m "[BpkChip] forward ref to button in BpkSelectableChip"
```

## Task 2: `forwardRef` on `BpkDropdownChip`

**Files:**
- Modify: `packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip.tsx`
- Test: `packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip-test.tsx`

- [ ] **Step 1: Write the failing test**

Add the `createRef` import at the top of `BpkDropdownChip-test.tsx`:

```tsx
import { createRef } from 'react';
```

Append this test inside the `describe('BpkDropdownChip', ...)` block:

```tsx
it('should forward its ref to the underlying button', () => {
  const ref = createRef<HTMLButtonElement>();
  render(
    <BpkDropdownChip ref={ref} onClick={() => null} accessibilityLabel="Toggle">
      Toggle me
    </BpkDropdownChip>,
  );
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  expect(ref.current?.tagName).toBe('BUTTON');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip-test.tsx -t "forward its ref"`
Expected: FAIL — `ref.current` is `null`.

- [ ] **Step 3: Wrap the component in `forwardRef`**

Full new content of `BpkDropdownChip.tsx` (below the license header + leading comment block). Replace the existing import + component with:

```tsx
import { forwardRef } from 'react';

import ChevronDownIconSm from '../../bpk-component-icon/sm/chevron-down';
import { getDataComponentAttribute } from '../../bpk-react-utils';

import BpkSelectableChip from './BpkSelectableChip';
import { CHIP_TYPES } from './commonTypes';

import type { CommonProps as Props } from './commonTypes';

const BpkDropdownChip = forwardRef<HTMLButtonElement, Props>(({
  disabled = false,
  leadingAccessoryView = null,
  selected = false,
  type = CHIP_TYPES.default,
  ...rest
}, ref) => (
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
));

export default BpkDropdownChip;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip-test.tsx -t "forward its ref"`
Expected: PASS.

- [ ] **Step 5: Run the full DropdownChip test file to confirm no regressions**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip-test.tsx`
Expected: all PASS (snapshots unchanged).

- [ ] **Step 6: Commit**

```bash
git add packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip.tsx packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip-test.tsx
git commit -m "[BpkChip] forward ref to button in BpkDropdownChip"
```

## Task 3: `ChipRenderProps` type + `renderChip` on `ChipItem` + `Chip` render branch

**Files:**
- Modify: `packages/backpack-web/src/bpk-component-chip-group/src/BpkMultiSelectChipGroup.tsx`
- Test: `packages/backpack-web/src/bpk-component-chip-group/src/BpkMultiSelectChipGroup-test.tsx`

- [ ] **Step 1: Write the failing tests**

Append these tests inside the `describe('BpkMultiSelectChipGroup', ...)` block in `BpkMultiSelectChipGroup-test.tsx`:

```tsx
it('should render a custom element via renderChip instead of the default chip', () => {
  render(
    <BpkMultiSelectChipGroup
      {...defaultProps}
      chips={[
        {
          text: 'Custom',
          renderChip: () => <div data-testid="custom-chip">Custom content</div>,
        },
      ]}
    />,
  );
  expect(screen.getByTestId('custom-chip')).toHaveTextContent('Custom content');
});

it('should hand group-computed props to renderChip', () => {
  const renderChip = jest.fn(() => <div data-testid="custom-chip" />);
  render(
    <BpkMultiSelectChipGroup
      {...defaultProps}
      chips={[{ text: 'Custom', selected: true, renderChip }]}
    />,
  );
  expect(renderChip).toHaveBeenCalledWith(
    expect.objectContaining({
      selected: true,
      accessibilityLabel: 'Custom',
      index: 0,
      onClick: expect.any(Function),
    }),
  );
});

it('should fire the item onClick via the renderChip-provided onClick', () => {
  const onClick = jest.fn();
  render(
    <BpkMultiSelectChipGroup
      {...defaultProps}
      chips={[
        {
          text: 'Custom',
          onClick,
          renderChip: (props) => (
            <button type="button" data-testid="custom-chip" onClick={props.onClick}>
              go
            </button>
          ),
        },
      ]}
    />,
  );
  screen.getByTestId('custom-chip').click();
  expect(onClick).toHaveBeenCalledWith(true, 0);
});

it('should not render a renderChip chip when hidden', () => {
  const renderChip = jest.fn(() => <div data-testid="custom-chip" />);
  render(
    <BpkMultiSelectChipGroup
      {...defaultProps}
      chips={[{ text: 'Custom', hidden: true, renderChip }]}
    />,
  );
  expect(screen.queryByTestId('custom-chip')).not.toBeInTheDocument();
  expect(renderChip).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip-group/src/BpkMultiSelectChipGroup-test.tsx -t "renderChip"`
Expected: FAIL — `renderChip` is not a known field, so the default chip renders and `custom-chip` is never found. (TypeScript will also error on the unknown property; that is expected pre-implementation.)

- [ ] **Step 3: Add the `ChipRenderProps` type and `renderChip` field**

In `BpkMultiSelectChipGroup.tsx`, change the React import (line 18) from:

```tsx
import type { ReactNode } from 'react';
```

to:

```tsx
import type { ReactNode, ReactElement } from 'react';
```

Immediately after the `SingleSelectChipItem` type (ends at its closing `};`, before `export type ChipItem = {`), insert:

```tsx
export type ChipRenderProps = {
  selected: boolean;
  chipStyle: ChipStyleType;
  accessibilityLabel: string;
  onClick: () => void;
  index: number;
};
```

Add `renderChip` to `ChipItem` (place it right after `component?: ChipComponentType;`):

```tsx
export type ChipItem = {
  component?: ChipComponentType;
  renderChip?: (props: ChipRenderProps) => ReactElement | null;
  onClick?: (selected: boolean, index: number) => void;
  selected?: boolean;
  hidden?: boolean;
} & SingleSelectChipItem;
```

- [ ] **Step 4: Add the `renderChip` branch in `Chip`**

Replace the body of the internal `Chip` component. The current destructure + return is:

```tsx
  const {
    accessibilityLabel,
    component = CHIP_COMPONENT.selectable,
    hidden = false,
    leadingAccessoryView = null,
    onClick,
    selected,
    text,
    ...rest
  } = chipItem;
  const Component = CHIP_COMPONENT_MAP[component];
  return hidden ? null : (
    <Component
      selected={selected ?? false}
      type={chipStyle}
      accessibilityLabel={accessibilityLabel || text}
      onClick={() => {
        if (onClick) {
          onClick(!selected, chipIndex);
        }
      }}
      role={ariaMultiselectable ? 'checkbox' : 'radio'}
      leadingAccessoryView={leadingAccessoryView}
      {...rest}
    >
      {text}
    </Component>
  );
```

Replace it with:

```tsx
  const {
    accessibilityLabel,
    component = CHIP_COMPONENT.selectable,
    hidden = false,
    leadingAccessoryView = null,
    onClick,
    renderChip,
    selected,
    text,
    ...rest
  } = chipItem;

  if (hidden) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick(!selected, chipIndex);
    }
  };

  if (renderChip) {
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

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip-group/src/BpkMultiSelectChipGroup-test.tsx`
Expected: all PASS, including the four new `renderChip` tests and all pre-existing tests.

- [ ] **Step 6: Typecheck**

Run: `pnpm tsc -b packages/backpack-web/tsconfig.lib.json`
(If that path/flag is not valid for this repo, run the package's configured typecheck. Do NOT use `pnpm nx run <project>:typecheck` — Nx caching can report a stale pass.)
Expected: no errors relating to `ChipRenderProps` / `renderChip`.

- [ ] **Step 7: Commit**

```bash
git add packages/backpack-web/src/bpk-component-chip-group/src/BpkMultiSelectChipGroup.tsx packages/backpack-web/src/bpk-component-chip-group/src/BpkMultiSelectChipGroup-test.tsx
git commit -m "[BpkChipGroup] add renderChip render prop and ChipRenderProps"
```

## Task 4: Export `ChipRenderProps` from the package barrel

**Files:**
- Modify: `packages/backpack-web/src/bpk-component-chip-group/index.ts`

- [ ] **Step 1: Add `ChipRenderProps` to the type import**

In `index.ts`, the import from `./src/BpkMultiSelectChipGroup` currently reads:

```tsx
import BpkMultiSelectChipGroup, {
  type MultiSelectProps,
  type ChipItem,
  type SingleSelectChipItem,
  CHIP_COMPONENT,
  CHIP_GROUP_TYPES,
} from './src/BpkMultiSelectChipGroup';
```

Change it to add `type ChipRenderProps`:

```tsx
import BpkMultiSelectChipGroup, {
  type MultiSelectProps,
  type ChipItem,
  type ChipRenderProps,
  type SingleSelectChipItem,
  CHIP_COMPONENT,
  CHIP_GROUP_TYPES,
} from './src/BpkMultiSelectChipGroup';
```

- [ ] **Step 2: Add `ChipRenderProps` to the `export type` block**

The current export block reads:

```tsx
export type {
  ChipItem,
  MultiSelectProps,
  SingleSelectProps,
  SingleSelectChipItem,
};
```

Change it to:

```tsx
export type {
  ChipItem,
  ChipRenderProps,
  MultiSelectProps,
  SingleSelectProps,
  SingleSelectChipItem,
};
```

- [ ] **Step 3: Typecheck the barrel**

Run: `pnpm tsc -b packages/backpack-web/tsconfig.lib.json`
Expected: no errors; `ChipRenderProps` resolves.

- [ ] **Step 4: Commit**

```bash
git add packages/backpack-web/src/bpk-component-chip-group/index.ts
git commit -m "[BpkChipGroup] export ChipRenderProps from package barrel"
```

## Task 5: `WithPopover` Storybook story + delete the #4910 demo files

**Files:**
- Modify: `packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroup.stories.tsx`
- Delete: `packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroupPopoverExample.stories.tsx`
- Delete: `packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroupPopoverExample.stories.module.scss`

- [ ] **Step 1: Add imports to the stories file**

In `BpkChipGroup.stories.tsx`, change the chip import line:

```tsx
import { CHIP_TYPES } from '../../bpk-component-chip';
```

to:

```tsx
import { CHIP_TYPES, BpkDropdownChip } from '../../bpk-component-chip';
import BpkPopover from '../../bpk-component-popover';
```

Change the `ChipItem` type import line:

```tsx
import type { MultiSelectProps, ChipItem } from './BpkMultiSelectChipGroup';
```

to:

```tsx
import type { MultiSelectProps, ChipItem, ChipRenderProps } from './BpkMultiSelectChipGroup';
```

- [ ] **Step 2: Add the `WithPopover` story**

Insert the following just before `export const VisualTest = {` near the end of the file:

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

- [ ] **Step 3: Delete the superseded #4910 demo files**

```bash
git rm packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroupPopoverExample.stories.tsx packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroupPopoverExample.stories.module.scss
```

- [ ] **Step 4: Lint + typecheck the stories file**

Run: `pnpm exec eslint packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroup.stories.tsx`
(Per the "Command conventions" note and Task 0: if this hits the `"plugins"
setting` collision in the worktree, run it from a non-worktree checkout or after
adding `"root": true` to the worktree `.eslintrc`.)
Then: `pnpm tsc -b packages/backpack-web/tsconfig.lib.json`
Expected: no errors once the ESLint environment issue is resolved.

- [ ] **Step 5: Commit**

```bash
git add packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroup.stories.tsx
git commit -m "[BpkChipGroup] add WithPopover story, remove standalone popover demo"
```

## Task 6: README `renderChip` usage

**Files:**
- Modify: `packages/backpack-web/src/bpk-component-chip-group/README.md`

- [ ] **Step 1: Add a `renderChip` section before the `## Props` heading**

Insert the following just above the `## Props` heading at the end of the README:

````markdown
## Anchoring a popover to a specific chip (`renderChip`)

By default the chip group renders each chip from the `chips` data array, and
those chips do not expose a ref — so a `BpkPopover` cannot anchor to an
individual chip. Use the optional `renderChip` render prop to take over
rendering of a chip slot and return your own element (e.g. a chip wrapped in a
`BpkPopover`). The group hands your function the computed `selected`, a pre-wired
`onClick` (which fires the item's `onClick(!selected, index)`), `chipStyle`,
`accessibilityLabel`, and `index`, so you don't rebuild the default bindings.

```tsx
import BpkMultiSelectChipGroup, {
  CHIP_GROUP_TYPES,
} from '@skyscanner/backpack-web/bpk-component-chip-group';
import { BpkDropdownChip } from '@skyscanner/backpack-web/bpk-component-chip';
import BpkPopover from '@skyscanner/backpack-web/bpk-component-popover';

import type { ChipItem, ChipRenderProps } from '@skyscanner/backpack-web/bpk-component-chip-group';

const chips: ChipItem[] = ['Flights', 'Hotels'].map((label, i) => ({
  text: label,
  renderChip: ({ accessibilityLabel, chipStyle, selected }: ChipRenderProps) => (
    <BpkPopover
      id={`popover-chip-${i}`}
      label={`${label} options`}
      labelAsTitle
      placement="bottom"
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
      Content for {label}
    </BpkPopover>
  ),
}));

<BpkMultiSelectChipGroup
  type={CHIP_GROUP_TYPES.wrap}
  chips={chips}
  ariaLabel="Select filters"
/>;
```

When `renderChip` is provided, the caller owns the returned element entirely —
including any accessibility attributes beyond those passed in `ChipRenderProps`.
````

- [ ] **Step 2: Commit**

```bash
git add packages/backpack-web/src/bpk-component-chip-group/README.md
git commit -m "[BpkChipGroup] document renderChip popover-anchoring usage"
```

## Task 7: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Lint all changed files**

Run:

```bash
pnpm exec eslint \
  packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip.tsx \
  packages/backpack-web/src/bpk-component-chip/src/BpkDropdownChip.tsx \
  packages/backpack-web/src/bpk-component-chip-group/src/BpkMultiSelectChipGroup.tsx \
  packages/backpack-web/src/bpk-component-chip-group/index.ts \
  packages/backpack-web/src/bpk-component-chip-group/src/BpkChipGroup.stories.tsx
```

Expected: no errors. (Direct `eslint` binary via `pnpm exec`, not an Nx task — Nx
caches results.) **In-worktree caveat:** if this fails with the `"plugins"
setting` collision, that is the known worktree ESLint issue (Task 0 / Command
conventions), not a code problem — resolve per Task 0 before trusting this step.

- [ ] **Step 2: Typecheck**

Run: `pnpm tsc -b packages/backpack-web/tsconfig.lib.json`
Expected: no errors.

- [ ] **Step 3: Run both affected package test suites**

Run: `pnpm exec jest packages/backpack-web/src/bpk-component-chip packages/backpack-web/src/bpk-component-chip-group`
Expected: all PASS. If any snapshot legitimately changed (e.g. story-driven snapshots picking up the new `WithPopover` story), review the diff and update with `-u` only after confirming it is intended.

- [ ] **Step 4: Manual Storybook check**

Run: `pnpm run storybook`
Open `bpk-component-chip-group` → `WithPopover`. Click each chip; confirm each popover opens anchored beneath its own chip (not a fixed left-edge position). Confirm the existing stories (`OnDark`, `OnImage`, `WithLabel`, `AllChipTypes`, `ExampleStateManagement`, `VisualTest`) still render.

- [ ] **Step 5: Final confirmation (no commit — nothing changed)**

Report: lint clean, tsc clean, jest green, Storybook anchoring verified.

---

## Self-Review

**Spec coverage** (each spec in-scope item → task):
- `renderChip` on `ChipItem` → Task 3.
- `ChipRenderProps` type → Task 3.
- `Chip` render branch with group-computed props → Task 3.
- `forwardRef` on `BpkSelectableChip` + `BpkDropdownChip` → Tasks 1, 2.
- `WithPopover` story (with `showArrow={false}`) → Task 5.
- Barrel export of `ChipRenderProps` → Task 4.
- Delete #4910 demo files → Task 5.
- Tests (renderChip / ChipRenderProps / hidden; chip ref-forwarding) → Tasks 1, 2, 3.
- README `renderChip` usage → Task 6.
- Verification (eslint / tsc / jest both packages / manual Storybook) → Task 7.

**Out-of-scope confirmed absent:** no `content` field; no `children` API; no single-select change; no `BpkDismissibleChip`/`BpkIconChip` forwardRef; no SCSS/`.module.css` changes.

**Type consistency:** `ChipRenderProps` fields (`selected`, `chipStyle`, `accessibilityLabel`, `onClick`, `index`) are identical across the type definition (Task 3), the `Chip` call site (Task 3), the story destructure (Task 5), and the README (Task 6). `renderChip` signature `(props: ChipRenderProps) => ReactElement | null` is identical in the type (Task 3) and barrel export (Task 4). `forwardRef<HTMLButtonElement, Props>` is consistent across Tasks 1 and 2.

**Placeholder scan:** none — every code step shows full code; every run step shows the command and expected result.
