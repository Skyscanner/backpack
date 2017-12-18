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

import { StyleSheet } from 'react-native';
import difference from 'lodash/difference';
import { colorWhite } from 'bpk-tokens/tokens/base.react.native';

import styles from './BpkButton-styles';

const REQUIRED_THEME_ATTRIBUTES = {
  primary: [
    styles.themeMappings.text.color.primary,
    styles.themeMappings.gradient.primary.startColor,
    styles.themeMappings.gradient.primary.endColor,
  ],
  secondary: [
    styles.themeMappings.text.color.secondary,
    styles.themeMappings.button.borderColor.secondary,
    styles.themeMappings.gradient.secondary.startColor,
  ],
};

export const THEMEABLE_TYPES = Object.keys(REQUIRED_THEME_ATTRIBUTES);

export const getStyleForElement = (
  elementType,
  { type, title, icon, iconOnly, large, disabled },
) => {
  // Start with base style.
  const styleForElement = [styles.base[elementType]];

  // Add styles for the button type (primary, secondary etc).
  if (styles.types[type] && styles.types[type][elementType]) {
    styleForElement.push(styles.types[type][elementType]);
  }

  // Add modifiers. Disabled comes last to override other styles.
  if (large) {
    let largeModifier = 'large';
    if (['secondary', 'destructive'].includes(type)) {
      largeModifier = 'largeWithOutline';
    }
    styleForElement.push(styles.modifiers[largeModifier][elementType]);
  }

  if (disabled) {
    styleForElement.push(styles.modifiers.disabled[elementType]);
  }

  if (iconOnly) {
    styleForElement.push(
      large
        ? styles.modifiers.iconOnlyLarge[elementType]
        : styles.modifiers.iconOnly[elementType],
    );
  } else if (title && icon) {
    // If it has a title and icon, get the style for that.
    styleForElement.push(
      styles.modifiers[large ? 'textAndIconLarge' : 'textAndIcon'][elementType],
    );
  }

  return styleForElement;
};

export const getThemingForElement = (
  elementType,
  theme,
  { type, disabled },
) => {
  const themeForElement = {};
  if (theme && !disabled && styles.themeMappings[elementType]) {
    Object.keys(styles.themeMappings[elementType]).forEach(key => {
      const values = styles.themeMappings[elementType][key];
      if (values[type]) {
        themeForElement[key] = theme[values[type]];
      }
    });
  }
  return themeForElement;
};

export const getGradientColors = (theme, { type, disabled }) => {
  let gradientColors = styles.gradientColors[type];
  if (theme) {
    const gradientThemeProps = styles.themeMappings.gradient[type];
    gradientColors = [
      theme[gradientThemeProps.startColor],
      theme[gradientThemeProps.endColor],
    ].filter(item => !!item);
  }

  if (disabled) {
    gradientColors = styles.gradientColors.disabled;
  }
  return gradientColors;
};

export const iconPropType = (props, propName, componentName) => {
  const icon = props[propName];
  if (props.iconOnly && !icon) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. When \`iconOnly\` is enabled, \`${propName}\` must be supplied.`,
    ); // eslint-disable-line max-len
  }
  return false;
};

export const isTypeThemeable = type => THEMEABLE_TYPES.includes(type);

export const themeAttributesSupplied = (type, theme) =>
  difference(REQUIRED_THEME_ATTRIBUTES[type], Object.keys(theme)).length === 0;

export const themePropType = (props, propName, componentName) => {
  const { type, theme } = props;
  if (!theme) {
    return false;
  }
  if (!themeAttributesSupplied(type, theme)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. For buttons of type \`${type}\`, the \`theme\` prop must include \`${REQUIRED_THEME_ATTRIBUTES[
        type
      ].join(', ')}\``,
    ); // eslint-disable-line max-len
  }
  return false;
};

export const getAndroidBackgroundColour = (theme, props) => {
  const style = {
    backgroundColor: 'transparent',
  };
  /**
   * The main colour of the button in Android is the start colour from the  gradient
   * for iOS, can be made explicit in the style file if needed
   */
  const [mainColour] = getGradientColors(theme, props);
  if (mainColour.toString() === colorWhite) {
    return StyleSheet.create({ style }).style;
  }
  style.backgroundColor = mainColour;
  return StyleSheet.create({ style }).style;
};

export const textStyle = (theme, props) => [
  getStyleForElement('text', props),
  getThemingForElement('text', theme, props),
];
