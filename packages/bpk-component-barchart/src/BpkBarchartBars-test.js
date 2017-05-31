import React from 'react';
import renderer from 'react-test-renderer';
import { scaleLinear, scaleBand } from 'd3-scale';
import BpkBarchartBars from './BpkBarchartBars';
import data from '../data.json';

const margin = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 40,
};
const continentCountries = data.continentCountries;
const size = 200;
const yScale = scaleLinear().domain([0, 50]).range([0, size]);
const xScale = scaleBand()
  .domain(continentCountries.map(d => d.continent)).range([0, size]);

describe('BpkBarchartBars', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="continent"
        yScaleDataKey="countries"
        maxYValue={50}
        width={size}
        height={size}
        data={continentCountries}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with "rounded" prop set to "false"', () => {
    const tree = renderer.create(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="continent"
        yScaleDataKey="countries"
        maxYValue={50}
        width={size}
        height={size}
        data={continentCountries}
        rounded={false}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padding" prop', () => {
    const tree = renderer.create(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="continent"
        yScaleDataKey="countries"
        maxYValue={50}
        width={size}
        height={size}
        data={continentCountries}
        padding={0}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
