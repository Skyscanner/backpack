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
  themeAttributes,
  allSkeletonThemeAttributes,
  skeletonThemeAttributes,
} from '../index';

describe('skeleton component themeAttributes', () => {
  it('should export skeletonThemeAttributes as an empty array', () => {
    expect(skeletonThemeAttributes).toEqual([]);
  });

  it('should export the deprecated themeAttributes default as an empty array', () => {
    expect(themeAttributes).toEqual([]);
  });

  it('should export allSkeletonThemeAttributes as an empty array', () => {
    expect(allSkeletonThemeAttributes).toEqual([]);
  });
});
