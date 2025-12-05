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

export const BUTTON_TYPES = {
  primary: 'primary',
  primaryOnDark: 'primary-on-dark',
  primaryOnLight: 'primary-on-light',
  secondary: 'secondary',
  secondaryOnDark: 'secondary-on-dark',
  destructive: 'destructive',
  featured: 'featured',
  link: 'link',
  linkOnDark: 'link-on-dark',
} as const;

export const SIZE_TYPES = {
  small: 'small',
  large: 'large',
} as const;

export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
export type SizeType = (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];

export type Props = {
  children: string | ReactNode;
  type?: ButtonType;
  size?: SizeType;
  className?: string | null;
  disabled?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void;
  rel?: string | undefined;
  submit?: boolean;
  href?: string | null;
  blank?: boolean;
  /**
   * When true, the underline will only appear on hover (for link type buttons).
   */
  implicit?: boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
