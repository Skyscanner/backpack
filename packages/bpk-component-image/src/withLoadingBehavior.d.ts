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
type InjectedProps = {
    onLoad: () => void;
    loading: boolean;
};
type State = {
    loading: boolean;
};
export default function withLoadingBehavior<P extends object>(WrappedComponent: ComponentType<P>): {
    new (props: Omit<P, keyof InjectedProps>): {
        onLoad: () => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "loading">(state: State | ((prevState: Readonly<State>, props: Readonly<Omit<P, keyof InjectedProps>>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<P, keyof InjectedProps>> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<State>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<P, keyof InjectedProps>>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<P, keyof InjectedProps>>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<P, keyof InjectedProps>>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<P, keyof InjectedProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<P, keyof InjectedProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<P, keyof InjectedProps>>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<P, keyof InjectedProps>>, nextState: Readonly<State>, nextContext: any): void;
    };
    displayName: string;
    contextType?: import("react").Context<any> | undefined;
};
export {};
