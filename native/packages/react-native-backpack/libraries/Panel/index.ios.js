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
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';

type Props = {
  children: Node,
  padded: boolean,
};

const BpkPanelIos = (props: Props) => <NativePanel {...props} />;

BpkPanelIos.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
};

BpkPanelIos.defaultProps = {
  padded: true,
};

const NativePanel = requireNativeComponent('BPKPanelWrapper', BpkPanelIos);

export default BpkPanelIos;
