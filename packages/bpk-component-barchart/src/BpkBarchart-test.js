import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkBarchart from './BpkBarchart';
import data from '../data.json';

const margin = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 40,
};
const continentCountries = data.continentCountries;
const size = 200;

describe('BpkBarchart', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkBarchart
        margin={margin}
        xScaleDataKey="continent"
        yScaleDataKey="countries"
        width={size}
        height={size}
        data={continentCountries}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "showGridlines" prop', () => {
    const tree = shallow(
      <BpkBarchart
        margin={margin}
        xScaleDataKey="continent"
        yScaleDataKey="countries"
        width={size}
        height={size}
        data={continentCountries}
        showGridlines
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "title" prop', () => {
    const tree = shallow(
      <BpkBarchart
        margin={margin}
        xScaleDataKey="continent"
        yScaleDataKey="countries"
        width={size}
        height={size}
        data={continentCountries}
        title="Countries on each continent"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
