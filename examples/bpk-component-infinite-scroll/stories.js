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

import { storiesOf } from '@storybook/react';

import {
  DefaultExample,
  StoppingAfterScrollsExample,
  InfiniteListOfElementsExample,
  DifferentNumElementsOnLoadAndScrollExample,
  LoadOneElementPerScrollExample,
  CustomLoadingItemExample,
  ForceUpdateDataExample,
  ForceUpdateDataExampleEmptyArrayExample,
  ForceUpdateDataExampleFromNonEmptyToEmptyExample,
  InferDatasourceWhenLessThanRequestElementsExample,
} from './examples';

/*
 * Scrolls back to the top before rendering the story.
 * We do this because when stories change the scroll position will (probably) be
 * at the botton, which will cause the next story to load all items up to that position.
 * That is not a problem but we want each story to start with a clean state.
 */
const withScrollReset = (story) => {
  window.scrollTo(0, 0);
  return story();
};

storiesOf('bpk-component-infinite-scroll', module)
  .addDecorator(withScrollReset)
  .add('Default', DefaultExample)
  .add('Partial load - load more after 15 items', StoppingAfterScrollsExample)
  .add('Infinite list of elements', InfiniteListOfElementsExample)
  .add(
    'Different no. elements on load and on scroll',
    DifferentNumElementsOnLoadAndScrollExample,
  )
  .add('Load 1 element per scroll', LoadOneElementPerScrollExample)
  .add('Custom loading Item', CustomLoadingItemExample)
  .add('Force update data', ForceUpdateDataExample)
  .add(
    'Force update data - Empty array and see more after',
    ForceUpdateDataExampleEmptyArrayExample,
  )
  .add(
    'Force update data - From non empty to empty',
    ForceUpdateDataExampleFromNonEmptyToEmptyExample,
  )
  .add(
    'Infer datasource complete when less than request elements retruned by datasource',
    InferDatasourceWhenLessThanRequestElementsExample,
  );
