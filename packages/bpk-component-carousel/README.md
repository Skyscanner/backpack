# bpk-component-boilerplate

> Backpack carousel component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkBoilerplate from '@skyscanner/backpack-web/bpk-component-carousel';

const imageChangeHandler = () => {
  console.log('Image Changed')
}

export default () => (
  <BpkCarousel
    images={[ <img src="https://url/1_WxH.jpg" alt='image' />]}
    initialImageIndex={2}
    onImageChanged={imageChangeHandler}
  />
  );
```
