/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *z
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



import { render, screen, act, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import mockCards from '../../testMocks';
import { LAYOUTS } from '../common-types';

import BpkCardListCarousel from './BpkCardListCarousel';
import { useIntersectionObserver } from './utils';

jest.mock('./utils', () => {
  const actual = jest.requireActual('./utils');
  return {
    ...actual,
    setA11yTabIndex: jest.fn(),
    useScrollToCard: jest.fn(),
    useIntersectionObserver: jest.fn(),
  };
});

describe('BpkCardListCarousel', () => {
  const mockSetCurrentIndex = jest.fn();

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
    const mockUseIntersectionObserver = jest.mocked(useIntersectionObserver);

    beforeAll(() => {
      // Mock IntersectionObserver only for virtualization tests
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

    // afterAll(() => {
    //   delete (global as typeof globalThis & {
    //     IntersectionObserver?: typeof IntersectionObserver;
    //   }).IntersectionObserver;
    // });

    beforeEach(() => {
      mockUseIntersectionObserver.mockImplementation(
        (_observerOptions, setVisibilityList) =>
          (element, index) => {
            if (!element) return;
            element.setAttribute('data-index', index.toString());

            setTimeout(() => {
              act(() => {
                setVisibilityList(prev => {
                  const target = index < 6 ? 1 : 0;
                  if (prev[index] === target) return prev;
                  const next = [...prev];
                  next[index] = target;
                  return next;
                });
              });
            }, 0);

          },
      );
    });


    it('should render correctly with content-visibility virtualization', () => {
      const { asFragment } = render(
        <BpkCardListCarousel
          currentIndex={0}
          initiallyShownCards={3}
          layout={LAYOUTS.rail}
          setCurrentIndex={() => { }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Card {i + 1}</div>
          ))}
        </BpkCardListCarousel>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with many cards (virtualization scenario)', () => {
      const { asFragment } = render(
        <BpkCardListCarousel
          currentIndex={0}
          initiallyShownCards={3}
          layout={LAYOUTS.rail}
          setCurrentIndex={() => { }}
        >
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Card {i + 1}</div>
          ))}
        </BpkCardListCarousel>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should apply content-visibility to cards outside viewport', async () => {
      act(() => {
        render(
          <BpkCardListCarousel
            currentIndex={0}
            initiallyShownCards={3}
            layout={LAYOUTS.rail}
            setCurrentIndex={() => { }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i}>
                Card {i + 1}
              </div>
            ))}
          </BpkCardListCarousel>
        );
      })

      // Cards outside the initial viewport + buffer should have content-visibility

      // expect(hiddenCardWrapper).toHaveStyle('content-visibility: auto');
      await waitFor(() => {
        const hiddenCardWrapper = screen.getByTestId('carousel-card-15');
        expect(hiddenCardWrapper).toHaveStyle('content-visibility: auto');
      })

    });

    it('should not apply content-visibility to cards in viewport', async () => {
      render(
        <BpkCardListCarousel
          currentIndex={0}
          initiallyShownCards={3}
          layout={LAYOUTS.rail}
          setCurrentIndex={() => { }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} data-testid={`card-${i}`}>Card {i + 1}</div>
          ))}
        </BpkCardListCarousel>
      );

      // Wait for intersection observer to set visibility state
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
      });

      // Cards in viewport should not have content-visibility
      const visibleCardWrapper = screen.getByTestId('card-0').parentElement as HTMLElement;
      expect(visibleCardWrapper).not.toHaveStyle('content-visibility: auto');
    });
  });
});
