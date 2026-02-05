/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import { act, renderHook } from '@testing-library/react';

import { RELEASE_LOCK_DELAY } from './constants';
import { setA11yTabIndex, useCarouselScrollSync } from './utils';

const createMockButton = (index: number): HTMLElement => {
  const mockButton = document.createElement('mock-button');
  mockButton.textContent = `Button ${index}`;
  mockButton.setAttribute('data-testid', `mock-button-${index}`);
  mockButton.setAttribute('tabindex', '0');
  return mockButton;
};

const createMockDiv = (): HTMLDivElement =>
  document.createElement('div') as HTMLDivElement;

const makeMockDiv = (
  index: number,
): { mockDiv: HTMLDivElement; mockButton: HTMLElement } => {
  const mockDiv = createMockDiv();
  const mockButton = createMockButton(index);
  mockDiv.appendChild(mockButton);
  return { mockDiv, mockButton };
};

describe('setA11yTabIndex', () => {
  it('should set tabIndex to 0 for visible elements and -1 for hidden elements', () => {
    const visibilityList = [0, 1];
    const mockButtonList: HTMLElement[] = [];

    Array.from({ length: 2 }).forEach((_, index) => {
      const { mockButton, mockDiv } = makeMockDiv(index);
      setA11yTabIndex(mockDiv as HTMLDivElement, index, visibilityList);
      mockButtonList.push(mockButton);
    });
    expect(mockButtonList[0].tabIndex).toBe(-1);
    expect(mockButtonList[1].tabIndex).toBe(0);
  });
});

describe('useCarouselScrollSync', () => {
  let mockContainer: HTMLDivElement;
  let mockCardRefs: { current: Array<HTMLDivElement | null> };
  let mockSetCurrentIndex: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockContainer = document.createElement('div');
    mockContainer.getBoundingClientRect = jest.fn(
      () =>
        ({
          bottom: window.innerHeight - 10,
        }) as DOMRect,
    );

    mockCardRefs = { current: [] };
    Array.from({ length: 12 }).forEach((_, index) => {
      const { mockDiv } = makeMockDiv(index);
      mockDiv.scrollIntoView = jest.fn();
      mockCardRefs.current.push(mockDiv);
    });

    mockSetCurrentIndex = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Effect 1: Programmatic scroll when currentIndex changes', () => {
    it('should scroll to the target card when currentIndex changes and container is visible', () => {
      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 0 } },
      );

      rerender({ currentIndex: 1 });

      expect(mockCardRefs.current[3]?.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    });

    it('should not scroll when disabled', () => {
      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: false,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 0 } },
      );

      rerender({ currentIndex: 1 });

      expect(mockCardRefs.current[3]?.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should not scroll when container is not visible (bottom < 0)', () => {
      mockContainer.getBoundingClientRect = jest.fn(
        () =>
          ({
            bottom: -10,
          }) as DOMRect,
      );

      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 0 } },
      );

      rerender({ currentIndex: 1 });

      expect(mockCardRefs.current[3]?.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should not scroll when container bottom is below viewport', () => {
      mockContainer.getBoundingClientRect = jest.fn(
        () =>
          ({
            bottom: window.innerHeight + 100,
          }) as DOMRect,
      );

      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 0 } },
      );

      rerender({ currentIndex: 1 });

      expect(mockCardRefs.current[3]?.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should not scroll when container is null', () => {
      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: null,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 0 } },
      );

      rerender({ currentIndex: 1 });

      expect(mockCardRefs.current[3]?.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should not scroll when target card ref is null', () => {
      mockCardRefs.current[3] = null;

      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 0 } },
      );

      rerender({ currentIndex: 1 });

      expect(mockCardRefs.current[0]?.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should scroll to correct card based on initiallyShownCards multiplier', () => {
      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 4,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 0 } },
      );

      rerender({ currentIndex: 2 });

      expect(mockCardRefs.current[8]?.scrollIntoView).toHaveBeenCalledTimes(1);
    });

    it('should not scroll when currentIndex has not changed', () => {
      const { rerender } = renderHook(
        ({ currentIndex }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          }),
        { initialProps: { currentIndex: 1 } },
      );

      rerender({ currentIndex: 1 });

      expect(mockCardRefs.current[3]?.scrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('Effect 2: Scroll detection and lock release', () => {
    it('should add scroll event listener when enabled and container exists', () => {
      const addEventListenerSpy = jest.spyOn(mockContainer, 'addEventListener');

      renderHook(() =>
        useCarouselScrollSync({
          cardRefs: mockCardRefs,
          container: mockContainer,
          currentIndex: 0,
          enabled: true,
          initiallyShownCards: 3,
          setCurrentIndex: mockSetCurrentIndex,
          visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }),
      );

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true },
      );
    });

    it('should not add scroll event listener when disabled', () => {
      const addEventListenerSpy = jest.spyOn(mockContainer, 'addEventListener');

      renderHook(() =>
        useCarouselScrollSync({
          cardRefs: mockCardRefs,
          container: mockContainer,
          currentIndex: 0,
          enabled: false,
          initiallyShownCards: 3,
          setCurrentIndex: mockSetCurrentIndex,
          visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }),
      );

      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true },
      );
    });

    it('should not add scroll event listener when container is null', () => {
      const addEventListenerSpy = jest.spyOn(mockContainer, 'addEventListener');

      renderHook(() =>
        useCarouselScrollSync({
          cardRefs: mockCardRefs,
          container: null,
          currentIndex: 0,
          enabled: true,
          initiallyShownCards: 3,
          setCurrentIndex: mockSetCurrentIndex,
          visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }),
      );

      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });

    it('should remove scroll event listener on cleanup', () => {
      const removeEventListenerSpy = jest.spyOn(
        mockContainer,
        'removeEventListener',
      );

      const { unmount } = renderHook(() =>
        useCarouselScrollSync({
          cardRefs: mockCardRefs,
          container: mockContainer,
          currentIndex: 0,
          enabled: true,
          initiallyShownCards: 3,
          setCurrentIndex: mockSetCurrentIndex,
          visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }),
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
      );
    });

    it('should release locks after RELEASE_LOCK_DELAY of scroll silence', () => {
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 0,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        { initialProps: { visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      rerender({ visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] });
      expect(mockSetCurrentIndex).toHaveBeenCalledWith(1);

      mockSetCurrentIndex.mockClear();

      act(() => {
        jest.advanceTimersByTime(RELEASE_LOCK_DELAY);
      });

      rerender({ visibilityList: [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0] });
      expect(mockSetCurrentIndex).not.toHaveBeenCalled();
    });

    it('should reset timer on subsequent scroll events', () => {
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 0,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        { initialProps: { visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      act(() => {
        jest.advanceTimersByTime(RELEASE_LOCK_DELAY - 50);
      });

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      act(() => {
        jest.advanceTimersByTime(RELEASE_LOCK_DELAY - 50);
      });

      rerender({ visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] });
      expect(mockSetCurrentIndex).toHaveBeenCalledWith(1);
    });
  });

  describe('Effect 3: Update currentIndex from visibility during user scroll', () => {
    it('should update currentIndex when user scrolls and visibility changes', () => {
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 0,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        { initialProps: { visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      rerender({ visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] });

      expect(mockSetCurrentIndex).toHaveBeenCalledWith(1);
    });

    it('should calculate page index correctly for different initiallyShownCards values', () => {
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 0,
            enabled: true,
            initiallyShownCards: 4,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        {
          initialProps: {
            visibilityList: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      rerender({ visibilityList: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1] });

      expect(mockSetCurrentIndex).toHaveBeenCalledWith(2);
    });

    it('should not update currentIndex when disabled', () => {
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 0,
            enabled: false,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        { initialProps: { visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      rerender({ visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] });

      expect(mockSetCurrentIndex).not.toHaveBeenCalled();
    });

    it('should not update currentIndex when no visible cards', () => {
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 0,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        { initialProps: { visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      rerender({ visibilityList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });

      expect(mockSetCurrentIndex).not.toHaveBeenCalled();
    });

    it('should not update currentIndex when calculated page index equals current', () => {
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 1,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        { initialProps: { visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] } },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      rerender({ visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] });

      expect(mockSetCurrentIndex).not.toHaveBeenCalled();
    });

    it('should handle partial visibility at page boundaries by using first visible card', () => {
      // When scrolling between pages, the first visible index determines the page.
      // With firstVisibleIndex=2 and initiallyShownCards=3: Math.floor(2/3) = 0
      // So if currentIndex is already 0, no update should happen.
      // Let's test the case where we're at page 1 and scroll partially back to page 0.
      const { rerender } = renderHook(
        ({ visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex: 1,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        { initialProps: { visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] } },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      // Scroll back so card at index 2 (last of page 0) is visible along with cards 3,4
      // firstVisibleIndex = 2, Math.floor(2/3) = 0, which differs from currentIndex=1
      rerender({ visibilityList: [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0] });

      expect(mockSetCurrentIndex).toHaveBeenCalledWith(0);
    });
  });

  describe('Interaction between programmatic scroll and user scroll', () => {
    it('should not trigger programmatic scroll during user scroll', () => {
      const { rerender } = renderHook(
        ({ currentIndex, visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        {
          initialProps: {
            currentIndex: 0,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      rerender({
        currentIndex: 1,
        visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      });

      expect(mockCardRefs.current[3]?.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should allow programmatic scroll after lock release', () => {
      const { rerender } = renderHook(
        ({ currentIndex, visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        {
          initialProps: {
            currentIndex: 0,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        },
      );

      act(() => {
        mockContainer.dispatchEvent(new Event('scroll'));
      });

      act(() => {
        jest.advanceTimersByTime(RELEASE_LOCK_DELAY);
      });

      rerender({
        currentIndex: 2,
        visibilityList: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      });

      expect(mockCardRefs.current[6]?.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    });

    it('should not update currentIndex from visibility during programmatic scroll', () => {
      const { rerender } = renderHook(
        ({ currentIndex, visibilityList }) =>
          useCarouselScrollSync({
            cardRefs: mockCardRefs,
            container: mockContainer,
            currentIndex,
            enabled: true,
            initiallyShownCards: 3,
            setCurrentIndex: mockSetCurrentIndex,
            visibilityList,
          }),
        {
          initialProps: {
            currentIndex: 0,
            visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        },
      );

      rerender({
        currentIndex: 1,
        visibilityList: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      });

      rerender({
        currentIndex: 1,
        visibilityList: [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      });

      expect(mockSetCurrentIndex).not.toHaveBeenCalled();
    });
  });
});
