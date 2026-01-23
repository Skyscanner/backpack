---
name: make-component-accessible
description: Ensures components meet WCAG 2.1 Level AA accessibility requirements with semantic HTML, ARIA, and keyboard navigation
user-invocable: true
allowed-tools: Read, Write, Bash
---

# Make Component Accessible

Ensures components meet WCAG 2.1 Level AA accessibility requirements through semantic HTML, ARIA attributes, keyboard navigation, and automated testing.

## Accessibility Checklist

### Semantic HTML
- [ ] Use native HTML elements (button, input, nav, etc.)
- [ ] Use semantic roles (role="tablist", role="dialog", etc.)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Links vs buttons (href → link, onClick → button)

### ARIA Attributes
- [ ] aria-label for icon-only buttons
- [ ] aria-expanded for collapsible sections
- [ ] aria-selected for tabs/selections
- [ ] aria-controls linking buttons to content
- [ ] aria-describedby for descriptions
- [ ] aria-live for dynamic content

### Keyboard Navigation
- [ ] Tab order makes sense
- [ ] Visible focus indicators
- [ ] Escape to close modals/popovers
- [ ] Arrow keys for complex components
- [ ] Enter/Space to activate

### Visual Design
- [ ] Color contrast ≥ 4.5:1 (normal text)
- [ ] Color contrast ≥ 3:1 (large text)
- [ ] Not relying on color alone
- [ ] Visible focus indicators (2px outline)
- [ ] No animations without prefers-reduced-motion

## How to Ask

```
Make BpkTabs accessible:
- Semantic HTML with role="tablist", role="tab"
- ARIA: aria-selected, aria-controls
- Keyboard: arrow keys to navigate, enter to select
- jest-axe tests for WCAG compliance
- Focus indicators for keyboard users
```

## Semantic HTML Patterns

### Tabs
```typescript
// ✅ Correct
<div role="tablist">
  <button role="tab" aria-selected={true} aria-controls="panel-1">
    Tab 1
  </button>
</div>
<div role="tabpanel" id="panel-1">
  Content
</div>

// ❌ Wrong
<div className="tabs">
  <div className="tab" onClick={...}>Tab 1</div>
</div>
```

### Dialog/Modal
```typescript
// ✅ Correct
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Modal Title</h2>
  <p>Content</p>
</div>

// ❌ Wrong
<div className="modal">
  <h2>Modal Title</h2>
</div>
```

### Buttons
```typescript
// ✅ Correct - Icon button with label
<button aria-label="Close dialog">
  <IconClose />
</button>

// ✅ Correct - Button with text
<button>Click me</button>

// ❌ Wrong - No accessible name
<button>
  <IconClose />
</button>
```

### Form Inputs
```typescript
// ✅ Correct - Linked label
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// ❌ Wrong - Not linked
<label>Email address</label>
<input type="email" />
```

## ARIA Patterns

### aria-selected (Tabs, Lists)
```typescript
<button
  role="tab"
  aria-selected={isActive}
  aria-controls={`panel-${id}`}
>
  Tab Label
</button>
```

### aria-expanded (Collapsible)
```typescript
<button
  aria-expanded={isOpen}
  aria-controls="content-id"
>
  Toggle
</button>
```

### aria-label (Icon buttons)
```typescript
<button aria-label="Open menu">
  <IconMenu />
</button>
```

### aria-live (Dynamic content)
```typescript
<div role="status" aria-live="polite">
  Item saved successfully
</div>

<div role="alert" aria-live="assertive">
  Error: Please fix the issues
</div>
```

## Keyboard Navigation

### Arrow Keys
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      focusPreviousTab();
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      focusNextTab();
      break;
    case 'Home':
      e.preventDefault();
      focusFirstTab();
      break;
    case 'End':
      e.preventDefault();
      focusLastTab();
      break;
  }
};
```

### Focus Management
```typescript
const ref = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (shouldFocus) {
    ref.current?.focus();
  }
}, [shouldFocus]);

return <button ref={ref}>Click</button>;
```

### Tab Trapping (Modal)
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [onClose]);
```

## Focus Indicators

### SCSS
```scss
// src/BpkComponent.module.scss
.bpk-component {
  &:focus-visible {
    outline: 2px solid var(--bpk-focus-color);
    outline-offset: 2px;
  }

  // Remove outline for mouse users
  &:focus:not(:focus-visible) {
    outline: none;
  }
}

// Or use Backpack mixin
@use '../../bpk-mixins/focus';

.bpk-component {
  @include focus.bpk-focusable;
}
```

## jest-axe Testing

### Basic Test
```typescript
import { axe } from 'jest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(<BpkComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### With Specific Rules
```typescript
const results = await axe(container, {
  rules: {
    'color-contrast': { enabled: false }, // Only if documented
  },
});

expect(results).toHaveNoViolations();
```

### Checking Specific Violations
```typescript
const results = await axe(container);

results.violations.forEach((violation) => {
  console.log(`${violation.id}: ${violation.description}`);
  console.log(`Impact: ${violation.impact}`);
});

expect(results.violations).toHaveLength(0);
```

## WCAG 2.1 Level AA Checklist

✅ **1.4.3 Contrast (Minimum)**
- Normal text: 4.5:1
- Large text (18pt+): 3:1

✅ **2.1.1 Keyboard**
- All functionality available via keyboard
- No keyboard trap

✅ **2.1.2 No Keyboard Trap**
- Focus can move away using keyboard

✅ **2.4.3 Focus Order**
- Focus order is logical

✅ **2.4.7 Focus Visible**
- Keyboard focus indicator visible

✅ **3.2.1 On Focus**
- No unexpected context change

✅ **3.3.1 Error Identification**
- Errors identified and described

✅ **3.3.4 Error Prevention**
- Reversible or confirmed actions

## Reference

For detailed accessibility guide: [accessibility-guide.md](./accessibility-guide.md)

WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
jest-axe: https://github.com/nickcolley/jest-axe
ARIA APG: https://www.w3.org/WAI/ARIA/apg/

## Tools

```bash
# Test accessibility
npm run jest accessibility-test

# View violations in Storybook
npm start              # Open story
                      # Click "Accessibility" tab
                      # Review violations

# Manual testing
# - NVDA (free screen reader on Windows)
# - VoiceOver (Mac/iOS built-in)
# - JAWS (commercial, Windows)
```

## Key Rules

✅ **DO:**
- Use semantic HTML elements
- Add ARIA for meaning
- Test with jest-axe
- Keyboard navigation
- Visible focus indicators
- Color contrast 4.5:1+
- Support prefers-reduced-motion

❌ **DON'T:**
- Skip ARIA
- Use div/span for buttons
- Rely on color alone
- Hide focus indicators
- Create keyboard traps
- Use autofocus unnecessarily
- Break tab order
