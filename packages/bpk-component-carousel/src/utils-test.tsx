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

import { useScrollToInitialImage, scrollToIndex } from './utils';

describe('useScrollToInitialImage', () => {
    it('should scroll to initial image on mount', () => {

    // Mock parent and scroll function
    const parent = document.createElement('div');
    const scrollMock = jest.fn();

    // Define scroll method on parent
    Object.defineProperty(parent, 'scroll', {
      configurable: true,
      value: scrollMock,
    });

    // Create child and append to parent
    const child = document.createElement('div');
    parent.appendChild(child);

    const imagesRef = { current: [child, document.createElement('div')] };
    const initialImageIndex = 0;

    renderHook(() => useScrollToInitialImage(initialImageIndex, imagesRef));

    expect(scrollMock).toHaveBeenCalledTimes(1);

    expect(scrollMock).toHaveBeenCalledWith(
      expect.objectContaining({ left: child.offsetLeft, behavior: 'auto' })
    );
  });
});

describe('scrollToIndex', () => {
  it('should scroll to the specified index with smooth behavior', () => {
    const parent = document.createElement('div');
    const scrollMock = jest.fn();

    Object.defineProperty(parent, 'scroll', {
      configurable: true,
      value: scrollMock,
    });

    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    
    // Mock offsetLeft for the elements
    Object.defineProperty(child1, 'offsetLeft', {
      value: 0,
      configurable: true
    });
    
    Object.defineProperty(child2, 'offsetLeft', {
      value: 200,
      configurable: true
    });
    
    parent.appendChild(child1);
    parent.appendChild(child2);

    const imagesRef = { current: [child1, child2] };
    const targetIndex = 1;
    
    scrollToIndex(targetIndex, imagesRef);

    expect(scrollMock).toHaveBeenCalledTimes(1);
    expect(scrollMock).toHaveBeenCalledWith(
      expect.objectContaining({ left: 200, behavior: 'smooth' })
    );
  });
});
