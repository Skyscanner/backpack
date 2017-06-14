import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkInteractiveStarRating from './BpkInteractiveStarRating';

describe('BpkInteractiveStarRating', () => {
  it('should render correctly', () => {
    const tree = shallow(<BpkInteractiveStarRating />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = shallow(<BpkInteractiveStarRating large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should have a rating of 3 when onRatingSelect is called with 3', () => {
    const interactiveItem = shallow(<BpkInteractiveStarRating />);
    interactiveItem.instance().onRatingSelect(3);
    expect(interactiveItem.state('rating')).toBe(3);
  });

  it('should have a hover rating of 4 when onRatingHover is called with 4', () => {
    const interactiveItem = shallow(<BpkInteractiveStarRating />);

    interactiveItem.instance().onRatingHover(4);
    expect(interactiveItem.state('hoverRating')).toBe(4);

    interactiveItem.instance().onMouseLeave();
    expect(interactiveItem.state('hoverRating')).toBe(0);
  });
});
