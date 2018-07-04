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

import React from 'react';
import PropTypes from 'prop-types';

import BpkText from '../packages/react-native-bpk-component-text';
import { spacingSm } from '../../packages/bpk-tokens/tokens/base.react.native';

const StoryHeading = ({ children, ...rest }) => (
  <BpkText textStyle="xxl" {...rest}>
    {children}
  </BpkText>
);

StoryHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

const StorySubheading = ({ children, ...rest }) => (
  <BpkText textStyle="sm" style={{ marginBottom: spacingSm }} {...rest}>
    {children}
  </BpkText>
);

StorySubheading.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StoryHeading, StorySubheading };
