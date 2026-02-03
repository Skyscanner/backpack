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
import type { FunctionComponent, ReactNode } from 'react';

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
} as const;

export const STYLE_TYPES = {
  DEFAULT: 'default',
  ON_CONTRAST: 'onContrast',
};

export type AlertTypeValue = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];

export type StyleTypeValue = (typeof STYLE_TYPES)[keyof typeof STYLE_TYPES];


export type CommonProps = {
  type?: AlertTypeValue;
  message: ReactNode | string;
  animateOnEnter?: boolean;
  animateOnLeave?: boolean;
  show?: boolean;
  bannerClassName?: string | null;
  icon?: FunctionComponent<any> | null;
  style?: StyleTypeValue;
  [rest: string]: any;
};

export type OnExpandToggleHandler =
  | ((expanded: boolean) => void)
  | null
  | undefined;
export type ExpandableBannerAction = { title: string, callback: () => void } | null | undefined;
export type OnDismissHandler = (() => void) | null | undefined;
export type OnHideHandler = (() => void) | null | undefined;
