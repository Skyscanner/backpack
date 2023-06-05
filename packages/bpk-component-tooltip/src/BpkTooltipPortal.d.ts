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

import { createPopper } from '@popperjs/core';
import { Component } from 'react';
import type { ReactNode, ReactElement } from 'react';
import type { TooltipProps } from './BpkTooltip';
export type Props = TooltipProps & {
    ariaLabel: string;
    target: ReactElement<any>;
    children: ReactNode | string;
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
    hideOnTouchDevices?: boolean;
    portalStyle?: object;
    portalClassName?: string;
    renderTarget: null | (() => null | HTMLElement);
    popperModifiers?: object[];
};
type State = {
    isOpen: boolean;
};
declare class BpkTooltipPortal extends Component<Props, State> {
    popper?: ReturnType<typeof createPopper> | null;
    targetRef?: Element | null;
    static defaultProps: {
        className: null;
        padded: boolean;
        type: "light";
        placement: string;
        hideOnTouchDevices: boolean;
        portalStyle: null;
        portalClassName: null;
        renderTarget: null;
        popperModifiers: null;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onOpen: (tooltipElement: HTMLElement, targetElement?: HTMLElement | null | undefined) => void;
    beforeClose: (done: () => void | null) => void;
    openTooltip: () => void;
    closeTooltip: () => void;
    render(): JSX.Element;
}
export default BpkTooltipPortal;
