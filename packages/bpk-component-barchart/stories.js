import {
  AxesAndGridlines,
  DefaultExample,
  CustomScrollColors,
  DefaultDisabledDataTable,
  Interactive,
  Outliers,
  CustomTicks,
  CustomTickLabels,
  GridlinesExample,
  CustomYAxisDomain,
} from './examples';

export default {
  title: 'bpk-component-barchart',
};

export const _AxesAndGridlines = AxesAndGridlines;

_AxesAndGridlines.story = {
  name: 'Axes and Gridlines',
};

export const Default = DefaultExample;
export const UsingCustomScrollColours = CustomScrollColors;

UsingCustomScrollColours.story = {
  name: 'Using custom scroll colours',
};

export const _DefaultDisabledDataTable = DefaultDisabledDataTable;

_DefaultDisabledDataTable.story = {
  name: 'Default disabled data table',
};

export const _Interactive = Interactive;
export const _Outliers = Outliers;
export const _CustomTicks = CustomTicks;

_CustomTicks.story = {
  name: 'Custom ticks',
};

export const _CustomTickLabels = CustomTickLabels;

_CustomTickLabels.story = {
  name: 'Custom tick labels',
};

export const GridLines = GridlinesExample;

GridLines.story = {
  name: 'Grid lines',
};

export const _CustomYAxisDomain = CustomYAxisDomain;

_CustomYAxisDomain.story = {
  name: 'Custom yAxisDomain',
};

export const VisualTest = DefaultExample;

VisualTest.story = {
  name: 'Visual test',
};
