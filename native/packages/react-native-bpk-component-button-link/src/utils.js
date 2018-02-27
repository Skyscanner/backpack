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

import difference from 'lodash/difference';
import { type Theme } from 'react-native-bpk-theming';

import styles from './styles';

const REQUIRED_THEME_ATTRIBUTES: [string] = [styles.themeMappings.text.color];

export const THEMEABLE_TYPES = REQUIRED_THEME_ATTRIBUTES;

export const getStyleForElement = (
  elementType: string,
  { iconAlignment }: Object,
): Array<Object> => {
  // Start with base style.
  const styleForElement = [styles.base[elementType]];

  if (iconAlignment === 'leading') {
    styleForElement.push(styles.modifiers.iconLeading[elementType]);
  }
  return styleForElement;
};

export const getThemingForElement = (
  elementType: string,
  theme: ?Theme,
): Object => {
  const suppliedTheme = theme; // This is purely to stop Flow from compaining.
  const themeForElement = {};
  if (suppliedTheme && styles.themeMappings[elementType]) {
    Object.keys(styles.themeMappings[elementType]).forEach(key => {
      const values = styles.themeMappings[elementType][key];
      if (values) {
        themeForElement[key] = suppliedTheme[values];
      }
    });
  }
  return themeForElement;
};

export const themeAttributesSupplied = (theme: Theme): boolean =>
  difference(REQUIRED_THEME_ATTRIBUTES, Object.keys(theme)).length === 0;

export const themePropType = (
  props: Object,
  propName: string,
  componentName: string,
): ?Error => {
  const { theme } = props;
  if (!theme) {
    return null;
  }
  if (!themeAttributesSupplied(theme)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. For button link, the \`theme\` prop must include \`${REQUIRED_THEME_ATTRIBUTES.join()}\``,
    ); // eslint-disable-line max-len
  }
  return null;
};

export const textStyle = (theme: ?Theme, props: Object): Array<any> => [
  getStyleForElement('text', props),
  getThemingForElement('text', theme),
];

export const iconStyle = (theme: ?Theme, props: Object): Array<any> => [
  ...textStyle(theme, props),
  getStyleForElement('icon', props),
];
