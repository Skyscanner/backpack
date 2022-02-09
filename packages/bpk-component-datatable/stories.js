import {
  AutowidthExample,
  NonHoverRows,
  FixedWidth,
  DisabledSort,
  CustomRowAndHeaderHeights,
} from './examples';

export default {
  title: 'bpk-component-datatable',
};

export const _AutowidthExample = AutowidthExample;
export const RowsNotHoverable = NonHoverRows;

RowsNotHoverable.story = {
  name: 'Rows not hoverable',
};

export const FixedWidthExample = FixedWidth;
export const DisabledSortExample = DisabledSort;
export const _CustomRowAndHeaderHeights = CustomRowAndHeaderHeights;

_CustomRowAndHeaderHeights.story = {
  name: 'Custom row and header heights',
};

export const VisualTest = AutowidthExample;

VisualTest.story = {
  name: 'Visual test',
};
