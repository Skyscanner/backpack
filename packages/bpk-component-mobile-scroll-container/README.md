# bpk-component-mobile-scroll-container

> Backpack mobile scroll container component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';
import BpkMobileScrollContainer from '@skyscanner/backpack-web/bpk-component-mobile-scroll-container';

import * as STYLES from './MyComponent.scss';

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

*`MyComponent.scss`:*
```scss
@import '~@skyscanner/backpack-web/bpk-mixins/index.scss';

.my-component {
  display: flex;

  &__item {
    display: flex;
    min-width: bpk-spacing-xxl() * 5;
    height: bpk-spacing-xxl() * 5;
    justify-content: center;
    align-items: center;
    background-color: $bpk-color-sky-gray-tint-07;

    &--alternate {
      background-color: $bpk-color-sky-gray-tint-06;
    }
  }
}
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/mobile-scroll-container/web-4MvMmFv1#section-props-7c).
