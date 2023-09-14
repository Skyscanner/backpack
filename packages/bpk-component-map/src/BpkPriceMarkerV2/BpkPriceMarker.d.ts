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
import type { Node } from 'react';
import { MouseEvent, ReactNode } from 'react';

export const PRICE_MARKER_STATUSES = {
  default: 'default',
  focused: 'focused',
  viewed: 'viewed',
} as const;

export type Status = (typeof PRICE_MARKER_STATUSES)[keyof typeof PRICE_MARKER_STATUSES];

export const STYLE_TYPES = {
  default: 'default',
  onDark: 'onDark',
} as const;

export type Style = (typeof STYLE_TYPES)[keyof typeof STYLE_TYPES];

type Props = {
  label: ReactNode | string,
  accessibilityLabel: string,
  position: {
    latitude: number,
    longitude: number,
  },
  className?: string,
  onClick?: (event: MouseEvent) => void,
  buttonProps?: { [key: string]: string },
  status?: Status,
  style?: Style,
};

declare const BpkPriceMarkerV2: ({
  label,
  position,
  className,
  onClick,
  buttonProps,
  status,
  style,
}: Props) => JSX.Element;

export default BpkPriceMarkerV2
