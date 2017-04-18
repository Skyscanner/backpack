import React from 'react';
import { storiesOf } from '@kadira/storybook';

import {
  BpkBarchart,
  BpkBarchartBars,
  BpkBarchartXAxis,
  BpkBarchartYAxis,
  BpkBarchartXGridLines,
  BpkBarchartYGridLines,
} from './index';

const data = [
  {
    value: 10,
    label: 'Label 1',
  },
  {
    value: 5,
    label: 'Label 2',
  },
  {
    value: 20,
    label: 'Label 3',
  },
  {
    value: 8,
    label: 'Label 4',
  },
  {
    value: 9,
    label: 'Label 5',
  },
];

storiesOf('bpk-component-barchart', module).add('Default', () => (
  <BpkBarchart
    data={data}
    xScaleDataKey="label"
    yScaleDataKey="value"
    style={{
      width: '100%',
      height: '300px',
      maxWidth: '500px',
    }}
  >
    <BpkBarchartXGridLines />
    <BpkBarchartYGridLines />
    <BpkBarchartBars
      padding={0.5}
      rounded
      onClick={(e, point) => window.alert(`You clicked on ${point.label}`)} // eslint-disable-line no-alert
    />
    <BpkBarchartXAxis disableLine />
    <BpkBarchartYAxis disableLine />
  </BpkBarchart>
));
