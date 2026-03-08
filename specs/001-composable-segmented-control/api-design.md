# API Design: BpkSegmentedControlV2

**Branch**: `001-composable-segmented-control`
**Date**: 2026-03-03
**Spec**: [spec.md](./spec.md) | **Research**: [research.md](./research.md)

---

## 1. Package & File Structure

```
packages/bpk-component-segmented-control/
├── README.md                          (update — add V2 section)
├── index.ts                           (update — add V2 exports)
└── src/
    ├── BpkSegmentedControl.tsx        (V1 — unchanged)
    ├── BpkSegmentedControl.module.scss
    ├── BpkSegmentedControl-test.tsx
    ├── accessibility-test.tsx
    └── BpkSegmentedControlV2/         (NEW)
        ├── BpkSegmentedControlV2.tsx
        ├── BpkSegmentedControlV2.module.scss
        ├── BpkSegmentedControlV2-test.tsx
        ├── accessibility-test.tsx
        ├── BpkSegmentedControlV2.figma.tsx
        ├── common-types.ts
        └── __snapshots__/
```

Storybook examples (separate directory):
```
examples/bpk-component-segmented-control/
├── examples.tsx       (update — add V2 examples)
└── stories.tsx        (update — add V2 stories)
```

Migration tooling (new):
```
scripts/codemods/
└── segmented-control-v1-to-v2/
    ├── transform.ts
    ├── transform-test.ts
    └── fixtures/
        ├── basic-input.tsx
        ├── basic-output.tsx
        ├── dynamic-contents-input.tsx
        └── dynamic-contents-output.tsx  (unchanged — warning case)
```

---

## 2. TypeScript Types — `common-types.ts`

```typescript
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * ...
 */

export const SEGMENT_TYPES_V2 = {
  CanvasDefault: 'canvas-default',
  CanvasContrast: 'canvas-contrast',
  SurfaceDefault: 'surface-default',
  SurfaceContrast: 'surface-contrast',
} as const;

export type SegmentTypesV2 = (typeof SEGMENT_TYPES_V2)[keyof typeof SEGMENT_TYPES_V2];

export type BpkSegmentedControlV2RootProps = {
  /**
   * One or more BpkSegmentedControlV2.Item elements.
   */
  children: React.ReactNode;
  /**
   * Controlled selected value. When provided, onChange must also be provided.
   */
  value?: string;
  /**
   * Initial selected value for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Called when the selected segment changes. Receives the value of the newly selected item.
   */
  onChange?: (value: string) => void;
  /**
   * Pre-defined surface theme controlling default token values.
   * @default 'canvas-default'
   */
  type?: SegmentTypesV2;
  /**
   * Applies a box shadow to the group container.
   * @default false
   */
  shadow?: boolean;
  /**
   * Disables all items in the group.
   * @default false
   */
  disabled?: boolean;
  /**
   * Controls whether arrow-key navigation automatically selects the focused item.
   * 'automatic': selection follows focus immediately.
   * 'manual': selection requires an explicit Space or Enter keypress.
   * @default 'automatic'
   */
  activationMode?: 'automatic' | 'manual';
  /**
   * Accessible label for the radiogroup. Always required to satisfy WCAG 4.1.2
   * (the role="radiogroup" element must have an accessible name).
   */
  label: string;
};

export type BpkSegmentedControlV2ItemProps = {
  /**
   * Unique identifier for this segment within the group.
   */
  value: string;
  /**
   * Visible content of the segment — text, icons, or a combination.
   * For icon-only items, include a BpkVisuallyHidden text node to provide an
   * accessible label; the component derives the accessible name from text content
   * in children automatically.
   */
  children: React.ReactNode;
  /**
   * Disables this individual item.
   * @default false
   */
  disabled?: boolean;
};
```

---

## 3. Component Implementation Shape — `BpkSegmentedControlV2.tsx`

**Architecture note**: `BpkSegmentedControlV2Item` is a props-only placeholder (`() => null`). The `Root` component receives all `Item` elements as children and maps over them via `Children.map` to render the Ark-UI primitives. This enables the dot-notation API (`<BpkSegmentedControlV2.Item />`) with full TypeScript prop inference while keeping all rendering logic in Root.

**Content rendering strategy**: `SegmentGroup.ItemText` is only rendered when children are not a single React element. This lets consumers pass layout components (e.g., `BpkVStack`) directly — the consumer owns layout. For strings, arrays (e.g., icon + text), and `BpkVisuallyHidden` combinations the `ItemText` wrapper applies flex/gap styling. The accessible name (`aria-label` on `ItemHiddenInput`) is derived by `extractTextContent` which recursively traverses `children` looking for text nodes.

```typescript
/*
 * Backpack - Skyscanner's Design System
 * Copyright 2016 Skyscanner Ltd
 * Licensed under the Apache License, Version 2.0
 */

import type { KeyboardEvent, ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';

import { SegmentGroup } from '@ark-ui/react/segment-group';
import { cssModules, getDataComponentAttribute, isRTL } from '../../../bpk-react-utils';
import { SEGMENT_TYPES_V2 } from './common-types';
import type {
  BpkSegmentedControlV2RootProps,
  BpkSegmentedControlV2ItemProps,
} from './common-types';
import STYLES from './BpkSegmentedControlV2.module.scss';

const getClassName = cssModules(STYLES);

const getEnabledInputs = (group: HTMLElement): HTMLInputElement[] =>
  Array.from(group.querySelectorAll<HTMLInputElement>('input[type="radio"]:not(:disabled)'));

const extractTextContent = (node: ReactNode): string => { /* recursive text extraction */ };

// Wraps an index forward or backward within [0, last], cycling at the ends.
const wrapAround = (index: number, last: number, forward: boolean) =>
  forward ? (index >= last ? 0 : index + 1) : (index <= 0 ? last : index - 1);

const BpkSegmentedControlV2Root = ({
  activationMode = 'automatic',
  children,
  defaultValue,
  disabled = false,
  label,
  onChange,
  shadow = false,
  type = SEGMENT_TYPES_V2.CanvasDefault,
  value,
}: BpkSegmentedControlV2RootProps) => {
  const containerClass = getClassName(
    'bpk-segmented-control-v2',
    `bpk-segmented-control-v2--${type}`,
    shadow && 'bpk-segmented-control-v2--shadow',
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // See §4 for full keyboard handling strategy.
    const inputs = getEnabledInputs(event.currentTarget);
    const currentIndex = inputs.findIndex((inp) => inp === document.activeElement);
    if (inputs.length === 0 || currentIndex === -1) return;
    const lastIndex = inputs.length - 1;
    const rtl = isRTL();
    let newIndex: number;
    switch (event.key) {
      case 'ArrowRight': newIndex = wrapAround(currentIndex, lastIndex, !rtl); break;
      case 'ArrowLeft':  newIndex = wrapAround(currentIndex, lastIndex, rtl);  break;
      case 'Home':       newIndex = 0;         break;
      case 'End':        newIndex = lastIndex; break;
      case ' ': case 'Enter':
        if (activationMode === 'manual') { event.preventDefault(); onChange?.(inputs[currentIndex].value); }
        return;
      default: return;
    }
    event.preventDefault();
    inputs[newIndex].focus();
    if (activationMode !== 'manual') onChange?.(inputs[newIndex].value);
  };

  return (
    <SegmentGroup.Root
      className={containerClass}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange ? ({ value: v }) => { if (v !== null) onChange(v); } : undefined}
      disabled={disabled}
      aria-label={label}
      orientation="horizontal"
      onKeyDown={handleKeyDown}
      {...getDataComponentAttribute('SegmentedControlV2')}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null;
        const item = child as ReactElement<BpkSegmentedControlV2ItemProps>;
        const { children: itemChildren } = item.props;
        const accessibleName = extractTextContent(itemChildren);
        return (
          <SegmentGroup.Item
            key={item.props.value}
            value={item.props.value}
            disabled={item.props.disabled ?? false}
            className={getClassName('bpk-segmented-control-v2__item')}
          >
            <SegmentGroup.ItemControl
              className={getClassName('bpk-segmented-control-v2__item-control')}
            >
              {isValidElement(itemChildren) ? (
                itemChildren
              ) : (
                <SegmentGroup.ItemText className={getClassName('bpk-segmented-control-v2__item-text')}>
                  {itemChildren}
                </SegmentGroup.ItemText>
              )}
            </SegmentGroup.ItemControl>
            <SegmentGroup.ItemHiddenInput aria-label={accessibleName || undefined} />
          </SegmentGroup.Item>
        );
      })}
    </SegmentGroup.Root>
  );
};

// Props-only placeholder — rendered by Root via Children.map.
// Enables dot-notation API with TypeScript inference: <BpkSegmentedControlV2.Item />.
const BpkSegmentedControlV2Item = (_props: BpkSegmentedControlV2ItemProps) => null;

const BpkSegmentedControlV2 = {
  Root: BpkSegmentedControlV2Root,
  Item: BpkSegmentedControlV2Item,
};

export default BpkSegmentedControlV2;
export { BpkSegmentedControlV2Root, BpkSegmentedControlV2Item, SEGMENT_TYPES_V2 };
export type { BpkSegmentedControlV2RootProps, BpkSegmentedControlV2ItemProps };
```

---

## 4. Manual Activation Mode Strategy

Ark-UI does not natively support `activationMode: 'manual'`. Implementation approach:

1. In manual mode, override Ark-UI's default arrow-key behaviour by catching `onKeyDown` on `SegmentGroup.Root`.
2. Use a local React `ref` array (matching V1's `buttonRefs`) to manage DOM focus manually.
3. On ArrowLeft/ArrowRight/Home/End: call `.focus()` on the target item's `ItemControl` element without updating `value`.
4. On Space/Enter: call `onChange(focusedValue)` to commit selection.
5. Use `isRTL()` to mirror ArrowLeft/ArrowRight in RTL.

This approach wraps Ark-UI cleanly without fighting its state machine: selection state is still fully managed by Ark-UI; manual mode simply defers the `onValueChange` trigger.

---

## 5. Updated `index.ts`

```typescript
/*
 * Backpack - Skyscanner's Design System
 * Copyright 2016 Skyscanner Ltd
 * Licensed under the Apache License, Version 2.0
 */

// V1 — unchanged; remains default export during deprecation window
import BpkSegmentedControl, {
  useSegmentedControlPanels,
  SEGMENT_TYPES,
  type Props as BpkSegmentControlProps,
  type TabPanelProps,
  type SegmentTypes,
} from './src/BpkSegmentedControl';

export type { BpkSegmentControlProps, TabPanelProps, SegmentTypes };
export { useSegmentedControlPanels, SEGMENT_TYPES };
export default BpkSegmentedControl;

// V2 — new experimental exports
export { default as BpkSegmentedControlV2, SEGMENT_TYPES_V2 } from './src/BpkSegmentedControlV2/BpkSegmentedControlV2';
export type {
  BpkSegmentedControlV2RootProps,
  BpkSegmentedControlV2ItemProps,
  SegmentTypesV2,
} from './src/BpkSegmentedControlV2/common-types';
```

---

## 6. Accessibility Attributes Emitted (by Ark-UI)

| Element | Role | Key Attributes |
|---|---|---|
| `SegmentGroup.Root` | `radiogroup` | `aria-label` (from `label` prop), `aria-orientation="horizontal"`, `aria-disabled` |
| `SegmentGroup.Item` (label) | none | wraps ItemControl + HiddenInput |
| `SegmentGroup.ItemHiddenInput` | `radio` | `aria-checked`, `aria-disabled`, `tabindex` (roving) |
| `SegmentGroup.ItemControl` | none | `data-state="checked/unchecked"`, `data-disabled` |

> **Note**: The `role="radio"` lives on the hidden `<input>`, not the visual control. This is Ark-UI's pattern and is WCAG-compliant. jest-axe will verify no violations.

---

## 7. Theme Attributes (Not Applicable)

V2 uses CSS custom properties for theming rather than the `bpk-theming` JavaScript theming system. No `themeAttributes.ts` file is required for V2. The existing V1 `themeAttributes.ts` (if any) is left unchanged.

---

## 8. Figma Code Connect Shape — `BpkSegmentedControlV2.figma.tsx`

```typescript
import { figma } from '@figma/code-connect';
import BpkSegmentedControlV2 from './BpkSegmentedControlV2';
import { SEGMENT_TYPES_V2 } from './common-types';

figma.connect(BpkSegmentedControlV2.Root, 'FIGMA_URL', {
  props: {
    type: figma.enum('Type', {
      'Canvas default': SEGMENT_TYPES_V2.CanvasDefault,
      'Canvas contrast': SEGMENT_TYPES_V2.CanvasContrast,
      'Surface default': SEGMENT_TYPES_V2.SurfaceDefault,
      'Surface contrast': SEGMENT_TYPES_V2.SurfaceContrast,
    }),
    shadow: figma.boolean('Shadow'),
    disabled: figma.boolean('Disabled'),
  },
  example: ({ disabled, shadow, type }) => (
    <BpkSegmentedControlV2.Root
      type={type}
      shadow={shadow}
      disabled={disabled}
      defaultValue="option1"
    >
      <BpkSegmentedControlV2.Item value="option1">Option 1</BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="option2">Option 2</BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  ),
});
```
