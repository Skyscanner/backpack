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

import {
  BpkBarchart,
  BpkBarchartTitle,
  BpkBarchartBars,
  BpkBarchartXAxis,
  BpkBarchartYAxis,
  BpkBarchartXGridLines,
  BpkBarchartYGridLines,
  BpkBarchartYAxisLabel,
  BpkBarchartXAxisLabel,
} from './index';

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
  >
    <BpkBarchartBars />
    <BpkBarchartXAxis
      tickEvery={tickEvery}
      tickValue={tick => `Label ${tick}`}
    />
    <BpkBarchartYAxis />
  </EnhancedBarchart>
);

storiesOf('bpk-component-barchart', module)
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
    >
      <BpkBarchartXAxis />
      <BpkBarchartYAxis />
      <BpkBarchartBars />
    </EnhancedBarchart>
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
    >
      <BpkBarchartTitle>Chart title</BpkBarchartTitle>
      <BpkBarchartXAxis />
      <BpkBarchartYAxis />
      <BpkBarchartBars />
    </EnhancedBarchart>
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
    >
      <BpkBarchartXAxis />
      <BpkBarchartYAxis />
      <BpkBarchartBars />
    </EnhancedBarchart>
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
    >
      <BpkBarchartXAxis tickEvery={2} tickOffset={1} />
      <BpkBarchartYAxis ticks={3} />
      <BpkBarchartBars />
    </EnhancedBarchart>
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
    >
      <BpkBarchartXAxis
        tickValue={tick => (
          <tspan>
            <tspan x="0" y="0">
              {tick}
            </tspan>
            <tspan x="0" y="16">
              {tick <= Math.floor(data.length / 2) ? 'Low' : 'High'}
            </tspan>
          </tspan>
        )}
      >
        <BpkBarchartXAxisLabel>X Axis Label</BpkBarchartXAxisLabel>
      </BpkBarchartXAxis>
      <BpkBarchartYAxis tickValue={tick => `${tick}%`}>
        <BpkBarchartYAxisLabel>Y Axis Label</BpkBarchartYAxisLabel>
      </BpkBarchartYAxis>
      <BpkBarchartBars />
    </EnhancedBarchart>
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
      >
        <BpkBarchartXAxis />
        <BpkBarchartYAxis />
        <BpkBarchartXGridLines />
        <BpkBarchartBars />
      </EnhancedBarchart>
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
      >
        <BpkBarchartXAxis />
        <BpkBarchartYAxis />
        <BpkBarchartYGridLines />
        <BpkBarchartBars />
      </EnhancedBarchart>
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
      >
        <BpkBarchartXAxis />
        <BpkBarchartYAxis />
        <BpkBarchartXGridLines />
        <BpkBarchartYGridLines />
        <BpkBarchartBars />
      </EnhancedBarchart>
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
