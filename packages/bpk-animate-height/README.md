# bpk-animate-height

> Animate height using CSS transitions.

Note: This was forked from https://github.com/Stanko/react-animate-height. We have added functionality to
set the display property of the container to `display: none;` when the height is equal to 0.

More information on the easing values can be found at [http://easings.net/](http://easings.net/)

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import AnimateHeight from '@skyscanner/backpack-web/bpk-animate-height';
import React, { Component } from 'react';

class AnimateHeightContainer extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
    };
  }

  render() {
    return (
      <AnimateHeight
        height={this.state.expanded ? 'auto' : 0}
        duration={200}
      >
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus.
      </AnimateHeight>
    );
  }
}
```

## Props

| Property            | PropType         | Required | Default Value |
| ------------------- | ---------------- | -------- | ------------- |
| children            | node             | true     | -             |
| duration            | number           | true     | -             |
| height              | string or number | true     | -             |
| easing              | string           | false    | 'ease'        |
| onAnimationComplete | function         | false    | null          |
| style               | object           | false    | {}            |
