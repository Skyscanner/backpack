# Component Selection Reference

> **Load this doc when:** choosing which Backpack component to use for a given UI need,
> checking the correct import path for any component, or verifying which components are
> deprecated. This is the authoritative lookup for "which component do I use for X?".

---

# Components

Full component selection guide by category. All imports prefixed with `@skyscanner/backpack-web/`.

## Buttons and actions

```tsx
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

<BpkButton type="primary" onClick={handleClick}>Search flights</BpkButton>
<BpkButton type="secondary" size="large">Filter</BpkButton>
<BpkButton type="destructive">Delete</BpkButton>
<BpkButton type="link" href="/help">Help</BpkButton>
<BpkButton type="primary-on-dark">CTA on hero</BpkButton>
```

**type values**: `primary`, `secondary`, `secondary-on-dark`, `primary-on-dark`, `primary-on-light`, `destructive`, `featured`, `link`, `link-on-dark`.

**size values**: `small` (default), `large`.

| Variant | Component | Package |
|---------|-----------|---------|
| Async loading button | `BpkLoadingButton` | `bpk-component-loading-button` |
| Save/bookmark toggle | `BpkSaveButton` | `bpk-component-card-button` |
| Swap button | `BpkSwapButton` | `bpk-component-swap-button` |
| Close/dismiss | `BpkCloseButton` | `bpk-component-close-button` |

## Cards and surfaces

```tsx
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';

<BpkCard href="/deals/london" padded>
  <CardContent />
</BpkCard>
```

| Need | Component | Package |
|------|-----------|---------|
| Clickable card | `BpkCard` | `bpk-component-card` |
| Card with wrapper | `BpkCardWrapper` | `bpk-component-card` |
| Split card | `BpkDividedCard` | `bpk-component-card` |
| Responsive card grid/carousel | `BpkCardList` | `bpk-component-card-list` |
| Editorial card collection | `BpkContentCards` | `bpk-component-content-cards` |
| Hero promo banner | `BpkGraphicPromo` | `bpk-component-graphic-promotion` |
| Non-clickable surface | `BpkPanel` | `bpk-component-panel` |
| Sponsored inset banner | `BpkInsetBanner` | `bpk-component-inset-banner` |

Do NOT use `BpkTicket` — deprecated. Use `BpkCard`.

## Forms

| Need | Component | Package |
|------|-----------|---------|
| Text input | `BpkInput` | `bpk-component-input` |
| Multi-line text | `BpkTextarea` | `bpk-component-textarea` |
| Select dropdown | `BpkSelect` | `bpk-component-select` |
| Checkbox | `BpkCheckbox` | `bpk-component-checkbox` |
| Radio button | `BpkRadio` | `bpk-component-radio` |
| Toggle switch | `BpkSwitch` | `bpk-component-switch` |
| Number stepper | `BpkNudger` | `bpk-component-nudger` |
| Range slider | `BpkSlider` | `bpk-component-slider` |
| Phone number | `BpkPhoneInput` | `bpk-component-phone-input` |
| PIN/OTP code | `BpkSplitInput` | `bpk-component-split-input` |
| Typeahead search | `BpkAutosuggest` | `bpk-component-autosuggest` |
| Date picker | `BpkDatepicker` | `bpk-component-datepicker` |
| Segmented options | `BpkSegmentedControl` | `bpk-component-segmented-control` |
| Field label | `BpkLabel` | `bpk-component-label` |
| Field group + validation | `BpkFieldset` | `bpk-component-fieldset` |
| Validation message | `BpkFormValidation` | `bpk-component-form-validation` |

Always wrap form fields in `BpkFieldset` to get label, description, and validation together.

## Feedback and alerts

| Need | Component | Package |
|------|-----------|---------|
| Inline info/warning/error banner | `BpkInfoBanner` | `bpk-component-info-banner` |
| Dismissable banner | `BpkInfoBannerDismissable` | `bpk-component-info-banner` |
| Expandable banner | `BpkInfoBannerExpandable` | `bpk-component-info-banner` |
| Toast notification | `BpkFloatingNotification` | `bpk-component-floating-notification` |
| Loading spinner | `BpkSpinner` / `BpkLargeSpinner` / `BpkExtraLargeSpinner` | `bpk-component-spinner` |
| Progress bar | `BpkProgress` | `bpk-component-progress` |
| Skeleton loading | `BpkSkeleton` | `bpk-component-skeleton` |
| Screen-reader announcements | `BpkAriaLive` | `bpk-component-aria-live` |

Do NOT use `BpkBannerAlert` — deprecated. Use `BpkInfoBanner`.

## Navigation

| Need | Component | Package |
|------|-----------|---------|
| Top navigation bar | `BpkNavigationBar` | `bpk-component-navigation-bar` |
| Tab group | `BpkNavigationTabGroup` | `bpk-component-navigation-tab-group` |
| Horizontal tabs | `BpkHorizontalNav` | `bpk-component-horizontal-nav` |
| Breadcrumbs | `BpkBreadcrumb` + `BpkBreadcrumbItem` | `bpk-component-breadcrumb` |
| Hyperlink | `BpkLink` / `BpkButtonLink` | `bpk-component-link` |
| Pagination | `BpkPagination` | `bpk-component-pagination` |
| Page indicator (dots) | `BpkPageIndicator` | `bpk-component-page-indicator` |
| Skip link (a11y) | `BpkSkipLink` | `bpk-component-skip-link` |
| Horizontal scroll (mobile) | `BpkMobileScrollContainer` | `bpk-component-mobile-scroll-container` |

## Overlays and popovers

| Need | Component | Package |
|------|-----------|---------|
| Modal dialog | `BpkModal` | `bpk-component-modal` |
| Lightweight dialog | `BpkDialog` | `bpk-component-dialog` |
| Side drawer | `BpkDrawer` | `bpk-component-drawer` |
| Bottom sheet (mobile) | `BpkBottomSheet` | `bpk-component-bottom-sheet` |
| Popover | `BpkPopover` | `bpk-component-popover` |
| Tooltip | `BpkTooltip` | `bpk-component-tooltip` |
| Backdrop overlay | `BpkOverlay` | `bpk-component-overlay` |

## Chips and filters

| Need | Component |
|------|-----------|
| Toggle filter chip | `BpkSelectableChip` |
| Removable tag chip | `BpkDismissibleChip` |
| Chip with icon | `BpkIconChip` |
| Chip that opens dropdown | `BpkDropdownChip` |
| Multi-select chip group | `BpkMultiSelectChipGroup` |
| Single-select chip group | `BpkSingleSelectChipGroup` |

Chip variants from `bpk-component-chip`. Chip groups from `bpk-component-chip-group`.

## Data display

| Need | Component | Package |
|------|-----------|---------|
| Price | `BpkPrice` | `bpk-component-price` |
| Price range | `BpkPriceRange` | `bpk-component-price-range` |
| Badge/tag | `BpkBadge` | `bpk-component-badge` |
| Rating score | `BpkRating` | `bpk-component-rating` |
| Star rating | `BpkStarRating` | `bpk-component-star-rating` |
| Data table (sortable) | `BpkDataTable` | `bpk-component-datatable` |
| HTML table | `BpkTable` | `bpk-component-table` |
| Description list | `BpkDescriptionList` | `bpk-component-description-list` |
| Ordered/unordered list | `BpkList` | `bpk-component-list` |
| Section heading | `BpkSectionHeader` | `bpk-component-section-header` |
| Grouped section list | `BpkSectionList` | `bpk-component-section-list` |
| Travel arrow | `BpkJourneyArrow` | `bpk-component-journey-arrow` |
| Blockquote | `BpkBlockquote` | `bpk-component-blockquote` |
| Code snippet | `BpkCode` / `BpkCodeBlock` | `bpk-component-code` |
| Truncated text | `BpkSnippet` | `bpk-component-snippet` |
| Image | `BpkImage` | `bpk-component-image` |
| Image carousel | `BpkCarousel` | `bpk-component-carousel` |
| Bar chart | `BpkBarchart` | `bpk-component-barchart` |

## Other

| Need | Component | Package |
|------|-----------|---------|
| Accordion | `BpkAccordion` + `BpkAccordionItem` | `bpk-component-accordion` |
| Map | `BpkMap` | `bpk-component-map` |
| Calendar (full) | `BpkCalendarContainer` | `bpk-component-calendar` |
| Scrollable calendar | `BpkScrollableCalendar` | `bpk-component-scrollable-calendar` |
| Breakpoint detection | `BpkBreakpoint` | `bpk-component-breakpoint` |
| Bubble / callout | `BpkBubble` | `bpk-component-bubble` |
