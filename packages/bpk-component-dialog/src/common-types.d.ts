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

import type { ReactNode, SyntheticEvent } from 'react';

export declare const HEADER_ICON_TYPES: {
  readonly primary: 'primary';
  readonly warning: 'warning';
  readonly destructive: 'destructive';
};
export type DialogInnerProps = {
  ariaLabel: string;
  id: string;
  children: ReactNode;
  dialogRef?: (ref: HTMLElement) => void;
  getApplicationElement: () => HTMLElement | null;
  className?: string;
  contentClassName?: string;
  flare?: boolean;
  flareClassName?: string;
};
export type Props = DialogInnerProps & {
  isOpen: boolean;
  renderTarget?: () => HTMLElement | null;
  onClose: (event: SyntheticEvent) => void | null;
  closeLabel?: string;
  dismissible?: boolean;
  headerIcon?: ReactNode;
  headerIconType?: typeof HEADER_ICON_TYPES[keyof typeof HEADER_ICON_TYPES];
};
