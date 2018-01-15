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

/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { View, Platform } from 'react-native';
import React, { type Node } from 'react';
import PropTypes from 'prop-types';

import { withTheme } from 'react-native-bpk-theming';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';

import {
  isTypeThemeable,
  themeAttributesSupplied,
  getStyleForElement,
  textStyle,
  iconStyle,
} from './utils';

import {
  type CommonProps,
  BUTTON_TYPES,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from './common-types';

import BpkButtonContainer from './layout/BpkButtonContainer';

type Props = {
  ...$Exact<CommonProps>,
  large: boolean,
};

const BpkButton = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconOnly,
    large,
    onPress,
    style,
    title,
    type,
    ...rest
  } = props;
  let { theme } = props;
  // Validate the button type.
  if (!Object.values(BUTTON_TYPES).includes(type)) {
    throw new Error(
      `"${type}" is not a valid button type. Valid types are ${Object.keys(
        BUTTON_TYPES,
      ).join(', ')}`,
    );
  }

  // Validate that button is themeable and all theming attributes
  // have been supplied. If not, disable theming.
  if (theme) {
    if (!isTypeThemeable(type) || !themeAttributesSupplied(type, theme)) {
      theme = null;
    }
  }

  const renderIcon = (): ?Node => {
    if (!icon) {
      return null;
    }
    if (typeof icon === 'string') {
      return (
        <BpkIcon icon={icon} style={iconStyle(theme, props)} small={!large} />
      );
    }
    return icon;
  };
  return (
    <BpkButtonContainer
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      icon={icon}
      iconOnly={iconOnly}
      onPress={onPress}
      style={style}
      theme={theme}
      title={title}
      type={type}
      large={large}
      {...rest}
    >
      <View style={getStyleForElement('view', props)}>
        {!iconOnly && (
          <BpkText
            textStyle={large ? 'lg' : 'sm'}
            emphasize
            style={textStyle(theme, props)}
          >
            {Platform.OS === 'android' ? title.toUpperCase() : title}
          </BpkText>
        )}
        {renderIcon()}
      </View>
    </BpkButtonContainer>
  );
};

const propTypes = {
  ...COMMON_PROP_TYPES,
  large: PropTypes.bool,
};
BpkButton.propTypes = propTypes;
BpkButton.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  large: false,
};

export default withTheme(BpkButton);
export { propTypes };
