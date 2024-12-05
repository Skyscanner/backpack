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

import {
  calendarDaySize,
  calendarDaySpacing,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

const CSS_UNIT_REGEX = /(^[+-]?(?:\d*\.)?\d+)(.+)/i;

const splitToken = (value: string) => {
  const match = value.match(CSS_UNIT_REGEX);
  if (!match) {
    throw new Error(
      `Invalid token value. Expecting a valid css unit, got ${value}`,
    );
  }
  const [_, val, unit] = match;
  return [parseFloat(val), unit];
};

export const getCalendarGridWidth = (multiplier = 1) => {
  const [sizeValue, sizeUnit] = splitToken(calendarDaySize);
  const [spacingValue, spacingUnit] = splitToken(calendarDaySpacing);

  if (sizeUnit !== spacingUnit) {
    throw new Error(
      `'calendarDaySize' and 'calendarDaySpacing' must use the same unit. Got ${sizeUnit} and ${spacingUnit}`,
    );
  }
  // @ts-expect-error TS doesn't correctly read the size and spacing values type i.e. numbers as returned by parseFloat
  const width = multiplier * (7 * (sizeValue + 2 * spacingValue));
  return `${width}${sizeUnit}`;
};

export const getTransformStyles = (transformValue: string) => {
  const transform = `translateX(${transformValue})`;
  return {
    transform,
    msTransform: transform,
    MozTransform: transform,
    WebkitTransform: transform,
  };
};

export const isTransitionEndSupported = () =>
  !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

/**
 * Memoizes a given function to optimize performance by caching its results based on input arguments.
 *
 * @template T - The type of the function to be memoized. Must be a function.
 * @param {T} fn - The function to be memoized.
 * @returns {T} - The memoized version of the input function. Subsequent calls with the same arguments
 *                will return the cached result, avoiding redundant computations.
 *
 * @example
 * // Simple usage:
 * const add = (a: number, b: number) => a + b;
 * const memoizedAdd = memoize(add);
 *
 * console.log(memoizedAdd(1, 2)); // Computes and caches result: 3
 * console.log(memoizedAdd(1, 2)); // Fetches from cache: 3
 *
 * @example
 * // With a more complex function:
 * const slowFunction = (num: number) => {
 *   console.log('Computing...');
 *   return num * 2;
 * };
 * const memoizedSlowFunction = memoize(slowFunction);
 *
 * console.log(memoizedSlowFunction(5)); // Logs "Computing...", returns 10
 * console.log(memoizedSlowFunction(5)); // Fetches from cache: 10
 *
 * @remarks
 * - This implementation uses a `Map` object and `JSON.stringify` to create cache keys.
 * - Functions with non-primitive or cyclic arguments may not work as expected due to
 *   `JSON.stringify` limitations.
 * - The cache is stored in memory and will grow indefinitely unless manually managed or
 *   the function goes out of scope.
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  function memoizedFunction(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }

  return memoizedFunction as T;
}
