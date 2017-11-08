/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import {
  ScrollView,
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const styles = StyleSheet.create({
  horizontalNav: {
    borderColor: 'transparent',
    borderBottomColor: tokens.colorGray100,
    borderWidth: tokens.borderSizeSm,
    flexDirection: 'row',
  },
  spaceAround: {
    flex: 0,
    flexGrow: 1,
    justifyContent: 'space-around',
  },
});

const BpkHorizontalNav = (props) => {
  const {
    children,
    spaceAround,
    style,
    ...rest
  } = props;
  const navStyle = [styles.horizontalNav];
  if (spaceAround) {
    navStyle.push(styles.spaceAround);
  }
  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      contentContainerStyle={[navStyle, style]}
      horizontal
      showsHorizontalScrollIndicator={false}
      {...rest}
    >
      { children }
    </ScrollView>
  );
};

BpkHorizontalNav.propTypes = {
  children: PropTypes.node.isRequired,
  spaceAround: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkHorizontalNav.defaultProps = {
  spaceAround: false,
  style: null,
};

export default BpkHorizontalNav;
