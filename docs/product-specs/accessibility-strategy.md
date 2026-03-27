# Accessibility Strategy

## Standard

Backpack targets **WCAG 2.2 Level AA** compliance across all components.

## Testing Approach

### Automated Testing (jest-axe)
Every component has an `accessibility-test.tsx` file that runs axe-core rules:

```typescript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

it('should not have programmatically detectable accessibility issues', async () => {
  const { container } = render(<BpkComponent>Content</BpkComponent>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

This catches:
- Missing ARIA labels
- Invalid ARIA attributes
- Color contrast issues (computed)
- Missing form labels
- Invalid heading hierarchy

See `decisions/accessibility-tests.md` for the decision rationale.

### Manual Testing Requirements
Automated tests catch ~30% of accessibility issues. The remaining coverage requires:
- **Keyboard navigation**: Tab order, focus management, escape to close
- **Screen reader testing**: VoiceOver (macOS), NVDA (Windows)
- **Zoom testing**: 200% and 400% zoom levels
- **Reduced motion**: `prefers-reduced-motion` media query support

## Accessibility Definition of Done

From [CONTRIBUTING.md](../../CONTRIBUTING.md):
- [ ] Component renders valid semantic HTML
- [ ] All interactive elements are keyboard accessible
- [ ] Focus management is correct (modals, dialogs, drawers)
- [ ] ARIA attributes are present and valid
- [ ] Color contrast meets AA ratios
- [ ] `accessibility-test.tsx` passes
- [ ] Screen reader announcement is meaningful

## Component-Specific Patterns

### Interactive Components
- Buttons: `role="button"`, keyboard `Enter`/`Space` activation
- Modals/Dialogs: Focus trap, `Escape` to close, `aria-modal="true"`
- Dropdowns: `aria-expanded`, `aria-controls`, arrow key navigation
- Forms: `aria-describedby` for validation messages, `aria-invalid` for errors

### Informational Components
- Icons: Decorative (`aria-hidden="true"`) or informative (`aria-label`)
- Loading states: `aria-busy="true"`, `aria-live="polite"` for updates
- Badges/Status: `role="status"` or `aria-live` regions

## Resources

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [jest-axe documentation](https://github.com/nickcolley/jest-axe)
- [Backpack a11y decision](../../decisions/accessibility-tests.md)
