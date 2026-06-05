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

export const HEADER_ICON_TYPES = {
  primary: 'primary',
  warning: 'warning',
  destructive: 'destructive',
} as const;

export type DialogInnerProps = {
  ariaLabel: string;
  id: string;
  children: ReactNode;
  dialogRef: (ref: HTMLElement | null | undefined) => void;
  /**
   * Because this component uses a modal on mobile viewports, you need to let it know what
   * the root element of your application is by returning its DOM node via this prop
   * This is to "hide" your application from screen readers whilst the dialog is open.
   * The "pagewrap" element id is a convention we use internally at Skyscanner. In most cases it should "just work".
   */
  getApplicationElement: () => HTMLElement | null;
  ariaModal?: boolean;
  className?: string;
  contentClassName?: string;
  flare?: boolean;
  /**
   * This will change the style of the default flare view. Should you wish to apply an image to the flare you would pass the image using the CSS property `background-image`.
   */
  flareClassName?: string;
};

export type Props = Omit<DialogInnerProps, 'dialogRef'> & {
  dialogRef?: (ref: HTMLElement | null | undefined) => void;
  isOpen: boolean;
  renderTarget?: () => HTMLElement | null;
  /**
   * This property is only required when `dismissible` is true.
   */
  onClose?: (event?: TouchEvent | MouseEvent | KeyboardEvent) => void | null;
  closeLabel?: string;
  dismissible?: boolean;
  headerIcon?: ReactNode;
  headerIconType?: (typeof HEADER_ICON_TYPES)[keyof typeof HEADER_ICON_TYPES];
};
