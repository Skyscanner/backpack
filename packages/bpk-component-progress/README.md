# bpk-component-progress

> Backpack progress bar component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkProgress from '@skyscanner/backpack-web/bpk-component-progress';

const Progress = () => (
  <BpkProgress
    min={0}
    max={100}
    value={63}
    aria-label="Searching"
    onCompleteTransitionEnd={() => alert('Completed!')}
  />
);

const Steps = () => (
  <BpkProgress
    stepped
    min={0}
    max={5}
    value={1}
    aria-label="Checkout"
    getValueText={(value, min, max) => `Step ${value} of ${max}`}
  />
);
```

## Props

| Property                 | PropType                      | Required | Default Value |
| ------------------------ | ----------------------------- | -------- | ------------- |
| max                      | number                        | true     | -             |
| min                      | number                        | true     | -             |
| value                    | number                        | true     | -             |
| className                | string                        | false    | null          |
| getValueText             | func                          | false    | null          |
| small                    | bool                          | false    | false         |
| onComplete               | func                          | false    | null          |
| onCompleteTransitionEnd  | func                          | false    | null          |
| stepped                  | bool                          | false    | false         |

## Theme props

* `progressBarFillColor`
