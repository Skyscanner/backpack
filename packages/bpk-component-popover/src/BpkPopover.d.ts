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

import type { SyntheticEvent, ReactNode, ReactElement } from 'react';
declare const EVENT_SOURCES: {
    CLOSE_BUTTON: string;
    CLOSE_LINK: string;
};
export type Props = {
    children: ReactNode;
    closeButtonText: string;
    id: string;
    label: string;
    onClose: (event: SyntheticEvent<HTMLButtonElement>, props: {
        source: (typeof EVENT_SOURCES)[keyof typeof EVENT_SOURCES];
    }) => void;
    className?: string | null;
    closeButtonIcon?: boolean;
    closeButtonProps?: Object;
    isOpen?: boolean;
    labelAsTitle?: boolean;
    padded?: boolean;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    showArrow?: Boolean;
    target: ReactElement<any>;
};
declare const BpkPopover: ({ children, className, closeButtonIcon, closeButtonProps, closeButtonText, id, isOpen, label, labelAsTitle, onClose, padded, placement, showArrow, target, ...rest }: Props) => JSX.Element;
export default BpkPopover;
