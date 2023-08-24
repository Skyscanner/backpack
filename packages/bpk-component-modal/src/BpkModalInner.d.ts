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
export type Props = {
    id: string;
    children: ReactNode;
    wide?: boolean;
    isIphone: boolean;
    showHeader?: boolean;
    fullScreenOnMobile?: boolean;
    fullScreen?: boolean;
    padded?: boolean;
    dialogRef: (ref: HTMLElement | null | undefined) => void;
    onClose?: () => void;
    className?: string | null;
    contentClassName?: string | null;
    title?: string | null;
    closeLabel?: string;
    closeText?: string | null;
    accessoryView?: ReactNode;
};
declare const BpkModalInner: ({ isIphone, id, dialogRef, children, title, onClose, className, contentClassName, closeLabel, closeText, wide, showHeader, fullScreenOnMobile, fullScreen, padded, accessoryView, }: Props) => JSX.Element;
export default BpkModalInner;
