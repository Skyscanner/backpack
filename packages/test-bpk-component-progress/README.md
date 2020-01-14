# bpk-component-progress

> Backpack progress bar component.

## Installation

```sh
npm install bpk-component-progress --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkProgress from 'bpk-component-progress';

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
| stepColor                | string                        | false    | `colorWhite`    |

## Theme props

* `progressBarFillColor`
