# bpk-component-image

> Backpack image component.

## Installation

```sh
npm install bpk-component-image --save-dev
```

## Usage

### BpkImage

```js
import React from 'react';
import BpkImage from 'bpk-component-image';

export default () => (
  <BpkImage
    altText="image description"
    maxWidth={816}
    maxHeight={544}
    src="./path/to/image.jpg"
  />
);
```

### BpkBackgroundImage

```js
import BpkText from 'bpk-component-text';
import { BpkBackgroundImage } from 'bpk-component-image';

export default () => (
  <BpkBackgroundImage
    style={{
      width: '100%',
      height: '20rem',
    }}
    imageStyle={{
      width: '100%',
      height: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }}
    src="./path/to/image.jpg"
  >
    <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 25 }} >
      <BpkText tagName="h2" textStyle="lg" >Lorem ipsum dolor sit amet</BpkText>
    </div>
  </BpkBackgroundImage>
);
```

## Accompanying HOCS

### withLazyLoading

`withLazyLoading` is a HOC which adds an `inView` prop to components.
This boolean prop can be used to determine if the component has been brought into view within a user's browser window.
The `BpkImage` and `BpkBackgroundImage` components will only load images if `inView` is true.
Using this HOC can make pages load faster and prevent data being used to display images which are never seen by the user.

```js
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';

const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, document));

export default () => (
  <FadingLazyLoadedImage
    altText="image description"
    maxWidth={816}
    maxHeight={544}
    src="./path/to/image.jpg"
  />
);
```

### withLoadingBehavior
`withLoadingBehavior` is a HOC which provides `loading` state for `BpkImage` and `BpkBackgroundImage`. This allows the two components to have different behavior when loading.
When the `loading` prop is set true, a spinner will be displayed. When this changes to false, the spinner will fade away and the loaded image and content will fade into view.

Note that the image supplied to `BpkBackgroundImage` must be browser-cacheable, as the component is reliant on caching the image for use once loaded.

```js
import { BpkBackgroundImage, withLazyLoading, withLoadingBehavior } from 'bpk-component-image';

const FadingLazyLoadedBackgroundImage = withLoadingBehavior(withLazyLoading(BpkBackgroundImage, document));

export default () => (
  <FadingLazyLoadedBackgroundImage
    style={{
      width: '100%',
      height: '20rem',
    }}
    imageStyle={{
      width: '100%',
      height: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }}
    src="./path/to/image.jpg"
  >
    <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 25 }} >
      <BpkText tagName="h2" textStyle="lg" >Lorem ipsum dolor sit amet</BpkText>
      <BpkCode>consectetuer adipiscing elit</BpkCode>
    </div>
  </FadingLazyLoadedBackgroundImage>
);
```

## Props

### BpkImage

| Property         | PropType  | Required | Default Value       |
| ---------------- | --------- | -------- | ------------------- |
| altText          | string    | true     | -                   |
| height           | number    | true     | -                   |
| src              | string    | true     | -                   |
| width            | number    | true     | -                   |
| className        | string    | false    | null                |
| fullWidth        | bool      | false    | true                |
| inView           | bool      | false    | true                |
| loading          | bool      | false    | false               |
| onLoad           | func      | false    | null                |

### BpkBackgroundImage

| Property         | PropType  | Required | Default Value       |
| ---------------- | --------- | -------- | ------------------- |
| src              | string    | true     | -                   |
| children         | node      | false    | null                |
| className        | string    | false    | null                |
| fullWidth        | bool      | false    | true                |
| imageClassName   | string    | false    | null                |
| imageStyle       | object    | false    | null                |
| inView           | bool      | false    | true                |
| loading          | bool      | false    | false               |
| onLoad           | func      | false    | null                |
