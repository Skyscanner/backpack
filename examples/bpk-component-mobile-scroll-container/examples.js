/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow strict */

import BpkMobileScrollContainer from '../../packages/bpk-component-mobile-scroll-container';
import { cssModules } from '../../packages/bpk-react-utils';

import * as STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const ScrollExampleBlock = () => (
  <div className={getClassName('bpk-scroll-block')}>
    {new Array(10).fill().map((props, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={getClassName(
          'bpk-scroll-block__item',
          index % 2 === 0 && 'bpk-scroll-block__item--alternate',
        )}
      >
        {index}
      </div>
    ))}
  </div>
);

const DefaultExample = () => (
  <BpkMobileScrollContainer>
    <ScrollExampleBlock />
  </BpkMobileScrollContainer>
);

const WithVisibleScrollbarExample = () => (
  <BpkMobileScrollContainer showScrollbar>
    <ScrollExampleBlock />
  </BpkMobileScrollContainer>
);

const SettingLeadingAndTrailingIndicatorClassNameExample = () => (
  <BpkMobileScrollContainer
    leadingIndicatorClassName={getClassName(
      'bpk-stories-mobile-scroll-container__leading-indicator',
    )}
    trailingIndicatorClassName={getClassName(
      'bpk-stories-mobile-scroll-container__trailing-indicator',
    )}
  >
    <ScrollExampleBlock />
  </BpkMobileScrollContainer>
);

export {
  DefaultExample,
  WithVisibleScrollbarExample,
  SettingLeadingAndTrailingIndicatorClassNameExample,
};
