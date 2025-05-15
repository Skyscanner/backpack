// @ts-nocheck
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

import type { MouseEvent, ReactNode } from 'react';

import BpkBasicMapMarker from '../BpkBasicMapMarker';

import BpkPriceMarkerButton from './BpkPriceMarkerButton';

export const MARKER_STATUSES = {
  unselected: 'unselected',
  selected: 'selected',
  previous_selected: 'previous_selected',
} as const;

export type Status = (typeof MARKER_STATUSES)[keyof typeof MARKER_STATUSES];

type Props = {
  label: string;
  icon?: ReactNode;
  accessibilityLabel: string;
  position: {
    latitude: number;
    longitude: number;
  };
  className?: string;
  onClick?: (event: MouseEvent) => void;
  buttonProps?: { [key: string]: string };
  status?: Status;
};

export const BpkPriceMarkerV2 = (props: Props) => {
  const {
    accessibilityLabel,
    buttonProps,
    className,
    icon,
    label,
    onClick,
    position,
    status = MARKER_STATUSES.unselected,
    ...rest
  } = props;

  const allButtonProps = {
    className,
    icon,
    label,
    onClick,
    status,
    buttonProps,
  };

  return (
    <BpkBasicMapMarker
      position={position}
      aria-label={accessibilityLabel}
      {...rest}
    >
      <BpkPriceMarkerButton {...allButtonProps} />
    </BpkBasicMapMarker>
  );
};
