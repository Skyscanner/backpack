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
import wrapDisplayName from './src/wrapDisplayName';
import Portal from './src/Portal';
import TransitionInitialMount from './src/TransitionInitialMount';
import cssModules from './src/cssModules';
import deprecated from './src/deprecated';
import { isDeviceIphone, isDeviceIpad, isDeviceIos } from './src/deviceDetection';
import withDefaultProps from './src/withDefaultProps';
import isRTL from './src/isRTL';
import{ BpkDialogWrapper } from './src/BpkDialogWrapper/BpkDialogWrapper';
export { Portal, TransitionInitialMount, cssModules, deprecated, withDefaultProps, wrapDisplayName, isDeviceIphone, isDeviceIpad, isDeviceIos, isRTL, BpkDialogWrapper };
declare const _default: {
    Portal: typeof Portal;
    TransitionInitialMount: ({ appearActiveClassName, appearClassName, children, transitionTimeout, }: {
        appearClassName: string;
        appearActiveClassName: string;
        transitionTimeout: number;
        children: import("react").ReactNode;
    }) => JSX.Element;
    cssModules: (styles?: {
        [key: string]: any;
    }) => (...classNames: (string | number | boolean | {} | null | undefined)[]) => string;
    deprecated: any;
    withDefaultProps: (WrappedComponent: import("react").ComponentType<any>, defaultProps: {
        [rest: string]: any;
        className?: string | undefined;
    }) => {
        ({ children, className: innerClassName, ...rest }: {
            [rest: string]: any;
            children?: import("react").ReactNode;
            className?: string | null | undefined;
        }): JSX.Element;
        displayName: string;
    };
    wrapDisplayName: (Component: string | import("react").ComponentType<any> | null, hoc: string) => string;
    isDeviceIphone: () => boolean;
    isDeviceIpad: () => boolean;
    isDeviceIos: () => boolean;
    isRTL: () => boolean;
    BpkDialogWrapper: ({
      ariaLabelledby,
      children,
      closeOnEscPressed,
      closeOnScrimClick,
      dialogClassName,
      exiting,
      id,
      isOpen,
      onClose,
      timeout,
      transitionClassNames
    }: {
      ariaLabelledby: string;
      children: import("react").ReactNode;
      closeOnEscPressed?: boolean;
      closeOnScrimClick?: boolean;
      dialogClassName?: string;
      id: string | undefined;
      isOpen: boolean;
      onClose: (
        arg0?: Event | KeyboardEvent | MouseEvent | PointerEvent | TouchEvent,
        arg1?: {
          source: 'ESCAPE' | 'DOCUMENT_CLICK';
        },
    ) => void | null;
      exiting?: boolean;
      transitionClassNames?: {
        appear?: string,
        appearActive?: string,
        exit?: string
      };
      timeout?: {appear?: number, exit?: number};
    }) => JSX.Element;
};
export default _default;
