# bpk-component-image

> Backpack image component.

## Installation

```sh
npm install bpk-component-image --save-dev
```

## Usage

```js
import React from 'react';
import BpkImage from 'bpk-component-image';
import * as BREAKPOINTS from 'bpk-tokens/tokens/breakpoints.es6';

export default () => (
  <BpkImage
    altText="image description"
    width={816}
    height={544}
    src="./path/to/image_1640.jpg"
    srcSet={`./path/to/image_320px.jpg 320w,
      ./path/to/image_640px.jpg 640w,
      ./path/to/image_1640px.jpg 1640w,
      ./path/to/image_3200px.jpg 3200w`}]
    sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 48rem,
      (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 18rem),
      calc(100vw - 4.5rem)`}
  />
);
```

## Accompanying HOCS

### withLazyLoading

`withLazyLoading` is a HOC which adds an `inView` prop to components.
This boolean prop can be used to determine if the component has been brought into view within a user's browser window.
The `BpkImage` component will only load images if `inView` is true.
Using this HOC can make pages load faster and prevent data being used to display images which are never seen by the user.

```js
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import * as BREAKPOINTS from 'bpk-tokens/tokens/breakpoints.es6';

const LazyLoadedImage = withLazyLoading(BpkImage, document);

export default () => (
  <LazyLoadedImage
    altText="image description"
    width={816}
    height={544}
    src="./path/to/image_1640.jpg"
    srcSet={`./path/to/image_320px.jpg 320w,
      ./path/to/image_640px.jpg 640w,
      ./path/to/image_1640px.jpg 1640w,
      ./path/to/image_3200px.jpg 3200w`}
    sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 48rem,
      (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 18rem),
      calc(100vw - 4.5rem)`}
  />
);
```

### withLoadingBehavior
`withLoadingBehavior` is a HOC which provides `loading` state for `BpkImage`. This allows the component to have different behavior before and after loading completes.
When the `loading` prop is set true, a spinner will be displayed. When this changes to false, the spinner will fade away and the loaded image and content will fade into view.

```js
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import * as BREAKPOINTS from 'bpk-tokens/tokens/breakpoints.es6';

const FadingImage = withLoadingBehavior(BpkImage);

export default () => (
  <FadingImage
    altText="image description"
    width={816}
    height={544}
    src="./path/to/image_1640.jpg"
    srcSet={`./path/to/image_320px.jpg 320w,
      ./path/to/image_640px.jpg 640w,
      ./path/to/image_1640px.jpg 1640w,
      ./path/to/image_3200px.jpg 3200w`}
    sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 48rem,
      (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 18rem),
      calc(100vw - 4.5rem)`}
  />
);
```

## Props

| Property         | PropType  | Required | Default Value       |
| ---------------- | --------- | -------- | ------------------- |
| altText          | string    | true     | -                   |
| height           | number    | true     | -                   |
| src              | string    | true     | -                   |
| width            | number    | true     | -                   |
| className        | string    | false    | null                |
| inView           | bool      | false    | true                |
| loading          | bool      | false    | false               |
| onLoad           | func      | false    | null                |
