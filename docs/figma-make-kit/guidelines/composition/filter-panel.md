# Filter panel

The filter panel is a stacked group of filter controls used to refine a results list — typically a sidebar on desktop or a bottom sheet/full-screen modal on mobile. It is a composition of existing components arranged in a specific layout, not a single Backpack component.

## Structure

Build a filter panel by arranging the following:

1. **Container** — `BpkModalV3` (`type={MODAL_V3_TYPES.sheet}` on mobile) if the panel opens as an overlay, or a plain `BpkFlex direction="column"` section if it's an always-visible sidebar
2. **Per-filter-group heading** — `BpkText` with `textStyle={TEXT_STYLES.heading5}`, or a `BpkAccordionItem` title if the group is collapsible
3. **Filter controls** — one of:
   - `BpkChipGroup` (`BpkMultiSelectChipGroup`/`BpkSingleSelectChipGroup`) for tag-style filters (e.g. airlines, amenities)
   - `BpkCheckbox` list for independent boolean filters (e.g. "Direct flights only")
   - `BpkRadio` group for a mutually-exclusive choice (e.g. sort order)
   - `BpkSlider`/`BpkNudger` for range filters (e.g. price, duration) — not covered in this catalog; check the component list if needed
4. **Divider** between filter groups — `BpkDivider`
5. **Footer actions** — `BpkButton` `type={BUTTON_TYPES.secondary}` ("Clear all") and `type={BUTTON_TYPES.primary}` ("Apply") — at most one primary action

## Example

```tsx
import { BpkFlex, BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import BpkDivider from '@skyscanner/backpack-web/bpk-component-divider';
import BpkMultiSelectChipGroup, { CHIP_GROUP_TYPES } from '@skyscanner/backpack-web/bpk-component-chip-group';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

function FilterPanel() {
  return (
    <BpkFlex direction="column" gap={BpkSpacing.LG} padding={BpkSpacing.LG}>
      <BpkText textStyle={TEXT_STYLES.heading5}>Airlines</BpkText>
      <BpkMultiSelectChipGroup type={CHIP_GROUP_TYPES.wrap} chips={airlineChips} ariaLabel="Filter by airline" />
      <BpkDivider />
      <BpkText textStyle={TEXT_STYLES.heading5}>Stops</BpkText>
      {/* checkbox list */}
      <BpkFlex justify="space-between" gap={BpkSpacing.MD}>
        <BpkButton type={BUTTON_TYPES.secondary} onClick={onClear}>Clear all</BpkButton>
        <BpkButton type={BUTTON_TYPES.primary} onClick={onApply}>Apply</BpkButton>
      </BpkFlex>
    </BpkFlex>
  );
}
```

## Layout guidelines

- On mobile, present the panel as a `BpkModalV3` sheet or full-screen modal rather than an inline sidebar.
- Use `BpkSpacing.LG` between filter groups and `BpkSpacing.MD`/`BpkSpacing.SM` between controls within one group, for consistent vertical rhythm.
- The "Apply"/primary action is always the most prominent element in the footer — never make "Clear all" the primary-styled button.
- If a filter group has many options, wrap it in a `BpkAccordionItem` (with `withSingleItemAccordionState` or `withAccordionItemState` as appropriate) instead of always showing every option.

## Rules

- Use the component order above; footer actions always come last.
- At most one `BUTTON_TYPES.primary` in the footer — supporting actions use `secondary` or `link`.
- Every filter chip/checkbox/radio needs its own accessibility label per `content-and-terminology.md` — never a bare unlabeled control.
