import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkChartDataTable from './BpkChartDataTable';
import data from '../data.json';

const prices = data.prices;

describe('BpkChartDataTable', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkChartDataTable
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        data={prices}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
