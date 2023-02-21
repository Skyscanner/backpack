# bpk-component-overlay

> Backpack overlay component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkOverlay, { OVERLAY_TYPES } from '@skyscanner/backpack-web/bpk-component-overlay';

export default () => (
  <div>
    { /* Basic example with tint */}
    <BpkOverlay 
      overlayType={OVERLAY_TYPES.solid} 
      overlayLevel={OVERLAY_LEVELS.high}
    >
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>

    { /* With the tint invisible */}
    <BpkOverlay>
      <BpkText>Hotels in Canada</BpkText>
    </BpkOverlay>

    { /* With foreground content */}
    <BpkOverlay foregroundContent={<BpkText>Visit Ottawa</BpkText>}>
      <BpkImage
        altText="altText here"
        aspectRatio={16}
        src="" />
    </BpkOverlay>
  </div>
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children | Node | true | - |
| className | string | false | null |
| foregroundContent | Node | false | null |
| overlayType | oneOf(OVERLAY_TYPES) | false | OVERLAY_TYPES.solid |
| overlayLevel | oneOf(OVERLAY_LEVELS) | false | OVERLAY_LEVELS.low |
