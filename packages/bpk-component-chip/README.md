# bpk-component-chip

> Backpack chip component.

## Installation

```sh
npm install bpk-component-chip --save-dev
```

## Usage

```js
import React from 'react';
import BpkSelectableChip, { BpkDismissibleChip, CHIP_TYPES } from 'bpk-component-chip';
import BeachIconSm from 'bpk-component-icon/sm/beach';

export default () => (

  <div style={{ display: 'flex' }}> // IMPORTANT: Flex styles make sure chips align with each other
    // Standard selectable chip.
    <BpkSelectableChip
      accessibilityLabel="Press to toggle chip"
      selected={false}
      onClick={() => { /* Use state to set 'selected={true}' */ }}
    >
      Toggle me
    </BpkSelectableChip>

    // Selectable chip with an icon.
    <BpkSelectableChip
      accessibilityLabel="Press to toggle chip"
      selected={false}
      onClick={() => { /* Use state to set 'selected={true}' */ }}
      leadingAccessoryView={<BeachIconSm />}
    >
      Toggle me
    </BpkSelectableChip>

    // Standard dismissible chip.
    <BpkDismissibleChip
      accessibilityLabel="Press to dismiss chip"
      onClick={() => { /* Use state to handle removing this chip. */ }}
    >
      Dismiss me
    </BpkDismissibleChip>

    // Dismissible chip with an icon.
      <BpkDismissibleChip
      accessibilityLabel="Press to dismiss chip"
      onClick={() => { /* Use state to handle removing this chip. */ }}
      leadingAccessoryView={<BeachIconSm />}
    >
      Dismiss me
    </BpkDismissibleChip>
  </div>
);
```

## Props

### BpkSelectableChip

| Property | PropType | Required | Default Value |
| - | - | - | - |
| accessibilityLabel | string | true | - |
| children | node | true | - |
| onClick | func | true | - |
| className | string | false | null |
| disabled | bool | false | false |
| leadingAccessoryView | node | false | null |
| selected | bool | false | false |
| trailingAccessoryView | node | false | null |
| type | oneOf(`CHIP_TYPES.light`, `CHIP_TYPES.primary`, `CHIP_TYPES.success`) |


### BpkDismissibleChip

Dismissible chips are selectable chips that have been preconfigured to have a 'close' icon trailing accessory view and cannot be selected, so they have the same props as `BpkSelectableChip`, minus `trailingAccessoryView` and `selected`.

| Property | PropType | Required | Default Value |
| - | - | - | - |
| accessibilityLabel | string | true | - |
| children | node | true | - |
| onClick | func | true | - |
| className | string | false | null |
| disabled | bool | false | false |
| leadingAccessoryView | node | false | null |
| type | oneOf(`CHIP_TYPES.light`, `CHIP_TYPES.primary`, `CHIP_TYPES.success`) |
