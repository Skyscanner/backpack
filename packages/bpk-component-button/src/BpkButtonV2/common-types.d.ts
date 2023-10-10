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

export declare const BUTTON_TYPES: {
  readonly primary: 'primary';
  readonly primaryOnDark: 'primary-on-dark';
  readonly primaryOnLight: 'primary-on-light';
  readonly secondary: 'secondary';
  readonly secondaryOnDark: 'secondary-on-dark';
  readonly destructive: 'destructive';
  readonly featured: 'featured';
  readonly link: 'link';
  readonly linkOnDark: 'link-on-dark';
};
export declare const SIZE_TYPES: {
  readonly small: 'small';
  readonly large: 'large';
};
export type ButtonType = typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES];
export type SizeType = typeof SIZE_TYPES[keyof typeof SIZE_TYPES];
export type Props = {
  children: string | ReactNode;
  type?: ButtonType;
  size?: SizeType;
  className?: string | null;
  disabled?: boolean;
  iconOnly?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void;
  rel?: string | undefined;
  submit?: boolean;
  href?: string | null;
  blank?: boolean;
  [rest: string]: any;
};
