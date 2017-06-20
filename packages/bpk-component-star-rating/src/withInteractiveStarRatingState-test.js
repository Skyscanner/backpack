import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkInteractiveStarRating from './BpkInteractiveStarRating';
import withInteractiveStarRatingState from './withInteractiveStarRatingState';

const InteractiveStarRating = withInteractiveStarRatingState(BpkInteractiveStarRating);

describe('withInteractiveStarRatingState', () => {
  it('should render correctly', () => {
    const tree = shallow(<InteractiveStarRating id="my-star-rating" />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = shallow(<InteractiveStarRating id="my-star-rating" large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should have a rating of 3 when onRatingSelect is called with 3', () => {
    const interactiveItem = shallow(<InteractiveStarRating id="my-star-rating" />);
    interactiveItem.instance().onRatingSelect(3);
    expect(interactiveItem.state('rating')).toBe(3);
  });

  it('should have a hover rating of 4 when onRatingHover is called with 4', () => {
    const interactiveItem = shallow(<InteractiveStarRating id="my-star-rating" />);

    interactiveItem.instance().onRatingHover(4);
    expect(interactiveItem.state('hoverRating')).toBe(4);

    interactiveItem.instance().onMouseLeave();
    expect(interactiveItem.state('hoverRating')).toBe(0);
  });
});
