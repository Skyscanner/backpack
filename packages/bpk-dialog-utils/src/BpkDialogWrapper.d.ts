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

import { ReactNode } from 'react';
import type {Props as DialogWrapperProps} from './BpkDialogWrapper';
export type Props = Partial<DialogWrapperProps> & {
  ariaLabelledby: string;
  children: ReactNode;
  closeOnEscPressed?: boolean;
  closeOnScrimClick?: boolean;
  dialogClassName?: string;
  id: string | undefined;
  isOpen: boolean;
  onClose: (
    arg0?: Event | KeyboardEvent | MouseEvent | PointerEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void | null;
  exiting?: boolean;
  transitionClassNames?: {
    appear?: string,
    appearActive?: string,
    exit?: string
  };
  timeout?: {appear?: number, exit?: number};
}

declare const BpkDialogWrapper: ({ariaLabelledby, children, closeOnEscPressed, closeOnScrimClick, dialogClassName, id, isOpen, onClose, exiting, transitionClassNames, timeout}: Props) => JSX.Element;
export default BpkDialogWrapper;
