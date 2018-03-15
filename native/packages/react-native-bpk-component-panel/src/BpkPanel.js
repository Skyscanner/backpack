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
import PropTypes from 'prop-types';
import {
  colorWhite,
  colorGray100,
  spacingBase,
  borderSizeSm,
  borderRadiusSm,
} from 'bpk-tokens/tokens/base.react.native';
import { StyleSheet, View, ViewPropTypes, type Node } from 'react-native';

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    borderWidth: borderSizeSm,
    borderColor: colorGray100,
  },
  panelPadded: {
    padding: spacingBase,
  },
});

export type Props = {
  children: Node,
  padded: boolean,
  style: ?any,
};

const BpkPanel = (props: Props) => {
  const { padded, children, style, ...rest } = props;

  const panelStyle = [styles.panel];

  if (padded) {
    panelStyle.push(styles.panelPadded);
  }
  if (style) {
    panelStyle.push(style);
  }

  return (
    <View {...rest} style={panelStyle}>
      {children}
    </View>
  );
};

BpkPanel.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkPanel.defaultProps = {
  padded: true,
  style: null,
};

export default BpkPanel;
