# BpkButton — Component Specification

> Platform-agnostic spec. Implementable in any framework (React, SwiftUI, Kotlin Compose, Vue, Flutter, etc.)

---

## 1. Purpose

A button component for triggering actions or navigating. Can behave as an action trigger (button) or a navigation element (link) depending on configuration.

---

## 2. Anatomy

```
┌─────────────────────────────────────────────────┐
│  [Leading Icon]   Label Text   [Trailing Icon]  │
└─────────────────────────────────────────────────┘
```

| Slot | Required | Description |
|------|----------|-------------|
| **Label** | Yes (text or icon) | Primary content. String or child content. |
| **Leading Icon** | No | Icon before the label. Hidden in icon-only mode. |
| **Trailing Icon** | No | Icon after the label. Hidden in icon-only mode. |

In **icon-only mode**, the label slot contains a single icon with no icon wrappers — the icon IS the content.

---

## 3. API (Framework-Agnostic)

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | String or Content | *required* | Button content (text, icon, or mixed) |
| `variant` | Enum (see below) | `primary` | Visual style variant |
| `size` | `small` \| `large` | `small` | Button size |
| `disabled` | Boolean | `false` | Disables interaction and applies disabled styling |
| `loading` | Boolean | `false` | Shows spinner, disables interaction, preserves layout |
| `fullWidth` | Boolean | `false` | Stretches to fill container width |
| `iconOnly` | Boolean | `false` | Renders as a square button with icon content only |
| `implicit` | Boolean | `false` | Link variant underline behavior (see Link Variants) |
| `href` | String? | `null` | When set (and not disabled), renders as navigation element |
| `openInNewWindow` | Boolean | `false` | Opens href in new window/tab |
| `leadingIcon` | Icon? | `null` | Icon placed before label |
| `trailingIcon` | Icon? | `null` | Icon placed after label |
| `accessibilityLabel` | String? | `null` | Required for `iconOnly` buttons. Screen reader label. |
| `onPress` / `onClick` | Callback | no-op | Action callback |

### Variants

| Variant | Background | Foreground | Use Case |
|---------|-----------|------------|----------|
| `primary` | Brand primary color | White/on-dark text | Primary CTA |
| `primaryOnDark` | Light surface | Dark text | Primary CTA on dark backgrounds |
| `primaryOnLight` | Dark surface | Light text | Primary CTA on light backgrounds |
| `secondary` | Subtle/muted fill | Primary text | Secondary actions |
| `secondaryOnDark` | Semi-transparent light | Light text | Secondary on dark backgrounds |
| `destructive` | Subtle fill (inherits secondary base) | Destructive red foreground | Delete, remove actions |
| `featured` | Accent/feature color | White/inverse text | Promotional CTAs |
| `link` | Transparent | Link-colored text with underline | Inline text-level actions |
| `linkOnDark` | Transparent | Light link text with underline | Link on dark backgrounds |

---

## 4. Visual States

Every variant must define appearance for all 6 states:

| State | Trigger | Visual Change |
|-------|---------|---------------|
| **Default** | None | Base variant colors |
| **Hover** | Cursor hover (pointer devices only) | Background darkens/shifts, may change text color |
| **Active / Pressed** | Touch down or mouse down | Further background shift |
| **Focused** | Keyboard focus | Focus ring (platform-appropriate) |
| **Disabled** | `disabled=true` | 50% opacity, no interaction, cursor indicates non-interactive |
| **Loading** | `loading=true` | Spinner overlaid, content invisible but layout preserved, uses hover/pressed background color |

### State Priority

`loading` implies `disabled`. Both block all interaction. Loading takes visual precedence (shows spinner + pressed colors rather than disabled opacity).

---

## 5. Sizing

### Small (Default)

| Property | Value | Token |
|----------|-------|-------|
| Typography | Label 2 (small label style) | `bpk-label-2` |
| Horizontal padding | 16px (1rem) | `bpk-spacing-base` |
| Vertical padding | 8px (0.5rem) | `bpk-spacing-sm` |
| Border radius | Button radius | `bpk-button-border-radius` |
| Min height | Determined by padding + typography | — |

### Large

| Property | Value | Token |
|----------|-------|-------|
| Typography | Label 1 (larger label style) | `bpk-label-1` |
| Horizontal padding | Larger than small | Variant-specific |
| Vertical padding | Larger than small | Variant-specific |
| Border radius | Same as small | `bpk-button-border-radius` |

### Icon Only

Square button — equal width and height. Padding adjusted so the icon fills the square. No text padding.

- `iconOnly` + `small`: Small square
- `iconOnly` + `large`: Large square

### Full Width

Stretches to 100% of container width. Content centered.

---

## 6. Icon Handling

### With Label (iconOnly = false)

When `leadingIcon` or `trailingIcon` is set:
- Layout switches to horizontal flex with centered alignment
- Gap between icon and label: **20px (1.25rem)** (`bpk-spacing-md`)
- Icons are non-shrinkable (flex-shrink: 0)
- Icons do not receive underline decoration
- Icons inherit the current text color (`currentColor` fill)

When `fullWidth` + icons: centered with flex justify-content: center.

### Icon Only Mode (iconOnly = true)

- Icon wrappers are NOT rendered — icon is the direct content
- Button rendered as a square
- `accessibilityLabel` is **required** (no visible text for screen readers)
- Link-type underlines suppressed

---

## 7. Loading State

Loading replaces visible content with a spinner while preserving the button's dimensions.

### Behavior

1. Button becomes non-interactive (disabled)
2. Original content is **hidden but still in layout** (invisible, not removed) to prevent size changes
3. Spinner centered on top of the hidden content
4. Spinner is decorative (hidden from assistive technology)
5. Button announces as "busy" to assistive technology
6. Navigation behavior suppressed (even if href is set)
7. Link underlines suppressed

### Spinner Color

The spinner must contrast against the button's **loading/pressed background**:

| Variant | Spinner Style |
|---------|--------------|
| `primary`, `primaryOnLight`, `featured` | Light spinner (white) |
| `secondary`, `destructive`, `link`, `primaryOnDark` | Dark spinner |
| `secondaryOnDark`, `linkOnDark` | Light spinner |

### Spinner Size

- `small` button → small spinner
- `large` button → large spinner

---

## 8. Link Variants (link, linkOnDark)

Link variants look like text links, not like typical buttons.

### Visual Differences from Standard Buttons

- Transparent background (no fill)
- Only vertical padding (no horizontal)
- Text-colored foreground with underline decoration
- Inline display (not inline-flex) unless icons are present

### Underline Behavior

Underlines use an animated technique (not text-decoration). On platforms without CSS, use the platform's native link underline.

| Mode | Default State | Hover State |
|------|--------------|-------------|
| **Standard** (`implicit=false`) | Underline visible | Underline hides |
| **Implicit** (`implicit=true`) | Underline hidden | Underline appears |

Underlines are **suppressed** when:
- `iconOnly` is true
- Button is disabled or loading

### linkOnDark

Same as `link` but with alternate colors for dark backgrounds. When combined with `implicit`, uses the alternate-implicit style.

---

## 9. Navigation Behavior (href)

When `href` is provided and the button is NOT disabled/loading:

- Renders as a navigation element (anchor, link, or platform equivalent)
- Tapping/clicking navigates to the URL
- `onPress`/`onClick` still fires before navigation

When `openInNewWindow` is true:
- Opens in new tab/window
- On web: applies `rel="noopener noreferrer"` by default for security
- Custom `rel` can override the default

**Key rule**: When disabled or loading, navigation is suppressed and the component behaves as a standard disabled button regardless of href.

---

## 10. Disabled Behavior

| Property | Value |
|----------|-------|
| Opacity | 50% |
| Interaction | None (no tap, no hover, no focus) |
| Cursor (web) | `not-allowed` |
| Navigation | Suppressed (even if href is set) |
| Pointer events (web) | None |

---

## 11. Color Specification Per Variant

### primary

| State | Background Token | Foreground Token |
|-------|-----------------|-----------------|
| Default | `bpk-private-button-primary-normal-background-day` | `bpk-text-on-dark-day` |
| Hover/Loading | `bpk-private-button-primary-pressed-background-day` | `bpk-text-on-dark-day` |
| Active | `bpk-private-button-primary-pressed-background-day` | `bpk-text-on-dark-day` |

### primaryOnDark

| State | Background Token | Foreground Token |
|-------|-----------------|-----------------|
| Default | `bpk-private-button-primary-on-dark-normal-background-day` | `bpk-text-on-light-day` |
| Hover/Loading | `bpk-private-button-primary-on-dark-pressed-background-day` | `bpk-text-on-light-day` |
| Active | `bpk-private-button-primary-on-dark-pressed-background-day` | `bpk-text-on-light-day` |

### primaryOnLight

| State | Background Token | Foreground Token |
|-------|-----------------|-----------------|
| Default | `bpk-private-button-primary-on-light-normal-background-day` | `bpk-text-on-dark-night` |
| Hover/Loading | `bpk-private-button-primary-on-light-pressed-background-day` | `bpk-text-on-dark-night` |
| Active | `bpk-private-button-primary-on-light-pressed-background-day` | `bpk-text-on-dark-night` |

### secondary

| State | Background Token | Foreground Token |
|-------|-----------------|-----------------|
| Default | `bpk-private-button-secondary-normal-background-day` | `bpk-text-primary-day` |
| Hover/Loading | `bpk-private-button-secondary-pressed-background-day` | `bpk-text-primary-day` |
| Active | `bpk-private-button-secondary-pressed-background-day` | `bpk-text-primary-day` |

### secondaryOnDark

| State | Background Token | Foreground Token |
|-------|-----------------|-----------------|
| Default | `bpk-private-button-secondary-on-dark-normal-background-day` | `bpk-text-on-dark-day` |
| Hover/Loading | `bpk-private-button-secondary-on-dark-pressed-background-day` | `bpk-text-on-dark-day` |
| Active | `bpk-private-button-secondary-on-dark-pressed-background-day` | `bpk-text-on-dark-day` |

### destructive

Inherits the **secondary** button's base appearance, then overrides colors:

| State | Background Token | Foreground Token |
|-------|-----------------|-----------------|
| Default | `bpk-private-button-destructive-normal-background-day` | `bpk-private-button-destructive-normal-foreground-day` |
| Hover/Loading | `bpk-private-button-destructive-pressed-background-day` | `bpk-text-primary-inverse-day` |
| Active | `bpk-private-button-destructive-pressed-background-day` | `bpk-text-primary-inverse-day` |

### featured

| State | Background Token | Foreground Token |
|-------|-----------------|-----------------|
| Default | `bpk-private-button-featured-normal-background-day` | `bpk-text-primary-inverse-day` |
| Hover/Loading | `bpk-private-button-featured-pressed-background-day` | `bpk-text-primary-inverse-day` |
| Active | `bpk-private-button-featured-pressed-background-day` | `bpk-text-primary-inverse-day` |

### link

| State | Foreground Token | Notes |
|-------|-----------------|-------|
| Default | Platform link color | No background |
| Hover | Platform link pressed color | Underline animates |
| Active | Platform link pressed color | — |
| Disabled | `bpk-text-disabled-day` | No underline |
| Loading | `bpk-text-primary-day` | — |

### linkOnDark

| State | Foreground Token | Notes |
|-------|-----------------|-------|
| Default | `bpk-private-button-link-on-dark-normal-foreground-day` | No background |
| Hover | `bpk-private-button-link-on-dark-pressed-foreground-day` | Underline animates |
| Active | `bpk-private-button-link-on-dark-pressed-foreground-day` | — |
| Disabled | `bpk-private-button-link-on-dark-disabled-foreground-day` | No underline |

---

## 12. Theming

Each variant exposes overridable color properties. On web these are CSS custom properties; on native platforms, use the theme system's equivalent.

Pattern per variant:
```
{variant}-text-color
{variant}-background-color
{variant}-hover-text-color
{variant}-hover-background-color
{variant}-active-text-color
{variant}-active-background-color
```

Implementations should fall back to the design tokens listed in Section 11 when no theme override is provided.

---

## 13. Accessibility

| Requirement | Details |
|-------------|---------|
| **Role** | Button role by default. Link/navigation role when href is active. |
| **Label** | Text content serves as accessible label. `iconOnly` requires explicit `accessibilityLabel`. |
| **Busy state** | Announce as "busy" when loading (e.g., `aria-busy` on web, accessibility trait on native). |
| **Disabled state** | Announce as disabled/dimmed. Block all interaction. |
| **Spinner** | Decorative only — hidden from assistive technology. |
| **Focus** | Must be keyboard/switch-control focusable when not disabled. Platform-appropriate focus indicator. |
| **Touch target** | Minimum 44x44pt touch target (WCAG 2.2 AA). |
| **New window** | When `openInNewWindow=true`, indicate to user that a new window will open. |

---

## 14. Interaction Behavior

| Input | Behavior |
|-------|----------|
| **Tap / Click** | Fire `onPress`/`onClick`. Navigate if href is set. |
| **Keyboard Enter** | Same as tap. |
| **Keyboard Space** | Same as tap (button role only, not link role). |
| **Long press** | No special behavior (platform default). |
| **Disabled tap** | No response. No callback fired. |
| **Loading tap** | No response. No callback fired. |

---

## 15. Decision Log

| Decision | Rationale |
|----------|-----------|
| Destructive inherits secondary base | Destructive uses the same shape/padding as secondary, just overrides colors. Reduces duplication. |
| Loading preserves layout via invisible content | Prevents button from resizing when spinner appears, avoiding layout shifts. |
| Loading uses pressed/hover colors, not disabled opacity | Gives visual feedback that something is happening, rather than looking broken. |
| `iconOnly` suppresses icon wrappers | Icon IS the content — no leading/trailing distinction needed. |
| Link underline via gradient, not text-decoration | Allows animated show/hide and precise positioning. Platform implementations may use native underline if animation isn't possible. |
| `openInNewWindow` auto-applies security attributes (web) | Prevents reverse tabnapping (`rel="noopener noreferrer"`). |

---

## 16. Verification Checklist

An implementation is complete when:

- [ ] All 9 variants render with correct colors in all 6 states
- [ ] Both sizes (small, large) render with correct typography and padding
- [ ] `iconOnly` renders as square with correct sizing for both sizes
- [ ] `fullWidth` stretches to container width
- [ ] Leading and trailing icons render with correct spacing
- [ ] Loading state shows spinner, preserves dimensions, blocks interaction
- [ ] Correct spinner color per variant
- [ ] Disabled state at 50% opacity, blocks all interaction
- [ ] href renders as navigation element when not disabled/loading
- [ ] `openInNewWindow` opens in new tab/window with security attributes
- [ ] Link variants show/hide underline on hover (standard vs implicit)
- [ ] `iconOnly` buttons accept and announce accessibility label
- [ ] Loading buttons announce as busy to assistive technology
- [ ] Keyboard navigation works (Enter, Space)
- [ ] Touch target meets minimum 44x44pt
- [ ] Theme overrides apply to all variant colors
