# API Design: Checkbox Card Component

**Phase**: 1
**Date**: 2026-01-27
**Component**: BpkCheckboxCard
**Objective**: Define component API, TypeScript types, and usage patterns

---

## 1. Component Props Interface

```typescript
import type { ChangeEvent, ReactElement, ReactNode } from 'react';

/**
 * Variant types for visual presentation
 */
export const CHECKBOX_CARD_VARIANTS = {
  withBackground: 'with-background',
  noBackground: 'no-background',
} as const;

export type CheckboxCardVariant = (typeof CHECKBOX_CARD_VARIANTS)[keyof typeof CHECKBOX_CARD_VARIANTS];

/**
 * Props for BpkCheckboxCard component
 */
export type BpkCheckboxCardProps = {
  /**
   * Whether the checkbox card is selected
   */
  checked: boolean;

  /**
   * Callback invoked when selection state changes
   * @param checked - New checked state
   * @param event - Change event from input element
   */
  onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Primary text label displayed on the card
   */
  label?: string;

  /**
   * Secondary descriptive text displayed below the label
   */
  description?: string;

  /**
   * Backpack icon component to display
   */
  icon?: ReactElement;

  /**
   * Image URL or React image element to display
   */
  image?: string | ReactElement;

  /**
   * Price information - accepts BpkPrice component or formatted string
   */
  price?: ReactElement | string;

  /**
   * Optional indicator badge or marker to display when selected
   */
  indicator?: ReactElement;

  /**
   * Whether the card is disabled and non-interactive
   * @default false
   */
  disabled?: boolean;

  /**
   * Visual variant for background treatment
   * @default 'with-background'
   */
  variant?: CheckboxCardVariant;

  /**
   * Accessible label for screen readers
   * Required if no label prop provided
   */
  ariaLabel?: string;

  /**
   * Name attribute for grouping checkbox cards in forms
   */
  name?: string;

  /**
   * Value attribute for form submission
   */
  value?: string;

  /**
   * Additional HTML attributes to spread on the input element
   */
  [key: string]: any;
};
```

---

## 2. Usage Examples

### Basic Usage
```typescript
import BpkCheckboxCard from '@skyscanner/backpack-web/bpk-component-checkbox-card';
import { useState } from 'react';

const MyComponent = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="Select this option"
      price="£100"
    />
  );
};
```

### With Icon and Price (Hotels use case)
```typescript
import BpkCheckboxCard from '@skyscanner/backpack-web/bpk-component-checkbox-card';
import { BpkPrice } from '@skyscanner/backpack-web/bpk-component-price';
import { LandmarkIconSm } from '@skyscanner/backpack-web/bpk-component-icon';

const HotelsExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="City Centre"
      icon={<LandmarkIconSm />}
      price={<BpkPrice price="£85" leadingText="avg." />}
    />
  );
};
```

### With Image (Car Hire use case)
```typescript
import BpkCheckboxCard from '@skyscanner/backpack-web/bpk-component-checkbox-card';

const CarHireExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard
      checked={selected}
      onChange={(checked) => setSelected(checked)}
      label="Medium"
      description="5 seats"
      image="/images/medium-car.png"
      price="£60"
    />
  );
};
```

### Multiple Cards (Single Selection Pattern)
```typescript
const SingleSelectionExample = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const options = [
    { id: 'opt1', label: 'Option 1', price: '£100' },
    { id: 'opt2', label: 'Option 2', price: '£85' },
    { id: 'opt3', label: 'Option 3', price: '£122' },
  ];

  return (
    <div>
      {options.map((opt) => (
        <BpkCheckboxCard
          key={opt.id}
          name="hotel-option"
          value={opt.id}
          checked={selectedId === opt.id}
          onChange={() => setSelectedId(opt.id)}
          label={opt.label}
          price={opt.price}
        />
      ))}
    </div>
  );
};
```

### Multiple Cards (Multi-Selection Pattern)
```typescript
const MultiSelectionExample = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const options = [
    { id: 'opt1', label: 'Option 1', price: '£100' },
    { id: 'opt2', label: 'Option 2', price: '£85' },
    { id: 'opt3', label: 'Option 3', price: '£122' },
  ];

  return (
    <div>
      {options.map((opt) => (
        <BpkCheckboxCard
          key={opt.id}
          name={`option-${opt.id}`}
          value={opt.id}
          checked={selected.includes(opt.id)}
          onChange={() => handleChange(opt.id)}
          label={opt.label}
          price={opt.price}
        />
      ))}
    </div>
  );
};
```

### With Variants
```typescript
// With background (default)
<BpkCheckboxCard
  checked={checked}
  onChange={handleChange}
  label="With background"
  variant="with-background"
/>

// No background
<BpkCheckboxCard
  checked={checked}
  onChange={handleChange}
  label="No background"
  variant="no-background"
/>
```

### Disabled State
```typescript
<BpkCheckboxCard
  checked={true}
  onChange={() => {}}
  label="Disabled and selected"
  price="£100"
  disabled={true}
/>
```

### With Accessibility Label
```typescript
<BpkCheckboxCard
  checked={checked}
  onChange={handleChange}
  icon={<HeartIconSm />}
  price="£100"
  ariaLabel="Select this romantic option"
/>
```

---

## 3. Component Structure

### JSX Structure
```typescript
const BpkCheckboxCard = ({
  checked,
  onChange,
  label,
  description,
  icon,
  image,
  price,
  indicator,
  disabled = false,
  variant = CHECKBOX_CARD_VARIANTS.withBackground,
  ariaLabel,
  name,
  value,
  ...rest
}: BpkCheckboxCardProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked, event);
  };

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        className={inputClassNames}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
        aria-checked={checked}
        aria-disabled={disabled}
        {...rest}
      />
      <div className={contentClassNames}>
        {icon && <div className={iconClassNames}>{icon}</div>}
        {image && (
          <div className={imageClassNames}>
            {typeof image === 'string' ? (
              <img src={image} alt="" />
            ) : (
              image
            )}
          </div>
        )}
        <div className={textClassNames}>
          {label && <span className={labelClassNames}>{label}</span>}
          {description && <span className={descriptionClassNames}>{description}</span>}
        </div>
        {price && <div className={priceClassNames}>{price}</div>}
        {checked && indicator && (
          <div className={indicatorClassNames}>{indicator}</div>
        )}
      </div>
    </label>
  );
};
```

---

## 4. TypeScript Type Definitions

### Export Types
```typescript
// index.ts
export type { BpkCheckboxCardProps, CheckboxCardVariant };
export { CHECKBOX_CARD_VARIANTS };
export default BpkCheckboxCard;
```

### Common Types (common-types.ts)
```typescript
import type { ChangeEvent } from 'react';

/**
 * Change handler signature for checkbox card
 */
export type CheckboxCardChangeHandler = (
  checked: boolean,
  event: ChangeEvent<HTMLInputElement>
) => void;

/**
 * Internal state for checkbox card rendering
 */
export type CheckboxCardState = {
  checked: boolean;
  disabled: boolean;
  variant: CheckboxCardVariant;
};
```

---

## 5. Accessibility Implementation

### ARIA Attributes
```typescript
// Input element ARIA attributes
<input
  type="checkbox"
  role="checkbox"
  aria-checked={checked}
  aria-disabled={disabled}
  aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
  aria-invalid={false}  // Could be extended for validation
/>
```

### Keyboard Navigation
- **Tab**: Focus on checkbox card
- **Space/Enter**: Toggle selection
- **Shift+Tab**: Focus previous element

### Focus Management
```scss
.bpk-checkbox-card__input:focus-visible {
  // Focus indicator on card wrapper
  outline: 2px solid tokens.$bpk-core-accent-day;
  outline-offset: 2px;
}
```

### Screen Reader Announcements
- Announced as "checkbox" with current state (checked/unchecked)
- Label text announced when provided
- Disabled state announced when disabled=true
- Price information announced as part of card content

---

## 6. Form Integration

### Native Form Support
```typescript
// Component integrates with HTML forms via native checkbox input
<form onSubmit={handleSubmit}>
  <BpkCheckboxCard
    name="hotel-option"
    value="city-centre"
    checked={checked}
    onChange={handleChange}
    label="City Centre"
  />
  <button type="submit">Submit</button>
</form>

// Form data will include:
// { "hotel-option": "city-centre" } when checked
```

### Controlled vs Uncontrolled
**Controlled (Recommended)**:
```typescript
const [checked, setChecked] = useState(false);

<BpkCheckboxCard
  checked={checked}
  onChange={(newChecked) => setChecked(newChecked)}
  label="Option"
/>
```

**Uncontrolled** (Not recommended for this component):
- Component requires `checked` prop (controlled by parent)
- Follows Backpack pattern for form components

---

## 7. Performance Considerations

### Response Time Target
- Selection state changes must complete in **<100ms**
- Use React's standard state updates (no debouncing needed)
- Avoid expensive computations in onChange handler

### Memoization (if needed)
```typescript
import { memo } from 'react';

const BpkCheckboxCard = memo(({ /* props */ }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison for optimization
  return (
    prevProps.checked === nextProps.checked &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.label === nextProps.label
  );
});
```

---

## 8. Error Handling

### Required Props Validation
```typescript
// TypeScript enforces required props at compile time
// Runtime validation in development (optional)
if (process.env.NODE_ENV === 'development') {
  if (!ariaLabel && !label) {
    console.warn(
      'BpkCheckboxCard: Either "label" or "ariaLabel" prop must be provided for accessibility'
    );
  }
}
```

### Edge Cases
```typescript
// No content provided - render with selection indicator only
if (!label && !description && !icon && !image && !price) {
  return (
    <label className={classNames}>
      <input {...inputProps} />
      <div className="bpk-checkbox-card__empty">
        {/* Selection indicator only */}
      </div>
    </label>
  );
}

// Both disabled and checked - show selected but prevent interaction
if (disabled && checked) {
  // Visual state: selected appearance
  // Interaction: disabled (no click, no keyboard)
  // Implementation: Add both modifiers to className
}
```

---

## 9. Component Variants

### Variant Implementations

**With Background (Default)**:
- Uses `tokens.$bpk-surface-default-day` for background
- Border and shadow for elevation
- Clear distinction from page canvas

**No Background**:
- Transparent or minimal background
- Border-only for card boundary
- Blends with page canvas

### Visual States

All variants support these states:
- **Default**: Unselected, no interaction
- **Hover**: Mouse over unselected card
- **Focus**: Keyboard focus indicator
- **Selected**: Checked state with accent color
- **Selected + Hover**: Combined state
- **Active**: During click interaction
- **Disabled**: Non-interactive, reduced opacity
- **Disabled + Selected**: Selected but non-interactive

---

## 10. Testing Guidance

### Unit Test Coverage
```typescript
// Rendering tests
it('renders with minimal props', () => {});
it('renders with all content types', () => {});
it('renders checked state correctly', () => {});
it('renders disabled state correctly', () => {});
it('renders all variants', () => {});

// Interaction tests
it('calls onChange when clicked', () => {});
it('does not call onChange when disabled', () => {});
it('works with keyboard (Space/Enter)', () => {});

// Edge cases
it('handles missing label with ariaLabel', () => {});
it('handles extremely long text', () => {});
it('handles disabled + checked state', () => {});
```

### Accessibility Test Coverage
```typescript
// jest-axe tests
it('has no accessibility violations in default state', () => {});
it('has no accessibility violations when checked', () => {});
it('has no accessibility violations when disabled', () => {});
it('announces correctly with screen reader', () => {});
it('maintains focus indicator visibility', () => {});
```

---

## References

- **Specification**: `specs/001-checkbox-card/spec.md`
- **Research**: `specs/001-checkbox-card/research.md`
- **Similar Components**: `packages/bpk-component-checkbox/`, `packages/bpk-component-card/`
- **React Utilities**: `packages/bpk-react-utils/`
- **TypeScript Patterns**: Existing Backpack TypeScript components
