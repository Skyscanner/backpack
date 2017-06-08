import React from 'react';
import renderer from 'react-test-renderer';
import BpkBarchartBar from './BpkBarchartBar';

describe('BpkBarchartBar', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with an onClick handler', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
        onClick={() => null}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render as an outlier', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
        outlier
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
