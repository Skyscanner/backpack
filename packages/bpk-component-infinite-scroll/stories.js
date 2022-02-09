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

PartialLoadLoadMoreAfter15Items.story = {
  name: 'Partial load - load more after 15 items',
};

export const InfiniteListOfElements = InfiniteListOfElementsExample;

InfiniteListOfElements.story = {
  name: 'Infinite list of elements',
};

export const DifferentNoElementsOnLoadAndOnScroll =
  DifferentNumElementsOnLoadAndScrollExample;

DifferentNoElementsOnLoadAndOnScroll.story = {
  name: 'Different no. elements on load and on scroll',
};

export const Load1ElementPerScroll = LoadOneElementPerScrollExample;

Load1ElementPerScroll.story = {
  name: 'Load 1 element per scroll',
};

export const CustomLoadingItem = CustomLoadingItemExample;

CustomLoadingItem.story = {
  name: 'Custom loading Item',
};

export const ForceUpdateData = ForceUpdateDataExample;

ForceUpdateData.story = {
  name: 'Force update data',
};

export const ForceUpdateDataEmptyArrayAndSeeMoreAfter =
  ForceUpdateDataExampleEmptyArrayExample;

ForceUpdateDataEmptyArrayAndSeeMoreAfter.story = {
  name: 'Force update data - Empty array and see more after',
};

export const ForceUpdateDataFromNonEmptyToEmpty =
  ForceUpdateDataExampleFromNonEmptyToEmptyExample;

ForceUpdateDataFromNonEmptyToEmpty.story = {
  name: 'Force update data - From non empty to empty',
};

export const InferDatasourceCompleteWhenLessThanRequestElementsRetrunedByDatasource =
  InferDatasourceWhenLessThanRequestElementsExample;

InferDatasourceCompleteWhenLessThanRequestElementsRetrunedByDatasource.story = {
  name: 'Infer datasource complete when less than request elements retruned by datasource',
};
