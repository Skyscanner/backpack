import React from 'react';
import BpkBarchart from 'bpk-component-barchart';
import BpkParagraph from 'bpk-component-paragraph';

import barchartReadme from 'bpk-component-barchart/readme.md';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';
import data from 'bpk-component-barchart/data.json';

import './barcharts-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const EnhancedBarchart = updateOnDirectionChange(BpkBarchart);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        CHART CHART CHART
      </BpkParagraph>,
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
        showGridlines
      />,
    ],
  },
];

const BarchartsPage = () => <DocsPageBuilder
  title="Barcharts"
  blurb={[
    <BpkParagraph>
      BAR CHARTS!
    </BpkParagraph>,
  ]}
  components={components}
  readme={barchartReadme}
/>;

export default BarchartsPage;
