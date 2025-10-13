/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import mockCards from '../../testMocks';
import { LAYOUTS } from '../common-types';

import BpkCardListCarousel from './BpkCardListCarousel';
import { useIntersectionObserver } from './utils';

jest.mock('./utils', () => ({
  setA11yTabIndex: jest.fn(),
  useScrollToCard: jest.fn(),
  useIntersectionObserver: jest.fn(() => jest.fn()),
}));

describe('BpkCardListCarousel', () => {
  const mockSetCurrentIndex = jest.fn();
  const mockUseIntersectionObserver = jest.mocked(useIntersectionObserver)

  const defaultProps = {
    children: mockCards(6),
    currentIndex: 0,
    initiallyShownCards: 3,
    layout: LAYOUTS.row,
    setCurrentIndex: mockSetCurrentIndex,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    let setVisibilityFn: any;
    mockUseIntersectionObserver.mockImplementation((__, setVisibilityList) => {
      if (setVisibilityFn !== setVisibilityList) {
        setVisibilityFn = setVisibilityList;
        setVisibilityList((prevList) => prevList.fill(1, 0, 3));
      }

      return (element, index) => {
        if (!element) return;

        element.setAttribute('data-index', index.toString());
      };
    });
  });

  it('should render the carousel with the correct number of children', () => {
    render(<BpkCardListCarousel {...defaultProps} />);
    const cards = screen.getAllByRole('group');
    expect(cards).toHaveLength(6);
  });

  it('should render correctly with no children', () => {
    render(<BpkCardListCarousel {...defaultProps}>{[]}</BpkCardListCarousel>);
    const carousel = screen.getByRole('region');
    const cards = screen.queryAllByRole('group');
    expect(carousel).toBeInTheDocument();
    expect(cards).toHaveLength(0);
  });

  it('should render correctly with a single child', () => {
    render(
      <BpkCardListCarousel {...defaultProps}>
        {[<div key="1">Card 1</div>]}
      </BpkCardListCarousel>,
    );
    const cards = screen.getAllByRole('group');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('Card 1');
  });

  describe('virtualization', () => {
    it('should have the correct number of placeholder cards', async () => {
      const numberOfCards = 20; // Given the virtualization algorithm, this should be 5 placeholders
      render(<BpkCardListCarousel {...defaultProps}>{mockCards(numberOfCards)}</BpkCardListCarousel>);

      act(() => {
        const cards = screen.getAllByTestId(/card-testId-/);
        expect(cards).toHaveLength(20);

        // This number is determined by the virtualization algorithm,
        // which renders 5 placeholder cards for 20 total cards in this configuration.
        const placeholders = screen.getAllByTestId(/bpk-card-list-carousel--placeholder/);
        expect(placeholders.length).toBe(5);
      })

    });

    it('should add `contain: paint` CSS property in the placeholders', async () => {
      const numberOfCards = 20; // Given the virtualization algorithm, this should be 5 placeholders
      render(<BpkCardListCarousel {...defaultProps}>{mockCards(numberOfCards)}</BpkCardListCarousel>);

      act(() => {
        const placeholders = screen.getAllByTestId(/bpk-card-list-carousel--placeholder/);
        expect(placeholders.map((el) => el.style.contain)).toEqual(new Array(placeholders.length).fill('paint'));
      })
    });
  });
});
