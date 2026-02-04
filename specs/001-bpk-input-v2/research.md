# Research: BpkInput V2 - Flexible Composable API

**Date**: 2026-01-29
**Spec**: [spec.md](./spec.md)

## Summary

This document consolidates research findings for implementing BpkInputV2 with a flexible composable API inspired by Ark UI. The research covers existing BpkInput patterns, Backpack Sass mixins, composable component architectures, and testing strategies.

---

## 1. Existing BpkInput Component Analysis

### Current Architecture

**Component Type**: React Class Component
**File Location**: `packages/bpk-component-input/src/BpkInput.tsx`

**Key Findings**:
- Current BpkInput is a wrapper around native `<input>` with optional clear button container
- Uses three-state validation: `valid?: boolean | null` (valid, invalid, or neutral)
- Clearable implementation: Three modes ('never', 'whileEditing', 'always')
- Docked inputs: Manual props (`dockedFirst`, `dockedMiddle`, `dockedLast`)
- Large variant: Boolean prop on Input level

### Current Props Interface

```typescript
type BaseProps = InputProps & ComponentProps<'input'> & {
  valid?: boolean | null;
  large?: boolean;
  docked?: boolean;
  dockedFirst?: boolean;
  dockedMiddle?: boolean;
  dockedLast?: boolean;
  inputRef?: ((ref: HTMLInputElement) => void) | null;
};

// Two variants based on clearButtonMode
type PropsWithoutClearButtonMode = BaseProps & {
  clearButtonMode?: 'never';
  clearButtonLabel?: string | null;
  onClear?: ((e?: SyntheticEvent<HTMLButtonElement>) => void) | null;
};

type PropsWithClearButtonMode = BaseProps & {
  clearButtonMode: 'whileEditing' | 'always';
  clearButtonLabel: string;  // Required
  onClear: (e?: SyntheticEvent<HTMLButtonElement>) => void;  // Required
};

type Props = PropsWithoutClearButtonMode | PropsWithClearButtonMode;
```

**Decision**: BpkInputV2 will adopt this union type pattern for type-safe prop combinations.

### Current Styling Approach

**Sass Mixins Used** (from `packages/bpk-mixins/_forms.scss`):
- `@include forms.bpk-input` - Base input styling
- `@include forms.bpk-input--valid` - Valid state (checkmark SVG)
- `@include forms.bpk-input--invalid` - Invalid state (error SVG)
- `@include forms.bpk-input--clearable` - Clearable variant
- `@include forms.bpk-input__clear-button` - Clear button styling
- `@include forms.bpk-input--large` - Large variant
- `@include forms.bpk-input--docked` + position variants - Docked inputs

**BEM Class Structure**:
- `.bpk-input` (base)
- `.bpk-input--valid`, `.bpk-input--invalid` (validation states)
- `.bpk-input--large` (size variant)
- `.bpk-input--clearable`, `.bpk-input--persistent-clearable` (clearable modes)
- `.bpk-input--docked`, `.bpk-input--docked-first/middle/last` (docking positions)
- `.bpk-input__container` (wrapper for clearable)
- `.bpk-input__clear-button` (clear button)

**Design Tokens**:
- Height: `bpk-input-height` (2.25rem), `bpk-input-large-height` (3rem)
- Padding: `bpk-input-padding-y`, `bpk-input-padding-x`
- Border: `bpk-input-border-radius`, `bpk-input-large-border-radius`
- Colors: `bpk-text-primary-day`, `bpk-text-secondary-day`, `bpk-input-background`
- Validation: `bpk-form-validation-color` (themeable via `--bpk-input-invalid-border-color`)

**Decision**: BpkInputV2 will reuse these mixins and tokens but adapt them for the composable API structure.

### Valid/Invalid Implementation

**Current Approach**: SVG icons embedded as base64 background images in CSS

**Spec Requirement**: Use InputAdornment components instead of CSS backgrounds

**Rationale**:
- Consistent mechanism for all adornments (user-provided + system-generated)
- Enables proper ordering: `[user InputAdornment] [valid/invalid icon] [clear button]`
- Better accessibility with proper ARIA attributes on icon containers

**Decision**: V2 will auto-insert InputAdornment components for valid/invalid icons instead of using CSS backgrounds.

### Clearable Implementation

**Current Approach**:
- Clear button is `<button type="button">` with `tabIndex={-1}` (not in tab order)
- Three modes: 'never', 'whileEditing', 'always'
- For 'whileEditing': CSS selector `:focus + .bpk-input__clear-button` shows button
- For 'always': `.bpk-input--persistent-clearable` class shows button always

**State Management**:
```typescript
persistClearButton: boolean  // Prevents button hiding during click
```

**Decision**: V2 will implement clear button as auto-inserted InputAdornment, maintaining same behavioral logic.

### Docked Inputs Implementation

**Current Approach**: Manual props `dockedFirst`, `dockedMiddle`, `dockedLast`

**CSS Behavior**:
- `dockedFirst`: Left border-radius, right border removed
- `dockedMiddle`: All border-radius removed, borders except right removed
- `dockedLast`: Right border-radius, left border removed

**Spec Requirement**: Remove manual props, auto-detect based on Input count/position

**Decision**:
- V2 Root will use React Children API to count and identify Input positions
- Apply docked styles automatically:
  - 1 Input: Normal border (all corners rounded)
  - 2 Inputs: First (left rounded, right flat), Last (left flat, right rounded)
  - 3+ Inputs: First (left rounded, right flat), Middle (all flat), Last (left flat, right rounded)

### Large Variant Implementation

**Current Approach**: `large` prop on Input component

**Spec Requirement**: Move `large` to Root level

**Changes Applied**:
- Height: 2.25rem → 3rem
- Padding: 0.5rem → 1rem
- Border radius: 0.5rem → 0.75rem
- Icon positioning: Adjusted for larger size

**Decision**: V2 Root will accept `large` prop and apply to all child Inputs and InputAdornments via Context.

---

## 2. Backpack Sass Mixins & Tokens

### Modern Sass @use Syntax

**Pattern** (NON-NEGOTIABLE):
```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/forms';
@use '../../bpk-mixins/utils';
@use '../../bpk-mixins/typography';
@use '../../bpk-mixins/shadows';
```

**Access Pattern**:
```scss
// Functions (with parentheses)
tokens.bpk-spacing-md()
tokens.bpk-spacing-xl()

// Variables (with $)
tokens.$bpk-text-primary-day
tokens.$bpk-input-height

// Mixins
@include forms.bpk-input;
@include utils.bpk-rtl { /* RTL styles */ }
```

### Essential Tokens for BpkInputV2

| Category | Token | Usage |
|----------|-------|-------|
| **Spacing** | `tokens.bpk-spacing-base()` | Padding/gaps |
| | `tokens.bpk-spacing-md()` | Medium spacing (0.5rem default gap) |
| | `tokens.bpk-spacing-xl()` | Icon spacing |
| **Colors** | `tokens.$bpk-text-primary-day` | Input text |
| | `tokens.$bpk-text-secondary-day` | Placeholder |
| | `tokens.$bpk-core-accent-day` | Focus/valid states |
| | `tokens.$bpk-form-validation-color` | Invalid state |
| | `tokens.$bpk-input-background` | Background |
| **Sizing** | `tokens.$bpk-input-height` | Default height (2.25rem) |
| | `tokens.$bpk-input-large-height` | Large height (3rem) |
| | `tokens.$bpk-icon-size-sm` | Icon dimensions |
| **Radii** | `tokens.$bpk-input-border-radius` | Default corner rounding |
| | `tokens.$bpk-input-large-border-radius` | Large corner rounding |
| **Typography** | `tokens.$bpk-font-size-base` | Input text size |
| | `tokens.$bpk-line-height-base` | Line height |

### RTL Support

**Utility Mixin**:
```scss
@include utils.bpk-rtl {
  // RTL-specific styles
  padding-right: tokens.$bpk-input-padding-x;
  padding-left: tokens.bpk-spacing-xl();
  text-align: right;
}
```

**Pattern for Directional Properties**:
- LTR default: `padding-right`, `background-position: right`
- RTL override: Swap to `padding-left`, `background-position: left`
- Input types (number/tel/email): Use `direction: ltr` in RTL contexts

**Decision**: All InputAdornment positioning and Input padding calculations must account for RTL mode.

### Shadow Mixins (for Focus States)

```scss
@include shadows.bpk-box-shadow-sm;  // Subtle elevation
@include shadows.bpk-box-shadow-lg;  // More pronounced elevation
```

**Decision**: Use for focused Input elevation if needed (follow existing patterns).

---

## 3. Composable Component Patterns in Backpack

### Pattern 1: React Context-Based (BpkAccordion)

**Architecture**:
```typescript
// Parent component provides context
export const BpkAccordionContext = createContext({
  onDark: false,
  divider: true,
});

const BpkAccordion = (props) => {
  const { children, divider = true, onDark = false } = props;
  return (
    <BpkAccordionContext.Provider value={{ onDark, divider }}>
      <div className={classNames}>{children}</div>
    </BpkAccordionContext.Provider>
  );
};

// Child component consumes context
const BpkAccordionItem = (props) => {
  const { divider, onDark } = useContext(BpkAccordionContext);
  // Use context values for styling
};
```

**Export Pattern**:
```typescript
// index.ts
export { BpkAccordion, BpkAccordionItem };
```

**Decision**: BpkInputV2 will follow this pattern with `BpkInputContext` providing `gap`, `large`, and adornment attribution logic.

### Pattern 2: Multiple Context Providers (BpkCard)

**Architecture**:
```typescript
interface BpkCardContext {
  elevated: boolean;
}

const CardContext = createContext(defaultContext);

// Child reads context
const BpkCard = (props) => {
  const cardContext = useContext(CardContext);
  // Adapt styling based on context.elevated
};

// Multiple parent components with different context values
const BpkCardWrapper = ({ card, header }) => (
  <CardContext.Provider value={{ elevated: false }}>
    <div>{header}{card}</div>
  </CardContext.Provider>
);

const BpkDividedCard = ({ children }) => (
  <CardContext.Provider value={{ elevated: true }}>
    {children}
  </CardContext.Provider>
);
```

**Decision**: BpkInputV2 will have single Root component, but can support multiple Roots independently.

### Pattern 3: Simple Composition (BpkDescriptionList)

**Architecture**: No shared state, just semantic grouping
```typescript
const BpkDescriptionList = ({ children }) => (
  <dl className="bpk-description-list">{children}</dl>
);

const BpkDescriptionTerm = ({ children }) => (
  <dt className="bpk-description-list__term">{children}</dt>
);
```

**Decision**: Not applicable to BpkInputV2 (needs shared state for gap/large/attribution).

### className Management Pattern

**Backpack Standard**:
```typescript
import { cssModules } from '../../bpk-react-utils';
import STYLES from './BpkComponent.module.scss';

const getClassName = cssModules(STYLES);

const classNames = getClassName(
  'bpk-component',
  variant && `bpk-component--${variant}`,
  disabled && 'bpk-component--disabled',
  className,  // Allow custom override
);
```

**Decision**: BpkInputV2 will use this pattern for all components (Root, Input, InputAdornment).

---

## 4. TypeScript Types Structure

### Recommended Pattern from Backpack

**File**: `common-types.ts`

```typescript
// Constants for valid values
export const INPUT_TYPES = {
  text: 'text',
  email: 'email',
  password: 'password',
} as const;

// Discriminated unions for conditional props
export type PropsWithoutClearButtonMode = BaseProps & {
  clearButtonMode?: 'never';
};

export type PropsWithClearButtonMode = BaseProps & {
  clearButtonMode: 'always' | 'whileEditing';
  clearButtonLabel: string;  // Required when clearButtonMode is set
  onClear: (e?: SyntheticEvent<HTMLButtonElement>) => void;  // Required
};

// Union type for proper type narrowing
export type Props = PropsWithoutClearButtonMode | PropsWithClearButtonMode;
```

**Best Practices**:
- Use `as const` for enum-like constants
- Use discriminated unions for conditional required props
- Separate types for different states/modes
- Use `type` instead of `interface` for component props

**Decision**: BpkInputV2 will adopt this pattern for Root, Input, and InputAdornment props.

---

## 5. Testing Patterns

### Test File Structure

```
src/BpkInputV2/
├── BpkInput-test.tsx          # Main snapshot tests
├── BpkInputGroup-test.tsx     # Composition tests
├── accessibility-test.tsx     # jest-axe tests
├── form-test.tsx              # Form integration tests
└── __snapshots__/
```

### Accessibility Testing Pattern

```typescript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('BpkInput accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test">Label</label>
        <BpkInput id="test" name="test" value="" onChange={() => {}} />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test multiple variations (valid, invalid, disabled, clearable)
});
```

**Key Practices**:
- Always wrap with `<label>` for accessibility
- Test all state variations
- Use `const { container } = render()` and pass to `axe(container)`
- Check `expect(results).toHaveNoViolations()`

### Clearable Button Testing

```typescript
it('should call "onClear" when clearing', async () => {
  const onClear = jest.fn();

  render(
    <BpkInput
      id="test"
      name="test"
      value="value"
      clearButtonMode="always"
      clearButtonLabel="clear"
      onClear={onClear}
      onChange={() => {}}
    />,
  );

  const button = screen.getByRole('button', { name: 'clear' });
  await userEvent.click(button);

  expect(onClear).toHaveBeenCalled();
});
```

### Keyboard Interaction Testing

```typescript
it('should accept user input with keyboard', async () => {
  const onChange = jest.fn();

  render(
    <BpkInput id="test" name="test" value="" onChange={onChange} />
  );

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'hello');

  expect(input).toHaveValue('hello');
  expect(onChange).toHaveBeenCalled();
});
```

### Snapshot Testing Pattern

```typescript
it('should render correctly', () => {
  const { asFragment } = render(
    <BpkInput id="test" name="test" value="" onChange={() => {}} />
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test all prop combinations
it('should render correctly with large attribute', () => {
  const { asFragment } = render(
    <BpkInput id="test" name="test" value="" large onChange={() => {}} />
  );
  expect(asFragment()).toMatchSnapshot();
});
```

### Form Integration Testing

```typescript
it('should work as a form component', async () => {
  const Wrap = () => {
    const [value, setValue] = useState('');
    return (
      <form data-testid="form">
        <BpkInput
          id="test"
          name="test"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    );
  };

  render(<Wrap />);

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'test');

  expect(input).toHaveValue('test');

  const formData = new FormData(
    screen.getByTestId('form') as HTMLFormElement,
  );
  expect(Object.fromEntries(formData.entries())).toEqual({ test: 'test' });
});
```

**Coverage Target**: 70% branches, 75% functions/lines/statements

---

## 6. Architecture Decisions for BpkInputV2

### Decision 1: Context-Based State Sharing

**Chosen Approach**: React Context (following BpkAccordion pattern)

**Context Interface**:
```typescript
interface BpkInputContextValue {
  gap: string;           // Default: "0.5rem"
  large: boolean;        // Applied to all children
  // Methods for InputAdornment attribution
  registerInput: (id: string, ref: RefObject<HTMLInputElement>) => void;
  registerAdornment: (id: string, position: number) => void;
  getAdornmentPosition: (id: string) => 'start' | 'end' | null;
}
```

**Rationale**:
- Enables Root to share `gap` and `large` with all children
- Centralizes InputAdornment attribution logic
- Provides width measurement infrastructure for dynamic text-indent/padding calculation

### Decision 2: InputAdornment Attribution Logic

**Chosen Approach**: React Children API + Position Tracking

**Algorithm**:
1. Root traverses `React.Children` to identify Input and InputAdornment positions
2. For each InputAdornment:
   - If before an Input: assign as `start` for that Input
   - If after an Input: assign as `end` for that Input
3. For consecutive InputAdornments:
   - First goes to previous Input's `end`
   - Rest go to next Input's `start`

**Implementation Location**: Custom hook `useInputAdornmentAttribution`

**Rationale**: Aligns with spec requirement for automatic attribution without manual `start`/`end` distinction.

### Decision 3: Gap Implementation

**Chosen Approach**: Dynamic text-indent and padding calculation

**Algorithm**:
1. Root provides `gap` value via Context (CSS length unit)
2. Each Input measures its associated InputAdornments using `ResizeObserver`
3. Calculate:
   - `text-indent = startAdornmentWidth + gap` (if start InputAdornment exists)
   - `padding-right = endAdornmentWidth + gap` (LTR, if end InputAdornment exists)
   - `padding-left = endAdornmentWidth + gap` (RTL, if end InputAdornment exists)
4. Apply calculated styles to Input dynamically

**Implementation Location**: Custom hook `useGapCalculation`

**Rationale**:
- Ensures consistent spacing regardless of adornment content size
- Responsive to content changes (ResizeObserver)
- Works with any CSS unit for gap (rem, px, em, etc.)

### Decision 4: Automatic Border Detection

**Chosen Approach**: React Children API counting

**Algorithm**:
1. Root counts total number of Input children
2. For each Input, determine position index
3. Apply classes:
   - If count === 1: Normal border (`.bpk-input`)
   - If count === 2:
     - Index 0: `.bpk-input--docked-first`
     - Index 1: `.bpk-input--docked-last`
   - If count >= 3:
     - Index 0: `.bpk-input--docked-first`
     - Index (1 to count-2): `.bpk-input--docked-middle`
     - Index (count-1): `.bpk-input--docked-last`

**Implementation Location**: Custom hook `useBorderDetection`

**Rationale**: Removes need for manual `dockedFirst/Middle/Last` props, simplifies API.

### Decision 5: Valid/Invalid Icon Implementation

**Chosen Approach**: Auto-insert InputAdornment components

**Current Implementation** (V1): SVG embedded in CSS as background-image

**New Implementation** (V2):
```typescript
// In BpkInput component
const SystemAdornments = () => {
  if (valid === true) {
    return <InputAdornment data-system="valid">✓</InputAdornment>;
  }
  if (valid === false) {
    return <InputAdornment data-system="invalid">✗</InputAdornment>;
  }
  return null;
};

// Render order in Input
<>
  {startAdornments}
  <input {...props} />
  {endAdornments}
  <SystemAdornments />  // Always after user adornments
  {clearButton && <InputAdornment data-system="clear">{clearButton}</InputAdornment>}
</>
```

**Rationale**:
- Consistent mechanism for all adornments
- Proper ordering guaranteed: user InputAdornments → validation icon → clear button
- Better accessibility (icons in DOM, not CSS)

### Decision 6: Clear Button Implementation

**Chosen Approach**: Auto-insert InputAdornment (like valid/invalid)

**Behavior Preservation**:
- Maintain three modes: 'never', 'whileEditing', 'always'
- Keep `persistClearButton` state management
- Same focus/blur logic as V1

**New Implementation**:
```typescript
{clearButtonMode !== 'never' && value && (
  <InputAdornment
    data-system="clear"
    className={getClassName(
      'bpk-input__adornment--clear',
      clearButtonMode === 'always' && 'bpk-input__adornment--clear-persistent'
    )}
  >
    <button type="button" tabIndex={-1} onClick={handleClear}>
      <ClearIcon />
    </button>
  </InputAdornment>
)}
```

**Rationale**: Unifies all end-position elements (user adornments, icons, buttons) under same mechanism.

### Decision 7: Large Property Location

**Chosen Approach**: Root-level prop

**Affected Components**: Root provides, Input and InputAdornment consume

**Context Distribution**:
```typescript
// In Root
<BpkInputContext.Provider value={{ large }}>
  {children}
</BpkInputContext.Provider>

// In Input and InputAdornment
const { large } = useContext(BpkInputContext);
const classNames = getClassName(
  'bpk-input',
  large && 'bpk-input--large'
);
```

**Rationale**: Ensures all components in a group have consistent sizing.

### Decision 8: Styling Strategy

**Chosen Approach**: Extend existing Sass mixins

**File Structure**:
```
src/BpkInputV2/
├── BpkInputV2.module.scss
```

**Pattern**:
```scss
@use '../../bpk-mixins/forms';
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/utils';

.bpk-input-v2__root {
  display: flex;
  gap: var(--bpk-input-gap, tokens.bpk-spacing-md());
}

.bpk-input-v2__input {
  @include forms.bpk-input;  // Reuse base styles
}

.bpk-input-v2__input--large {
  @include forms.bpk-input--large;  // Reuse large variant
}

.bpk-input-v2__adornment {
  // New styles for adornments
  display: flex;
  align-items: center;
}
```

**Rationale**:
- Leverage existing tested mixins
- Maintain visual consistency with V1
- Add only new styles for composable features

### Decision 9: File Organization

**Chosen Approach**: Separate files for each component + shared utilities

**Structure**:
```
packages/bpk-component-input/src/BpkInputV2/
├── BpkInputRoot.tsx                # Root component
├── BpkInput.tsx                    # Input component
├── BpkInputAdornment.tsx           # InputAdornment component
├── BpkInputContext.tsx             # Context definition
├── useInputAdornmentAttribution.ts # Attribution hook
├── useGapCalculation.ts            # Gap calculation hook
├── useBorderDetection.ts           # Border detection hook
├── common-types.ts                 # TypeScript types
├── BpkInputV2.module.scss          # Styles
├── index.ts                        # Exports
├── BpkInput-test.tsx               # Unit tests
├── BpkInputGroup-test.tsx          # Composition tests
├── accessibility-test.tsx          # a11y tests
├── form-test.tsx                   # Form integration tests
└── __snapshots__/
```

**Rationale**:
- Clear separation of concerns
- Easy to locate specific functionality
- Follows Backpack conventions

### Decision 10: Export Pattern

**Chosen Approach**: Namespace object for ergonomic API

**Implementation**:
```typescript
// index.ts
import BpkInputRoot from './BpkInputRoot';
import BpkInputComponent from './BpkInput';
import BpkInputAdornmentComponent from './BpkInputAdornment';

const BpkInput = {
  Root: BpkInputRoot,
  Input: BpkInputComponent,
  InputAdornment: BpkInputAdornmentComponent,
};

export default BpkInput;
export { BpkInputRoot, BpkInputComponent as BpkInput, BpkInputAdornmentComponent as BpkInputAdornment };
```

**Usage**:
```typescript
import BpkInput from '@skyscanner/backpack-web/bpk-component-input/BpkInputV2';

<BpkInput.Root gap="0.5rem">
  <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
  <BpkInput.Input id="price" name="price" value="100" />
  <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
</BpkInput.Root>
```

**Rationale**:
- Aligns with spec example syntax
- Clear component hierarchy
- Single import for all sub-components

---

## 7. Key Backpack Patterns to Follow

1. **CSS Modules**: Always use `.module.scss` for component styles
2. **Modern Sass**: Use `@use` syntax, never `@import`
3. **Granular Imports**: Import specific mixins (`@use 'tokens'`, `@use 'forms'`)
4. **Design Tokens**: Use tokens for all values (no magic numbers)
5. **rem Units**: Always use `rem` for sizing, never `px` or `em`
6. **BEM Classes**: Use `bpk-component-name--modifier` pattern
7. **TypeScript**: All code in TypeScript with proper types
8. **Accessibility**: Test with jest-axe, ensure keyboard nav and ARIA
9. **British English**: Prose in British English, code in US English
10. **RTL Support**: Use `@include utils.bpk-rtl` for directional properties

---

## 8. Open Questions Resolved

All research complete. Ready to proceed to Phase 1: API Design and Styling Guide.

**Next Steps**: Generate `api-design.md` and `styling-guide.md` based on these research findings.
