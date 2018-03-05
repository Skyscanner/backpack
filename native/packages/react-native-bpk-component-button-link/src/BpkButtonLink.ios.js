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

import styles from './styles';
import { themeAttributesSupplied } from './utils';

import {
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  ICON_ALIGNMENTS,
} from './common-types';

export type Props = {
  ...$Exact<CommonProps>,
  large: boolean,
};

const BpkButtonLink = (props: Props) => {
  const {
    accessibilityLabel,
    icon,
    iconAlignment,
    large,
    onPress,
    style,
    title,
    theme,
    ...rest
  } = props;

  const themeStyle =
    theme && themeAttributesSupplied(theme)
      ? { color: theme.buttonLinkTextColor }
      : null;

  const containerStyle = [styles.container];
  const viewStyle = [styles.view];
  const textStyle = [styles.text];
  const iconStyle = [styles.icon];

  if (iconAlignment === ICON_ALIGNMENTS.leading) {
    viewStyle.push(styles.viewLeading);
    iconStyle.push(styles.iconLeading);
  }

  if (themeStyle) {
    textStyle.push(themeStyle);
    iconStyle.push(themeStyle);
  }

  if (style) {
    containerStyle.push(style);
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={['button']}
        onPress={onPress}
        icon={icon}
        {...rest}
      >
        <View style={viewStyle}>
          <BpkText textStyle={large ? 'lg' : 'sm'} emphasize style={textStyle}>
            {title}
          </BpkText>
          {typeof icon === 'string' ? (
            <BpkIcon icon={icon} style={iconStyle} small={!large} />
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
