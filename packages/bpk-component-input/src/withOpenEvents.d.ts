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

import type { ComponentType, ReactElement, UIEvent } from 'react';

type WithOpenEventsProps = {
  isOpen?: boolean;
  onOpen?: () => void;
  hasTouchSupport?: boolean;
};
type InputProps = {
  className?: string | null;
  onClick?: (event: UIEvent) => void;
  onFocus?: (event: UIEvent) => void;
  onBlur?: (event: UIEvent) => void;
  onTouchEnd?: (event: UIEvent) => void;
  onKeyDown?: (event: UIEvent) => void;
  onKeyUp?: (event: UIEvent) => void;
};
declare const withOpenEvents: <P extends InputProps>(
  InputComponent: ComponentType<P>,
) => {
  new (props: P & WithOpenEventsProps): {
    focusCanOpen: boolean;
    handleTouchEnd: (event: UIEvent) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    render(): ReactElement;
    context: any;
    setState<K extends never>(
      state:
        | {}
        | ((
            prevState: Readonly<{}>,
            props: Readonly<P & WithOpenEventsProps>, // eslint-disable-line no-shadow
          ) => {} | Pick<{}, K> | null)
        | Pick<{}, K>
        | null,
      callback?: (() => void) | undefined,
    ): void;
    readonly props: Readonly<P & WithOpenEventsProps> &
      Readonly<{
        children?: import('react').ReactNode;
      }>;
    state: Readonly<{}>;
    refs: {
      [key: string]: import('react').ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(
      nextProps: Readonly<P & WithOpenEventsProps>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(
      error: Error,
      errorInfo: import('react').ErrorInfo,
    ): void;
    getSnapshotBeforeUpdate?(
      prevProps: Readonly<P & WithOpenEventsProps>,
      prevState: Readonly<{}>,
    ): any;
    componentDidUpdate?(
      prevProps: Readonly<P & WithOpenEventsProps>,
      prevState: Readonly<{}>,
      snapshot?: any,
    ): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(
      nextProps: Readonly<P & WithOpenEventsProps>,
      nextContext: any,
    ): void;
    UNSAFE_componentWillReceiveProps?(
      nextProps: Readonly<P & WithOpenEventsProps>,
      nextContext: any,
    ): void;
    componentWillUpdate?(
      nextProps: Readonly<P & WithOpenEventsProps>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<P & WithOpenEventsProps>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): void;
  };
  displayName: string;
  defaultProps: {
    isOpen: boolean;
    hasTouchSupport: boolean;
    onOpen: () => void;
    className: null;
    onClick: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onTouchEnd: () => void;
    onKeyDown: () => void;
    onKeyUp: () => void;
  };
  contextType?: import('react').Context<any> | undefined;
};
export default withOpenEvents;
