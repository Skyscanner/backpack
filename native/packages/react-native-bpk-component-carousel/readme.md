# react-native-bpk-component-carousel

> Backpack React Native carousel component.

## Installation

```sh
npm install react-native-bpk-component-carousel --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { spacingXl } from 'bpk-tokens/tokens/base.react.native';
import BpkCarousel, { BpkCarouselItem } from 'react-native-bpk-component-carousel';
import BpkImage, { withLoadingBehaviour } from 'react-native-bpk-component-image';

const WithLoadingBpkImage = withLoadingBehaviour(BpkImage);

const styles = StyleSheet.create({
  carousel: {
    width: spacingXl * 10,
    height: spacingXl * 10
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default () => (
  <BpkCarousel
    accessibilityLabel={(page, total) => `${page + 1} of ${total}`}
    style={styles.carousel}
  >
    <BpkCarouselItem>
      <WithLoadingBpkImage
        rounded={false}
        alt="Description of image"
        style={styles.image}
        source={require('./path/to/image.jpg')}
      />
    </BpkCarouselItem>
    <BpkCarouselItem>
      <WithLoadingBpkImage
        rounded={false}
        alt="Description of image"
        style={styles.image}
        source={require('./path/to/image.jpg')}
      />
    </BpkCarouselItem>
  </BpkCarousel>
);
```

## Props

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| accessibilityLabel | oneOfType(string, func)               | true     | -             |
| children           | node                                  | true     | -             |
| showIndicator      | bool                                  | false    | true          |

## BpkCarouselItem props

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| children           | node                                  | true     | -             |
