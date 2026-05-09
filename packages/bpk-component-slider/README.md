# bpk-component-slider

> Backpack slider component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkSlider from '@skyscanner/backpack-web/bpk-component-slider';

const Slider = () => (
  <BpkSlider
    min={0}
    max={100}
    value={[20, 80]}
    step={10}
    onChange={(value) => alert('Actual value: ' + value)}
    ariaLabel={['min', 'max']}
  />
);

const RangeSlider = () => {
  const [value, setValue] = useState([20, 80]);

  const handleAfterChange = (newValue) => {
    // Called when user finishes dragging
    console.log('Final value:', newValue);
  };

  return (
    <BpkSlider
      min={0}
      max={100}
      value={value}
      step={10}
      onChange={setValue}
      onAfterChange={handleAfterChange}
      ariaLabel={['min', 'max']}
      ariaValuetext={[`${value[0]}%`, `${value[1]}%`]}
    />
  );
};
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/slider/web-aNXvlY7y#section-props-1e).


## Native Events

Just like a `input` `type="range"` the BpkSlider will fire a change event from the hidden `input` `type="number"` for each thumb. These behave similarly where user can drag the thumb and will fire a change event on `mouseup`/`click`.
As for the keyboard events the change event will fire on `keyup` rather than on every keystroke registered like the `input` `type=range` does.
