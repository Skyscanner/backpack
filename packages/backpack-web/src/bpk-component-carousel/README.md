# bpk-component-carousel

> Backpack carousel component.

## Description
This component is used to display images in the form of a carousel, users can browse through images by swipe. It only works on mobile.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkCarousel from '@skyscanner/backpack-web/bpk-component-carousel';

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
