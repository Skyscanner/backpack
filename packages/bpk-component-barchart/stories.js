/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import { number } from 'prop-types';
import { storiesOf } from '@storybook/react';
import { cssModules } from 'bpk-react-utils';
import BpkText, { withTextStyle } from 'bpk-component-text';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';
import { lineHeightSm } from 'bpk-tokens/tokens/base.es6';
import { scaleLinear, scaleBand } from 'd3-scale';
import { remToPx } from './src/utils';

import BpkBarchart, {
  BpkChartGridLines,
  BpkChartAxis,
  BpkChartMargin,
} from './index';

import { ORIENTATION_X, ORIENTATION_Y } from './src/orientation';
import { withSelectedState } from './hocs';

import STYLES from './stories.scss';

const getClassName = cssModules(STYLES);

const Heading = withTextStyle(BpkText, 'lg', 'h1', getClassName('bpk-heading'));

const RtlBarchart = updateOnDirectionChange(BpkBarchart);
const SelectableBarChart = withSelectedState(RtlBarchart);

const data = require('./data');

const margin = { top: 0, left: 40, bottom: 40, right: 0 };

const Gridlines = ({ size, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
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

storiesOf('bpk-component-barchart', module)
  .add('Axes and Gridlines', () => {
    const dataset = [
      [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
      [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
    ];
    const size = 440;
    const scale = scaleLinear()
      .domain([5, 480]).range([0, size - 40]);
    const scale2 = scaleBand()
      .domain(dataset.map(d => d[0])).range([0, size - 40]);

    return (
      <div>
        <Heading>Linear scale</Heading>
        <Gridlines
          scale={scale}
          size={size}
        />
        <Gridlines
          scale={scale}
          size={size}
          numTicks={2}
        />
        <Heading>Band scale</Heading>
        <Gridlines
          scale={scale2}
          size={size}
        />
        <Gridlines
          scale={scale2}
          size={size}
          tickEvery={2}
        />
        <Gridlines
          scale={scale2}
          size={size}
          tickEvery={2}
          tickOffset={1}
        />
      </div>
    );
  })
  .add('Default', () => (
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
  ))
  .add('Default disabled data table', () => (
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
  ))
  .add('Interactive', () => (
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
  ))
  .add('Outliers', () => (
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
  ))
  .add('Custom ticks', () => (
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
  ))
  .add('Custom tick labels', () => (
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
      xAxisMargin={(3 * remToPx(lineHeightSm)) + 12}
      xAxisTickValue={(tick) => {
        let season = '❄️';
        if (['Mar', 'Apr', 'May'].indexOf(tick) > -1) { season = '🌻'; }
        if (['Jun', 'Jul', 'Aug'].indexOf(tick) > -1) { season = '☀️'; }
        if (['Sep', 'Oct', 'Nov'].indexOf(tick) > -1) { season = '🍁'; }
        return ([
          <tspan x="0" dy="0" style={{ fontWeight: 'bold' }} key="month">
            {tick}
          </tspan>,
          <tspan x="0" dy={remToPx(lineHeightSm)} key="season">
            { season }
          </tspan>,
          <tspan key="ltr">&lrm;</tspan>,
        ]);
      }}
      yAxisLabel="Average Price"
      yAxisMargin={4 * remToPx(lineHeightSm)}
      yAxisTickValue={v => `£${v}`}
    />
  ))
  .add('Grid lines', () => (
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
  ));
