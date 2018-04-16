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

import { Platform, StyleSheet, View, ViewPropTypes } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {
  colorGray300,
  colorGray700,
  colorBlue700,
  spacingSm,
  spacingXl,
  borderSizeSm,
  borderSizeLg,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import { getThemeAttributes, withTheme } from 'react-native-bpk-theming';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';

import { REQUIRED_THEME_ATTRIBUTES, themePropType } from './theming';

const styles = StyleSheet.create({
  view: {
    height: spacingXl + spacingSm - borderSizeSm - borderSizeLg,
    justifyContent: 'center',
  },
  viewSmall: {
    height: spacingXl - borderSizeSm - borderSizeLg,
  },
  text: {
    color: colorGray700,
    paddingHorizontal: spacingBase,
  },
  textDisabled: {
    color: colorGray300,
  },
  textSelected: {
    color: colorBlue700,
  },
});

const BpkHorizontalNavItem = props => {
  const {
    accessibilityLabel,
    disabled,
    selected,
    style,
    theme,
    small,
    title,
    ...rest
  } = props;

  const accessibilityTraits = ['button'];
  const textSize = small ? 'sm' : 'base';
  const viewStyles = [styles.view];
  const textStyles = [styles.text];

  if (disabled) {
    accessibilityTraits.push('disabled');
    textStyles.push(styles.textDisabled);
  } else if (selected) {
    textStyles.push(styles.textSelected);
    const themeAttributes = getThemeAttributes(
      REQUIRED_THEME_ATTRIBUTES,
      theme,
    );

    if (themeAttributes) {
      textStyles.push({
        color: themeAttributes.horizontalNavSelectedTextColor,
      });
    }
  }

  if (small) {
    viewStyles.push(styles.viewSmall);
  }

  if (style) {
    viewStyles.push(style);
  }

  const isAndroid = Platform.OS === 'android';
  const Touchable = isAndroid
    ? BpkTouchableNativeFeedback
    : BpkTouchableOverlay;
  const formattedTitle = isAndroid ? title.toUpperCase() : title;
  const platformProps = isAndroid ? { borderlessBackground: false } : {};
  return (
    <Touchable
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityTraits={accessibilityTraits}
      disabled={disabled || selected}
      {...platformProps}
      {...rest}
    >
      <View style={viewStyles}>
        <BpkText style={textStyles} textStyle={textSize}>
          {formattedTitle}
        </BpkText>
      </View>
    </Touchable>
  );
};

const propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  style: ViewPropTypes.style,
  small: PropTypes.bool,
  theme: themePropType,
};

BpkHorizontalNavItem.propTypes = propTypes;

BpkHorizontalNavItem.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  selected: false,
  small: false,
  style: null,
  theme: null,
};

export { propTypes };
export default withTheme(BpkHorizontalNavItem);
