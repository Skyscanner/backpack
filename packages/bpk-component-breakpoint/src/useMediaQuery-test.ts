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

import { renderHook } from '@testing-library/react-hooks';

import useMediaQuery from './useMediaQuery';

describe('useMediaQuery', () => {
  it('should return true if media query matches', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const view = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(view.result.all.length).toBe(1);

    expect(view.result.all[0]).toBe(true);
  });

  it('should return false if media query doesn`t match', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const view = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(view.result.all.length).toBe(1);

    expect(view.result.all[0]).toBe(false);
  });
});
