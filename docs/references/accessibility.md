# Accessibility Reference

> **Load this doc when:** implementing any interactive element (buttons, forms, modals, tooltips),
> working with dynamic content, images, or any component that users will interact with or that
> screen readers will encounter. These rules are mandatory — accessibility is not optional.

---

# Accessibility

These rules are mandatory, not optional.

## Document structure

- Use `BpkSkipLink` as the first focusable element on every page. It lets keyboard users skip past navigation to main content.
- Use exactly one `<h1>` per page. Use heading levels in order (`h1` > `h2` > `h3`). Never skip levels.
- Set `tagName` on `BpkText` to match the document outline, not the visual size. Use `textStyle` for visual sizing separately.

```tsx
// Correct: visual size and semantic level are independent
<BpkText textStyle="heading-3" tagName="h2">Section title</BpkText>

// Wrong: skipping from h1 to h3
<BpkText textStyle="heading-1" tagName="h1">Page</BpkText>
<BpkText textStyle="heading-3" tagName="h3">Section</BpkText> // should be h2
```

## Text alignment

- **Body text**: always left-aligned (start-aligned for RTL). Never center or justify body paragraphs.
- **Headings**: left-aligned by default. Center alignment is acceptable only for hero sections or single-line promotional headings.
- **Labels and form fields**: left-aligned.
- **Short standalone items** (badges, page indicators): center alignment is fine.
- **Numbers and prices**: right-aligned in tables for column scanning. Use `BpkPrice` which handles this.

```tsx
// Correct: left-aligned body text
<BpkText textStyle="body-default" tagName="p">Long paragraph of text...</BpkText>

// Acceptable: centered hero heading
<BpkBox textAlign="center">
  <BpkText textStyle="hero-3" tagName="h1">Explore the world</BpkText>
</BpkBox>

// Wrong: centered body paragraph
<BpkBox textAlign="center">
  <BpkText textStyle="body-default" tagName="p">Long paragraph...</BpkText>
</BpkBox>
```

## Color and contrast

- Never use color alone to convey meaning. Pair with icons, text labels, or patterns.
- Use semantic text color tokens which meet WCAG AA contrast against their intended backgrounds.

### Correct color pairings

| Text color | On surface |
|-----------|-----------|
| `textPrimary` / `textSecondary` | `canvasDay`, `surfaceDefaultDay`, `surfaceLowContrastDay` |
| `textOnDark` / `textPrimaryInverse` | `surfaceContrastDay`, `surfaceHeroDay` |
| `textOnLight` | Light surfaces |
| `textError` | `canvasDay`, `surfaceDefaultDay` |
| `textSuccess` | `canvasDay`, `surfaceDefaultDay` |

- `textSecondary` has reduced contrast — use only for supplementary text, never for primary content.
- Status colors: combine `statusDangerSpotDay` with `statusDangerFillDay` as background, plus an icon and text label.

## Interactive elements

### Buttons
- Every `BpkButton` with only an icon must have `aria-label` describing the action.
- Use `BpkButton type="link"` for links styled as buttons, not `<a>` with button styling.

```tsx
// Icon-only button: aria-label required
<BpkButton type="secondary" iconOnly aria-label="Close dialog">
  <CloseIcon />
</BpkButton>

// Text button: no extra aria needed
<BpkButton type="primary">Search flights</BpkButton>
```

### Forms
- Every form input needs a visible `BpkLabel` or `BpkFieldset`. Never use placeholder text as the only label.
- Use `BpkFieldset` to group label, input, description, and validation together.
- Error states: use `BpkFormValidation` with `valid={false}` and a descriptive error message.

```tsx
// Correct: fieldset with label and validation
<BpkFieldset label="Email address" validationMessage="Enter a valid email">
  <BpkInput value={email} onChange={setEmail} valid={false} />
</BpkFieldset>

// Wrong: placeholder as only label
<BpkInput placeholder="Email" value={email} onChange={setEmail} />
```

### Modals and dialogs
- `BpkModal` and `BpkDialog` trap focus automatically. Always provide a visible close mechanism.
- Label the dialog with `title` prop.
- Return focus to the triggering element when the modal closes.

### Tooltips vs popovers
- `BpkTooltip` content must not contain interactive elements. It shows on hover/focus for supplementary info only.
- Use `BpkPopover` for interactive floating content (links, buttons, forms).

### Dynamic content
- Use `BpkAriaLive` to announce dynamic content changes to screen readers.

```tsx
import BpkAriaLive from '@skyscanner/backpack-web/bpk-component-aria-live';

<BpkAriaLive>
  {searchResults.length} results found
</BpkAriaLive>
```

Announce: search results updating, items added to cart, form submission success/errors, loading state changes.

## Images and media

- Every `BpkImage` needs meaningful `alt` text describing the image content.
- Decorative images (backgrounds, design embellishments) should use `alt=""`.
- `BpkCarousel` provides built-in keyboard navigation. Ensure each slide has descriptive content or alt text.

## Keyboard navigation

- All Backpack interactive components support keyboard navigation out of the box. Do not override `tabIndex` unless you have a specific reason.
- Use `role` attributes only when necessary. Backpack components include correct ARIA roles already.
- Test: every interactive element must be reachable by Tab and activatable by Enter or Space.
- Visible focus indicators come built-in. Do not remove them.

## RTL support

- Use logical spacing props (`marginStart`, `marginEnd`, `paddingStart`, `paddingEnd`) instead of `marginLeft`/`marginRight` for RTL compatibility.
- Layout components handle RTL direction automatically when wrapped in `BpkProvider`.
- Icons that imply direction (arrows, chevrons) should flip in RTL. Backpack handles this for most icons.

## Automated vs manual testing scope

`jest-axe` (automated) catches approximately **30% of accessibility issues** — it validates ARIA attributes, missing labels, invalid heading hierarchy, and basic contrast. The remaining 70% requires manual testing:

- **Keyboard navigation**: Tab order, focus management, Escape to close overlays
- **Screen readers**: VoiceOver (macOS), NVDA (Windows)
- **Zoom testing**: 200% and 400% zoom levels
- **Reduced motion**: `prefers-reduced-motion` media query support

Every component must have an `accessibility-test.tsx` file (separate from the unit test file). See `docs/references/testing.md` for the required file structure.

## Component-specific ARIA patterns

### Interactive components
- **Buttons**: keyboard `Enter`/`Space` activation; icon-only buttons need `aria-label`
- **Modals/Dialogs**: focus trap, `Escape` to close, `aria-modal="true"`, `title` prop required
- **Dropdowns**: `aria-expanded`, `aria-controls`, arrow key navigation
- **Forms**: `aria-describedby` linking inputs to validation messages; `aria-invalid` on error state

### Informational components
- **Decorative icons**: `aria-hidden="true"` when adjacent to visible label text
- **Informative icons**: `aria-label` on the containing interactive element
- **Loading states**: `aria-busy="true"` on the loading region; `BpkAriaLive` for updates
- **Badges/Status**: `role="status"` or `aria-live` region when content updates dynamically

## Checklist

Before shipping, verify:

- [ ] `BpkSkipLink` is the first focusable element
- [ ] Heading hierarchy is sequential (h1 > h2 > h3, no skips)
- [ ] All images have `alt` text (or `alt=""` for decorative)
- [ ] All icon-only buttons have `aria-label`
- [ ] All form inputs have visible labels
- [ ] Body text is left-aligned
- [ ] Color is not the sole indicator of meaning
- [ ] Dynamic content updates are announced with `BpkAriaLive`
- [ ] Tab through the entire page to verify keyboard access
- [ ] Modals return focus on close
