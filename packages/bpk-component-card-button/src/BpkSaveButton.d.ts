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

import type { ReactNode, MouseEvent } from 'react';
export declare const SIZE_TYPES: {
  default: 'default';
  small: 'small';
};
export type SizeType = (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];
export declare const STYLE_TYPES: {
  default: 'default';
  contained: 'contained';
  onDark: 'onDark';
};
export type StyleType = (typeof STYLE_TYPES)[keyof typeof STYLE_TYPES];
type Props = {
  checked: boolean;
  accessibilityLabel: string;
  onCheckedChange: (e: MouseEvent) => void;
  size?: SizeType;
  style?: StyleType;
};
declare const BpkSaveButton: ({
  checked,
  accessibilityLabel,
  onCheckedChange,
  size,
  style,
}: Props) => JSX.Element;
export default BpkSaveButton;
