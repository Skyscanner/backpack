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

import { View, Platform } from 'react-native';
import React, { type Node } from 'react';
import PropTypes from 'prop-types';

import { withTheme } from 'react-native-bpk-theming';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';

import {
  themeAttributesSupplied,
  getStyleForElement,
  textStyle,
  iconStyle,
} from './utils';

import {
  type CommonProps,
  type IconAlignment,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
  ICON_ALIGNMENTS,
} from './common-types';

import BpkButtonLinkWrapper from './layout/BpkButtonLinkWrapper';

export type Props = {
  ...$Exact<CommonProps>,
  iconAlignment: IconAlignment,
  large: boolean,
};
const renderIcon = (
  icon: ?(String | Node),
  theme: ?Object,
  props: Props,
  large: boolean,
): ?Node => {
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

const BpkButtonLink = (props: Props) => {
  const {
    accessibilityLabel,
    icon,
    large,
    onPress,
    style,
    title,
    ...rest
  } = props;
  let { theme } = props;

  if (theme) {
    if (!themeAttributesSupplied(theme)) {
      theme = null;
    }
  }

  return (
    <BpkButtonLinkWrapper
      accessibilityLabel={accessibilityLabel}
      icon={icon}
      onPress={onPress}
      style={style}
      theme={theme}
      title={title}
      large={large}
      {...rest}
    >
      <View style={getStyleForElement('view', props)}>
        <BpkText
          textStyle={large ? 'lg' : 'sm'}
          emphasize
          style={textStyle(theme, props)}
        >
          {Platform.OS === 'android' ? title.toUpperCase() : title}
        </BpkText>
        {renderIcon(icon, theme, props, large)}
      </View>
    </BpkButtonLinkWrapper>
  );
};

const propTypes = {
  ...COMMON_PROP_TYPES,
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  large: PropTypes.bool,
};

BpkButtonLink.propTypes = propTypes;

BpkButtonLink.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  large: false,
};

export default withTheme(BpkButtonLink);

export { propTypes };
