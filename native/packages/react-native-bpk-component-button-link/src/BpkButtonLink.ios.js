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
import PropTypes from 'prop-types';
import { withTheme } from 'react-native-bpk-theming';
import { View, TouchableOpacity } from 'react-native';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';

import {
  themeAttributesSupplied,
  getStyleForElement,
  getThemingForElement,
  textStyle,
  iconStyle,
} from './utils';

import {
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
} from './common-types';

export type Props = {
  ...$Exact<CommonProps>,
  large: boolean,
};

const BpkButtonLink = (props: Props) => {
  const {
    accessibilityLabel,
    icon,
    large,
    onPress,
    style,
    title,
    theme: themeProp,
    ...rest
  } = props;

  const shouldApplyTheme = themeProp && themeAttributesSupplied(themeProp);
  const theme = shouldApplyTheme ? themeProp : null;

  const containerStyle = getStyleForElement('container', props);
  const buttonStyle = getStyleForElement('button', props);
  const buttonTheme = getThemingForElement('button', theme);
  const accessibilityTraits = ['button'];

  return (
    <View style={[containerStyle, style]}>
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        onPress={onPress}
        style={[buttonStyle, buttonTheme]}
        icon={icon}
        {...rest}
      >
        <View style={getStyleForElement('view', props)}>
          <BpkText
            textStyle={large ? 'lg' : 'sm'}
            emphasize
            style={textStyle(theme, props)}
          >
            {title}
          </BpkText>
          {typeof icon === 'string' ? (
            <BpkIcon
              icon={icon}
              style={iconStyle(theme, props)}
              small={!large}
            />
          ) : (
            icon
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

BpkButtonLink.propTypes = {
  ...commonPropTypes,
  large: PropTypes.bool,
};

BpkButtonLink.defaultProps = {
  ...commonDefaultProps,
  large: false,
};

export default withTheme(BpkButtonLink);
