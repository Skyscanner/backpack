# bpk-component-loading-button

> Backpack loading button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkLoadingButton from '@skyscanner/backpack-web/bpk-component-loading-button';
import BaggageIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage';
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import BpkVisuallyHidden from '@skyscanner/backpack-web/bpk-component-visually-hidden';

const AlignedBaggageIcon = withButtonAlignment(withRtlSupport(BaggageIcon));
const icon = <AlignedBaggageIcon />;

export default () => (
  <div>
    <BpkLoadingButton>Primary</BpkLoadingButton>
    <BpkLoadingButton large>Large primary</BpkLoadingButton>
    <BpkLoadingButton secondary>Secondary</BpkLoadingButton>
    <BpkLoadingButton iconOnly>
      <BpkVisuallyHidden>Search</BpkVisuallyHidden>
    </BpkLoadingButton>
    <BpkLoadingButton icon={icon} iconDisabled={icon}>Custom Icon</BpkLoadingButton>
  </div>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/button/web-eI5EFTLO#section-loading-button-props-3b).
