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
/* @flow */
import { isValidTheme, makeThemePropType, getThemeAttributes } from './util';

const REQUIRED_ATTRIBUTES: Array<string> = [
  'themeAttributeA',
  'themeAttributeB',
  'themeAttributeC',
];

const VALID_THEME = {
  themeAttributeA: 'red',
  themeAttributeB: 12,
  themeAttributeC: true,
  nonRequiredAttribute: 'green',
};
const INVALID_THEME = {
  themeAttributeA: 'red',
  themeAttributeC: true,
  nonRequiredAttribute: 'green',
};

describe('isValidTheme', () => {
  it('should validated themes that are valid', () => {
    expect(isValidTheme(REQUIRED_ATTRIBUTES, VALID_THEME)).toBeTruthy();
  });

  it('should fail to validate invalid themes', () => {
    expect(
      // themeAttributeB is required, but missing in theme
      isValidTheme(REQUIRED_ATTRIBUTES, INVALID_THEME),
    ).toBeFalsy();
  });
});

describe('makeThemePropType', () => {
  let propType;
  beforeEach(() => {
    propType = makeThemePropType(REQUIRED_ATTRIBUTES);
  });

  it('should not fail when the theme is valid', () => {
    expect(
      propType(
        { style: { color: 'red' }, theme: VALID_THEME },
        'theme',
        'TestComponent',
      ),
    ).toBeFalsy();
  });

  it('should not fail when no theme is given', () => {
    expect(
      propType({ style: { color: 'red' } }, 'theme', 'TestComponent'),
    ).toBeFalsy();
  });

  it('should fail when the theme is invalid', () => {
    expect(
      propType(
        { style: { color: 'red' }, theme: INVALID_THEME },
        'theme',
        'TestComponent',
      ),
    ).toEqual(
      new Error(
        'Invalid prop `theme` supplied to `TestComponent`. When supplying `theme` all the required theming attributes(`themeAttributeA, themeAttributeB, themeAttributeC`) must be supplied.',
      ),
    );
  });
});

describe('getThemeAttributes', () => {
  it('should return only the theme values if the theme is valid', () => {
    const { themeAttributeA, themeAttributeB, themeAttributeC } = VALID_THEME;

    expect(getThemeAttributes(REQUIRED_ATTRIBUTES, VALID_THEME)).toEqual({
      themeAttributeA,
      themeAttributeB,
      themeAttributeC,
    });
  });

  it('should return `null` if the theme is invalid', () => {
    expect(getThemeAttributes(REQUIRED_ATTRIBUTES, INVALID_THEME)).toBeNull();
  });
});
