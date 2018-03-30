/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.  You may obtain a copy of the License at
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
import has from 'lodash/has';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';

export const isValidTheme = (
  requiredAttributes: Array<string>,
  theme: Object,
): boolean =>
  requiredAttributes.reduce(
    (valid, attribute) =>
      has(theme, attribute) &&
      (isBoolean(theme[attribute]) ||
        isNumber(theme[attribute]) ||
        !isEmpty(theme[attribute])) &&
      valid,
    true,
  );

export const makeThemePropType = (requiredAttributes: Array<string>) => (
  props: Object,
  propName: string,
  componentName: string,
): Error | boolean => {
  const { theme } = props;
  if (!theme) {
    return false;
  }

  const validTheme = isValidTheme(requiredAttributes, theme);

  if (!validTheme) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. When supplying \`theme\` all the required theming attributes(\`${requiredAttributes.join(
        ', ',
      )}\`) must be supplied.`,
    ); // eslint-disable-line max-len
  }
  return false;
};

export const getThemeAttributes = (
  requiredAttributes: Array<string>,
  theme: ?Object,
): ?Object => {
  if (!theme) {
    return null;
  }

  if (theme && !isValidTheme(requiredAttributes, theme)) {
    return null;
  }

  return requiredAttributes.reduce((result, attribute) => {
    if (theme) {
      result[attribute] = theme[attribute]; // eslint-disable-line no-param-reassign
    }
    return result;
  }, {});
};
