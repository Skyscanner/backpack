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
import type { Props as ModalDialogProps } from './BpkModalInner';
export type Props = Partial<ModalDialogProps> & {
    id: string;
    children: ReactNode;
    dialogRef?: (ref: HTMLElement | null | undefined) => void;
    isOpen: boolean;
    closeOnScrimClick?: boolean;
    closeOnEscPressed?: boolean;
    renderTarget?: null | HTMLElement | (() => null | HTMLElement);
    onClose?: (arg0?: TouchEvent | MouseEvent | KeyboardEvent, arg1?: {
        source: 'ESCAPE' | 'DOCUMENT_CLICK';
    }) => void;
    /**
     * Because this component uses a modal on mobile viewports, you need to let it know what
     * the root element of your application is by returning its DOM node via this prop
     * This is to "hide" your application from screen readers whilst the modal is open.
     * The "pagewrap" element id is a convention we use internally at Skyscanner. In most cases it should "just work".
     */
    getApplicationElement: () => HTMLElement | null;
};
declare const BpkModal: ({ accessoryView, className, closeLabel, closeOnEscPressed, closeOnScrimClick, closeText, contentClassName, dialogRef, fullScreen, fullScreenOnMobile, isIphone, isOpen, onClose, padded, renderTarget, showHeader, title, wide, ...rest }: Props) => JSX.Element;
export default BpkModal;
