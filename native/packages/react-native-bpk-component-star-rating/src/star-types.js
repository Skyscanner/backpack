/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

export const STAR_TYPES = {
  EMPTY: 'empty',
  HALF: 'half',
  FULL: 'full',
};

export const getTypeByRating = (starNumber, rating) => {
  if (starNumber <= rating) {
    return STAR_TYPES.FULL;
  }

  const rest = rating - (starNumber - 1);
  if (rest >= 0.5 && rest < 1) {
    return STAR_TYPES.HALF;
  }

  return STAR_TYPES.EMPTY;
};

