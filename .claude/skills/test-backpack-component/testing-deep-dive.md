# Testing Reference Guide

Detailed reference material for the `/test-backpack-component` skill.

## Test Triad Pattern Details

### 1. Snapshot Tests (`Component-test.tsx`)

#### Basic Structure
```typescript
import { render } from '@testing-library/react';
import BpkComponent, { COMPONENT_TYPES } from './BpkComponent';

describe('BpkComponent', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
```

#### Parameterized Testing
```typescript
// Test all enum variants
Object.keys(COMPONENT_TYPES).forEach((type) => {
  it(`should render correctly with type="${type}"`, () => {
    const { asFragment } = render(
      <BpkComponent type={type as ComponentType} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

// Test all size variants
Object.keys(COMPONENT_SIZES).forEach((size) => {
  it(`should render correctly with size="${size}"`, () => {
    const { asFragment } = render(
      <BpkComponent size={size as ComponentSize} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
```

#### Prop Combinations
```typescript
const propCombinations = [
  { type: 'primary', size: 'small' },
  { type: 'primary', size: 'large' },
  { type: 'secondary', size: 'small' },
  { type: 'secondary', size: 'large' },
];

propCombinations.forEach(({ type, size }) => {
  it(`should render with type="${type}" size="${size}"`, () => {
    const { asFragment } = render(
      <BpkComponent type={type} size={size} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
```

### 2. Accessibility Tests (`accessibility-test.tsx`)

#### Basic jest-axe
```typescript
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import BpkComponent from './BpkComponent';

describe('BpkComponent accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<BpkComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Role Testing
```typescript
it('should have correct ARIA roles', async () => {
  const { container, getByRole } = render(
    <BpkComponent />
  );

  const tablist = getByRole('tablist');
  expect(tablist).toBeInTheDocument();

  const tabs = getByRole('tab', { selected: false });
  expect(tabs).toHaveLength(3);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### Keyboard Interaction
```typescript
it('should be keyboard accessible', async () => {
  const { container, getByRole } = render(
    <BpkComponent />
  );

  const button = getByRole('button');
  button.focus();
  expect(button).toHaveFocus();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### Disabled State
```typescript
it('should have accessible disabled state', async () => {
  const { container, getByRole } = render(
    <BpkComponent disabled />
  );

  const button = getByRole('button');
  expect(button).toBeDisabled();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 3. Theme Tests (`themeAttributes-test.tsx`)

#### Export Verification
```typescript
import themeAttributes from './themeAttributes';

describe('BpkComponent theme attributes', () => {
  it('should export theme attributes', () => {
    expect(themeAttributes).toBeDefined();
    expect(typeof themeAttributes).toBe('object');
  });

  it('should have all required theme attributes', () => {
    expect(themeAttributes).toEqual(
      expect.objectContaining({
        componentPrimaryBackgroundColor: 'bpk-component-primary-background-color',
        componentPrimaryTextColor: 'bpk-component-primary-text-color',
        componentSecondaryBackgroundColor: 'bpk-component-secondary-background-color',
      })
    );
  });

  it('should not have undefined values', () => {
    Object.values(themeAttributes).forEach((value) => {
      expect(value).toBeDefined();
      expect(typeof value).toBe('string');
    });
  });

  it('should follow naming convention', () => {
    Object.values(themeAttributes).forEach((value) => {
      expect(value).toMatch(/^bpk-/);
      expect(value).not.toContain('_');
      expect(value).toMatch(/^[a-z0-9-]+$/);
    });
  });
});
```

## React Testing Library Best Practices

### Query Priority
```typescript
// ✅ 1. getByRole (most accessible)
const button = getByRole('button', { name: /submit/i });

// ✅ 2. getByLabelText (for form fields)
const input = getByLabelText(/password/i);

// ✅ 3. getByPlaceholderText (fallback)
const search = getByPlaceholderText(/search/i);

// ✅ 4. getByText (last resort for non-interactive)
const heading = getByText(/page title/i);

// ❌ Don't use getByTestId except as last resort
```

### User Interactions
```typescript
import { userEvent } from '@testing-library/user-event';

// Click
await userEvent.click(button);

// Type
await userEvent.type(input, 'password123');

// Keyboard
await userEvent.keyboard('{ArrowDown}');

// Tab navigation
await userEvent.tab();
```

### Async Operations
```typescript
// Wait for element
const element = await screen.findByRole('button');

// Wait for condition
await waitFor(() => {
  expect(element).toHaveClass('active');
});
```

## Jest Configuration

### Coverage Thresholds
```javascript
// jest.config.js
{
  "coverageThreshold": {
    "global": {
      "branches": 70,      // Line branches
      "functions": 75,     // Function coverage
      "lines": 75,         // Total lines
      "statements": 75     // Statements
    }
  }
}
```

### Test Pattern
- Files ending with `-test.tsx` or `-test.ts`
- Located in `src/` alongside component

## Running Tests

### Commands
```bash
npm run jest                              # All tests with coverage
npm run jest:watch                        # Watch mode
npm run jest:update                       # Update snapshots (intentional only!)
npm run jest -- --coverage               # Coverage report
npm run jest -- BpkComponent             # Single component
npm run jest -- --testNamePattern="type" # Tests matching pattern
```

### Update Snapshots
Only update when intentional changes are made:
```bash
npm run jest:update
# Review the changes carefully
# Commit the updated snapshots
```

## Common Test Patterns

### Testing Props
```typescript
it('should accept custom className', () => {
  const { container } = render(
    <BpkComponent className="custom-class" />
  );
  expect(container.firstChild).toHaveClass('custom-class');
});
```

### Testing Callbacks
```typescript
it('should call onClick when clicked', async () => {
  const mockClick = jest.fn();
  const { getByRole } = render(
    <BpkComponent onClick={mockClick} />
  );

  await userEvent.click(getByRole('button'));
  expect(mockClick).toHaveBeenCalledTimes(1);
});
```

### Testing Conditional Rendering
```typescript
it('should show content when visible', () => {
  const { queryByText } = render(
    <BpkComponent visible>Content</BpkComponent>
  );
  expect(queryByText('Content')).toBeInTheDocument();
});

it('should hide content when not visible', () => {
  const { queryByText } = render(
    <BpkComponent visible={false}>Content</BpkComponent>
  );
  expect(queryByText('Content')).not.toBeInTheDocument();
});
```

## Coverage Checklist

- [ ] Default rendering
- [ ] All enum variants
- [ ] Boolean props variations
- [ ] Callback functions
- [ ] Custom className
- [ ] Disabled state
- [ ] Edge cases (empty content, etc.)
- [ ] jest-axe passes
- [ ] All ARIA attributes correct
- [ ] Focus management
- [ ] Keyboard interaction
- [ ] Theme attributes exported
- [ ] Type exports correct

## Jest-axe Reference

### Check Violations
```typescript
const results = await axe(container);
expect(results).toHaveNoViolations();
```

### With Rule Configuration
```typescript
const results = await axe(container, {
  rules: {
    'color-contrast': { enabled: false }, // Only if justified
  },
});
```

### Debug Violations
```typescript
const results = await axe(container);
results.violations.forEach((violation) => {
  console.log(`ID: ${violation.id}`);
  console.log(`Description: ${violation.description}`);
  console.log(`Impact: ${violation.impact}`);
  console.log(`Nodes: ${violation.nodes.length}`);
});
```

## Performance Tips

- Use `getByRole` instead of `getByTestId`
- Avoid `waitFor` when `findBy` works
- Mock expensive operations
- Test user behavior, not implementation
- Keep tests focused and isolated
