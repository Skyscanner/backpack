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
import {
  colorGray50,
  colorGray100,
  colorRed500,
  colorGreen500,
  borderSizeSm,
  spacingBase,
  spacingMd,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';
import { ValidIcon, InvalidIcon, SelectIcon } from './BpkSelectIcons';

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    borderColor: colorGray100,
    borderBottomWidth: borderSizeSm,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacingSm,
  },
  valid: {
    borderColor: colorGreen500,
  },
  invalid: {
    borderColor: colorRed500,
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
  validationMessage: {
    color: colorRed500,
    paddingTop: spacingSm,
  },
});

const TouchablePlatformComponent = Platform.select({
  ios: BpkTouchableOverlay,
  android: BpkTouchableNativeFeedback,
});

type Props = {
  disabled: boolean,
  onPress: () => mixed,
  label: ?(string | Element),
  style: ?any,
  valid: ?boolean,
  validationMessage: ?string,

  // Image
  image: ?Element<typeof Image>,
  showImage: boolean,
};

const BpkSelect = (props: Props) => {
  const {
    disabled,
    label,
    onPress,
    style,
    valid,
    validationMessage,
    image,
    showImage,
    ...rest
  } = props;

  let content = null;

  if (label && typeof label === 'string') {
    content = (
      <BpkText
        style={[styles.selectContent, disabled && styles.selectContentDisabled]}
      >
        {label}
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

  const validityIcon = valid ? (
    <ValidIcon />
  ) : (
    valid === false && <InvalidIcon />
  );

  let extraInfo = null;
  if (valid === false && validationMessage) {
    extraInfo = (
      <BpkText textStyle="xs" style={styles.validationMessage}>
        {validationMessage}
      </BpkText>
    );
  }

  const selectStyle = [styles.select];
  if (valid) {
    selectStyle.push(styles.valid);
  } else if (valid === false) {
    selectStyle.push(styles.invalid);
  }

  const selectComponent = (
    <TouchablePlatformComponent
      disabled={disabled}
      style={style}
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={accessibilityTraits}
      {...platformProps}
    >
      <View style={selectStyle} {...rest}>
        {showImage && styledImage}
        {content || label}
        {validityIcon}
        <SelectIcon />
      </View>
    </TouchablePlatformComponent>
  );

  if (extraInfo) {
    return (
      <View>
        {selectComponent}
        {extraInfo}
      </View>
    );
  }
  return selectComponent;
};

BpkSelect.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: ViewPropTypes.style,
  valid: PropTypes.oneOf([true, false, null]),
  validationMessage: PropTypes.string,

  // Image
  image: PropTypes.element,
  showImage: PropTypes.bool,
};

BpkSelect.defaultProps = {
  disabled: false,
  label: null,
  style: null,
  valid: null,
  validationMessage: null,

  // Image
  image: null,
  showImage: false,
};

export default BpkSelect;
