import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkStarRating from './BpkStarRating';

describe('BpkStarRating', () => {
  it('should render correctly if you give it more than the max rating allowed', () => {
    const tree = shallow(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={7}
      />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 0 stars', () => {
    const tree = shallow(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={0}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3 stars', () => {
    const tree = shallow(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={3}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3.5 stars', () => {
    const tree = shallow(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={3.5}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 5 stars', () => {
    const tree = shallow(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={5}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = shallow(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={5}
        large
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "maxRating" attribute', () => {
    const tree = shallow(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={5}
        maxRating={8}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
