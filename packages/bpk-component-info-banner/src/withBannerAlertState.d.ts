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

/// <reference types="node" />
import type { ComponentType } from 'react';
export type WithBannerAlertStateProps = {
    onHide?: () => void;
    hideAfter?: number;
};
declare const withBannerAlertState: <P extends Partial<import("./common-types").CommonProps & {
    dismissButtonLabel: string;
    onDismiss?: import("./common-types").OnDismissHandler;
} & {
    children: import("react").ReactNode;
    expanded?: boolean | undefined;
    toggleButtonLabel: string;
    onExpandToggle?: import("./common-types").OnExpandToggleHandler;
}>>(WrappedComponent: ComponentType<P>) => {
    new (props: P & WithBannerAlertStateProps): {
        hideIntervalId?: NodeJS.Timeout | null | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        onExpandToggle: () => void;
        onDismiss: () => void;
        onHide: () => void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof {
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>(state: {
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        } | ((prevState: Readonly<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>, props: Readonly<P & WithBannerAlertStateProps>) => {
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        } | Pick<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }, K> | null) | Pick<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<P & WithBannerAlertStateProps> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<P & WithBannerAlertStateProps>, nextState: Readonly<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<P & WithBannerAlertStateProps>, prevState: Readonly<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<P & WithBannerAlertStateProps>, prevState: Readonly<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<P & WithBannerAlertStateProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P & WithBannerAlertStateProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<P & WithBannerAlertStateProps>, nextState: Readonly<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<P & WithBannerAlertStateProps>, nextState: Readonly<{
            expanded?: boolean | undefined;
            show?: boolean | undefined;
        }>, nextContext: any): void;
    };
    displayName: string;
    defaultProps: {
        onDismiss: null;
        onExpandToggle: null;
        onHide: null;
        expanded: boolean;
        show: boolean;
        hideAfter: null;
        animateOnLeave: boolean;
        children: null;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default withBannerAlertState;
