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

import PropTypes from 'prop-types';
import React, { type ComponentType } from 'react';
import { View, StyleSheet, ViewPropTypes, type Node } from 'react-native';
import { colorGray100, spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkPanel, { type Props as BpkPanelProps } from './BpkPanel';

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
  },
  panelVertical: {
    flexDirection: 'column',
  },
  panelMain: {
    flex: 1,
  },
  panelMainVertical: {
    flex: null,
  },
  panelMainPadded: {
    padding: spacingBase,
  },
  panelPunchline: {
    width: 1,
    flexDirection: 'column',
    backgroundColor: colorGray100,
  },
  panelPunchlineVertical: {
    width: null,
    height: 1,
    flexDirection: 'row',
  },
  panelStub: {
    flex: 1,
  },
  panelStubVertical: {
    flex: null,
  },
  panelStubPadded: {
    padding: spacingBase,
  },
});

export type Props = {
  ...$Exact<BpkPanelProps>,
  stub: Node,
  vertical: boolean,
  mainStyle: ?any,
  stubStyle: ?any,
};

const withDivider = (PanelComponent: ComponentType<BpkPanelProps>) => {
  const WithDivider = (props: Props) => {
    const {
      children,
      stub,
      padded,
      vertical,
      mainStyle: userMainStyle,
      stubStyle: userStubStyle,
      style,
      ...rest
    } = props;

    const panelStyle = [styles.panel];
    const mainStyle = [styles.panelMain];
    const punchlineStyle = [styles.panelPunchline];
    const stubStyle = [styles.panelStub];

    if (padded) {
      mainStyle.push(styles.panelMainPadded);
      stubStyle.push(styles.panelStubPadded);
    }
    if (vertical) {
      panelStyle.push(styles.panelVertical);
      mainStyle.push(styles.panelMainVertical);
      punchlineStyle.push(styles.panelPunchlineVertical);
      stubStyle.push(styles.panelStubVertical);
    }
    if (userMainStyle) {
      mainStyle.push(userMainStyle);
    }
    if (userStubStyle) {
      stubStyle.push(userStubStyle);
    }
    if (style) {
      panelStyle.push(style);
    }

    return (
      <PanelComponent padded={false} style={panelStyle} {...rest}>
        <View style={mainStyle}>{children}</View>
        <View style={punchlineStyle} />
        <View style={stubStyle}>{stub}</View>
      </PanelComponent>
    );
  };

  WithDivider.propTypes = {
    ...BpkPanel.propTypes,
    stub: PropTypes.node.isRequired,
    vertical: PropTypes.bool,
    mainStyle: ViewPropTypes.style,
    stubStyle: ViewPropTypes.style,
  };

  WithDivider.defaultProps = {
    ...BpkPanel.defaultProps,
    vertical: false,
    mainStyle: null,
    stubStyle: null,
  };

  return WithDivider;
};

export default withDivider;
