# bpk-component-navigation-bar

> Backpack navigation bar component.

## Installation

```sh
npm install bpk-component-navigation-bar --save-dev
```

## Usage

### BpkNavigationBar

```js
import React from 'react';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import { withRtlSupport } from 'bpk-component-icon';
import { BpkButtonLink } from 'bpk-component-link';

import BpkNavigationBar, { BpkNavigationBarIconButton } from 'bpk-component-navigation-bar';

const ArrowIconWithRtl = withRtlSupport(ArrowIcon);

export default () => (
  <BpkNavigationBar
    title="Backpack"
    leadingButton={
      <BpkNavigationBarIconButton
        onClick={() => {}}
        icon={ArrowIconWithRtl}
        label="back"
      />
    }
    trailingButton={
      <BpkButtonLink onClick={() => {}}>Done</BpkButtonLink>
    }
  />
)
```

#### Props

| Property              | PropType | Required | Default Value    |
| --------------------- | -------- | -------- | ---------------- |
| id                    | string   | true     | -                |
| title                 | string   | true     | -                |
| className             | string   | false    | null             |
| leadingButton         | element  | false    | null             |
| trailingButton        | element  | false    | null             |

### BpkNavigationBarIconButton

```js
import React from 'react';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import { BpkNavigationBarIconButton } from 'bpk-component-navigation-bar';

export default () => (
  <BpkNavigationBarIconButton
    onClick={() => {}}
    icon={ArrowIcon}
    label="back"
  />
)
```

#### Props

| Property              | PropType | Required | Default Value    |
| --------------------- | -------- | -------- | ---------------- |
| icon                  | func     | true     | -                |
| onClick               | func     | true     | -                |
| label                 | string     | true     | -              |
| className             | string   | false    | null             |
