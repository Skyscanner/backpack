import React from 'react';
import renderer from 'react-test-renderer';
import BpkHorizontalNav from './BpkHorizontalNav';

describe('BpkHorizontalNav', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkHorizontalNav>
        My nav content.
      </BpkHorizontalNav>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "className" prop', () => {
    const tree = renderer.create(
      <BpkHorizontalNav className="my-custom-class-name">
        My nav content.
      </BpkHorizontalNav>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "spaceAround" prop', () => {
    const tree = renderer.create(
      <BpkHorizontalNav spaceAround>
        My nav content.
      </BpkHorizontalNav>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const tree = renderer.create(
      <BpkHorizontalNav data-arbitrary-1="arbirary-value-1" data-arbitrary-2="arbirary-value-2">
        My nav content.
      </BpkHorizontalNav>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
