import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { scaleLinear, scaleBand } from 'd3-scale';
import BpkBarchartBars from './BpkBarchartBars';
import BpkBarchartBar from './BpkBarchartBar';
import data from '../data.json';

const margin = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 40,
};
const prices = data.prices;
const size = 200;
const yScale = scaleLinear().domain([0, 500]).range([0, size]);
const xScale = scaleBand()
  .domain(prices.map(d => d.month)).range([0, size]);

describe('BpkBarchartBars', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) => `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}
        BarComponent={BpkBarchartBar}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "rounded" prop set to "false"', () => {
    const tree = shallow(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) => `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}
        BarComponent={BpkBarchartBar}
        rounded={false}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "padding" prop', () => {
    const tree = shallow(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) => `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}
        BarComponent={BpkBarchartBar}
        padding={0}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "onBarClick" prop', () => {
    const tree = shallow(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) => `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}
        BarComponent={BpkBarchartBar}
        padding={0}
        onBarClick={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "getBarSelection" prop', () => {
    const tree = shallow(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) => `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`}
        BarComponent={BpkBarchartBar}
        padding={0}
        getBarSelection={point => point.month === 'Mar'}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
