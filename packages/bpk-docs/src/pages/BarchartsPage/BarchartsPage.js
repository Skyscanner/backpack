import React from 'react';
import { BpkBarchart } from 'bpk-component-barchart';
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
        width={500}
        height={300}
        data={data.continentCountries}
        xScaleDataKey="continent"
        yScaleDataKey="countries"
        xAxisMargin={60}
        style={{
          width: '100%',
          maxWidth: '580px',
          height: '300px',
        }}
        yAxisLabel="No. of countries"
        xAxisLabel="Continents"
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
