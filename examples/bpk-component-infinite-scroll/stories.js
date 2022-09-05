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

export default {
  title: 'bpk-component-infinite-scroll',
  decorators: [withScrollReset],
};

export const Default = DefaultExample;
export const PartialLoadLoadMoreAfter15Items = StoppingAfterScrollsExample;

PartialLoadLoadMoreAfter15Items.storyName = 'Partial load - load more after 15 items';

export const InfiniteListOfElements = InfiniteListOfElementsExample;

InfiniteListOfElements.storyName = 'Infinite list of elements';

export const DifferentNoElementsOnLoadAndOnScroll =
  DifferentNumElementsOnLoadAndScrollExample;

DifferentNoElementsOnLoadAndOnScroll.storyName = 'Different no. elements on load and on scroll';

export const Load1ElementPerScroll = LoadOneElementPerScrollExample;

Load1ElementPerScroll.storyName = 'Load 1 element per scroll';

export const CustomLoadingItem = CustomLoadingItemExample;

CustomLoadingItem.storyName = 'Custom loading Item';

export const ForceUpdateData = ForceUpdateDataExample;

ForceUpdateData.storyName = 'Force update data';

export const ForceUpdateDataEmptyArrayAndSeeMoreAfter =
  ForceUpdateDataExampleEmptyArrayExample;

ForceUpdateDataEmptyArrayAndSeeMoreAfter.storyName = 'Force update data - Empty array and see more after';

export const ForceUpdateDataFromNonEmptyToEmpty =
  ForceUpdateDataExampleFromNonEmptyToEmptyExample;

ForceUpdateDataFromNonEmptyToEmpty.storyName = 'Force update data - From non empty to empty';

export const InferDatasourceCompleteWhenLessThanRequestElementsRetrunedByDatasource =
  InferDatasourceWhenLessThanRequestElementsExample;

InferDatasourceCompleteWhenLessThanRequestElementsRetrunedByDatasource.storyName = 'Infer datasource complete when less than request elements retruned by datasource';
