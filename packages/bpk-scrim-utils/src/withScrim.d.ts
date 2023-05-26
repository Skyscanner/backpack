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

import type { ComponentType, RefObject } from 'react';
type BaseProps = {
    onClose?: () => void | null;
    isIphone?: boolean;
    isIpad?: boolean;
};
type HOCProps = {
    getApplicationElement: () => HTMLElement;
    containerClassName?: string;
    closeOnScrimClick?: boolean;
};
declare const withScrim: <P extends BaseProps>(WrappedComponent: string | ComponentType<P>) => {
    new (props: (P & HOCProps & BaseProps) | Readonly<P & HOCProps & BaseProps>): {
        dialogElement?: RefObject<HTMLElement> | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        dialogRef: (ref: RefObject<HTMLElement>) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<P & HOCProps & BaseProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<P & HOCProps & BaseProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<P & HOCProps & BaseProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<P & HOCProps & BaseProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<P & HOCProps & BaseProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<P & HOCProps & BaseProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P & HOCProps & BaseProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<P & HOCProps & BaseProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<P & HOCProps & BaseProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: P & HOCProps & BaseProps, context: any): {
        dialogElement?: RefObject<HTMLElement> | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        dialogRef: (ref: RefObject<HTMLElement>) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<P & HOCProps & BaseProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<P & HOCProps & BaseProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<P & HOCProps & BaseProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<P & HOCProps & BaseProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<P & HOCProps & BaseProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<P & HOCProps & BaseProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P & HOCProps & BaseProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<P & HOCProps & BaseProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<P & HOCProps & BaseProps>, nextState: Readonly<{}>, nextContext: any): void;
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
