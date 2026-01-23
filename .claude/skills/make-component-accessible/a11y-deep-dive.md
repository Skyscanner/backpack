# Accessibility Implementation Guide

Detailed reference material for the `/make-component-accessible` skill.

## Semantic HTML Reference

### Form Elements
```typescript
// ✅ Correct - Native <input>
<input type="email" />
<input type="checkbox" />
<input type="radio" />

// ❌ Wrong - div pretending to be input
<div role="textbox" contentEditable="true" />
```

### Navigation
```typescript
// ✅ Correct - <nav> for main navigation
<nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>

// ❌ Wrong - div with styled links
<div className="nav">
  <span onClick={() => navigate('/')}>Home</span>
</div>
```

### Headings
```typescript
// ✅ Correct - Proper hierarchy
<h1>Page Title</h1>
<section>
  <h2>Section Title</h2>
  <h3>Subsection</h3>
</section>

// ❌ Wrong - Skipped levels
<h1>Page Title</h1>
<h3>Section (skipped h2)</h3>
```

### Links vs Buttons
```typescript
// ✅ Link - navigates
<a href="/page">Go to page</a>

// ✅ Button - performs action
<button onClick={handleAction}>Perform action</button>

// ❌ Wrong - button for navigation
<button onClick={() => navigate('/page')}>Go to page</button>

// ❌ Wrong - link for action
<a href="#" onClick={handleAction}>Perform action</a>
```

## ARIA Attributes

### aria-label (Accessible Name)
```typescript
// For icon-only buttons
<button aria-label="Close dialog">
  <IconClose />
</button>

// For search input
<input
  type="search"
  aria-label="Search products"
  placeholder="Search..."
/>
```

### aria-labelledby (Label by Element)
```typescript
<div>
  <h2 id="dialog-title">Confirm Action</h2>
  <div role="dialog" aria-labelledby="dialog-title">
    Are you sure?
  </div>
</div>
```

### aria-describedby (Description)
```typescript
<input
  id="password"
  type="password"
  aria-describedby="pwd-hint"
/>
<p id="pwd-hint">
  Password must be at least 12 characters
</p>
```

### aria-expanded (Collapsible)
```typescript
const [isOpen, setIsOpen] = useState(false);

<button
  aria-expanded={isOpen}
  aria-controls="content"
  onClick={() => setIsOpen(!isOpen)}
>
  Toggle Menu
</button>

{isOpen && <div id="content">Menu content</div>}
```

### aria-selected (Tabs/Lists)
```typescript
<div role="tablist">
  <button
    role="tab"
    aria-selected={activeTab === 0}
    aria-controls="panel-0"
  >
    Tab 1
  </button>
  <button
    role="tab"
    aria-selected={activeTab === 1}
    aria-controls="panel-1"
  >
    Tab 2
  </button>
</div>

<div role="tabpanel" id="panel-0" hidden={activeTab !== 0}>
  Content 1
</div>
```

### aria-live (Dynamic Content)
```typescript
// Polite - announcements after user finishes
<div role="status" aria-live="polite">
  {successMessage}
</div>

// Assertive - urgent announcements
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### aria-modal (Dialogs)
```typescript
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Dialog Title</h2>
  Content
</div>
```

## Keyboard Navigation

### Focus Management
```typescript
const ref = useRef<HTMLButtonElement>(null);

// Focus element programmatically
const handleFocus = () => {
  ref.current?.focus();
};

return <button ref={ref}>Click me</button>;
```

### Arrow Key Navigation
```typescript
const [activeIndex, setActiveIndex] = useState(0);

const handleKeyDown = (e: React.KeyboardEvent) => {
  const total = items.length;

  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      setActiveIndex((activeIndex - 1 + total) % total);
      break;

    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      setActiveIndex((activeIndex + 1) % total);
      break;

    case 'Home':
      e.preventDefault();
      setActiveIndex(0);
      break;

    case 'End':
      e.preventDefault();
      setActiveIndex(total - 1);
      break;
  }
};
```

### Escape Key (Modal/Popover)
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

### Tab Trap (Modal)
```typescript
const modalRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    const activeElement = document.activeElement as HTMLElement;

    if (e.shiftKey && activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);

return <div ref={modalRef}>{children}</div>;
```

## Focus Indicators

### CSS
```scss
// src/BpkComponent.module.scss

.bpk-component {
  // Show outline on keyboard focus
  &:focus-visible {
    outline: 2px solid var(--bpk-focus-color);
    outline-offset: 2px;
  }

  // Remove outline for mouse users
  &:focus:not(:focus-visible) {
    outline: none;
  }
}
```

### Using Mixin
```scss
@use '../../bpk-mixins/focus';

.bpk-component {
  @include focus.bpk-focusable;
}
```

## Color Contrast

### Contrast Ratios
- **4.5:1** - Normal text (7 or larger pt)
- **3:1** - Large text (18pt+ or 14pt+ bold)
- **3:1** - UI components

### Common Mistakes
```scss
// ❌ Bad contrast
.text {
  color: #aaa;      // Too light on white
  background: #fff;
}

// ✅ Good contrast
.text {
  color: var(--bpk-text-primary);  // Guaranteed good contrast
  background: var(--bpk-surface-default);
}
```

## Motion and Animation

### Respects prefers-reduced-motion
```typescript
// CSS
@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: none;
    transition: none;
  }
}

// JavaScript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Apply animations
}
```

## WCAG 2.1 Level AA Checklist

| Criterion | Implementation |
|-----------|-----------------|
| **1.4.3 Contrast** | 4.5:1 minimum for normal text |
| **2.1.1 Keyboard** | All functionality available via keyboard |
| **2.1.2 No Keyboard Trap** | Can move focus away from component |
| **2.4.3 Focus Order** | Focus order is logical and meaningful |
| **2.4.7 Focus Visible** | Visual focus indicator present |
| **3.2.1 On Focus** | No unexpected context changes |
| **3.3.1 Error Identification** | Errors identified and described |
| **3.3.4 Error Prevention** | Actions are reversible or confirmed |
| **4.1.2 Name, Role, Value** | Accessible name, role, and state provided |
| **4.1.3 Status Messages** | Status messages announced to screen readers |

## Testing Accessibility

### jest-axe
```typescript
import { axe } from 'jest-axe';

it('should be accessible', async () => {
  const { container } = render(<BpkComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing
1. **Keyboard Navigation**: Tab through all interactive elements
2. **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
3. **Color Contrast**: Use WebAIM Contrast Checker
4. **Focus Indicators**: Ensure visible on all interactive elements
5. **Motion**: Test with prefers-reduced-motion enabled

## Common Components

### Tabs
```typescript
<div role="tablist">
  {tabs.map((tab, index) => (
    <button
      key={index}
      role="tab"
      aria-selected={activeTab === index}
      aria-controls={`panel-${index}`}
      onClick={() => setActiveTab(index)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          setActiveTab((activeTab + 1) % tabs.length);
        } else if (e.key === 'ArrowLeft') {
          setActiveTab((activeTab - 1 + tabs.length) % tabs.length);
        }
      }}
    >
      {tab}
    </button>
  ))}
</div>

{tabs.map((tab, index) => (
  <div
    key={index}
    role="tabpanel"
    id={`panel-${index}`}
    hidden={activeTab !== index}
  >
    Content for {tab}
  </div>
))}
```

### Dialog/Modal
```typescript
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Description of dialog</p>
  <button onClick={onClose}>Close</button>
</div>
```
