import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkBarchart from './BpkBarchart';
import data from '../data.json';

const prices = data.prices;
const size = 200;

describe('BpkBarchart', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "showGridlines" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        showGridlines
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "onBarClick" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        onBarClick={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "hideXAxisLabel" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        hideXAxisLabel
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "hideYAxisLabel" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        hideYAxisLabel
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "getBarLabel" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        getBarLabel={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
