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
import { View, ViewPropTypes, StyleSheet, type StyleObj } from 'react-native';
import PropTypes from 'prop-types';
import BpkText from 'react-native-bpk-component-text';
import {
  borderRadiusSm,
  colorGray100,
  colorGray700,
  spacingSm,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';
import BpkChipDismissButton from './BpkChipDismissButton';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    height: spacingSm * 5,
    justifyContent: 'space-between',
    paddingHorizontal: spacingSm,
    backgroundColor: colorGray100,
    borderRadius: borderRadiusSm,
  },
  wrapperLarge: {
    height: spacingLg + spacingSm,
  },
  text: {
    color: colorGray700,
  },
  dismissBtn: {
    marginLeft: spacingSm,
  },
});

type Props = {
  dismissButtonLabel: string,
  label: string,
  large: boolean,
  onDismiss: () => mixed,
  style: ?StyleObj,
};

const BpkDismissibleChip = (props: Props) => {
  const { dismissButtonLabel, label, large, onDismiss, style, ...rest } = props;

  const wrapperStyle = [styles.wrapper];
  const textStyle = [styles.text];

  if (large) {
    wrapperStyle.push(styles.wrapperLarge);
  }

  if (style) {
    wrapperStyle.push(style);
  }

  return (
    <View style={wrapperStyle} {...rest}>
      <BpkText textStyle="xs" style={textStyle}>
        {label}
      </BpkText>
      <BpkChipDismissButton
        accessibilityLabel={dismissButtonLabel}
        onPress={onDismiss}
        style={styles.dismissBtn}
      />
    </View>
  );
};

BpkDismissibleChip.propTypes = {
  dismissButtonLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  large: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkDismissibleChip.defaultProps = {
  large: false,
  style: null,
};

export default BpkDismissibleChip;
