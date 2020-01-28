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

import BpkNavigationBar, { BpkNavigationBarIconButton, BpkNavigationBarButtonLink } from 'bpk-component-navigation-bar';

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
      <BpkNavigationBarButtonLink onClick={() => {}}>Done</BpkNavigationBarButtonLink>
    }
  />
)
```

#### Props

| Property              | PropType | Required | Default Value    |
| --------------------- | -------- | -------- | ---------------- |
| id                    | string   | true     | -                |
| title                 | node     | true     | -                |
| className             | string   | false    | null             |
| leadingButton         | element  | false    | null             |
| trailingButton        | element  | false    | null             |

#### Theme props

* `navigationBarBackgroundColor`
* `navigationBarTitleColor`

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

#### Theme props

* `navigationBarIconButtonColor`
* `navigationBarIconButtonActiveColor`
* `navigationBarIconButtonHoverColor`

### BpkNavigationBarButtonLink

```js
import React from 'react';
import { BpkNavigationBarButtonLink } from 'bpk-component-navigation-bar';

export default () => (
  <BpkNavigationBarButtonLink onClick={() => {}}>
    Done
  </BpkNavigationBarButtonLink>
)
```

#### Props

| Property              | PropType | Required | Default Value    |
| --------------------- | -------- | -------- | ---------------- |
| children              | node     | true     | -                |
| onClick               | func     | true     | -                |
| className             | string   | false    | null             |

#### Theme props

* `navigationBarButtonLinkColor`
* `navigationBarButtonLinkActiveColor`
* `navigationBarButtonLinkHoverColor`
* `navigationBarButtonLinkVisitedColor`
