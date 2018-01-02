/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { STAR_TYPES, getTypeByRating } from './star-types';

describe('star-types', () => {
  describe('STAR_TYPES', () => {
    it('exports full', () => {
      expect(STAR_TYPES.FULL).toBe('full');
    });

    it('exports half', () => {
      expect(STAR_TYPES.HALF).toBe('half');
    });

    it('exports empty', () => {
      expect(STAR_TYPES.EMPTY).toBe('empty');
    });
  });

  describe('getTypeByRating', () => {
    it('returns full for stars below the rating', () => {
      expect(getTypeByRating(1, 2)).toBe(STAR_TYPES.FULL);
    });

    it('returns half for stars less than half below the rating', () => {
      expect(getTypeByRating(2, 1.5)).toBe(STAR_TYPES.HALF);
    });

    it('returns empty for stars above the rating', () => {
      expect(getTypeByRating(2, 1)).toBe(STAR_TYPES.EMPTY);
    });
  });
});
