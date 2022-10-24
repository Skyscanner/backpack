# bpk-component-link

> Backpack link component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkLink, { BpkButtonLink } from '@skyscanner/backpack-web/bpk-component-link';

export default () => (
  <div>
    Links can be both <BpkLink href="http://www.skyscanner.net/">anchor tags</BpkLink> as well
    as <BpkButtonLink onClick={() => console.log('link button click!')}>button tags</BpkButtonLink>.
  </div>
)
```

## Single Page App (SPA) Frameworks

If you're using a SPA framework like `react-router-dom` or `Next.js` to navigate between pages without refreshing, then you can wrap `BpkLink` in the component provided by the framework.

[`react-router-dom` `Link` using the `component` prop](https://reactrouter.com/web/api/Link/component-reactcomponent)

[`Next.js` `Link` using a custom component as the child element](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)

## Props

### BpkLink

| Property  | PropType | Required | Default Value |
| --------  | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| href      | string   | true     | -             |
| onClick   | func     | false    | null          |
| blank     | bool     | false    | false         |
| rel       | string   | false    | null          |
| alternate | bool     | false    | false         |

### BpkButtonLink

| Property  | PropType | Required | Default Value |
| --------  | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| onClick   | func     | true     | -             |
| alternate | bool     | false    | false         |

## Theme props

For both BpkLink and BpkButtonLink the following theme attributes are required.

* `linkColor`
* `linkHoverColor`
* `linkActiveColor`
* `linkVisitedColor`

Alternate:

* `linkAlternateColor`
* `linkAlternateHoverColor`
* `linkAlternateActiveColor`
* `linkAlternateVisitedColor`
