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
import { View, TouchableNativeFeedback } from 'react-native';

import {
  themeAttributesSupplied,
  getStyleForElement,
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
};

const BpkButtonLink = (props: Props) => {
  const {
    accessibilityLabel,
    icon,
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
  const accessibilityTraits = ['button'];

  return (
    <View style={[containerStyle, style]}>
      <TouchableNativeFeedback
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        icon={icon}
        onPress={onPress}
        {...rest}
      >
        <View style={[buttonStyle]}>
          <View style={getStyleForElement('view', props)}>
            <BpkText textStyle="sm" emphasize style={textStyle(theme, props)}>
              {title.toUpperCase()}
            </BpkText>
            {typeof icon === 'string' ? (
              <BpkIcon icon={icon} style={iconStyle(theme, props)} small />
            ) : (
              icon
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const propTypes = {
  ...commonPropTypes,
};

BpkButtonLink.propTypes = propTypes;

BpkButtonLink.defaultProps = {
  ...commonDefaultProps,
};

export default withTheme(BpkButtonLink);
