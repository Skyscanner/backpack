# bpk-component-link

> Backpack link component.

## Installation

```sh
npm install bpk-component-link --save-dev
```

## Usage

```js
import React from 'react';
import BpkLink, { BpkButtonLink } from 'bpk-component-link';

export default () => (
  <div>
    Links can be both <BpkLink href="http://www.skyscanner.net/">anchor tags</BpkLink> as well
    as <BpkButtonLink onClick={() => console.log('link button click!')}>button tags</BpkButtonLink>.
  </div>
)
```

## Props

### BpkLink

| Property  | PropType | Required | Default Value |
| --------  | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| href      | string   | true     | -             |
| onClick   | func     | false    | null          |
| blank     | bool     | false    | false         |
| alternate | bool     | false    | false         |

### BpkLinkButton

| Property  | PropType | Required | Default Value |
| --------  | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| onClick   | func     | true     | -             |
| alternate | bool     | false    | false         |

## Theme props

For both BpkLink and BpkLinkButton the following theme attributes are required.

* `linkColor`
* `linkHoverColor`
* `linkActiveColor`
* `linkVisitedColor`

Alternate:

* `linkAlternateColor`
* `linkAlternateHoverColor`
* `linkAlternateActiveColor`
* `linkAlternateVisitedColor`
