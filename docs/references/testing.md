# Testing Reference

> **Load this doc when:** writing or modifying any test file — unit tests, accessibility tests,
> or snapshot tests. This covers React Testing Library patterns, jest-axe usage, the mandatory
> `accessibility-test.tsx` file structure, and CSS module mocking.

---

# Testing patterns

## Dependencies

- `jest` (v30)
- `@testing-library/react`
- `@testing-library/user-event`
- `jest-axe`

## File naming

| File | Naming convention | Example |
|------|-------------------|---------|
| Unit tests | `BpkComponent-test.tsx` (hyphen) | `BpkButton-test.tsx` |
| Accessibility tests | `accessibility-test.tsx` (fixed name) | `accessibility-test.tsx` |

**Note:** Test files use a hyphen before `test`, not a dot. This is the established repo convention.

## Unit test structure

```tsx
import { render, screen } from '@testing-library/react';
import BpkButton from './BpkButton';

it('should render correctly', () => {
  render(<BpkButton>Click me</BpkButton>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

## Testing props

```tsx
it('should apply size prop', () => {
  const { container } = render(<BpkButton size="large">Large</BpkButton>);
  expect(container.firstChild).toHaveClass('bpk-button--large');
});

it('should pass rest props', () => {
  render(<BpkButton data-testid="my-button">Test</BpkButton>);
  expect(screen.getByTestId('my-button')).toBeInTheDocument();
});
```

## User interactions

```tsx
import userEvent from '@testing-library/user-event';

it('should call onClick', async () => {
  const onClick = jest.fn();
  render(<BpkButton onClick={onClick}>Click</BpkButton>);
  await userEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('should not call onClick when disabled', async () => {
  const onClick = jest.fn();
  render(<BpkButton disabled onClick={onClick}>Click</BpkButton>);
  await userEvent.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
});
```

## Accessibility testing (jest-axe) — mandatory

Every component **must** have a separate `accessibility-test.tsx` file. This is not optional.

```tsx
// accessibility-test.tsx (separate file — not inside the unit test file)
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import BpkButton from './BpkButton';

describe('BpkButton accessibility tests', () => {
  it('should not have programmatically detectable accessibility issues', async () => {
    const { container } = render(<BpkButton>Accessible</BpkButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

Automated axe tests catch approximately 30% of accessibility issues. Manual testing (keyboard nav, screen reader, zoom) is required to cover the rest — see `docs/references/accessibility.md`.

## Testing variants with it.each

```tsx
it.each(['primary', 'secondary', 'destructive'])('should render %s variant', (variant) => {
  const { container } = render(<BpkButton type={variant}>Test</BpkButton>);
  expect(container.firstChild).toHaveClass(`bpk-button--${variant}`);
});
```

## CSS module handling

Jest is configured with a style stub (`scripts/stubs/styleStub.js`) that proxies CSS module class names. Prefer role-based or semantic queries over class name assertions where possible.

## Query priority (prefer top to bottom)

```tsx
// Preferred — accessible queries
screen.getByRole('button')
screen.getByRole('link')
screen.getByRole('textbox')
screen.getByLabelText('Email')
screen.getByText('Submit')

// Fallback
screen.getByTestId('my-component')
container.querySelector('.bpk-component')
```

## What Backpack does not use

- No Enzyme
- No class component tests
- Avoid snapshots — prefer explicit assertions
