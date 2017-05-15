# bpk-animate-height

> Animate height using CSS transitions.

Note: This was forked from https://github.com/Stanko/react-animate-height. We have added functionality to
set the display property of the container to `display: none;` when the height is equal to 0.

## Installation

```sh
npm install bpk-animate-height --save-dev
```

## Usage

```js
import AnimateHeight from 'bpk-animate-height';
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

| Property    | PropType         | Required | Default Value |
| ----------- | ---------------- | -------- | ------------- |
| children    | node             | true     | -             |
| duration    | number           | true     | -             |
| height      | string or number | true     | -             |
| easing      | string           | false    | 'ease'        |
| style       | object           | false    | {}            |
