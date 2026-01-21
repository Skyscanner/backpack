# API Design: BpkCheckbox (Ark UI Rebase)

**Date**: 2026-01-21
**Component**: BpkCheckbox
**Phase**: 1 - Design & Planning

## Overview

This document defines the TypeScript API for BpkCheckbox built on Ark UI primitives. The component supports two modes:
1. **Legacy API**: Simple prop-based usage with `label` prop (backward compatible)
2. **Composable API**: Advanced usage with sub-component children (new opt-in feature)

The component automatically detects which mode to use based on the presence of `label` prop vs `children`.

---

## Component API Structure

### Main Component: BpkCheckbox

The main `BpkCheckbox` component serves as both:
- A simple checkbox when used with `label` prop (legacy mode)
- A root wrapper when used with composable children (new mode)

**Export Pattern**:
```typescript
export default BpkCheckbox; // Default export for simple usage

// Sub-components as properties (React pattern: BpkCheckbox.Root, BpkCheckbox.Control, etc.)
BpkCheckbox.Root = BpkCheckboxRoot;
BpkCheckbox.Control = BpkCheckboxControl;
BpkCheckbox.Label = BpkCheckboxLabel;
BpkCheckbox.Indicator = BpkCheckboxIndicator;
BpkCheckbox.HiddenInput = BpkCheckboxHiddenInput;
```

---

## TypeScript Interfaces

### Common Types

```typescript
import type { ReactNode, InputHTMLAttributes } from 'react';

/**
 * Base props that extend native HTML input attributes, excluding conflicting props.
 */
type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>;

/**
 * Validation state for the checkbox.
 * - true: Valid state (optional visual indicator)
 * - false: Invalid state (shows error styling, sets aria-invalid)
 * - null: Neutral state (no validation styling)
 */
type ValidationState = boolean | null;

/**
 * Callback signature for onChange event (legacy API).
 */
type OnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * Callback signature for onCheckedChange event (Ark UI API).
 */
type OnCheckedChangeHandler = (details: { checked: boolean }) => void;
```

---

### BpkCheckbox Props (Main Component)

The main component accepts a union of two prop types: simple (legacy) or composable (new).

```typescript
/**
 * Props for simple/legacy checkbox usage with label prop.
 */
type BpkCheckboxSimpleProps = NativeInputProps & {
  /**
   * Form input name attribute (required for form submission).
   */
  name: string;

  /**
   * Label text or content displayed next to the checkbox.
   * Required when not using composable children.
   */
  label: ReactNode;

  /**
   * Whether checkbox is required (shows asterisk when true).
   * @default false
   */
  required?: boolean;

  /**
   * Whether checkbox is disabled (prevents interaction).
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to render white variant (for dark backgrounds).
   * @default false
   */
  white?: boolean;

  /**
   * Additional CSS class for the root element.
   */
  className?: string | null;

  /**
   * Whether to render label with small text style.
   * @default false
   */
  smallLabel?: boolean;

  /**
   * Validation state.
   * - false: Shows invalid styling
   * - null: Neutral (default)
   * - true: Valid state
   * @default null
   */
  valid?: ValidationState;

  /**
   * Whether checkbox shows indeterminate state (visual only).
   * Displays a dash/minus symbol instead of checkmark.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Controlled checked state.
   */
  checked?: boolean;

  /**
   * Initial checked state for uncontrolled mode.
   */
  defaultChecked?: boolean;

  /**
   * Change handler (legacy API).
   */
  onChange?: OnChangeHandler;

  /**
   * Change handler (Ark UI API).
   * Can be used alongside or instead of onChange.
   */
  onCheckedChange?: OnCheckedChangeHandler;
};

/**
 * Props for composable checkbox usage with children.
 */
type BpkCheckboxComposableProps = NativeInputProps & {
  /**
   * Form input name attribute (required for form submission).
   */
  name: string;

  /**
   * Composable child elements (Control, Label, Indicator, HiddenInput, and custom elements).
   * When provided, the label prop is not used.
   */
  children: ReactNode;

  /**
   * Whether checkbox is required (shows asterisk when true).
   * @default false
   */
  required?: boolean;

  /**
   * Whether checkbox is disabled (prevents interaction).
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to render white variant (for dark backgrounds).
   * @default false
   */
  white?: boolean;

  /**
   * Additional CSS class for the root element.
   */
  className?: string | null;

  /**
   * Whether to render label with small text style (affects Label sub-component).
   * @default false
   */
  smallLabel?: boolean;

  /**
   * Validation state.
   * - false: Shows invalid styling
   * - null: Neutral (default)
   * - true: Valid state
   * @default null
   */
  valid?: ValidationState;

  /**
   * Whether checkbox shows indeterminate state (visual only).
   * Displays a dash/minus symbol instead of checkmark.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Controlled checked state.
   */
  checked?: boolean;

  /**
   * Initial checked state for uncontrolled mode.
   */
  defaultChecked?: boolean;

  /**
   * Change handler (legacy API).
   */
  onChange?: OnChangeHandler;

  /**
   * Change handler (Ark UI API).
   * Can be used alongside or instead of onChange.
   */
  onCheckedChange?: OnCheckedChangeHandler;
};

/**
 * Main component props - union of simple and composable variants.
 */
export type BpkCheckboxProps = BpkCheckboxSimpleProps | BpkCheckboxComposableProps;
```

---

### Sub-Component Props

#### BpkCheckboxRoot

Root wrapper for composable API. Same props as main component (alias).

```typescript
/**
 * Props for BpkCheckboxRoot (explicit composable entry point).
 * When using BpkCheckbox.Root or BpkCheckboxRoot, children are required.
 */
export type BpkCheckboxRootProps = BpkCheckboxComposableProps;
```

#### BpkCheckboxControl

The visual checkbox box element (the square that gets checked).

```typescript
/**
 * Props for BpkCheckboxControl.
 */
export type BpkCheckboxControlProps = {
  /**
   * Additional CSS class for the control element.
   */
  className?: string;

  /**
   * Custom content to render inside the control.
   * Typically used for custom checkmark icons.
   */
  children?: ReactNode;
};
```

#### BpkCheckboxLabel

The label text element.

```typescript
/**
 * Props for BpkCheckboxLabel.
 */
export type BpkCheckboxLabelProps = {
  /**
   * Additional CSS class for the label element.
   */
  className?: string;

  /**
   * Label text or content (required).
   */
  children: ReactNode;
};
```

#### BpkCheckboxIndicator

The checkmark or indeterminate dash icon.

```typescript
/**
 * Props for BpkCheckboxIndicator.
 */
export type BpkCheckboxIndicatorProps = {
  /**
   * Additional CSS class for the indicator element.
   */
  className?: string;

  /**
   * Custom indicator content (optional).
   * If not provided, default checkmark/dash icons are used.
   */
  children?: ReactNode;
};
```

#### BpkCheckboxHiddenInput

The hidden native input element for form integration.

```typescript
/**
 * Props for BpkCheckboxHiddenInput.
 */
export type BpkCheckboxHiddenInputProps = InputHTMLAttributes<HTMLInputElement>;
```

---

## Component Composition

### Mode Detection Logic

The component detects which mode to use based on props:

```typescript
const BpkCheckbox = (props: BpkCheckboxProps) => {
  // Type guard to check if using simple API
  const isSimpleMode = 'label' in props && props.label !== undefined;

  if (isSimpleMode) {
    // Render as simple checkbox with auto-generated sub-components
    return (
      <BpkCheckboxRoot {...props} label={undefined}>
        <BpkCheckboxControl>
          <BpkCheckboxIndicator />
        </BpkCheckboxControl>
        <BpkCheckboxLabel className={props.smallLabel ? 'bpk-checkbox__label--small' : undefined}>
          {props.label}
          {props.required && <span className="bpk-checkbox__asterisk">*</span>}
        </BpkCheckboxLabel>
        <BpkCheckboxHiddenInput />
      </BpkCheckboxRoot>
    );
  }

  // Render as composable root with user-provided children
  return <BpkCheckboxRoot {...props} />;
};
```

### Ark UI Integration

Each sub-component wraps an Ark UI primitive:

```typescript
import { Checkbox as ArkCheckbox } from '@ark-ui/react';

const BpkCheckboxRoot = (props) => {
  const { className, ...arkProps } = props;
  const classNames = getClassName('bpk-checkbox', className);

  return (
    <ArkCheckbox.Root {...arkProps} className={classNames}>
      {props.children}
    </ArkCheckbox.Root>
  );
};

const BpkCheckboxControl = (props) => {
  const { className, children, ...arkProps } = props;
  const classNames = getClassName('bpk-checkbox__control', className);

  return (
    <ArkCheckbox.Control {...arkProps} className={classNames}>
      {children || <BpkCheckboxIndicator />}
    </ArkCheckbox.Control>
  );
};

const BpkCheckboxLabel = (props) => {
  const { className, children, ...arkProps } = props;
  const classNames = getClassName('bpk-checkbox__label', className);

  return (
    <ArkCheckbox.Label {...arkProps} className={classNames}>
      {children}
    </ArkCheckbox.Label>
  );
};

const BpkCheckboxIndicator = (props) => {
  const { className, children, ...arkProps } = props;
  const classNames = getClassName('bpk-checkbox__indicator', className);

  return (
    <ArkCheckbox.Indicator {...arkProps} className={classNames}>
      {children}
    </ArkCheckbox.Indicator>
  );
};

const BpkCheckboxHiddenInput = (props) => {
  return <ArkCheckbox.HiddenInput {...props} />;
};
```

---

## Accessibility Considerations

### ARIA Attributes

The component must support these ARIA attributes (provided by Ark UI + Backpack additions):

- `aria-checked`: Reflects checked state (`"true"`, `"false"`, or `"mixed"` for indeterminate)
- `aria-disabled`: Set when `disabled={true}`
- `aria-invalid`: Set when `valid={false}`
- `aria-required`: Set when `required={true}`
- `aria-describedby`: Associates error messages (if provided)
- `aria-labelledby`: Associates label with input (automatic from Ark UI)

### Keyboard Navigation

- **Tab**: Focus the checkbox
- **Space**: Toggle checked state
- **Shift+Tab**: Focus previous element

### Screen Reader Support

- Checkbox announces its state: "checked", "unchecked", or "mixed"
- Label text is announced with the checkbox
- Required state is announced ("required field")
- Invalid state is announced ("invalid entry")

---

## Theming Support

### Theme Attributes

**File**: `themeAttributes.ts`

```typescript
/**
 * Theme attributes for BpkCheckbox.
 * These map to CSS custom properties via BpkThemeProvider.
 */
export default [
  'checkboxCheckedColor', // Existing attribute - backward compatible
  // Future extensibility (can be added in MINOR versions):
  // 'checkboxHoverColor',
  // 'checkboxActiveColor',
  // 'checkboxBackgroundColor',
  // 'checkboxBorderColor',
];
```

### Theme Integration Pattern

**Consumer Usage**:
```typescript
import BpkThemeProvider from 'bpk-theming';
import BpkCheckbox, { themeAttributes } from 'bpk-component-checkbox';

const myTheme = {
  checkboxCheckedColor: '#ff0000',
};

<BpkThemeProvider theme={myTheme} themeAttributes={themeAttributes}>
  <BpkCheckbox name="terms" label="Accept terms" />
</BpkThemeProvider>
```

**How it Works**:
1. BpkThemeProvider converts `checkboxCheckedColor` → `--bpk-checkbox-checked-color` CSS variable
2. SCSS uses `var(--bpk-checkbox-checked-color, fallback)` pattern
3. When no theme provided, fallback tokens are used

---

## Event Handling

### Dual Callback Support

The component supports both legacy `onChange` and new `onCheckedChange` callbacks:

```typescript
// Legacy API (React synthetic event)
<BpkCheckbox
  name="terms"
  label="Accept terms"
  onChange={(e) => setChecked(e.target.checked)}
/>

// New Ark UI API (details object)
<BpkCheckbox
  name="terms"
  label="Accept terms"
  onCheckedChange={({ checked }) => setChecked(checked)}
/>

// Both callbacks (both will fire)
<BpkCheckbox
  name="terms"
  label="Accept terms"
  onChange={(e) => console.log('onChange', e.target.checked)}
  onCheckedChange={({ checked }) => console.log('onCheckedChange', checked)}
/>
```

### Controlled vs Uncontrolled

**Controlled Mode** (parent manages state):
```typescript
const [checked, setChecked] = useState(false);

<BpkCheckbox
  name="terms"
  label="Accept terms"
  checked={checked}
  onCheckedChange={({ checked }) => setChecked(checked)}
/>
```

**Uncontrolled Mode** (component manages state):
```typescript
<BpkCheckbox
  name="terms"
  label="Accept terms"
  defaultChecked={false}
/>
```

---

## Form Integration

### Native Form Behavior

The component works with native HTML forms via the hidden input:

```html
<form action="/submit" method="POST">
  <BpkCheckbox name="terms" label="Accept terms" />
  <button type="submit">Submit</button>
</form>
```

When the form is submitted:
- If checked: `terms=on` is included in form data
- If unchecked: `terms` is not included
- Custom `value` prop can be provided: `<BpkCheckbox name="terms" value="accepted" />`

---

## Usage Examples

### Example 1: Simple API (Legacy, Backward Compatible)

```typescript
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

<BpkCheckbox
  name="newsletter"
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>
```

### Example 2: Composable API (New Feature)

```typescript
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

<BpkCheckbox
  name="newsletter"
  checked={subscribed}
  onCheckedChange={({ checked }) => setSubscribed(checked)}
>
  <BpkCheckbox.Control>
    <BpkCheckbox.Indicator />
  </BpkCheckbox.Control>
  <BpkCheckbox.Label>
    Subscribe to newsletter
  </BpkCheckbox.Label>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox>
```

### Example 3: Composable with Custom Layout

```typescript
<BpkCheckbox name="terms" checked={accepted} onCheckedChange={handleChange}>
  <BpkCheckbox.Control>
    <BpkCheckbox.Indicator />
  </BpkCheckbox.Control>
  <div className="custom-label-container">
    <BpkCheckbox.Label>
      Accept terms and conditions
    </BpkCheckbox.Label>
    <p className="help-text">You must accept to continue</p>
  </div>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox>
```

### Example 4: Themed Checkbox

```typescript
import BpkThemeProvider from 'bpk-theming';
import BpkCheckbox, { themeAttributes } from 'bpk-component-checkbox';

const theme = {
  checkboxCheckedColor: '#0062E3', // Custom brand color
};

<BpkThemeProvider theme={theme} themeAttributes={themeAttributes}>
  <BpkCheckbox name="marketing" label="Receive marketing emails" />
</BpkThemeProvider>
```

### Example 5: Disabled State

```typescript
<BpkCheckbox
  name="disabled"
  label="This option is disabled"
  disabled
  checked
/>
```

### Example 6: Indeterminate State

```typescript
<BpkCheckbox
  name="select-all"
  label="Select all"
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>
```

### Example 7: Invalid State with Validation

```typescript
<BpkCheckbox
  name="terms"
  label="Accept terms and conditions"
  checked={termsAccepted}
  valid={termsAccepted ? true : false}
  onChange={(e) => setTermsAccepted(e.target.checked)}
  required
/>
```

---

## Ref Forwarding

The component forwards refs to the underlying native input element:

```typescript
const checkboxRef = useRef<HTMLInputElement>(null);

<BpkCheckbox
  ref={checkboxRef}
  name="terms"
  label="Accept terms"
/>

// Access the native input
checkboxRef.current?.focus();
```

---

## Type Guards & Utilities

Helper functions for type safety:

```typescript
/**
 * Type guard to check if props are for simple mode.
 */
function isSimpleMode(props: BpkCheckboxProps): props is BpkCheckboxSimpleProps {
  return 'label' in props && props.label !== undefined;
}

/**
 * Type guard to check if props are for composable mode.
 */
function isComposableMode(props: BpkCheckboxProps): props is BpkCheckboxComposableProps {
  return 'children' in props && props.children !== undefined;
}
```

---

## Implementation Notes

### Backward Compatibility Strategy

1. **Preserve all existing props**: No props removed or changed
2. **Same visual output**: Default styling matches current BpkCheckbox exactly
3. **Same behavior**: Event handling, form integration, and state management work identically
4. **No breaking changes**: Existing code continues to work without modifications

### Migration Path (Optional)

Consumers can gradually adopt the composable API:

**Before (still works)**:
```typescript
<BpkCheckbox name="terms" label="Accept terms" checked={accepted} onChange={handleChange} />
```

**After (opt-in)**:
```typescript
<BpkCheckbox name="terms" checked={accepted} onCheckedChange={handleChange}>
  <BpkCheckbox.Control><BpkCheckbox.Indicator /></BpkCheckbox.Control>
  <BpkCheckbox.Label>Accept terms</BpkCheckbox.Label>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox>
```

Both patterns are fully supported and maintained.

---

## API Summary

| Component | Purpose | Required Props | Optional Props |
|-----------|---------|---------------|----------------|
| `BpkCheckbox` | Main component (simple or composable) | `name` | `label`, `children`, `checked`, `defaultChecked`, `disabled`, `required`, `white`, `className`, `smallLabel`, `valid`, `indeterminate`, `onChange`, `onCheckedChange` |
| `BpkCheckbox.Root` | Explicit composable root | `name`, `children` | Same as BpkCheckbox |
| `BpkCheckbox.Control` | Checkbox box element | None | `className`, `children` |
| `BpkCheckbox.Label` | Label element | `children` | `className` |
| `BpkCheckbox.Indicator` | Checkmark/dash icon | None | `className`, `children` |
| `BpkCheckbox.HiddenInput` | Native input for forms | None | All native input attributes |

---

## Next Steps

Phase 1 continues with:
1. ✅ API Design (this document)
2. Next: Styling Guide (`styling-guide.md`)
3. Next: Code Examples (`examples/`)
4. Next: Update agent context
