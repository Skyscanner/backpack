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

import { Component } from 'react';
import type { ReactNode } from 'react';
type InteractionEvents = TouchEvent | MouseEvent | KeyboardEvent;
type Props = {
    children: string | ReactNode;
    isOpen: boolean;
    beforeClose: ((arg0: () => void) => void) | null | undefined;
    className: string | null | undefined;
    onClose: (arg0: InteractionEvents, arg1: {
        source: 'ESCAPE' | 'DOCUMENT_CLICK';
    }) => void;
    onOpen: (arg0: HTMLElement, arg1?: HTMLElement | null | undefined) => void;
    onRender: (arg0: HTMLElement | null | undefined, arg1: HTMLElement | null | undefined) => void;
    style: {} | null | undefined;
    renderTarget: null | HTMLElement | (() => null | HTMLElement);
    target: null | HTMLElement | JSX.Element | (() => HTMLElement);
    targetRef: ((arg0: null | Element | Text | undefined) => void) | null | undefined;
    closeOnEscPressed: boolean;
};
type State = {
    isVisible: boolean;
};
declare class Portal extends Component<Props, State> {
    portalElement: null | HTMLDivElement;
    shouldClose: boolean;
    static defaultProps: {
        beforeClose: null;
        className: null;
        onClose: () => null;
        onOpen: () => null;
        onRender: () => null;
        style: null;
        renderTarget: null;
        target: null;
        targetRef: null;
        closeOnEscPressed: boolean;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    onDocumentMouseDown(event: MouseEvent | TouchEvent): void;
    onDocumentMouseUp(event: MouseEvent | TouchEvent): void;
    onDocumentKeyDown(event: KeyboardEvent): void;
    onDocumentMouseMove(): void;
    getClickEventProperties(event: MouseEvent | TouchEvent): {
        isNotLeftClick: boolean;
        isTargetClick: boolean;
        isPortalClick: boolean;
    };
    getTargetElement(): HTMLElement | null;
    getRenderTarget(): HTMLElement;
    open(): void;
    close(): void;
    supportsPassiveEvents(): boolean;
    render(): import("react").ReactPortal | null;
}
export default Portal;
