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
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkOverlay.module.scss';

const getClassName = cssModules(STYLES);

export const OVERLAY_TYPES = {
  solidLow: 'solid-low',
  solidMedium: 'solid-medium',
  solidHigh: 'solid-high',
  topLow: 'top-low',
  topMedium: 'top-medium',
  topHigh: 'top-high',
  bottomLow: 'bottom-low',
  bottomMedium: 'bottom-medium',
  bottomHigh: 'bottom-high',
  leftLow: 'left-low',
  leftMedium: 'left-medium',
  leftHigh: 'left-high',
  rightLow: 'right-low',
  rightMedium: 'right-medium',
  rightHigh: 'right-high',
  vignette: 'vignette',
  off: 'off',
};

export type Props = {
  children: Node,
  overlayType: ?$Keys<typeof OVERLAY_TYPES>,
  className: ?string,
  foregroundContent: ?Node,
};

const BpkOverlay = (props: Props) => {
  const { children, className, foregroundContent, overlayType, ...rest } =
    props;

  const wrapperClassNames = getClassName('bpk-overlay__wrapper', className);
  const overlayClassNames = getClassName(
    'bpk-overlay__overlay',
    overlayType !== null &&
      overlayType !== OVERLAY_TYPES.off &&
      `bpk-overlay__overlay--${overlayType}`,
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div className={wrapperClassNames} {...rest}>
      {children}
      <div className={overlayClassNames}>{foregroundContent}</div>
    </div>
  );
};

BpkOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  foregroundContent: PropTypes.node,
  overlayType: PropTypes.oneOf(Object.keys(OVERLAY_TYPES)),
};

BpkOverlay.defaultProps = {
  className: null,
  foregroundContent: null,
  overlayType: OVERLAY_TYPES.solidLow,
};

export default BpkOverlay;
