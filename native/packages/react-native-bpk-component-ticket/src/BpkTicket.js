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
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
  PixelRatio,
  ViewPropTypes,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Dash from 'react-native-dash';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorGray50,
  colorGray100,
  colorWhite,
  elevationXs,
  elevationLg,
  borderRadiusSm,
  spacingSm,
  spacingMd,
  spacingBase,
  shadowSmColor,
  shadowSmOffsetWidth,
  shadowSmOffsetHeight,
  shadowSmOpacity,
  shadowSmRadius,
  shadowXlColor,
  shadowXlOffsetWidth,
  shadowXlOffsetHeight,
  shadowXlOpacity,
  shadowXlRadius,
} = tokens;

/**
 * Define styles needed by the component
 */
const styles = StyleSheet.create({
  ticket: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    elevation: elevationXs,
    shadowColor: shadowSmColor,
    shadowOffset: { width: shadowSmOffsetWidth, height: shadowSmOffsetHeight / PixelRatio.get() },
    shadowOpacity: shadowSmOpacity,
    shadowRadius: shadowSmRadius / PixelRatio.get(),
  },
  ticketFocused: {
    elevation: elevationLg,
    shadowColor: shadowXlColor,
    shadowOffset: { width: shadowXlOffsetWidth, height: shadowXlOffsetHeight / PixelRatio.get() },
    shadowOpacity: shadowXlOpacity,
    shadowRadius: shadowXlRadius / PixelRatio.get(),
  },
  ticketInner: {
    flexDirection: 'row',
    backgroundColor: 'transparent', // otherwise this view's corners would bleed outwith the outer container
  },
  ticketInnerVertical: {
    flexDirection: 'column',
  },
  ticketMain: {
    flex: 1,
  },
  ticketMainVertical: {
    flex: null,
  },
  ticketMainPadded: {
    padding: spacingBase,
  },
  ticketPunchline: {
    width: 1,
    marginTop: spacingMd,
    marginBottom: spacingMd,
    flexDirection: 'column',
  },
  ticketPunchlineVertical: {
    width: null,
    marginTop: null,
    marginRight: spacingMd,
    marginBottom: null,
    marginLeft: spacingMd,
    flexDirection: 'row',
  },
  ticketStub: {
    flex: 1,
  },
  ticketStubVertical: {
    flex: null,
  },
  ticketStubPadded: {
    padding: spacingBase,
  },
});

const BpkTicket = (props) => {
  const {
    children,
    stub,
    vertical,
    focused,
    padded,
    style: userStyle,
    mainStyle: userMainStyle,
    stubStyle: userStubStyle,
    ...rest
  } = props;

  const style = [styles.ticket];
  const innerStyle = [styles.ticketInner];
  const mainStyle = [styles.ticketMain];
  const punchlineStyle = [styles.ticketPunchline];
  const stubStyle = [styles.ticketStub];

  if (vertical) {
    innerStyle.push(styles.ticketInnerVertical);
    mainStyle.push(styles.ticketMainVertical);
    punchlineStyle.push(styles.ticketPunchlineVertical);
    stubStyle.push(styles.ticketStubVertical);
  }
  if (padded) {
    mainStyle.push(styles.ticketMainPadded);
    stubStyle.push(styles.ticketStubPadded);
  }
  if (focused) { style.push(styles.ticketFocused); }
  if (userStyle) { style.push(userStyle); }
  if (userMainStyle) { mainStyle.push(userMainStyle); }
  if (userStubStyle) { stubStyle.push(userStubStyle); }

  return (
    <TouchableHighlight
      accessibilityComponentType="button"
      underlayColor={colorGray50}
      style={style}
      {...rest}
    >
      <View style={innerStyle}>
        <View style={mainStyle}>{children}</View>
        <Dash
          style={punchlineStyle}
          dashGap={spacingSm}
          dashLength={spacingSm}
          dashThickness={1}
          dashColor={colorGray100}
        />
        <View style={stubStyle}>{stub}</View>
      </View>
    </TouchableHighlight>
  );
};

BpkTicket.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  stub: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
  focused: PropTypes.bool,
  padded: PropTypes.bool,
  style: ViewPropTypes.style,
  mainStyle: ViewPropTypes.style,
  stubStyle: ViewPropTypes.style,
};

BpkTicket.defaultProps = {
  vertical: false,
  focused: false,
  padded: true,
  style: null,
  mainStyle: null,
  stubStyle: null,
};

export default BpkTicket;
