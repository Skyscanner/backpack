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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkOverlay.module.scss';

const getClassName = cssModules(STYLES);

export const OVERLAY_TYPES = {
  none: 'none',
  tint: 'tint',
};

export const BORDER_RADIUS_STYLES = {
  none: 'none',
  sm: 'sm',
};

export type Props = {
  borderRadiusStyle: $Keys<typeof BORDER_RADIUS_STYLES>,
  children: Node,
  overlayType: $Keys<typeof OVERLAY_TYPES>,
  className: ?string,
  foregroundContent: ?Node,
};

const BpkOverlay = (props: Props) => {
  const {
    borderRadiusStyle,
    children,
    className,
    foregroundContent,
    overlayType,
    ...rest
  } = props;

  const wrapperClassNames = getClassName('bpk-overlay__wrapper', className);
  const overlayClassNames = getClassName(
    'bpk-overlay__overlay',
    borderRadiusStyle === BORDER_RADIUS_STYLES.sm &&
      'bpk-overlay__overlay--border-radius-sm',
    overlayType === OVERLAY_TYPES.tint && 'bpk-overlay__overlay--tint',
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
  borderRadiusStyle: PropTypes.oneOf(Object.keys(BORDER_RADIUS_STYLES)),
  className: PropTypes.string,
  foregroundContent: PropTypes.node,
  overlayType: PropTypes.oneOf(Object.keys(OVERLAY_TYPES)),
};

BpkOverlay.defaultProps = {
  borderRadiusStyle: BORDER_RADIUS_STYLES.none,
  className: null,
  foregroundContent: null,
  overlayType: OVERLAY_TYPES.tint,
};

export default BpkOverlay;
