/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import { colorRed500 } from 'bpk-tokens/tokens/base.es6';

import BpkMobileScrollContainer, {
  computeScrollBarAwareHeight,
  computeScrollIndicatorClassName,
} from './BpkMobileScrollContainer';

const makeMockScroller = (
  scrollLeft,
  scrollWidth,
  offsetWidth,
  offsetHeight = 0,
): HTMLElement => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'scrollLeft', { value: scrollLeft });
  Object.defineProperty(element, 'scrollWidth', { value: scrollWidth });
  Object.defineProperty(element, 'offsetWidth', { value: offsetWidth });
  Object.defineProperty(element, 'offsetHeight', { value: offsetHeight });
  return element;
};

const makeMockInnerEl = (offsetHeight): HTMLElement => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'offsetHeight', { value: offsetHeight });
  return element;
};

describe('BpkMobileScrollContainer', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkMobileScrollContainer>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkMobileScrollContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom "className" attribute', () => {
    const tree = renderer
      .create(
        <BpkMobileScrollContainer className="my-custom-class">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkMobileScrollContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom "style" attribute', () => {
    const tree = renderer
      .create(
        <BpkMobileScrollContainer style={{ backgroundColor: colorRed500 }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkMobileScrollContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('functions', () => {
    describe('computeScrollIndicatorClassName', () => {
      it('returns null if `scrollerEl is null', () => {
        expect(computeScrollIndicatorClassName(null)).toBeNull();
      });

      it('should return left className and custom leadingIndicatorClassName if scrolling left is possible', () => {
        const scrollerEl = makeMockScroller(10, 200, 200);

        expect(
          computeScrollIndicatorClassName(
            scrollerEl,
            'custom-leading-class-name',
            'custom-trailing-class-name',
          ),
        ).toEqual([
          'bpk-mobile-scroll-container--left-indicator',
          'custom-leading-class-name',
        ]);
      });

      it('should return right className and custom trailingIndicatorClassName if scrolling right is possible', () => {
        const scrollerEl = makeMockScroller(0, 250, 200);

        expect(
          computeScrollIndicatorClassName(
            scrollerEl,
            'custom-leading-class-name',
            'custom-trailing-class-name',
          ),
        ).toEqual([
          'bpk-mobile-scroll-container--right-indicator',
          'custom-trailing-class-name',
        ]);
      });

      it('should return right and left className plus custom leadingIndicatorClassName and custom trailingIndicatorClassName if scrolling both right and left is possible', () => {
        const scrollerEl = makeMockScroller(10, 250, 200);

        const classNames = computeScrollIndicatorClassName(
          scrollerEl,
          'custom-leading-class-name',
          'custom-trailing-class-name',
        );

        expect(classNames).toContain(
          'bpk-mobile-scroll-container--left-indicator',
        );
        expect(classNames).toContain(
          'bpk-mobile-scroll-container--right-indicator',
        );
        expect(classNames).toContain('custom-leading-class-name');
        expect(classNames).toContain('custom-trailing-class-name');
      });
    });

    describe('computeScrollBarAwareHeight', () => {
      it('should return null if scrollerEl is null', () => {
        expect(
          computeScrollBarAwareHeight(null, makeMockInnerEl(50)),
        ).toBeNull();
      });

      it('should return null if innerEl is null', () => {
        expect(
          computeScrollBarAwareHeight(makeMockScroller(10, 200, 200), null),
        ).toBeNull();
      });

      it('should return scroll bar aware height when scroll bar is visible', () => {
        const scrollerEl = makeMockScroller(0, 200, 200, 300);
        const innerEl = makeMockInnerEl(288);

        expect(computeScrollBarAwareHeight(scrollerEl, innerEl)).toBe('18rem');
      });

      it('should return scroll bar aware height when scroll bar is not visible', () => {
        const scrollerEl = makeMockScroller(0, 200, 200, 280);
        const innerEl = makeMockInnerEl(288);

        expect(computeScrollBarAwareHeight(scrollerEl, innerEl)).toBe('auto');
      });
    });
  });
});
