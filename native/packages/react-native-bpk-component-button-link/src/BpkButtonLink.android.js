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
import { View } from 'react-native';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';
import { getThemeAttributes, withTheme } from 'react-native-bpk-theming';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';

import styles from './styles';

import {
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  ICON_ALIGNMENTS,
  REQUIRED_THEME_ATTRIBUTES,
} from './common-types';

export type Props = {
  ...$Exact<CommonProps>,
  borderlessBackground: boolean,
};

const BpkButtonLink = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconAlignment,
    onPress,
    style,
    title,
    borderlessBackground,
    theme,
    ...rest
  } = props;

  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);
  const themeStyle = themeAttributes
    ? { color: themeAttributes.buttonLinkTextColor }
    : null;

  const textStyle = [styles.text];
  const viewStyle = [styles.view];
  const iconStyle = [styles.icon];

  const accessibilityTraits = ['button'];

  if (iconAlignment === ICON_ALIGNMENTS.leading) {
    viewStyle.push(styles.viewLeading);
    iconStyle.push(styles.iconLeading);
  }

  if (themeStyle) {
    textStyle.push(themeStyle);
    iconStyle.push(themeStyle);
  }

  if (disabled) {
    textStyle.push(styles.disabled);
    accessibilityTraits.push('disabled');
  }

  return (
    <View style={style}>
      <BpkTouchableNativeFeedback
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        onPress={onPress}
        disabled={disabled}
        style={styles.button}
        borderlessBackground={borderlessBackground}
        {...rest}
      >
        <View style={viewStyle}>
          <BpkText textStyle="sm" emphasize style={textStyle}>
            {title.toUpperCase()}
          </BpkText>
          {typeof icon === 'string' ? (
            <BpkIcon icon={icon} style={iconStyle} small />
          ) : (
            icon
          )}
        </View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

const propTypes = {
  ...commonPropTypes,
  borderlessBackground: PropTypes.bool,
};

BpkButtonLink.propTypes = propTypes;

BpkButtonLink.defaultProps = {
  ...commonDefaultProps,
  borderlessBackground: true,
};

export default withTheme(BpkButtonLink);
