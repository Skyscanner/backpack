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
// @ts-nocheck

import type { Dispatch, SetStateAction } from 'react';

import { render, screen } from '@testing-library/react';
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

const mockSetCurrentIndex = jest.fn();
const mockUseIntersectionObserver = jest.mocked(useIntersectionObserver);

// Creates a mock implementation for useIntersectionObserver that sets
// specific cards as visible based on the fill range (fillStart inclusive, fillEnd exclusive)
const createIntersectionObserverMock = (fillStart: number, fillEnd: number) => {
  let setVisibilityFn: Dispatch<SetStateAction<number[]>>;
  mockUseIntersectionObserver.mockImplementation((__, setVisibilityList) => {
    if (setVisibilityFn !== setVisibilityList) {
      setVisibilityFn = setVisibilityList;
      setVisibilityList((prevList) => prevList.fill(1, fillStart, fillEnd));
    }

    return (element, index) => {
      if (!element) return;

      element.setAttribute('data-index', index.toString());
    };
  });
};

describe('BpkCardListCarousel', () => {
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
    createIntersectionObserverMock(0, 3); // Cards 0,1,2 visible (first page)
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
    beforeEach(() => {
      // Mock offsetWidth and offsetHeight for rendered cards to trigger dimension calculation
      jest
        .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
        .mockReturnValue(200);
      jest
        .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
        .mockReturnValue(150);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should have the correct number of placeholder cards', async () => {
      const numberOfCards = 20; // Given the virtualization algorithm, this should be 5 placeholders
      render(
        <BpkCardListCarousel {...defaultProps}>
          {mockCards(numberOfCards)}
        </BpkCardListCarousel>,
      );

      const cards = screen.getAllByTestId(/card-testId-/);
      expect(cards).toHaveLength(20);

      // This number is determined by the virtualization algorithm,
      // which renders 5 placeholder cards for 20 total cards in this configuration.
      const placeholders = screen.getAllByTestId(
        /bpk-card-list-carousel--placeholder/,
      );
      expect(placeholders.length).toBe(5);
    });

    it('should add virtualization styles (contain, width, height) only to placeholder cards', () => {
      const numberOfCards = 20;

      render(
        <BpkCardListCarousel {...defaultProps}>
          {mockCards(numberOfCards)}
        </BpkCardListCarousel>,
      );

      const allCards = screen.getAllByRole('group', { hidden: true });
      expect(allCards).toHaveLength(20);

      // Verify placeholders are at the end of the list and should have virtualization styles
      const lastFiveCards = allCards.slice(-5);
      lastFiveCards.forEach((card) => {
        expect(card.getAttribute('data-testid')).toEqual(
          'bpk-card-list-carousel--placeholder',
        );
        expect(card.style.contain).toBe('paint');
        expect(card.style.width).toBe('200px');
        expect(card.style.height).toBe('150px');
      });

      // Rendered cards should NOT have virtualization styles or placeholder test IDs
      const firstFifteenCards = allCards.slice(0, 15);
      firstFifteenCards.forEach((card) => {
        expect(card.getAttribute('data-testid')).toBeFalsy();
        expect(card.style.contain).toBeFalsy();
        expect(card.style.width).toBeFalsy();
        expect(card.style.height).toBeFalsy();
      });
    });

    it('should apply virtualization styles correctly when starting on second page', () => {
      const numberOfCards = 20;

      // Set visibility for cards 3-5 (second page)
      createIntersectionObserverMock(3, 6);

      // Render starting on second page (index 1 = cards 3-5)
      render(
        <BpkCardListCarousel {...defaultProps} currentIndex={1}>
          {mockCards(numberOfCards)}
        </BpkCardListCarousel>,
      );

      const allCards = screen.getAllByRole('group', { hidden: true });
      expect(allCards).toHaveLength(20);

      // Verify placeholders are at the end of the list and should have virtualization styles
      const lastFiveCards = allCards.slice(-2);
      lastFiveCards.forEach((card) => {
        expect(card.getAttribute('data-testid')).toEqual(
          'bpk-card-list-carousel--placeholder',
        );
        expect(card.style.contain).toBe('paint');
        expect(card.style.width).toBe('200px');
        expect(card.style.height).toBe('150px');
      });

      // Rendered cards should NOT have virtualization styles or placeholder test IDs
      const firstFifteenCards = allCards.slice(0, 17);
      firstFifteenCards.forEach((card) => {
        expect(card.getAttribute('data-testid')).toBeFalsy();
        expect(card.style.contain).toBeFalsy();
        expect(card.style.width).toBeFalsy();
        expect(card.style.height).toBeFalsy();
      });
    });
  });
});
