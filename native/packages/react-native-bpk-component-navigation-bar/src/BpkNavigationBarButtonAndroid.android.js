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
import { StyleSheet, View } from 'react-native';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import { colorWhite, colorBlue300 } from 'bpk-tokens/tokens/base.react.native';
import { setOpacity } from 'bpk-tokens';

// NOTE: this file explicitly does not use the Backpack tokens because it's based on Material design tokens not Backpack.
const styles = StyleSheet.create({
  clipView: {
    borderRadius: 40, // eslint-disable-line backpack/use-tokens
  },
  icon: {
    padding: 8, // eslint-disable-line backpack/use-tokens
  },
});

export type Props = {
  title: string,
  icon: $Keys<typeof icons>,
  disabled: boolean,
  onPress: ?() => mixed,
  touchableColor: ?string,
  tintColor: ?string,
  disabledTintColor: ?string,
};

const BpkNavigationBarButton = (props: Props) => {
  const {
    icon,
    disabled,
    onPress,
    touchableColor,
    disabledTintColor,
    tintColor,
    title,
  } = props;
  const touchableColorFinal = touchableColor || colorWhite;
  const tintColorFinal = disabled
    ? disabledTintColor || colorBlue300
    : tintColor || colorWhite;
  const iconStyle = [styles.icon, { color: tintColorFinal }];
  const accessibilityTraits = ['button'];

  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  return (
    <View style={styles.clipView}>
      <BpkTouchableNativeFeedback
        onPress={onPress}
        accessibilityComponentType="button"
        accessibilityTraits={accessibilityTraits}
        accessibilityLabel={title}
        color={setOpacity(touchableColorFinal, 0.2)}
        disabled={disabled}
        accessible
      >
        <View>
          <BpkIcon style={iconStyle} icon={icons[icon]} />
        </View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

BpkNavigationBarButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,

  // Internal only
  touchableColor: PropTypes.string,
  tintColor: PropTypes.string,
  disabledTintColor: PropTypes.string,
};

BpkNavigationBarButton.defaultProps = {
  disabled: false,
  onPress: null,

  // Internal only
  touchableColor: null,
  tintColor: null,
  disabledTintColor: null,
};

export default BpkNavigationBarButton;
