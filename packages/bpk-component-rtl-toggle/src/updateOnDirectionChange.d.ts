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

declare const updateOnDirectionChange: (
  EnhancedComponent: ComponentType<any> | string,
) => {
  new (props: {} | Readonly<{}>): {
    componentDidMount(): void;
    componentWillUnmount(): void;
    onDirectionChange: () => void;
    render(): JSX.Element;
    context: any;
    setState<K extends never>(
      state:
        | {}
        | ((
            prevState: Readonly<{}>,
            props: Readonly<{}>,
          ) => {} | Pick<{}, K> | null)
        | Pick<{}, K>
        | null,
      callback?: (() => void) | undefined,
    ): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<{}> &
      Readonly<{
        children?: import('react').ReactNode;
      }>;
    state: Readonly<{}>;
    refs: {
      [key: string]: import('react').ReactInstance;
    };
    shouldComponentUpdate?(
      nextProps: Readonly<{}>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): boolean;
    componentDidCatch?(
      error: Error,
      errorInfo: import('react').ErrorInfo,
    ): void;
    getSnapshotBeforeUpdate?(
      prevProps: Readonly<{}>,
      prevState: Readonly<{}>,
    ): any;
    componentDidUpdate?(
      prevProps: Readonly<{}>,
      prevState: Readonly<{}>,
      snapshot?: any,
    ): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(
      nextProps: Readonly<{}>,
      nextContext: any,
    ): void;
    componentWillUpdate?(
      nextProps: Readonly<{}>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<{}>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): void;
  };
  new (props: {}, context: any): {
    componentDidMount(): void;
    componentWillUnmount(): void;
    onDirectionChange: () => void;
    render(): JSX.Element;
    context: any;
    setState<K extends never>(
      state:
        | {}
        | ((
            prevState: Readonly<{}>,
            props: Readonly<{}>,
          ) => {} | Pick<{}, K> | null)
        | Pick<{}, K>
        | null,
      callback?: (() => void) | undefined,
    ): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<{}> &
      Readonly<{
        children?: import('react').ReactNode;
      }>;
    state: Readonly<{}>;
    refs: {
      [key: string]: import('react').ReactInstance;
    };
    shouldComponentUpdate?(
      nextProps: Readonly<{}>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): boolean;
    componentDidCatch?(
      error: Error,
      errorInfo: import('react').ErrorInfo,
    ): void;
    getSnapshotBeforeUpdate?(
      prevProps: Readonly<{}>,
      prevState: Readonly<{}>,
    ): any;
    componentDidUpdate?(
      prevProps: Readonly<{}>,
      prevState: Readonly<{}>,
      snapshot?: any,
    ): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(
      nextProps: Readonly<{}>,
      nextContext: any,
    ): void;
    componentWillUpdate?(
      nextProps: Readonly<{}>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<{}>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): void;
  };
  displayName: string;
  contextType?: import('react').Context<any> | undefined;
};
export default updateOnDirectionChange;
