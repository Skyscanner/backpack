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

import type { ComponentProps, ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import * as STYLES from './BpkOverlay.module.scss';

const getClassName = cssModules(STYLES);

export const OVERLAY_TYPES = {
  solidLow: 'solidLow',
  solidMedium: 'solidMedium',
  solidHigh: 'solidHigh',
  topLow: 'topLow',
  topMedium: 'topMedium',
  topHigh: 'topHigh',
  bottomLow: 'bottomLow',
  bottomMedium: 'bottomMedium',
  bottomHigh: 'bottomHigh',
  leftLow: 'leftLow',
  leftMedium: 'leftMedium',
  leftHigh: 'leftHigh',
  rightLow: 'rightLow',
  rightMedium: 'rightMedium',
  rightHigh: 'rightHigh',
  vignette: 'vignette',
  videoTop: 'videoTop',
  videoBottom: 'videoBottom',
  off: 'off',
} as const;

const overlayTypeClassSuffixes = {
  [OVERLAY_TYPES.solidLow]: 'solid-low',
  [OVERLAY_TYPES.solidMedium]: 'solid-medium',
  [OVERLAY_TYPES.solidHigh]: 'solid-high',
  [OVERLAY_TYPES.topLow]: 'top-low',
  [OVERLAY_TYPES.topMedium]: 'top-medium',
  [OVERLAY_TYPES.topHigh]: 'top-high',
  [OVERLAY_TYPES.bottomLow]: 'bottom-low',
  [OVERLAY_TYPES.bottomMedium]: 'bottom-medium',
  [OVERLAY_TYPES.bottomHigh]: 'bottom-high',
  [OVERLAY_TYPES.leftLow]: 'left-low',
  [OVERLAY_TYPES.leftMedium]: 'left-medium',
  [OVERLAY_TYPES.leftHigh]: 'left-high',
  [OVERLAY_TYPES.rightLow]: 'right-low',
  [OVERLAY_TYPES.rightMedium]: 'right-medium',
  [OVERLAY_TYPES.rightHigh]: 'right-high',
  [OVERLAY_TYPES.vignette]: 'vignette',
  [OVERLAY_TYPES.videoTop]: 'video-top',
  [OVERLAY_TYPES.videoBottom]: 'video-bottom',
  [OVERLAY_TYPES.off]: 'off',
} as const;

export type OverlayType = (typeof OVERLAY_TYPES)[keyof typeof OVERLAY_TYPES];

type BpkOverlayProps = {
  /**
   * **Required:** The content to be rendered within the overlay.
   */
  children: ReactNode;
  className?: string;
};

export type Props = BpkOverlayProps & ComponentProps<'div'> & {
  overlayType?: OverlayType;
  foregroundContent?: ReactNode;
};

const BpkOverlay = (props: Props) => {
  const {
    children,
    className = null,
    foregroundContent = null,
    overlayType = OVERLAY_TYPES.solidLow,
    ...rest
  } = props;

  const wrapperClassNames = getClassName('bpk-overlay__wrapper', className);
  const overlayClassNames = getClassName(
    'bpk-overlay__overlay',
    overlayType !== undefined &&
      overlayType !== null &&
      overlayType !== OVERLAY_TYPES.off &&
      `bpk-overlay__overlay--${overlayTypeClassSuffixes[overlayType]}`,
  );

  return (
    <div className={wrapperClassNames} {...rest}>
      {children}
      <div className={overlayClassNames}>{foregroundContent}</div>
    </div>
  );
};

export default BpkOverlay;
