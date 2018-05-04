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
import {
  Platform,
  StyleSheet,
  View,
  ViewPropTypes,
  type Element,
} from 'react-native';
import PropTypes from 'prop-types';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import {
  colorGray100,
  borderSizeSm,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    borderColor: colorGray100,
    borderBottomWidth: borderSizeSm,
    justifyContent: 'space-between',
    paddingVertical: spacingSm,
  },
  disabled: {
    color: colorGray100,
  },
});

const TouchablePlatformComponent = Platform.select({
  ios: BpkTouchableOverlay,
  android: BpkTouchableNativeFeedback,
});

type Props = {
  onPress: () => mixed,
  disabled: boolean,
  label: ?(string | Element),
  style: ?any,
};

const BpkSelect = (props: Props) => {
  const { disabled, label, onPress, style, ...rest } = props;

  let content = label;
  if (label && typeof label === 'string') {
    content = (
      <BpkText style={disabled ? styles.disabled : {}}>{content}</BpkText>
    );
  }

  const platformProps = {};

  if (Platform.OS === 'android') {
    platformProps.borderlessBackground = false;
  }

  const accessibilityTraits = ['button'];
  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  return (
    <TouchablePlatformComponent
      disabled={disabled}
      style={style}
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={accessibilityTraits}
      {...platformProps}
    >
      <View style={styles.trigger} {...rest}>
        {content}
        <BpkIcon icon={icons['arrow-down']} small />
      </View>
    </TouchablePlatformComponent>
  );
};

BpkSelect.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: ViewPropTypes.style,
};

BpkSelect.defaultProps = {
  disabled: false,
  label: null,
  style: null,
};

export default BpkSelect;
