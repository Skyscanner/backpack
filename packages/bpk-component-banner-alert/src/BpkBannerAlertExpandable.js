/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
/* @flow strict */

import PropTypes from 'prop-types';
import React, { type Node } from 'react';

import {
  type CommonProps,
  type OnExpandToggleHandler,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from './common-types';
import BpkBannerAlertInner, { CONFIGURATION } from './BpkBannerAlertInner';

type Props = {
  ...$Exact<CommonProps>,
  children: Node,
  expanded: boolean,
  toggleButtonLabel: string,
  onExpandToggle: OnExpandToggleHandler,
};

const BpkBannerAlertExpandable = (props: Props) => {
  const { children, ...rest } = props;
  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkBannerAlertInner configuration={CONFIGURATION.EXPANDABLE} {...rest}>
      {children}
    </BpkBannerAlertInner>
  );
};

BpkBannerAlertExpandable.propTypes = {
  ...COMMON_PROP_TYPES,
  children: PropTypes.node.isRequired,
  toggleButtonLabel: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onExpandToggle: PropTypes.func,
};

BpkBannerAlertExpandable.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  expanded: false,
  onExpandToggle: null,
};

export default BpkBannerAlertExpandable;
