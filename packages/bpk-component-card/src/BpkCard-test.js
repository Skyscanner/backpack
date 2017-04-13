import React from 'react';
import renderer from 'react-test-renderer';
import BpkCard from './BpkCard';

describe('BpkCard', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkCard>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "href" attribute', () => {
    const tree = renderer.create(
      <BpkCard href="//www.skyscanner.net">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to "false"', () => {
    const tree = renderer.create(
      <BpkCard padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(
      <BpkCard className="custom-class">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
