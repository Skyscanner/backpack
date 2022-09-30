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

import React, { useState } from 'react';

import BpkPageIndicator from '../../packages/bpk-component-page-indicator';
import { BpkDarkExampleWrapper } from '../../packages/bpk-storybook-utils';

const PageIndicatorContainer = (props) => {
  const [currentItem, setCurrentItem] = useState(0);

  return (
    <BpkPageIndicator
      currentItem={currentItem}
      updateItemCallback={setCurrentItem}
      {...props}
    />
  );
};

const DefaultExample = () => (
  <PageIndicatorContainer id="default-example" totalItems={7} />
);

const ThreePagesExample = () => (
  <PageIndicatorContainer id="no-scroll-example" totalItems={3} />
);

const WithNavExample = () => (
  <PageIndicatorContainer id="with-nav-example" totalItems={7} showNav />
);

const ThreePagesWithNavExample = () => (
  <PageIndicatorContainer
    id="no-scroll-with-nav-example"
    totalItems={3}
    showNav
  />
);

const OnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <PageIndicatorContainer id="on-dark-example" totalItems={7} showNav dark />
  </BpkDarkExampleWrapper>
);

const VisualTestExample = () => (
  <>
    <DefaultExample />
    <ThreePagesExample />
    <WithNavExample />
    <ThreePagesWithNavExample />
    <div style={{ width: '50%' }}>
      <WithNavExample />
    </div>
    <OnDarkExample />
  </>
);

export {
  DefaultExample,
  ThreePagesExample,
  WithNavExample,
  OnDarkExample,
  VisualTestExample,
};
