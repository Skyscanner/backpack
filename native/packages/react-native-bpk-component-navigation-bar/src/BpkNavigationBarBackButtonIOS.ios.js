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
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and limitations under the License.  */
/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { I18nManager, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { colorGray700 } from 'bpk-tokens/tokens/base.react.native';

const chevron = I18nManager.isRTL
  ? require('./chevron-right.png')
  : require('./chevron-left.png');

export type Props = {
  title: string,
  showTitle: boolean,
  onPress: ?() => mixed,
  tintColor: ?string,
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    zIndex: 2,
    alignItems: 'center',
  },
  backIcon: {
    marginEnd: 8,
  },
  title: {},
});

const BpkNavigationBarBackButtonIOS = (props: Props) => {
  const { title, showTitle, onPress, tintColor } = props;
  const tintColorFinal = tintColor || colorGray700;
  const titleStyle = [styles.title, { color: tintColorFinal }];

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={['button']}
      accessibilityLabel={title}
      accessible
      style={styles.button}
    >
      <Image
        source={chevron}
        style={[styles.backIcon, { tintColor: tintColorFinal }]}
      />
      {showTitle && (
        <BpkText textStyle="lg" style={titleStyle}>
          {title}
        </BpkText>
      )}
    </TouchableOpacity>
  );
};

BpkNavigationBarBackButtonIOS.propTypes = {
  title: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  onPress: PropTypes.func,

  // Internal only
  tintColor: PropTypes.string,
};

BpkNavigationBarBackButtonIOS.defaultProps = {
  showTitle: false,
  onPress: null,

  // Internal only
  tintColor: null,
};

export default BpkNavigationBarBackButtonIOS;
