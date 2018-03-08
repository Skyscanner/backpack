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
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { clamp } from 'lodash';
import BpkButton from 'react-native-bpk-component-button';
import BpkText from 'react-native-bpk-component-text';
import { icons } from 'react-native-bpk-component-icon';
import { spacingSm, spacingLg } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonMinus: {
    marginRight: spacingSm,
  },
  buttonPlus: {
    marginLeft: spacingSm,
  },
  text: {
    minWidth: spacingLg,
    textAlign: 'center',
  },
});

export type Props = {
  decreaseButtonLabel: string,
  increaseButtonLabel: string,
  max: number,
  min: number,
  onChange: number => void,
  value: number,
  style: ?(Object | Array<Object>),
};

const BpkNudger = (props: Props) => {
  const {
    decreaseButtonLabel,
    increaseButtonLabel,
    max,
    min,
    onChange,
    style,
    value,
  } = props;

  const adjustedValue = Math.floor(clamp(value, min, max));
  const decreaseDisabled = adjustedValue <= min;
  const increaseDisabled = adjustedValue >= max;

  return (
    <View style={[styles.wrapper, style]}>
      <BpkButton
        disabled={decreaseDisabled}
        type="secondary"
        iconOnly
        icon={icons.minus}
        onPress={() => onChange(adjustedValue - 1)}
        title={decreaseButtonLabel}
        style={styles.buttonMinus}
      />
      <BpkText textStyle="lg" emphasize style={styles.text}>
        {adjustedValue}
      </BpkText>
      <BpkButton
        disabled={increaseDisabled}
        type="secondary"
        iconOnly
        icon={icons.plus}
        onPress={() => onChange(adjustedValue + 1)}
        title={increaseButtonLabel}
        style={styles.buttonPlus}
      />
    </View>
  );
};

BpkNudger.propTypes = {
  decreaseButtonLabel: PropTypes.string.isRequired,
  increaseButtonLabel: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
};

BpkNudger.defaultProps = {
  style: null,
};

export default BpkNudger;
