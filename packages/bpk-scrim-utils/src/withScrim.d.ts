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

import type { ComponentType } from 'react';
type Props = {
    getApplicationElement: () => HTMLElement | null;
    onClose?: () => void | null;
    isIphone?: boolean;
    isIpad?: boolean;
    containerClassName?: string;
    closeOnScrimClick?: boolean;
    [rest: string]: any;
};
declare const withScrim: <P extends object>(WrappedComponent: string | ComponentType<P>) => {
    new (props: (Props & Omit<P, "dialogRef">) | Readonly<Props & Omit<P, "dialogRef">>): {
        dialogElement?: HTMLElement | null | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        dialogRef: (ref: HTMLElement | null | undefined) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props & Omit<P, "dialogRef">>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & Omit<P, "dialogRef">> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & Omit<P, "dialogRef">>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Props & Omit<P, "dialogRef">>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Props & Omit<P, "dialogRef">, context: any): {
        dialogElement?: HTMLElement | null | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        dialogRef: (ref: HTMLElement | null | undefined) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props & Omit<P, "dialogRef">>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & Omit<P, "dialogRef">> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & Omit<P, "dialogRef">>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Props & Omit<P, "dialogRef">>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & Omit<P, "dialogRef">>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    defaultProps: {
        onClose: null;
        isIphone: boolean;
        isIpad: boolean;
        containerClassName: null;
        closeOnScrimClick: boolean;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default withScrim;
