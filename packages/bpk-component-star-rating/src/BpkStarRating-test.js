import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkStarRating from './BpkStarRating';

describe('BpkStarRating', () => {
  it('should render correctly if you give it more than the max rating allowed', () => {
    const tree = shallow(<BpkStarRating rating={7} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 0 stars', () => {
    const tree = shallow(<BpkStarRating rating={0} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3 stars', () => {
    const tree = shallow(<BpkStarRating rating={3} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3.5 stars', () => {
    const tree = shallow(<BpkStarRating rating={3.5} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 5 stars', () => {
    const tree = shallow(<BpkStarRating rating={5} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 0 Large stars ', () => {
    const tree = shallow(<BpkStarRating rating={0} large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 5 Large stars ', () => {
    const tree = shallow(<BpkStarRating rating={5} large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render as 3 stars with 3.3 Large stars ', () => {
    const tree = shallow(<BpkStarRating rating={3.3} large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3.5 Large stars ', () => {
    const tree = shallow(<BpkStarRating rating={3.5} large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render as 3.5 with 3.7 Large stars ', () => {
    const tree = shallow(<BpkStarRating rating={3.7} large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render 4 stars based on hoverRating as it has priority over rating', () => {
    const tree = shallow(<BpkStarRating rating={3} hoverRating={4} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render 3 interactive stars when we have hoverRating equal to 3 and "interactive"', () => {
    const tree = shallow(<BpkStarRating rating={0} hoverRating={3} interactive />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
