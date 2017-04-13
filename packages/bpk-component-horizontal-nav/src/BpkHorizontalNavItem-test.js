import React from 'react';
import renderer from 'react-test-renderer';
import BpkHorizontalNavItem from './BpkHorizontalNavItem';

describe('BpkHorizontalNavItem', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkHorizontalNavItem>
        My nav item content
      </BpkHorizontalNavItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "className" prop', () => {
    const tree = renderer.create(
      <BpkHorizontalNavItem className="my-custom-class">
        My nav item content
      </BpkHorizontalNavItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "href" prop', () => {
    const tree = renderer.create(
      <BpkHorizontalNavItem href="#">
        My nav item content
      </BpkHorizontalNavItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "selected" prop', () => {
    const tree = renderer.create(
      <BpkHorizontalNavItem selected>
        My nav item content
      </BpkHorizontalNavItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const tree = renderer.create(
      <BpkHorizontalNavItem data-arbitrary-1="arbirary-value-1" data-arbitrary-2="arbirary-value-2">
        My nav content.
      </BpkHorizontalNavItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
