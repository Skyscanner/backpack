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

/// <reference types="lodash" />
import type { ComponentType } from 'react';
type WithLazyLoadingProps = {
    className?: string;
    style?: {};
    [rest: string]: any;
};
type WithLazyLoadingState = {
    inView: boolean;
};
export default function withLazyLoading<P extends object>(WrappedComponent: ComponentType<P>, documentRef?: Document | null): {
    new (props: Omit<P, 'inView'> & WithLazyLoadingProps): {
        element?: HTMLElement | null | undefined;
        placeholderReference?: string | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        setInView: () => void;
        getPassiveArgs(): {
            capture: boolean;
            passive?: boolean;
        };
        removeEventListeners: () => void;
        checkInView: import("lodash").DebouncedFunc<() => void>;
        supportsPassiveEvents: () => boolean;
        isInViewPort: () => boolean;
        render(): JSX.Element;
        context: any;
        setState<K extends "inView">(state: WithLazyLoadingState | ((prevState: Readonly<WithLazyLoadingState>, props: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>) => WithLazyLoadingState | Pick<WithLazyLoadingState, K> | null) | Pick<WithLazyLoadingState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<P, "inView"> & WithLazyLoadingProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<WithLazyLoadingState>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>, nextState: Readonly<WithLazyLoadingState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>, prevState: Readonly<WithLazyLoadingState>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>, prevState: Readonly<WithLazyLoadingState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>, nextState: Readonly<WithLazyLoadingState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<P, "inView"> & WithLazyLoadingProps>, nextState: Readonly<WithLazyLoadingState>, nextContext: any): void;
    };
    displayName: string;
    defaultProps: {
        style: {};
        className: string;
    };
    contextType?: import("react").Context<any> | undefined;
};
export {};
