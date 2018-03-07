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

import { View, Platform, StyleSheet, ViewPropTypes } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {
  colorGray300,
  colorGray700,
  colorBlue700,
  spacingMd,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import { withTheme } from 'react-native-bpk-theming';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';

import { THEMING_ATTRIBUTE, themePropType } from './theming';

const styles = StyleSheet.create({
  text: {
    color: colorGray700,
    paddingVertical: spacingMd,
    paddingHorizontal: spacingBase,
  },
  disabledText: {
    color: colorGray300,
  },
  selectedText: {
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
    title,
    ...rest
  } = props;

  const accessibilityTraits = ['button'];
  const textStyles = [styles.text];

  if (disabled) {
    accessibilityTraits.push('disabled');
    textStyles.push(styles.disabledText);
  } else if (selected) {
    textStyles.push(styles.selectedText);
    if (theme && theme[THEMING_ATTRIBUTE]) {
      const themeStyles = {
        selectedText: {
          color: theme[THEMING_ATTRIBUTE],
        },
      };
      textStyles.push(themeStyles.selectedText);
    }
  }

  const isAndroid = Platform.OS === 'android';
  const Touchable = isAndroid
    ? BpkTouchableNativeFeedback
    : BpkTouchableOverlay;
  const formattedTitle = isAndroid ? title.toUpperCase() : title;

  return (
    <Touchable
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityTraits={accessibilityTraits}
      disabled={disabled || selected}
      {...rest}
    >
      <View style={style}>
        <BpkText style={textStyles}>{formattedTitle}</BpkText>
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
  theme: themePropType,
};

BpkHorizontalNavItem.propTypes = propTypes;

BpkHorizontalNavItem.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  selected: false,
  style: null,
  theme: null,
};

export { propTypes };
export default withTheme(BpkHorizontalNavItem);
