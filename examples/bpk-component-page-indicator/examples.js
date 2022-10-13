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

const PageIndicatorContainer = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <BpkPageIndicator
      currentIndex={currentIndex}
      onClick={(_e, index) => {
        setCurrentIndex(index);
      }}
      {...props}
    />
  );
};

const DefaultExample = () => (
  <PageIndicatorContainer id="default-example" totalBullets={7} />
);

const ThreePagesExample = () => (
  <PageIndicatorContainer id="three-pages-example" totalBullets={3} />
);

const WithNavExample = () => (
  <PageIndicatorContainer id="with-nav-example" totalBullets={7} showNav />
);

const ThreePagesWithNavExample = () => (
  <PageIndicatorContainer
    id="three-pages-with-nav-example"
    totalBullets={3}
    showNav
  />
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
  </>
);

export { DefaultExample, ThreePagesExample, WithNavExample, VisualTestExample };
