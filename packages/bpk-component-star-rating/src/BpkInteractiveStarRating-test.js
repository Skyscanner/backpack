import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkInteractiveStarRating from './BpkInteractiveStarRating';

describe('BpkInteractiveStarRating', () => {
  it('should render correctly if you give it more than the max rating allowed', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={7} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 0 stars', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={0} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3 stars', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={3} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3.5 stars', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={3.5} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 5 stars', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={5} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={5} large />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "maxRating" attribute', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={5} maxRating={8} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render 4 stars based on hoverRating as it has priority over rating', () => {
    const tree = shallow(<BpkInteractiveStarRating id="my-rating" rating={3} hoverRating={4} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call onRatingHover on mouseenter', () => {
    const onRatingHover = jest.fn();
    const tree = shallow(
      <BpkInteractiveStarRating
        id="my-star-rating"
        onRatingHover={onRatingHover}
      />,
    );

    expect(onRatingHover).not.toHaveBeenCalled();
    tree.childAt(0).prop('onMouseEnter')(1, {});
    expect(onRatingHover).toHaveBeenCalled();
  });

  it('should call onRatingSelect on change', () => {
    const onRatingSelect = jest.fn();
    const tree = shallow(
      <BpkInteractiveStarRating
        id="my-star-rating"
        onRatingSelect={onRatingSelect}
      />,
    );

    expect(onRatingSelect).not.toHaveBeenCalled();
    tree.childAt(0).prop('onChange')(1, {});
    expect(onRatingSelect).toHaveBeenCalled();
  });
});
