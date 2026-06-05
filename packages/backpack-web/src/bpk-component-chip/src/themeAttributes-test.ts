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

import themeAttributes, {
  chipBorderRadiusThemeAttributes,
  chipDefaultThemeAttributes,
  chipOnDarkThemeAttributes,
  chipOnImageThemeAttributes,
} from './themeAttributes';

describe('themeAttributes', () => {
  it('default export preserves the original 8 selected-state attributes for backward compatibility', () => {
    expect(themeAttributes).toEqual([
      'chipDefaultSelectedBackgroundColor',
      'chipDefaultSelectedTextColor',
      'chipOnDarkSelectedBackgroundColor',
      'chipOnDarkSelectedTextColor',
      'chipOnImageSelectedBackgroundColor',
      'chipOnImageSelectedHoverBackgroundColor',
      'chipOnImageSelectedActiveBackgroundColor',
      'chipOnImageSelectedTextColor',
    ]);
  });

  it('chipBorderRadiusThemeAttributes exports the border-radius attribute', () => {
    expect(chipBorderRadiusThemeAttributes).toEqual(['chipBorderRadius']);
  });

  it('chipDefaultThemeAttributes exports all default variant attributes', () => {
    expect(chipDefaultThemeAttributes).toEqual([
      'chipDefaultBackgroundColor',
      'chipDefaultTextColor',
      'chipDefaultBorderColor',
      'chipDefaultHoverBackgroundColor',
      'chipDefaultHoverBorderColor',
      'chipDefaultActiveBorderColor',
      'chipDefaultSelectedBackgroundColor',
      'chipDefaultSelectedTextColor',
      'chipDefaultSelectedHoverBackgroundColor',
      'chipDefaultSelectedActiveBackgroundColor',
    ]);
  });

  it('chipOnDarkThemeAttributes exports all on-dark variant attributes', () => {
    expect(chipOnDarkThemeAttributes).toEqual([
      'chipOnDarkBackgroundColor',
      'chipOnDarkTextColor',
      'chipOnDarkBorderColor',
      'chipOnDarkHoverBorderColor',
      'chipOnDarkActiveBorderColor',
      'chipOnDarkSelectedBackgroundColor',
      'chipOnDarkSelectedTextColor',
      'chipOnDarkSelectedHoverBackgroundColor',
      'chipOnDarkSelectedActiveBackgroundColor',
    ]);
  });

  it('chipOnImageThemeAttributes exports all on-image variant attributes', () => {
    expect(chipOnImageThemeAttributes).toEqual([
      'chipOnImageBackgroundColor',
      'chipOnImageTextColor',
      'chipOnImageHoverBackgroundColor',
      'chipOnImageActiveBackgroundColor',
      'chipOnImageSelectedBackgroundColor',
      'chipOnImageSelectedTextColor',
      'chipOnImageSelectedHoverBackgroundColor',
      'chipOnImageSelectedActiveBackgroundColor',
    ]);
  });
});
