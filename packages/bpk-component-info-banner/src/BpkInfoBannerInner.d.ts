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

import type { ReactNode } from 'react';

import type {
  CommonProps,
  OnExpandToggleHandler,
} from './common-types';

export declare const CONFIGURATION: {
  readonly NONE: 'none';
  readonly EXPANDABLE: 'expandable';
};
type Props = CommonProps & {
  configuration?: typeof CONFIGURATION[keyof typeof CONFIGURATION];
  children?: ReactNode | string;
  expanded?: boolean;
  toggleButtonLabel?: string;
  onExpandToggle?: OnExpandToggleHandler;
};
declare const BpkInfoBannerInner: ({
  animateOnEnter,
  animateOnLeave,
  bannerClassName,
  children,
  configuration,
  expanded,
  icon,
  message,
  onExpandToggle,
  show,
  toggleButtonLabel,
  type,
  ...rest
}: Props) => JSX.Element;
export default BpkInfoBannerInner;
