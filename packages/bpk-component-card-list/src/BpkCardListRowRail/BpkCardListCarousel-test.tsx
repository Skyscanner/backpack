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

import type { Dispatch, SetStateAction } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import mockCards from '../../testMocks';
import { LAYOUTS } from '../common-types';

import BpkCardListCarousel from './BpkCardListCarousel';
import { useIntersectionObserver, lockScroll } from './utils';

jest.mock('./utils', () => {
  const actualUtils = jest.requireActual('./utils');
  return ({
    setA11yTabIndex: jest.fn(),
    useScrollToCard: jest.fn(),
    useIntersectionObserver: jest.fn(() => jest.fn()),
    lockScroll: jest.fn(actualUtils.lockScroll),
  })
});

const mockSetCurrentIndex = jest.fn();
const mockUseIntersectionObserver = jest.mocked(useIntersectionObserver);

// Creates a mock implementation for useIntersectionObserver that sets
// specific cards as visible based on the fill range (fillStart inclusive, fillEnd exclusive)
const createIntersectionObserverMock = (fillStart: number, fillEnd: number) => {
  let capturedSetVisibilityFn: Dispatch<SetStateAction<number[]>>;
  mockUseIntersectionObserver.mockImplementation((__, setVisibilityList) => {
    if (capturedSetVisibilityFn !== setVisibilityList) {
      capturedSetVisibilityFn = setVisibilityList;
      setVisibilityList((prevList) => prevList.fill(1, fillStart, fillEnd));
    }

    return (element, index) => {
      if (!element) return;

      element.setAttribute('data-index', index.toString());
    };
  });

  return capturedSetVisibilityFn!;
};

describe('BpkCardListCarousel', () => {
  const defaultProps = {
    children: mockCards(6),
    currentIndex: 0,
    initiallyShownCards: 3,
    layout: LAYOUTS.row,
    setCurrentIndex: mockSetCurrentIndex,
  };

  let setVisibilityFn: Dispatch<SetStateAction<number[]>>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    setVisibilityFn = createIntersectionObserverMock(0, 3); // Cards 0,1,2 visible (first page)
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

  describe('page-based scrolling on desktop', () => {
    it('should mark cards at page boundaries with the correct class', () => {
      render(<BpkCardListCarousel {...defaultProps} isMobile={false} />);
      const cards = screen.getAllByRole('group');

      // With initiallyShownCards=3, cards at index 0, 3 should be page starts
      expect(cards[0].className).toContain('page-start');
      expect(cards[1].className).not.toContain('page-start');
      expect(cards[2].className).not.toContain('page-start');
      expect(cards[3].className).toContain('page-start');
    });

    it('should trigger lock when wheel event is fired on desktop and call setCurrentIndex when the visibility of cards change', () => {
      const lockScrollSpy = lockScroll as jest.Mock;
      const { rerender } = render(<BpkCardListCarousel {...defaultProps} currentIndex={0} isMobile={false} />);

      const carouselElement = screen.getByTestId('bpk-card-list-row-rail__carousel');
      fireEvent.wheel(carouselElement, { deltaX: 20000 });

      expect(lockScrollSpy).toHaveBeenCalled();

      // Fake the visibility of the carousel being on the 2nd page
      setVisibilityFn(() => ([0, 0, 0, 1, 1, 1]));

      rerender(<BpkCardListCarousel {...defaultProps} isMobile={false} />);
      // Ensure we're trying to set the current index to 1 (the 2nd page)
      expect(mockSetCurrentIndex).toHaveBeenCalled();
    });

    it('should trigger lock when touchmove event is fired on desktop', () => {
      render(<BpkCardListCarousel {...defaultProps} isMobile={false} />);

      const carouselElement = screen.getByTestId('bpk-card-list-row-rail__carousel');

      fireEvent.touchMove(carouselElement);

      expect(lockScroll).toHaveBeenCalled();
    });

    it('should not trigger lock when wheel event is fired on mobile', () => {
      (lockScroll as jest.Mock).mockClear();
      render(<BpkCardListCarousel {...defaultProps} isMobile />);

      const carouselElement = screen.getByTestId('bpk-card-list-row-rail__carousel');

      fireEvent.wheel(carouselElement);

      expect(lockScroll).not.toHaveBeenCalled();
    });
  });
});
