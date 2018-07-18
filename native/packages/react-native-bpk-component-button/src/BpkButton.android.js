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

import React from 'react';
import { withTheme } from 'react-native-bpk-theming';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import { View } from 'react-native';

import {
  isTypeThemeable,
  themeAttributesSupplied,
  getStyleForElement,
  getAndroidBackgroundColour,
  textStyle,
  iconStyle,
} from './utils';

import {
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  BUTTON_TYPES,
  ICON_ALIGNMENTS,
} from './common-types';

export type Props = {
  ...$Exact<CommonProps>,
};

const BpkButton = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconOnly,
    onPress,
    style,
    title,
    type,
    theme: themeProp,
    ...rest
  } = props;

  if (!Object.values(BUTTON_TYPES).includes(type)) {
    throw new Error(
      `"${type}" is not a valid button type. Valid types are ${Object.keys(
        BUTTON_TYPES,
      ).join(', ')}`,
    );
  }

  const shouldApplyTheme =
    themeProp &&
    (isTypeThemeable(type) && themeAttributesSupplied(type, themeProp));
  const theme = shouldApplyTheme ? themeProp : null;

  const accessibilityTraits = ['button'];
  const containerStyle = getStyleForElement('container', props);
  const buttonStyle = getStyleForElement('button', props);
  const backgroundColor = getAndroidBackgroundColour(theme, props);

  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  return (
    <View style={[containerStyle, style]}>
      <BpkTouchableNativeFeedback
        disabled={disabled}
        onPress={onPress}
        type={type}
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        {...rest}
      >
        <View
          style={[
            buttonStyle,
            backgroundColor,
            getStyleForElement('view', props),
          ]}
        >
          {!iconOnly && (
            <BpkText textStyle="sm" emphasize style={textStyle(theme, props)}>
              {title.toUpperCase()}
            </BpkText>
          )}
          {typeof icon === 'string' ? (
            <BpkIcon icon={icon} style={iconStyle(theme, props)} small />
          ) : (
            icon
          )}
        </View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

BpkButton.propTypes = {
  ...commonPropTypes,
};

BpkButton.defaultProps = {
  ...commonDefaultProps,
};

export default withTheme(BpkButton);
export { BUTTON_TYPES, ICON_ALIGNMENTS };
