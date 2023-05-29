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

import type { ComponentType, ElementType } from 'react';
import { Component } from 'react';
export type Props = InjectedCalendarGridTransitionProps & {
    className?: string | null;
    month?: Date;
    focusedDate?: Date | null;
    [rest: string]: any;
};
type InjectedCalendarGridTransitionProps = {
    TransitionComponent: ElementType;
};
type State = {
    isTransitioning: boolean;
    transitionValue: string;
    currentMonth?: Date | null;
    months: Date[];
};
declare class BpkCalendarGridTransition extends Component<Props, State> {
    isTransitionEndSupported: boolean;
    static defaultProps: {
        className: null;
        month: Date;
        focusedDate: null;
    };
    constructor(props: Props);
    UNSAFE_componentWillReceiveProps({ month: nextMonth }: Props): void;
    componentDidUpdate(): void;
    onMonthTransitionEnd(): void;
    render(): JSX.Element;
}
declare const addCalendarGridTransition: <P extends {}>(TransitionComponent: ComponentType<P>) => (props: Omit<P & InjectedCalendarGridTransitionProps & {
    [rest: string]: any;
    className?: string | null | undefined;
    month?: Date | undefined;
    focusedDate?: Date | null | undefined;
}, "TransitionComponent">) => JSX.Element;
export default BpkCalendarGridTransition;
export { addCalendarGridTransition };
