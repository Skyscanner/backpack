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



import { scaleBand } from 'd3-scale';

import data from '../data.json';

import { center, identity, remToPx } from './utils';

describe('utils', () => {
  describe('identity', () => {
    it('should return the input', () => {
      const obj = {};
      const arr: unknown[] = [];
      expect(identity(null)).toBe(null);
      expect(identity(0)).toBe(0);
      expect(identity(obj)).toBe(obj);
      expect(identity(arr)).toBe(arr);
    });
  });

  describe('center', () => {
    const domain = data.prices.map((c) => c.month);
    const scale = scaleBand().domain(domain).range([0, 100]);
    const scaleRound = scaleBand().domain(domain).rangeRound([0, 100]);

    it('should return a function', () => {
      expect(typeof center(scale) === 'function').toBe(true);
    });

    it('should return the exact band center', () => {
      const position = center(scale);
      expect(position(domain[0])).not.toBe(13);
      expect(Math.round(position(domain[0]))).toBe(13);
      expect(position(domain[1])).not.toBe(38);
      expect(Math.round(position(domain[1]))).toBe(38);
    });

    it('should return the rounded band center for a rounded range', () => {
      const position = center(scaleRound);
      expect(position(domain[0])).toBe(13);
      expect(position(domain[1])).toBe(38);
    });
  });

  describe('remToPx', () => {
    it('should transform rem strings into px numbers', () => {
      expect(typeof remToPx('1rem') === 'number').toBe(true);
      expect(remToPx('1rem')).toBe(16);
      expect(remToPx('1.5rem')).toBe(24);
      expect(remToPx('.5rem')).toBe(8);
    });
  });
});
