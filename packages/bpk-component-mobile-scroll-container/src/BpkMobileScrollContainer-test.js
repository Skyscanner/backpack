import React from 'react';
import renderer from 'react-test-renderer';

import BpkMobileScrollContainer, {
  computeScrollBarAwareHeight, computeScrollIndicatorClassName,
} from './BpkMobileScrollContainer';

const makeMockScroller = (scrollLeft, scrollWidth, offsetWidth, offsetHeight = 0) => ({
  scrollLeft, scrollWidth, offsetWidth, offsetHeight,
});

describe('BpkMobileScrollContainer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkMobileScrollContainer>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkMobileScrollContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom "className" attribute', () => {
    const tree = renderer.create(
      <BpkMobileScrollContainer className="my-custom-class">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkMobileScrollContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom "style" attribute', () => {
    const tree = renderer.create(
      <BpkMobileScrollContainer style={{ backgroundColor: 'red' }}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkMobileScrollContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('functions', () => {
    describe('computeScrollIndicatorClassName', () => {
      it('returns null if `scrollerEl is null', () => {
        expect(computeScrollIndicatorClassName(null)).toBeNull();
      });

      it('should return left className if scrolling left is possible', () => {
        const scrollerEl = makeMockScroller(10, 200, 200);

        expect(computeScrollIndicatorClassName(scrollerEl)).toEqual([
          'bpk-mobile-scroll-container--left-indicator',
        ]);
      });

      it('should return right className if scrolling right is possible', () => {
        const scrollerEl = makeMockScroller(0, 250, 200);

        expect(computeScrollIndicatorClassName(scrollerEl)).toEqual([
          'bpk-mobile-scroll-container--right-indicator',
        ]);
      });

      it('should return right and left className if scrolling both right and left is possible', () => {
        const scrollerEl = makeMockScroller(10, 250, 200);

        const classNames = computeScrollIndicatorClassName(scrollerEl);

        expect(classNames).toContain('bpk-mobile-scroll-container--left-indicator');
        expect(classNames).toContain('bpk-mobile-scroll-container--right-indicator');
      });
    });

    describe('computeScrollBarAwareHeight', () => {
      it('should return null if scrollerEl is null', () => {
        expect(computeScrollBarAwareHeight(null, { offsetHeight: 50 })).toBeNull();
      });

      it('should return null if innerEl is null', () => {
        expect(computeScrollBarAwareHeight(makeMockScroller(10, 200, 200), null)).toBeNull();
      });

      it('should return scroll bar aware height when scroll bar is visible', () => {
        const scrollerEl = makeMockScroller(0, 200, 200, 300);
        const innerEl = { offsetHeight: 288 };

        expect(computeScrollBarAwareHeight(scrollerEl, innerEl)).toBe('18rem');
      });

      it('should return scroll bar aware height when scroll bar is not visible', () => {
        const scrollerEl = makeMockScroller(0, 200, 200, 280);
        const innerEl = { offsetHeight: 288 };

        expect(computeScrollBarAwareHeight(scrollerEl, innerEl)).toBe('auto');
      });
    });
  });
});
