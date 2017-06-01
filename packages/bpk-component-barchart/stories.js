// scrolling begthavor
// color states
// show example of rounded corners being the height of the smallest
// RTL and accessibility (somethign backpack could do)

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkHeading from 'bpk-component-heading';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';
import { lineHeightSm } from 'bpk-tokens/tokens/base.es6';
import { scaleLinear, scaleBand } from 'd3-scale';
import { remToPx } from './src/utils';

import {
  BpkBarchart,
  BpkChartGridLines,
  BpkChartAxis,
  BpkChartMargin,
} from './index';

import { ORIENTATION_X, ORIENTATION_Y } from './src/orientation';

const EnhancedBarchart = updateOnDirectionChange(BpkBarchart);

const data = require('./data');

const getMobileChart = tickEvery => (
  <EnhancedBarchart
    height={300}
    data={data.example1}
    xScaleDataKey="label"
    yScaleDataKey="value"
    style={{
      width: '100%',
      maxWidth: '700px',
      minWidth: '100px',
    }}
    margin={{
      top: 5,
      right: 0,
      bottom: 20,
      left: 20,
    }}
    tickEvery={tickEvery}
  />
);

const Axis = ({ scale, width, height, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <BpkChartMargin
      margin={{ top: 0, left: 40, bottom: 20, right: 0 }}
    >
      <BpkChartAxis
        height={height}
        margin={{ top: 0, left: 40, bottom: 20, right: 0 }}
        width={width}
        scale={scale}
        {...rest}
      />
    </BpkChartMargin>
  </svg>
);

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
        <BpkHeading level="h3">Linear scale</BpkHeading>
        <Gridlines
          scale={scale}
          size={size}
        />
        <Gridlines
          scale={scale}
          size={size}
          numTicks={2}
        />
        <BpkHeading level="h3">Band scale</BpkHeading>
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
    <EnhancedBarchart
      width={500}
      height={300}
      data={data.example1}
      xScaleDataKey="label"
      yScaleDataKey="value"
      margin={{
        top: 0,
        right: 0,
        bottom: 20,
        left: 20,
      }}
      style={{
        width: '100%',
        maxWidth: '580px',
        height: '300px',
      }}
    />
  ))
  .add('Title', () => (
    <EnhancedBarchart
      width={580}
      height={300}
      data={data.example1}
      xScaleDataKey="label"
      yScaleDataKey="value"
      margin={{
        top: 40,
        right: 60,
        bottom: 20,
        left: 30,
      }}
      style={{
        width: '100%',
        maxWidth: '580px',
        height: '300px',
      }}
      title="Chart title"
    />
  ))
  .add('Outliers', () => (
    <EnhancedBarchart
      width={500}
      height={300}
      data={data.example2}
      xScaleDataKey="label"
      yScaleDataKey="value"
      margin={{
        top: 0,
        right: 0,
        bottom: 20,
        left: 20,
      }}
      style={{
        width: '100%',
        maxWidth: '580px',
        height: '300px',
      }}
      outlierPercentage={40}
    />
  ))
  .add('Custom ticks', () => (
    <EnhancedBarchart
      width={500}
      height={300}
      data={data.example1}
      xScaleDataKey="label"
      yScaleDataKey="value"
      margin={{
        top: 0,
        right: 0,
        bottom: 20,
        left: 20,
      }}
      style={{
        width: '100%',
        maxWidth: '580px',
        height: '300px',
      }}
      yAxisNumTicks={3}
      xAxisTickEvery={2}
      xAxisTickOffset={1}
    />
  ))
  .add('Custom tick labels', () => (
    <EnhancedBarchart
      width={500}
      height={300}
      data={data.continentCountries}
      xScaleDataKey="continent"
      yScaleDataKey="countries"
      xAxisMargin={3 * remToPx(lineHeightSm) + 6 + 6}
      style={{
        width: '100%',
        maxWidth: '580px',
        height: '300px',
      }}
      yAxisTickValue={v => `${v}%`}
      yAxisLabel="No. of countries"
      xAxisTickValue={tick => (
        <tspan>
          <tspan x="0" y={remToPx(lineHeightSm)} style={{ fontWeight: 'bold' }}>
            {tick}
          </tspan>
          <tspan x="0" y={remToPx(lineHeightSm) * 2}>
            {parseInt(tick, 10) <= Math.floor(data.length / 2) ? 'Low' : 'High'}
          </tspan>
        </tspan>
      )}
      xAxisLabel="Continents"
    />
  ))
  .add('Grid lines', () => (
    <EnhancedBarchart
      width={500}
      height={300}
      data={data.example1}
      xScaleDataKey="label"
      yScaleDataKey="value"
      style={{
        width: '100%',
        maxWidth: '580px',
        height: '300px',
      }}
      xAxisLabel="Things"
      yAxisLabel="Foo bars"
      showGridlines
    />
  ));
