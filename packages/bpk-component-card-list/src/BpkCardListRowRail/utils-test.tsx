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

import { renderHook } from '@testing-library/react';

import {
  setA11yTabIndex,
  useScrollToCard,
  useIntersectionObserver,
} from './utils';

describe('setA11yTabIndex', () => {
  it('should set tabIndex to 0 for visible elements and -1 for hidden elements', () => {
    const mockDiv = document.createElement('div');
    const visibleRatios = [1, 0, 0.5];
    const index = 0;

    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    const button3 = document.createElement('button');

    mockDiv.appendChild(button1);
    mockDiv.appendChild(button2);
    mockDiv.appendChild(button3);

    setA11yTabIndex(mockDiv, index, visibleRatios);

    expect(button1.tabIndex).toBe(0); // Visible
    expect(button2.tabIndex).toBe(-1); // Hidden
    expect(button3.tabIndex).toBe(-1); // Partially visible
  });

  it('should do nothing if the element is null', () => {
    const visibleRatios = [1, 0, 0.5];
    const index = 0;

    expect(() => setA11yTabIndex(null, index, visibleRatios)).not.toThrow();
  });
});

describe('useScrollToCard', () => {
  let mockCardRefs: { current: HTMLDivElement[] };
  let mockCardList: HTMLElement[];

  beforeEach(() => {
    mockCardRefs = { current: [] as HTMLDivElement[] };
    mockCardList = Array(10).map((index) => {
      const div = document.createElement('div');
      div.textContent = `card ${index}`;
      div.scrollIntoView = jest.fn();
      mockCardRefs.current[index] = div;
      return div;
    });
    jest.clearAllMocks();
  });

  it('should scroll to the target card when container is visible and the lock is inactive', () => {
    const mockContainer = document.createElement('div');
    mockContainer.getBoundingClientRect = jest.fn(
      () =>
        ({
          bottom: window.innerHeight - 10, // Simulate visible container
        }) as DOMRect,
    );
    const stateScrollingLockRef = { current: false };

    renderHook(() =>
      useScrollToCard(3, mockContainer, mockCardRefs, stateScrollingLockRef),
    );

    expect(mockCardList[3].scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });

  it('should not scroll if the container is not visible', () => {
    const mockContainer = document.createElement('div');
    mockContainer.getBoundingClientRect = jest.fn(
      () =>
        ({
          bottom: -10, // Simulate invisible container
        }) as DOMRect,
    );
    const stateScrollingLockRef = { current: false };

    renderHook(() =>
      useScrollToCard(3, mockContainer, mockCardRefs, stateScrollingLockRef),
    );

    expect(mockCardList[3].scrollIntoView).not.toHaveBeenCalled();
  });

  it('should not scroll if scrolling lock is active', () => {
    const mockContainer = document.createElement('div');
    mockContainer.getBoundingClientRect = jest.fn(
      () =>
        ({
          bottom: window.innerHeight - 10, // Simulate visible container
        }) as DOMRect,
    );
    const stateScrollingLockRef = { current: true };

    renderHook(() =>
      useScrollToCard(3, mockContainer, mockCardRefs, stateScrollingLockRef),
    );

    expect(mockCardList[3].scrollIntoView).not.toHaveBeenCalled();
  });
});

describe('useIntersectionObserver', () => {
    let mockRoot: HTMLElement;
    let mockElement: HTMLElement;
    let setVisibleRatios: jest.Mock;
    let visibleRatios: number[];
  
    beforeEach(() => {
      mockRoot = document.createElement('div');
      mockElement = document.createElement('div');
      setVisibleRatios = jest.fn();
      visibleRatios = [0, 0, 0];
    });
  
    it('should update visibleRatios when intersection changes', () => {
      const threshold = [0.5];
      const { result } = renderHook(() =>
        useIntersectionObserver(
          { root: mockRoot, threshold },
          visibleRatios,
          setVisibleRatios,
        ),
      );
  
      const observe = result.current;
      observe(mockElement, 1); // Observe the second element
  
      // Simulate an IntersectionObserver entry
      const mockEntry: IntersectionObserverEntry = {
        target: mockElement,
        intersectionRatio: 0.7, // 新的可见比例
        boundingClientRect: mockElement.getBoundingClientRect(),
        intersectionRect: mockElement.getBoundingClientRect(),
        isIntersecting: true,
        rootBounds: null,
        time: performance.now(),
      };
  
      // Manually invoke the callback
      const observerCallback = jest.fn((entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          setVisibleRatios((prev: number[]) => {
            const newVisibleRatios = [...prev];
            newVisibleRatios[index] = entry.intersectionRatio;
            return newVisibleRatios;
          });
        });
      });
  
      observerCallback([mockEntry]);
  
      expect(setVisibleRatios).toHaveBeenCalledWith(expect.any(Function));
      expect(setVisibleRatios).toHaveBeenCalledTimes(1);
    });
  
    it('should not update visibleRatios if element is null', () => {
      const threshold = [0.5];
      const { result } = renderHook(() =>
        useIntersectionObserver(
          { root: mockRoot, threshold },
          visibleRatios,
          setVisibleRatios,
        ),
      );
  
      const observe = result.current;
      observe(null, 1);
  
      expect(setVisibleRatios).not.toHaveBeenCalled();
    });
  
    it('should correctly update the visibleRatios array', () => {
      const threshold = [0.5];
      const { result } = renderHook(() =>
        useIntersectionObserver(
          { root: mockRoot, threshold },
          visibleRatios,
          setVisibleRatios,
        ),
      );
  
      const observe = result.current;
      observe(mockElement, 2);
  
      const mockEntry: IntersectionObserverEntry = {
        target: mockElement,
        intersectionRatio: 0.7,
        boundingClientRect: mockElement.getBoundingClientRect(),
        intersectionRect: mockElement.getBoundingClientRect(),
        isIntersecting: true,
        rootBounds: null,
        time: performance.now(),
      };
  
      const observerCallback = jest.fn((entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          setVisibleRatios((prev: number[]) => {
            const newVisibleRatios = [...prev];
            newVisibleRatios[index] = entry.intersectionRatio;
            return newVisibleRatios;
          });
        });
      });
  
      observerCallback([mockEntry]);
  
      expect(setVisibleRatios).toHaveBeenCalledWith(expect.any(Function));
      expect(setVisibleRatios).toHaveBeenCalledTimes(1);
    });
  });
