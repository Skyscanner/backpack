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
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Dash from 'react-native-dash';
import {
  colorGray100,
  spacingSm,
  spacingMd,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  cardInner: {
    flexDirection: 'row',
  },
  cardInnerVertical: {
    flexDirection: 'column',
  },
  cardMain: {
    flex: 1,
  },
  cardMainVertical: {
    flex: null,
  },
  cardMainPadded: {
    padding: spacingBase,
  },
  cardPunchline: {
    width: 1,
    marginTop: spacingMd,
    marginBottom: spacingMd,
    flexDirection: 'column',
  },
  cardPunchlineVertical: {
    width: null,
    marginTop: null,
    marginRight: spacingMd,
    marginBottom: null,
    marginLeft: spacingMd,
    flexDirection: 'row',
  },
  cardStub: {
    flex: 1,
  },
  cardStubVertical: {
    flex: null,
  },
  cardStubPadded: {
    padding: spacingBase,
  },
});

const withDivider = (CardComponent) => {
  const WithDivider = (props) => {
    const {
      children,
      stub,
      padded,
      vertical,
      mainStyle: userMainStyle,
      stubStyle: userStubStyle,
      ...rest
    } = props;

    const innerStyle = [styles.cardInner];
    const mainStyle = [styles.cardMain];
    const punchlineStyle = [styles.cardPunchline];
    const stubStyle = [styles.cardStub];


    if (padded) {
      mainStyle.push(styles.cardMainPadded);
      stubStyle.push(styles.cardStubPadded);
    }
    if (vertical) {
      innerStyle.push(styles.cardInnerVertical);
      mainStyle.push(styles.cardMainVertical);
      punchlineStyle.push(styles.cardPunchlineVertical);
      stubStyle.push(styles.cardStubVertical);
    }
    if (userMainStyle) { mainStyle.push(userMainStyle); }
    if (userStubStyle) { stubStyle.push(userStubStyle); }

    return (
      <CardComponent
        padded={false}
        innerStyle={innerStyle}
        {...rest}
      >
        <View style={mainStyle}>{children}</View>
        <Dash
          style={punchlineStyle}
          dashGap={spacingSm}
          dashLength={spacingSm}
          dashThickness={1}
          dashColor={colorGray100}
        />
        <View style={stubStyle}>{stub}</View>
      </CardComponent>
    );
  };

  WithDivider.propTypes = {
    children: PropTypes.node.isRequired,
    stub: PropTypes.node.isRequired,
    padded: PropTypes.bool,
    vertical: PropTypes.bool,
    mainStyle: ViewPropTypes.style,
    stubStyle: ViewPropTypes.style,
  };

  WithDivider.defaultProps = {
    padded: true,
    vertical: false,
    mainStyle: null,
    stubStyle: null,
  };

  return WithDivider;
};

export default withDivider;
