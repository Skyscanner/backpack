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

import { number } from 'prop-types';

import { scaleLinear, scaleBand } from 'd3-scale';

import { lineHeightSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBarchart, {
  BpkChartGridLines,
  BpkChartAxis,
  BpkChartMargin,

  ORIENTATION_X,
  ORIENTATION_Y, remToPx } from '../../packages/bpk-component-barchart';
import { updateOnDirectionChange } from '../../packages/bpk-component-rtl-toggle';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';

import { withSelectedState } from './hocs';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Heading = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.subheading,
  tagName: 'h1',
  className: getClassName('bpk-heading'),
});

const RtlBarchart = updateOnDirectionChange(BpkBarchart);
const SelectableBarChart = withSelectedState(RtlBarchart);

const data = require('./data.json');

const margin = {
  top: 0,
  left: 40,  
  bottom: 40,  
  right: 0,
};

const Gridlines = ({ size, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    <BpkChartMargin margin={margin}>
      <BpkChartAxis
        orientation={ORIENTATION_X}
        height={size}
        width={size}
        margin={margin}
        {...rest}
      />
      <BpkChartAxis
        orientation={ORIENTATION_Y}
        width={size}
        height={size}
        margin={margin}
        {...rest}
      />
      <BpkChartGridLines
        orientation={ORIENTATION_X}
        width={size}
        height={size}
        margin={margin}
        {...rest}
      />
      <BpkChartGridLines
        orientation={ORIENTATION_Y}
        width={size}
        height={size}
        margin={margin}
        {...rest}
      />
    </BpkChartMargin>
  </svg>
);

Gridlines.propTypes = { size: number.isRequired };

const AxesAndGridlinesExample = () => {
  const dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
  ];
  const size = 440;
  const scale = scaleLinear()
    .domain([5, 480])
    .range([0, size - 40]);
  const scale2 = scaleBand()
    .domain(dataset.map((d) => d[0]))
    .range([0, size - 40]);

  return (
    <div>
      <Heading>Linear scale</Heading>
      <Gridlines scale={scale} size={size} />
      <Gridlines scale={scale} size={size} numTicks={2} />
      <Heading>Band scale</Heading>
      <Gridlines scale={scale2} size={size} />
      <Gridlines scale={scale2} size={size} tickEvery={2} />
      <Gridlines scale={scale2} size={size} tickEvery={2} tickOffset={1} />
    </div>
  );
};

const DefaultExample = () => (
  <RtlBarchart
    initialWidth={500}
    initialHeight={300}
    data={data.prices}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
      minWidth: '400px',
    }}
    xAxisLabel="Month"
    yAxisLabel="Average Price (£)"
  />
);

const CustomScrollColorsExample = () => (
  <RtlBarchart
    initialWidth={500}
    initialHeight={300}
    data={data.prices}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
      minWidth: '400px',
    }}
    xAxisLabel="Month"
    yAxisLabel="Average Price (£)"
    className={getClassName('bpk-barchart-custom-scrollers')}
    leadingScrollIndicatorClassName={getClassName(
      'bpk-barchart-custom-scrollers--leading',
    )}
    trailingScrollIndicatorClassName={getClassName(
      'bpk-barchart-custom-scrollers--trailing',
    )}
  />
);

const DefaultDisabledDataTableExample = () => (
  <RtlBarchart
    initialWidth={500}
    initialHeight={300}
    data={data.prices}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
      minWidth: '400px',
    }}
    xAxisLabel="Month"
    yAxisLabel="Average Price (£)"
    disableDataTable
  />
);

const InteractiveExample = () => (
  <SelectableBarChart
    initialWidth={500}
    initialHeight={300}
    data={data.prices}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
      minWidth: '400px',
    }}
    xAxisLabel="Month"
    yAxisLabel="Average Price (£)"
  />
);

const OutliersExample = () => (
  <RtlBarchart
    initialWidth={500}
    initialHeight={300}
    data={data.prices2}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
    }}
    xAxisLabel="Month"
    yAxisLabel="Average Price (£)"
    outlierPercentage={25}
  />
);

const CustomTicksExample = () => (
  <RtlBarchart
    initialWidth={500}
    initialHeight={300}
    data={data.prices}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
    }}
    xAxisLabel="Month"
    yAxisLabel="Average Price (£)"
    yAxisNumTicks={3}
    xAxisTickEvery={2}
    xAxisTickOffset={1}
  />
);

const CustomTickLabelsExample = () => (
  <RtlBarchart
    initialWidth={500}
    initialHeight={300}
    data={data.prices}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
    }}
    xAxisLabel="Month"
    xAxisMargin={3 * remToPx(lineHeightSm) + 12}
    xAxisTickValue={(tick) => {
      let season = '❄️';
      if (['Mar', 'Apr', 'May'].indexOf(tick) > -1) {
        season = '🌻';
      }
      if (['Jun', 'Jul', 'Aug'].indexOf(tick) > -1) {
        season = '☀️';
      }
      if (['Sep', 'Oct', 'Nov'].indexOf(tick) > -1) {
        season = '🍁';
      }
      return [
        <tspan x="0" dy="0" style={{ fontWeight: 'bold' }} key="month">
          {tick}
        </tspan>,
        <tspan x="0" dy={remToPx(lineHeightSm)} key="season">
          {season}
        </tspan>,
        <tspan key="ltr">&lrm;</tspan>,
      ];
    }}
    yAxisLabel="Average Price"
    yAxisMargin={4 * remToPx(lineHeightSm)}
    yAxisTickValue={(v) => `£${v}`}
  />
);

const GridlinesExample = () => (
  <RtlBarchart
    initialWidth={500}
    initialHeight={300}
    data={data.prices}
    xScaleDataKey="month"
    yScaleDataKey="price"
    style={{
      maxWidth: '580px',
    }}
    xAxisLabel="Month"
    yAxisLabel="Average Price (£)"
    showGridlines
  />
);

const CustomYAxisDomainExample = () => (
  <div>
    <Heading>Domain (0 - 800)</Heading>
    <RtlBarchart
      initialWidth={500}
      initialHeight={300}
      data={data.prices}
      xScaleDataKey="month"
      yScaleDataKey="price"
      style={{
        maxWidth: '580px',
      }}
      showGridlines
      yAxisDomain={[0, 800]}
    />
    <Heading>Domain (300 - null)</Heading>
    <RtlBarchart
      initialWidth={500}
      initialHeight={300}
      data={data.prices}
      xScaleDataKey="month"
      yScaleDataKey="price"
      style={{
        maxWidth: '580px',
      }}
      showGridlines
      yAxisDomain={[300, null]}
    />
  </div>
);

export {
  AxesAndGridlinesExample,
  DefaultExample,
  CustomScrollColorsExample,
  DefaultDisabledDataTableExample,
  InteractiveExample,
  OutliersExample,
  CustomTicksExample,
  CustomTickLabelsExample,
  GridlinesExample,
  CustomYAxisDomainExample,
};
