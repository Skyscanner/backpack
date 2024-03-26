# bpk-component-chip

> Backpack chip component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkSelectableChip, {
  BpkDismissibleChip,
  BpkDropdownChip,
  BpkIconChip
  CHIP_TYPES,
} from '@skyscanner/backpack-web/bpk-component-chip';
import BeachIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/beach';

export default () => (
  <div style={{ display: 'flex' }}>
    {' '}
    // IMPORTANT: Flex styles make sure chips align with each other // Standard selectable
    chip.
    <BpkSelectableChip
      accessibilityLabel="Press to toggle chip"
      selected={false}
      onClick={() => {
        /* Use state to set 'selected={true}' */
      }}
    >
      Toggle me
    </BpkSelectableChip>
    // Selectable chip with an icon.
    <BpkSelectableChip
      accessibilityLabel="Press to toggle chip"
      selected={false}
      onClick={() => {
        /* Use state to set 'selected={true}' */
      }}
      leadingAccessoryView={<BeachIconSm />}
    >
      Toggle me
    </BpkSelectableChip>
    // Standard dropdown chip.
    <BpkDropdownChip
      accessibilityLabel="Press to toggle chip"
      selected={false}
      onClick={() => {
        /* Use state to set 'selected={true}' */
      }}
    >
      Toggle me
    </BpkDropdownChip>
    // Dropdown chip with an icon.
    <BpkDropdownChip
      accessibilityLabel="Press to toggle chip"
      selected={false}
      onClick={() => {
        /* Use state to set 'selected={true}' */
      }}
      leadingAccessoryView={<BeachIconSm />}
    >
      Toggle me
    </BpkDropdownChip>
    // Standard dismissible chip.
    <BpkDismissibleChip
      accessibilityLabel="Press to dismiss chip"
      onClick={() => {
        /* Use state to handle removing this chip. */
      }}
    >
      Dismiss me
    </BpkDismissibleChip>
    // Dismissible chip with an icon.
    <BpkDismissibleChip
      accessibilityLabel="Press to dismiss chip"
      onClick={() => {
        /* Use state to handle removing this chip. */
      }}
      leadingAccessoryView={<BeachIconSm />}
    >
      Dismiss me
    </BpkDismissibleChip>
    <BpkIconChip
      accessibilityLabel="Press to toggle chip"
      selected={false}
      onClick={() => {
        /* Use state to set 'selected={true}' */
      }}
      leadingAccessoryView={<BeachIconSm />}
    />
  </div>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/chip/web-UXmYdvvh#section-props-79).
