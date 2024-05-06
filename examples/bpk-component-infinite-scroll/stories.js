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
import { WithInfiniteScrollMock as withInfiniteScroll } from './stories-utils';

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
  component: withInfiniteScroll,
  decorators: [withScrollReset],
};

export const Default = DefaultExample;
export const PartialLoadLoadMoreAfter15Items = StoppingAfterScrollsExample;

export const InfiniteListOfElements = InfiniteListOfElementsExample;

export const DifferentNoElementsOnLoadAndOnScroll =
  DifferentNumElementsOnLoadAndScrollExample;

export const Load1ElementPerScroll = LoadOneElementPerScrollExample;

export const CustomLoadingItem = CustomLoadingItemExample;

export const ForceUpdateData = ForceUpdateDataExample;

export const ForceUpdateDataEmptyArrayAndSeeMoreAfter =
  ForceUpdateDataExampleEmptyArrayExample;

export const ForceUpdateDataFromNonEmptyToEmpty =
  ForceUpdateDataExampleFromNonEmptyToEmptyExample;

export const InferDatasourceCompleteWhenLessThanRequestElementsRetrunedByDatasource =
  InferDatasourceWhenLessThanRequestElementsExample;
