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

import React, { cloneElement } from 'react';
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
  colorGray50,
  colorGray100,
  borderSizeSm,
  spacingBase,
  spacingMd,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    borderColor: colorGray100,
    borderBottomWidth: borderSizeSm,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacingSm,
  },
  selectContent: {
    marginEnd: 'auto',
  },
  selectContentDisabled: {
    color: colorGray100,
  },
  selectImage: {
    width: spacingBase,
    height: spacingSm + spacingMd,
    backgroundColor: colorGray50,
    marginEnd: spacingMd,
  },
  selectIcon: {
    marginStart: spacingSm,
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

  // Image
  image: ?Element<typeof Image>,
  showImage: boolean,
};

const BpkSelect = (props: Props) => {
  const { disabled, label, onPress, style, image, showImage, ...rest } = props;

  let content = label;
  if (label && typeof label === 'string') {
    content = (
      <BpkText
        style={[styles.selectContent, disabled && styles.selectContentDisabled]}
      >
        {content}
      </BpkText>
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
  const styledImage = image ? (
    cloneElement(image, {
      style: [image.props.style, styles.selectImage],
    })
  ) : (
    <View style={styles.selectImage} />
  );

  return (
    <TouchablePlatformComponent
      disabled={disabled}
      style={style}
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={accessibilityTraits}
      {...platformProps}
    >
      <View style={styles.select} {...rest}>
        {showImage && styledImage}
        {content}
        <BpkIcon style={styles.selectIcon} icon={icons['arrow-down']} small />
      </View>
    </TouchablePlatformComponent>
  );
};

BpkSelect.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: ViewPropTypes.style,

  // Image
  image: PropTypes.element,
  showImage: PropTypes.bool,
};

BpkSelect.defaultProps = {
  disabled: false,
  label: null,
  style: null,

  // Image
  image: null,
  showImage: false,
};

export default BpkSelect;
