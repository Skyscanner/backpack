import {
  DefaultPaginationExample,
  FivePagesPaginationExample,
  TwoPagesPaginationExample,
  SinglePaginationExample,
  VisibleRangeExample,
} from './examples';

export default {
  title: 'bpk-component-pagination',
};

export const PaginationDefault = DefaultPaginationExample;

PaginationDefault.story = {
  name: 'Pagination - default',
};

export const Pagination5VisiblePages = FivePagesPaginationExample;

Pagination5VisiblePages.story = {
  name: 'Pagination - 5 visible pages',
};

export const Pagination2Pages = TwoPagesPaginationExample;

Pagination2Pages.story = {
  name: 'Pagination - 2 pages',
};

export const PaginationSinglePage = SinglePaginationExample;

PaginationSinglePage.story = {
  name: 'Pagination - single page',
};

export const PaginationVisibleExample = VisibleRangeExample;

PaginationVisibleExample.story = {
  name: 'Pagination - Visible example',
};

export const VisualTest = DefaultPaginationExample;

VisualTest.story = {
  name: 'Visual test',
};
