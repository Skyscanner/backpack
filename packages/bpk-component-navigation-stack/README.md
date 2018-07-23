# bpk-component-navigation-stack

> Backpack navigation stack component.

## Installation

```sh
npm install bpk-component-navigation-stack --save-dev
```

## Usage

```js
import React from 'react';
import BpkNavigationStack from 'bpk-component-navigation-stack';

export default () => (
  <BpkNavigationStack views={[<div />]} />
);
```

## Props

| Property  | PropType         | Required | Default Value |
| --------- | ---------------- | -------- | ------------- |
| views     | arrayOf(element) | true     | -             |
| className | string           | false    | null          |

## withNavigationStackState

`withNavigationStackState` returns a HOC with two instance methods, `pushView` and `popView`,
that can be used to push and pop views from the stack component.


```js
import React from 'react';
import BpkNavigationStack from 'bpk-component-navigation-stack';

const StatefulNavigationStack = withNavigationStackState(BpkNavigationStack);

export default () => (
  <StatefulNavigationStack initialViews={[<div />]} />
);
```

By default the `pushView` and `popView` callbacks are forwarded to the children, if you
want to disabled this behaviour pass `false` as the second argument, in this case the
callbacks are forwarded to the Stack component instead.