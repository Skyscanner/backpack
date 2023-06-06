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

/// <reference types="react" />
import { type DialogInnerProps as Props } from './common-types';
declare const _default: {
    new (props: (Props & {
        getApplicationElement: () => HTMLElement | null;
        containerClassName?: string | undefined;
        closeOnScrimClick?: boolean | undefined;
    } & {
        [rest: string]: any;
        onClose?: (() => void | null) | undefined;
        isIphone?: boolean | undefined;
        isIpad?: boolean | undefined;
    }) | Readonly<Props & {
        getApplicationElement: () => HTMLElement | null;
        containerClassName?: string | undefined;
        closeOnScrimClick?: boolean | undefined;
    } & {
        [rest: string]: any;
        onClose?: (() => void | null) | undefined;
        isIphone?: boolean | undefined;
        isIpad?: boolean | undefined;
    }>): {
        dialogElement?: import("react").RefObject<HTMLElement> | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        dialogRef: (ref: import("react").RefObject<HTMLElement>) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Props & {
        getApplicationElement: () => HTMLElement | null;
        containerClassName?: string | undefined;
        closeOnScrimClick?: boolean | undefined;
    } & {
        [rest: string]: any;
        onClose?: (() => void | null) | undefined;
        isIphone?: boolean | undefined;
        isIpad?: boolean | undefined;
    }, context: any): {
        dialogElement?: import("react").RefObject<HTMLElement> | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        dialogRef: (ref: import("react").RefObject<HTMLElement>) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props & {
            getApplicationElement: () => HTMLElement | null;
            containerClassName?: string | undefined;
            closeOnScrimClick?: boolean | undefined;
        } & {
            [rest: string]: any;
            onClose?: (() => void | null) | undefined;
            isIphone?: boolean | undefined;
            isIpad?: boolean | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
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
export default _default;
