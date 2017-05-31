// scrolling begthavor
// color states
// show example of rounded corners being the height of the smallest
// RTL and accessibility (somethign backpack could do)

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkContentContainer from 'bpk-component-content-container';
import BpkHeading from 'bpk-component-heading';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';
import { lineHeightSm } from 'bpk-tokens/tokens/base.es6';
import { scaleLinear, scaleBand } from 'd3-scale';

import {
  BpkBarchart,
  // BpkBarchartBars,
  BpkChartGridLines,
  BpkChartAxis,
  BpkChartMargin,
  // BpkChartTitle,
} from './index';

import { ORIENTATION_X, ORIENTATION_Y } from './src/orientation';

const unitless = x => parseFloat(x.replace(/[r?em,px]/, ''));
const EnhancedBarchart = updateOnDirectionChange(BpkBarchart);

console.log(unitless(lineHeightSm) * 16);

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
  .add('Axes', () => {
    const dataset = [
      [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
      [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
    ];
    const width = 400;
    const scale = scaleLinear()
      .domain([5, 480]).range([0, width]);
    const scale2 = scaleBand()
      .domain(dataset.map(d => d[0])).range([0, width]);

    return (
      <div>
        <BpkHeading level="h2">X axis</BpkHeading>
        <BpkHeading level="h3">Linear scale</BpkHeading>
        <BpkHeading level="h4">Default</BpkHeading>
        <Axis
          orientation={ORIENTATION_X}
          width={width}
          scale={scale}
          height={20}
        />
        <BpkHeading level="h4">Custom number of ticks</BpkHeading>
        <Axis
          orientation={ORIENTATION_X}
          width={width}
          scale={scale}
          height={20}
          numTicks={4}
        />
        <BpkHeading level="h3">Band scale</BpkHeading>
        <BpkHeading level="h4">Default</BpkHeading>
        <Axis
          orientation={ORIENTATION_X}
          width={width}
          scale={scale2}
          height={20}
        />
        <BpkHeading level="h4">Every nth tick</BpkHeading>
        <Axis
          orientation={ORIENTATION_X}
          width={width}
          scale={scale2}
          height={20}
          tickEvery={2}
        />
        <BpkHeading level="h4">Every nth tick with offset</BpkHeading>
        <Axis
          orientation={ORIENTATION_X}
          width={width}
          scale={scale2}
          height={20}
          tickEvery={2}
          tickOffset={1}
        />

        <BpkHeading level="h2">Y axis</BpkHeading>
        <BpkHeading level="h3">Linear scale</BpkHeading>
        <BpkHeading level="h4">Default</BpkHeading>
        <Axis
          orientation={ORIENTATION_Y}
          width={80}
          scale={scale}
          height={width}
        />
        <BpkHeading level="h4">Custom number of ticks</BpkHeading>
        <Axis
          orientation={ORIENTATION_Y}
          width={80}
          scale={scale}
          height={width}
          numTicks={4}
        />
        <BpkHeading level="h3">Band scale</BpkHeading>
        <BpkHeading level="h4">Default</BpkHeading>
        <Axis
          orientation={ORIENTATION_Y}
          width={80}
          scale={scale2}
          height={width}
        />
        <BpkHeading level="h4">Every nth tick</BpkHeading>
        <Axis
          orientation={ORIENTATION_Y}
          width={80}
          scale={scale2}
          height={width}
          tickEvery={2}
        />
        <BpkHeading level="h4">Every nth tick with offset</BpkHeading>
        <Axis
          orientation={ORIENTATION_Y}
          width={80}
          scale={scale2}
          height={width}
          tickEvery={2}
          tickOffset={1}
        />
      </div>
    );
  })
  .add('Gridlines', () => {
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
        <Gridlines
          scale={scale}
          size={size}
        />
        <Gridlines
          scale={scale}
          size={size}
          numTicks={2}
        />
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
  .add('Axis and tick labels', () => (
    <EnhancedBarchart
      width={500}
      height={300}
      data={data.example1}
      xScaleDataKey="label"
      yScaleDataKey="value"
      margin={{
        top: 0,
        right: 0,
        bottom: 60,
        left: 60,
      }}
      style={{
        width: '100%',
        maxWidth: '580px',
        height: '300px',
      }}
      yAxisTickValue={v => `${v}%`}
      yAxisLabel="Percentage of stuff"
      xAxisTickValue={tick => (
        <tspan>
          <tspan x="0" y="0" style={{ fontWeight: 'bold' }}>
            {tick}
          </tspan>
          <tspan x="0" y={unitless(lineHeightSm) * 16}>
            {parseInt(tick, 10) <= Math.floor(data.length / 2) ? 'Low' : 'High'}
          </tspan>
        </tspan>
      )}
      xAxisLabel="Stuff"
    />
  ))
  .add('Grid lines', () => (
    <BpkContentContainer>
      <BpkHeading level="h2">X Grid lines</BpkHeading>
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
        showVerticalGridlines
      />
      <BpkHeading level="h2">Y Grid lines</BpkHeading>
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
        showHorizontalGridlines
      />
      <BpkHeading level="h2">Combined grid lines</BpkHeading>
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
        showVerticalGridlines
        showHorizontalGridlines
      />
    </BpkContentContainer>
  ))
  .add('Mobile', () => (
    <div>
      <p>Make your window smaller</p>
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {isActive => isActive && getMobileChart(2)}
      </BpkBreakpoint>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
        {isActive => isActive && getMobileChart()}
      </BpkBreakpoint>
    </div>
  ));
