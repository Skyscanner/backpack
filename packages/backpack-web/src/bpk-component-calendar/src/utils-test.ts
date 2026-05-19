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

import { describe, it, expect, jest } from '@jest/globals';

import { memoize } from './utils';

describe('memoize', () => {
  it('should call the original function for new arguments', () => {
    const mockFn = jest.fn((x: number) => x * 2);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn(2)).toBe(4);
    expect(mockFn).toHaveBeenCalledTimes(1);

    expect(memoizedFn(3)).toBe(6);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should return cached results for repeated arguments', () => {
    const mockFn = jest.fn((x: number) => x * 2);
    const memoizedFn = memoize(mockFn);

    memoizedFn(2); // Original function called
    memoizedFn(2); // Result from cache
    memoizedFn(2); // Result from cache

    expect(mockFn).toHaveBeenCalledTimes(1); // Function called only once
  });

  it('should handle functions with multiple arguments', () => {
    const mockFn = jest.fn((x: number, y: number) => x + y);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn(2, 3)).toBe(5); // Original function called
    expect(mockFn).toHaveBeenCalledTimes(1);

    expect(memoizedFn(2, 3)).toBe(5); // Result from cache
    expect(mockFn).toHaveBeenCalledTimes(1); // No additional calls

    expect(memoizedFn(3, 2)).toBe(5); // New arguments, original function called
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should handle functions with no arguments', () => {
    const mockFn = jest.fn(() => 42);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn()).toBe(42); // Original function called
    expect(mockFn).toHaveBeenCalledTimes(1);

    expect(memoizedFn()).toBe(42); // Result from cache
    expect(mockFn).toHaveBeenCalledTimes(1); // No additional calls
  });
});
