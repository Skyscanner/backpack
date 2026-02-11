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

import { render, screen } from '@testing-library/react';

import mockCards from '../../testMocks';
import { ACCESSORY_DESKTOP_TYPES, LAYOUTS } from '../common-types';

import BpkCardListRowRailContainer from './BpkCardListRowRailContainer';

describe('BpkCardListRowRailContainer', () => {
  beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
      root = null;

      rootMargin = '';

      thresholds = [];

      observe = jest.fn();

      unobserve = jest.fn();

      disconnect = jest.fn();

      takeRecords() {
        return [];
      }
    };
  });

  it('should render correctly with row layout and no accessory', () => {
    render(
      <BpkCardListRowRailContainer layout={LAYOUTS.row} initiallyShownCards={3} initiallyInViewCardIndex={0}>
        {mockCards(3)}
      </BpkCardListRowRailContainer>,
    );

    const pagination = screen.queryByTestId(
      'bpk-card-list-row-rail__accessory',
    );
    const container = screen.getByTestId('bpk-card-list-row-rail');
    const carousel = screen.getByTestId('bpk-card-list-row-rail__carousel');

    expect(pagination).not.toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(carousel).toBeInTheDocument();
  });

  it('should render correctly with row layout and pagination accessory', () => {
    render(
      <BpkCardListRowRailContainer
        layout={LAYOUTS.row}
        initiallyShownCards={3}
        accessory={ACCESSORY_DESKTOP_TYPES.pagination}
        initiallyInViewCardIndex={0}
      >
        {mockCards(5)}
      </BpkCardListRowRailContainer>,
    );

    const pagination = screen.queryByTestId(
      'bpk-card-list-row-rail__accessory',
    );
    const container = screen.getByTestId('bpk-card-list-row-rail');
    const carousel = screen.getByTestId('bpk-card-list-row-rail__carousel');

    expect(pagination).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(carousel).toBeInTheDocument();
  });

  describe('initiallyInViewCardIndex', () => {
    const mockScrollIntoView = jest.fn();
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    beforeAll(() => {
      Element.prototype.scrollIntoView = mockScrollIntoView;
    });

    afterAll(() => {
      Element.prototype.scrollIntoView = originalScrollIntoView;
    });

    beforeEach(() => {
      mockScrollIntoView.mockClear();
    });

    it('should scroll to the first card of the target page on mount', () => {
      render(
        <BpkCardListRowRailContainer
          layout={LAYOUTS.row}
          initiallyShownCards={3}
          accessory={ACCESSORY_DESKTOP_TYPES.pagination}
          initiallyInViewCardIndex={4}
        >
          {mockCards(9)}
        </BpkCardListRowRailContainer>,
      );

      const cards = screen.getAllByRole('group');

      // Card index 4 → page 1 → scrolls to card at index 3 (page 1 start)
      expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
      expect(mockScrollIntoView.mock.instances[0]).toBe(cards[3]);
    });

    it('should not trigger initial scroll when initiallyInViewCardIndex is 0', () => {
      render(
        <BpkCardListRowRailContainer
          layout={LAYOUTS.row}
          initiallyShownCards={3}
          initiallyInViewCardIndex={0}
        >
          {mockCards(6)}
        </BpkCardListRowRailContainer>,
      );

      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it('should not trigger initial scroll when initiallyInViewCardIndex is negative', () => {
      render(
        <BpkCardListRowRailContainer
          layout={LAYOUTS.row}
          initiallyShownCards={3}
          initiallyInViewCardIndex={-1}
        >
          {mockCards(6)}
        </BpkCardListRowRailContainer>,
      );

      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it('should scroll to the last page start when initiallyInViewCardIndex exceeds total cards', () => {
      render(
        <BpkCardListRowRailContainer
          layout={LAYOUTS.row}
          initiallyShownCards={3}
          accessory={ACCESSORY_DESKTOP_TYPES.pagination}
          initiallyInViewCardIndex={100}
        >
          {mockCards(6)}
        </BpkCardListRowRailContainer>,
      );

      const cards = screen.getAllByRole('group');

      // Clamped to last page (page 1) → scrolls to card at index 3
      expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
      expect(mockScrollIntoView.mock.instances[0]).toBe(cards[3]);
    });

    it.each([
      { cardIndex: 3, shownCards: 3, totalCards: 12, expectedPage: 1 },
      { cardIndex: 5, shownCards: 3, totalCards: 12, expectedPage: 1 },
      { cardIndex: 11, shownCards: 3, totalCards: 12, expectedPage: 3 },
      { cardIndex: 8, shownCards: 4, totalCards: 12, expectedPage: 2 },
    ])(
      'should scroll to card at page start for cardIndex=$cardIndex with shownCards=$shownCards (page $expectedPage)',
      ({ cardIndex, expectedPage, shownCards, totalCards }) => {
        render(
          <BpkCardListRowRailContainer
            layout={LAYOUTS.row}
            initiallyShownCards={shownCards}
            accessory={ACCESSORY_DESKTOP_TYPES.pagination}
            initiallyInViewCardIndex={cardIndex}
          >
            {mockCards(totalCards)}
          </BpkCardListRowRailContainer>,
        );

        const cards = screen.getAllByRole('group');
        const expectedCardIndex = expectedPage * shownCards;

        expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
        expect(mockScrollIntoView.mock.instances[0]).toBe(
          cards[expectedCardIndex],
        );
      },
    );
  });
});
