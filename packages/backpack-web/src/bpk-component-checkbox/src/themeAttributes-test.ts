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

import themeAttributes, { allCheckboxThemeAttributes } from './themeAttributes';

describe('checkbox themeAttributes', () => {
  it('should export the deprecated default themeAttributes with the legacy key', () => {
    expect(themeAttributes).toEqual(['checkboxCheckedColor']);
  });

  it('should export allCheckboxThemeAttributes with all unique private checkbox tokens', () => {
    expect(allCheckboxThemeAttributes).toEqual([
      'privateCheckboxBgDefaultChecked',
      'privateCheckboxBgDefaultIntermediate',
      'privateCheckboxBgOnContrastChecked',
      'privateCheckboxBgOnContrastIntermediate',
      'privateCheckboxBorderDefaultDisabled',
      'privateCheckboxBorderDefaultNotChecked',
      'privateCheckboxBorderOnContrastDisabled',
      'privateCheckboxBorderOnContrastNotChecked',
      'privateCheckboxIconOnContrast',
      'privateCheckboxStroke',
    ]);
  });
});
