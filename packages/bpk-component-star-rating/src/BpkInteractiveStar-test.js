import React from 'react';
import renderer from 'react-test-renderer';
import { STAR_TYPES } from './BpkStar';
import BpkInteractiveStar from './BpkInteractiveStar';

describe('BpkInteractiveStar', () => {
  it('should render correctly with empty star', () => {
    const tree = renderer.create(
      <BpkInteractiveStar
        type={STAR_TYPES.EMPTY}
        label="One star"
        name="stars"
        value={1}
        onClick={() => null}
        onMouseEnter={() => null}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with full star', () => {
    const tree = renderer.create(
      <BpkInteractiveStar
        type={STAR_TYPES.FULL}
        label="One star"
        name="stars"
        value={1}
        onClick={() => null}
        onMouseEnter={() => null}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a selected full star', () => {
    const tree = renderer.create(
      <BpkInteractiveStar
        type={STAR_TYPES.FULL}
        label="One star"
        name="stars"
        value={1}
        onClick={() => null}
        onMouseEnter={() => null}
        selected
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
