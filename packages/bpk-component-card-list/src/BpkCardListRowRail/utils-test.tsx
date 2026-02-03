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
// @ts-nocheck

import { renderHook } from '@testing-library/react';

import { setA11yTabIndex, useScrollToCard } from './utils';

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

describe('useScrollToCard', () => {
  let mockCardRefs: { current: HTMLDivElement[] };
  let mockCardList: HTMLElement[];

  beforeEach(() => {
    mockCardRefs = { current: [] as HTMLDivElement[] };
    mockCardList = Array.from({ length: 10 }, (_, index) => {
      const { mockDiv } = makeMockDiv(index);
      mockDiv.scrollIntoView = jest.fn();
      mockCardRefs.current.push(mockDiv);
      return mockDiv;
    });
  });

  it('should scroll to the target card when container is visible and the lock is inactive', () => {
    const mockContainer = document.createElement('div');
    mockContainer.getBoundingClientRect = jest.fn(
      () =>
        ({
          bottom: window.innerHeight - 10,
        }) as DOMRect,
    );
    const stateScrollingLockRef = { current: false };

    renderHook(() =>
      useScrollToCard(3, mockContainer, mockCardRefs, stateScrollingLockRef),
    );

    expect(mockCardList[3].scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('should not scroll if the container is not visible', () => {
    const mockContainer = document.createElement('div');
    mockContainer.getBoundingClientRect = jest.fn(
      () =>
        ({
          bottom: -10,
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
          bottom: window.innerHeight - 10,
        }) as DOMRect,
    );
    const stateScrollingLockRef = { current: true };

    renderHook(() =>
      useScrollToCard(3, mockContainer, mockCardRefs, stateScrollingLockRef),
    );

    expect(mockCardList[3].scrollIntoView).not.toHaveBeenCalled();
  });
});
