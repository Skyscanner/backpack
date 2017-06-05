import React from 'react';
import renderer from 'react-test-renderer';
import BpkChartMargin from './BpkChartMargin';

const margin = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 40,
};

describe('BpkChartMargin', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkChartMargin
        margin={margin}
      >Children</BpkChartMargin>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
