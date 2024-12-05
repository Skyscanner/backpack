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
