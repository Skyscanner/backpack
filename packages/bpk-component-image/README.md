# bpk-component-image

> Backpack image component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkImage from '@skyscanner/backpack-web/bpk-component-image';
import { breakpointDesktop, breakpointTablet } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

export default () => (
  <BpkImage
    altText="image description"
    aspectRatio={816 / 544}
    src="./path/to/image_1640.jpg"
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
import BpkImage, { withLazyLoading, withLoadingBehavior } from '@skyscanner/backpack-web/bpk-component-image';
import { breakpointDesktop, breakpointTablet } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// Support for SSR
const documentIfExists = typeof window !== 'undefined' ? document : null;
// withLazyLoading will not use document when rendered server side so it's safe
// pass null.
const LazyLoadedImage = withLazyLoading(BpkImage, documentIfExists);

export default () => (
  <LazyLoadedImage
    altText="image description"
    aspectRatio={816 / 544}
    src="./path/to/image_1640.jpg"
  />
);
```

### withLoadingBehavior

`withLoadingBehavior` is a HOC which provides `loading` state for `BpkImage`. This allows the component to have different behaviour before and after loading completes.
When the `loading` prop is set true, a spinner will be displayed. When this changes to false, the spinner will fade away and the loaded image and content will fade into view.

```js
import BpkImage, { BpkBackgroundImage, withLazyLoading, withLoadingBehavior } from '@skyscanner/backpack-web/bpk-component-image';
import { breakpointDesktop, breakpointTablet } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

const FadingImage = withLoadingBehavior(BpkImage);
const FadingBackgroundImage = withLoadingBehavior(BpkBackgroundImage);

export default () => (
  <div>
    <FadingImage
      altText="image description"
      aspectRatio={816 / 544}
      src="./path/to/image_1640.jpg"
    />
    <FadingBackgroundImage
      altText="image description"
      aspectRatio={816 / 544}
      src="./path/to/image_1640.jpg"
      imageStyle={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
      }}
    />
  </div>
);
```

### All together now

Combining `withLazyLoading` and `withLoadingBehavior` gives us a lazily loaded image that will show a spinner while the image loads.

```js
import BpkImage, { withLazyLoading, withLoadingBehavior } from '@skyscanner/backpack-web/bpk-component-image';
import { breakpointDesktop, breakpointTablet } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

export default () => (
  <FadingLazyLoadedImage
    altText="image description"
    aspectRatio={816 / 544}
    src="./path/to/image_1640.jpg"
  />
);
```

## Props

| Property                  | PropType                    | Required | Default Value             |
| ------------------------- | --------------------------- | -------- | ------------------------- |
| altText                   | string                      | true     | -                         |
| src                       | string                      | true     | -                         |
| aspectRatio               | number                      | true     | -                         |
| borderRadiusStyle         | oneOf(BORDER_RADIUS_STYLES) | false    | BORDER_RADIUS_STYLES.none |
| className                 | string                      | false    | null                      |
| inView                    | bool                        | false    | true                      |
| loading                   | bool                        | false    | false                     |
| onLoad                    | func                        | false    | null                      |
| style                     | object                      | false    | {}                        |
| suppressHydrationWarnings | bool                        | false    | false                     |

Note: The `aspectRatio` prop should be calculated as `width/height` of the original src image. It is used by the component to preserve space on screen while the image loads.

Note: All [standard `img` attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#Attributes) including `srcSet` are also supported.

## BpkBackgroundImage

The background image component is useful for setting background images in CSS that can then contain other elements. It supports the same HOCs as `BpkImage`.

### BpkBackgroundImage props

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| src         | string   | true     | -             |
| aspectRatio | number   | true     | -             |
| className   | string   | false    | null          |
| inView      | bool     | false    | true          |
| loading     | bool     | false    | false         |
| onLoad      | func     | false    | null          |
| style       | object   | false    | {}            |
| imageStyle  | object   | false    | {}            |
