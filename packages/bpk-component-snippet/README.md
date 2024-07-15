# bpk-component-snippet

> Backpack snippet component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Desktop

```ts
import BpkSnippet from '@skyscanner/backpack-web/bpk-component-snippet';

<BpkSnippet
  src='https://content.skyscnr.com/m/f427e62297cce49/original/edinburgh-view-from-calton-hill.jpg',
  altText='image description',
  headline='Title of the section',
  subheading='Subheading',
  bodyText="Lorem ipsum dolor sit amet consectetur. Tristique at pharetra tincidunt elementum vulputate varius sit euismod hac. Dignissim hendrerit enim eros nisi diam. Elit arcu mattis cum in id varius vitae augue neque. Quisque in semper malesuada lacus ut etiam elementum.",
  bodyStyle = TEXT_STYLES.bodyDefault,
  buttonStyle = BUTTON_TYPES.primary,
  headlineStyle = TEXT_STYLES.hero5,
  desktopLayout = 'imageLeft',
  imageOrientation = 'landscape',
  buttonText='Call to Action',
/>
```

## Props

Check out the full list of props on Skyscanner's design system [documentation website](https://www.skyscanner.design/latest/components/snippet/compose-CaNywPG3).
