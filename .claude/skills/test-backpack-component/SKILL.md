---
name: test-backpack-component
description: Writes comprehensive test coverage including snapshots, accessibility tests, and theme attribute tests
user-invocable: true
allowed-tools: Read, Write, Bash
context: fork
---

# Test Backpack Component

Implements the "test triad" pattern: snapshot tests, jest-axe accessibility tests, and theme attribute tests.

## Test Triad Pattern

Every Backpack component has three test files:

### 1. Unit Tests (`BpkComponent-test.tsx`)
- Snapshot tests for all enum variants
- Behavioral tests for prop combinations
- Integration tests with other features

### 2. Accessibility Tests (`accessibility-test.tsx`)
- jest-axe for WCAG 2.1 compliance
- Role and aria-* attribute verification
- Keyboard interaction tests

### 3. Theme Tests (`themeAttributes-test.tsx`)
- Theme attributes export structure
- Design token availability
- Token naming conventions

## How to Ask

```
Write tests for BpkButton component:
- Test all type variants: primary, secondary, tertiary
- Test all sizes: small, large
- Accessibility: keyboard, focus, ARIA labels
- Theme: button-primary-color, button-secondary-color
- Coverage: 75%+
```

## Pattern 1: Snapshot Tests

```typescript
// src/BpkButton-test.tsx
import { render } from '@testing-library/react';
import BpkButton, { BUTTON_TYPES } from './BpkButton';

describe('BpkButton', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkButton>Click</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  // Parameterized test for all type variants
  Object.keys(BUTTON_TYPES).forEach((buttonType) => {
    it(`should render correctly with type="${buttonType}"`, () => {
      const { asFragment } = render(
        <BpkButton type={buttonType as ButtonType}>Click</BpkButton>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should handle disabled prop', () => {
    const { asFragment } = render(<BpkButton disabled>Click</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });
});
```

## Pattern 2: Accessibility Tests

```typescript
// src/accessibility-test.tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import BpkButton from './BpkButton';

describe('BpkButton accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<BpkButton>Click</BpkButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard accessible', async () => {
    const { container, getByRole } = render(
      <BpkButton onClick={() => {}}>Click</BpkButton>
    );
    const button = getByRole('button');
    expect(button).toHaveFocus() || button.focus();
    expect(button).toBeVisible();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible disabled state', async () => {
    const { container, getByRole } = render(
      <BpkButton disabled>Click</BpkButton>
    );
    const button = getByRole('button');
    expect(button).toBeDisabled();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Pattern 3: Theme Attribute Tests

```typescript
// src/themeAttributes-test.tsx
import themeAttributes from './themeAttributes';

describe('BpkButton theme attributes', () => {
  it('should export theme attributes', () => {
    expect(themeAttributes).toBeDefined();
  });

  it('should export all required theme attributes', () => {
    expect(themeAttributes).toEqual(
      expect.objectContaining({
        buttonPrimaryBackgroundColor: 'bpk-button-primary-background-color',
        buttonPrimaryTextColor: 'bpk-button-primary-text-color',
        buttonSecondaryBackgroundColor: 'bpk-button-secondary-background-color',
        buttonSecondaryTextColor: 'bpk-button-secondary-text-color',
      })
    );
  });

  it('should have consistent naming', () => {
    Object.values(themeAttributes).forEach((value) => {
      expect(value).toMatch(/^bpk-/);
      expect(value).not.toContain('_');
    });
  });
});
```

## Jest Configuration

Located in root `jest.config.js`:
- Test environment: jsdom
- CSS/SVG: stubbed via moduleNameMapper
- Coverage threshold: 75% (branches, functions, lines, statements)
- Test pattern: `**/*-test.tsx`

## Running Tests

```bash
npm run jest                    # All tests with coverage
npm run jest:watch             # Watch mode
npm run jest:update            # Update snapshots
npm run jest -- BpkButton      # Single component
npm run jest -- --coverage     # Coverage report
```

## Key Patterns

### Parameterized Tests Over Enums
```typescript
Object.keys(COMPONENT_TYPES).forEach((type) => {
  it(`should render with type="${type}"`, () => {
    const { asFragment } = render(
      <BpkComponent type={type as ComponentType} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
```

### React Testing Library Best Practices
```typescript
// ✅ Query by role (most accessible)
const button = getByRole('button', { name: /submit/i });

// ✅ Query by label text
const input = getByLabelText(/password/i);

// ✅ Test user behavior, not implementation
userEvent.click(button);
userEvent.type(input, 'password123');

// ❌ Don't shallow render or dive
// ❌ Don't test component state directly
```

### jest-axe Best Practices
```typescript
// Check for violations
const results = await axe(container);
expect(results).toHaveNoViolations();

// Exclude specific rules if justified
const results = await axe(container, {
  rules: {
    'color-contrast': { enabled: false }, // Only if documented
  },
});
```

## Test Coverage Checklist

✅ **Component Tests:**
- [ ] Default rendering
- [ ] All enum variants (parameterized)
- [ ] All boolean props
- [ ] All callback props
- [ ] Disabled state
- [ ] Custom className prop

✅ **Accessibility Tests:**
- [ ] No jest-axe violations
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] ARIA attributes
- [ ] Screen reader support

✅ **Theme Tests:**
- [ ] All theme attributes exported
- [ ] Naming conventions correct
- [ ] No undefined values
- [ ] Consistent prefixes

## Reference

For detailed testing guide: [component-testing-guide.md](./component-testing-guide.md)

jest-axe docs: https://github.com/nickcolley/jest-axe
React Testing Library: https://testing-library.com/

## Key Rules

✅ **DO:**
- Use React Testing Library
- Test user behavior, not implementation
- Parameterize tests over enums
- Include jest-axe for accessibility
- Test all prop combinations
- Keep snapshots focused
- Update snapshots intentionally

❌ **DON'T:**
- Use shallow render or dive
- Test component internals
- Skip accessibility tests
- Use element selectors
- Mock external dependencies
- Create flaky async tests
- Update snapshots unintentionally
