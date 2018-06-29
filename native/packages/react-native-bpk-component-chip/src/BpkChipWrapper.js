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
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';
import {
  borderRadiusSm,
  colorBlue700,
  colorGray100,
  colorGray500,
  colorGray700,
  colorWhite,
  spacingSm,
  spacingMd,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';

import BpkChipInner from './BpkChipInner';
import {
  type Props as CommonProps,
  commonPropTypes,
  commonDefaultProps,
} from './common-types';

const styles = StyleSheet.create({
  inner: {
    alignItems: 'center',
    backgroundColor: colorGray100,
    borderRadius: borderRadiusSm,
    flexDirection: 'row',
    minHeight: spacingSm * 5,
    justifyContent: 'space-between',
    paddingHorizontal: spacingMd,
  },
  innerLarge: {
    minHeight: spacingLg + spacingSm,
  },
  innerSelected: {
    backgroundColor: colorBlue700,
  },
  text: {
    color: colorGray700,
    includeFontPadding: false,
  },
  textSelected: {
    color: colorWhite,
  },
  icon: {
    color: colorGray500,
    includeFontPadding: false,
    marginStart: spacingSm,
  },
});

type Props = {
  ...$Exact<CommonProps>,
  dismissible: boolean,
  large: boolean,
  selected: boolean,
};

const BpkChipWrapper = (props: Props) => {
  const {
    accessibilityLabel,
    dismissible,
    label,
    large,
    selected,
    style,
    ...rest
  } = props;

  const innerStyle = [styles.inner];
  const textStyle = [styles.text];

  if (large) {
    innerStyle.push(styles.innerLarge);
  }

  if (selected) {
    innerStyle.push(styles.innerSelected);
    textStyle.push(styles.textSelected);
  }

  return (
    <BpkChipInner
      accessibilityLabel={accessibilityLabel}
      selected={selected}
      large={large}
      style={innerStyle}
      userStyle={style}
      {...rest}
    >
      <BpkText textStyle="xs" style={textStyle}>
        {label}
      </BpkText>
      {dismissible && <BpkIcon icon="close" small style={styles.icon} />}
    </BpkChipInner>
  );
};

BpkChipWrapper.propTypes = {
  ...commonPropTypes,
  dismissible: PropTypes.bool,
  large: PropTypes.bool,
  selected: PropTypes.bool,
};

BpkChipWrapper.defaultProps = {
  ...commonDefaultProps,
  dismissible: false,
  large: false,
  selected: false,
};

export default BpkChipWrapper;
