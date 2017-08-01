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
import BpkLink from 'bpk-component-link';
import { BpkCode } from 'bpk-component-code';
import BpkBarchart from 'bpk-component-barchart';
import { onePixelRem } from 'bpk-tokens/tokens/base.es6';
import { withSelectedState } from 'bpk-component-barchart/hocs';
import barchartReadme from 'bpk-component-barchart/readme.md';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';

import data from 'bpk-component-barchart/data.json';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const EnhancedBarchart = updateOnDirectionChange(BpkBarchart);
const InteractiveBarchart = withSelectedState(EnhancedBarchart);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        By default, bar charts come with axis labels.
      </Paragraph>,
    ],
    examples: [
      <EnhancedBarchart
        initialWidth={500}
        initialHeight={300}
        data={data.prices}
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisMargin={60}
        yAxisLabel="Average price (£)"
        xAxisLabel="Month"
        style={{ minWidth: `calc(500 * ${onePixelRem})` }}
      />,
    ],
  },
  {
    id: 'gridlines',
    title: 'With gridlines',
    blurb: [
      <Paragraph>
        It is possible to show gridlines for each tick on the Y axis.
      </Paragraph>,
    ],
    examples: [
      <EnhancedBarchart
        initialWidth={500}
        initialHeight={300}
        data={data.prices}
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisMargin={60}
        yAxisLabel="Average price (£)"
        xAxisLabel="Month"
        style={{ minWidth: `calc(500 * ${onePixelRem})` }}
        showGridlines
      />,
    ],
  },
  {
    id: 'ineractive',
    title: 'Interactive',
    blurb: [
      <Paragraph>
        The bars can be made interactive using
        the <BpkCode>onBarClick</BpkCode> &amp; <BpkCode>getBarSelection</BpkCode> props.
      </Paragraph>,
    ],
    examples: [
      <InteractiveBarchart
        initialWidth={500}
        initialHeight={300}
        data={data.prices}
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisMargin={60}
        yAxisLabel="Average price (£)"
        xAxisLabel="Month"
        style={{ minWidth: `calc(500 * ${onePixelRem})` }}
      />,
    ],
  },
  {
    id: 'outliers',
    title: 'Outliers',
    blurb: [
      <Paragraph>
        Outliers can be capped to indicate they are far off the scale.
        In this case using <BpkLink href="#outlierpercentage"><BpkCode>outlierPercentage</BpkCode></BpkLink> of 15.
      </Paragraph>,
    ],
    examples: [
      <EnhancedBarchart
        initialWidth={500}
        initialHeight={300}
        data={data.prices}
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisMargin={60}
        yAxisLabel="Average price (£)"
        xAxisLabel="Month"
        style={{ minWidth: `calc(500 * ${onePixelRem})` }}
        outlierPercentage={15}
      />,
    ],
  },
];

const BarchartsPage = () => <DocsPageBuilder
  title="Bar charts"
  blurb={[
    <Paragraph>
      Bar charts are useful for displaying comparisons between categories of data.
      At Skyscanner bar charts are commonly used for displaying fare prices within a
      given time period e.g. a year, month or week.
    </Paragraph>,
    <Paragraph>
      Depending on your need these can be configured to
      show a variety of details such as gridlines, labels and axis.
      They can also be configured to trigger actions on click such as opening a link.
    </Paragraph>,
  ]}
  components={components}
  readme={barchartReadme}
/>;

export default BarchartsPage;
