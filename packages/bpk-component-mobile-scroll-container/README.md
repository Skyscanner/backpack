# bpk-component-mobile-scroll-container

> Backpack mobile scroll container component.

## Installation

```sh
npm install bpk-component-mobile-scroll-container --save-dev
```

## Usage

```js
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';

import STYLES from './MyComponent.scss';

const getClassName = cssModules(STYLES);

export default () => (
  <BpkMobileScrollContainer>
    <div className={getClassName('my-component')}>
      {new Array(10).fill().map((item, index) => {
        const classNames = ['my-component__item'];

        if (index % 2 === 0) {
          classNames.push('my-component__item--alternate');
        }

        return (
          <div key={index} className={classNames.map(getClassName).join(' ')}>
            {index}
          </div>
        );
      })}
    </div>
  </BpkMobileScrollContainer>
);
```

*MyComponent.scss:*
```scss
@import '~bpk-mixins/index';

.my-component {
  display: flex;

  &__item {
    display: flex;
    min-width: $bpk-spacing-xxl * 5;
    height: $bpk-spacing-xxl * 5;
    justify-content: center;
    align-items: center;
    background-color: $bpk-color-gray-50;

    &--alternate {
      background-color: $bpk-color-gray-100;
    }
  }
}
```

## Props

| Property                    | PropType | Required | Default Value |
| --------------------------- | -------- | -------- | ------------- |
| children                    | node     | true     | -             |
| className                   | string   | false    | null          |
| leadingIndicatorClassName   | string   | false    | null          |
| trailingIndicatorClassName  | string   | false    | null          |

