import React from 'react';
import renderer from 'react-test-renderer';
import BpkStar, { STAR_TYPES } from './BpkStar';

describe('BpkStar', () => {
  it('should render correctly with empty star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.EMPTY} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with half star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.HALF} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with full star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.FULL} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a large empty star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.EMPTY} large />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a large half star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.HALF} large />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a large full star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.FULL} large />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a selected full star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.FULL} selected />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a selected large full star', () => {
    const tree = renderer.create(<BpkStar type={STAR_TYPES.FULL} selected large />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
