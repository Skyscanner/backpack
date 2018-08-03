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
import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, View } from 'react-native';

export type Props = {
  children: Node,
  padded: boolean,
};
/* eslint-disable react/prefer-stateless-function */
class BpkPanel extends Component<Props, {}> {
  static propTypes = {
    padded: PropTypes.bool,
    ...View.propTypes, // include the default view properties
  };

  static defaultProps = {
    padded: true,
  };

  render() {
    return <NativePanel {...this.props} />;
  }
}
/* eslint-enable react/prefer-stateless-function */
const NativePanel = requireNativeComponent('BPKPanelWrapper', BpkPanel);

export default BpkPanel;
