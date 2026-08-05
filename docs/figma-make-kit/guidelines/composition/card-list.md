# Card list

A titled, responsive list of result/recommendation cards with an optional "see more" button, expand toggle, pagination, or filter chip row. It appears on results and recommendation surfaces (e.g. "We think you'll like these hotels"). Backpack ships this composition as a single component, `BpkCardList` — build this pattern by configuring that component rather than hand-assembling cards in a grid.

## Structure

Build a card list by arranging the following:

1. **Title + description** — `title`/`description` props on `BpkCardList` (rendered internally as `BpkText`)
2. **Optional `chipGroup`** — a `BpkSingleSelectChipGroup`/`BpkMultiSelectChipGroup` for filtering which cards are shown
3. **`cardList`** — an array of card elements (typically `BpkCardV2`), laid out per `layoutDesktop`/`layoutMobile`
4. **Accessory** — `accessoryDesktop`/`accessoryMobile`: `button` (a "see more" CTA), `expand` (show more/less toggle), or `pagination`

## Example

```tsx
import BpkCardList, { LAYOUTS, ACCESSORY_DESKTOP_TYPES, ACCESSORY_MOBILE_TYPES } from '@skyscanner/backpack-web/bpk-component-card-list';

function RecommendedHotels() {
  return (
    <BpkCardList
      title="We think you'll like"
      description="Check out these destinations for a spring getaway"
      buttonContent="See more"
      cardList={hotelCards}
      layoutDesktop={LAYOUTS.grid}
      layoutMobile={LAYOUTS.stack}
      accessoryDesktop={ACCESSORY_DESKTOP_TYPES.pagination}
      accessoryMobile={ACCESSORY_MOBILE_TYPES.button}
    />
  );
}
```

## Layout guidelines

- `layoutDesktop`/`layoutMobile` accept `grid`, `stack`, `row`, or `rail` independently — a common pattern is `grid` on desktop and `stack` (or `rail` for a horizontally-scrollable carousel) on mobile.
- If cards need a minimum width to stay readable when the row/rail is narrow (especially with `row`/`rail` + a carousel), set it via `className` on each card rather than a layout prop.
- The `expand` accessory requires you to manage its toggle text (`expandText`) and `onExpandClick` externally — `BpkCardList` does not track that state itself.
- `buttonHref` renders the accessory button as a link (`<a>`) instead of a `<button>` — set it when the CTA navigates rather than mutating the list in place.

## Rules

- Use `BpkCardList`'s own `title`/`description`/`chipGroup`/accessory props — don't hand-build the header row or "see more" button separately.
- Use the component order above; do not omit the title when a description or chip group is present.
