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

import PropTypes from 'prop-types';
import type { ComponentProps, SyntheticEvent } from 'react';
export declare const CLEAR_BUTTON_MODES: {
    readonly never: "never";
    readonly whileEditing: "whileEditing";
    readonly always: "always";
};
export declare const INPUT_TYPES: {
    readonly text: "text";
    readonly email: "email";
    readonly number: "number";
    readonly password: "password";
    readonly tel: "tel";
};
type BaseProps = ComponentProps<'input'> & {
    id: string;
    name: string;
    value: string;
    type?: typeof INPUT_TYPES[keyof typeof INPUT_TYPES];
    valid?: boolean | null;
    large?: boolean;
    docked?: boolean;
    dockedFirst?: boolean;
    dockedMiddle?: boolean;
    dockedLast?: boolean;
    inputRef?: ((ref: HTMLInputElement) => void) | null;
};
export type PropsWithoutClearButonMode = BaseProps & {
    clearButtonMode?: 'never';
    clearButtonLabel?: string | null;
    onClear?: ((e?: SyntheticEvent<HTMLButtonElement>) => void) | null;
};
export type PropsWithClearButtonMode = BaseProps & {
    clearButtonMode: typeof CLEAR_BUTTON_MODES[keyof Omit<typeof CLEAR_BUTTON_MODES, 'never'>];
    clearButtonLabel: string;
    onClear: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};
export type Props = PropsWithoutClearButonMode | PropsWithClearButtonMode;
export declare const clearablePropType: (props: any, propName: string, componentName: string) => Error | null;
export declare const propTypes: {
    id: PropTypes.Validator<string>;
    name: PropTypes.Validator<string>;
    value: PropTypes.Validator<string>;
    type: PropTypes.Requireable<"number" | "text" | "tel" | "email" | "password">;
    className: PropTypes.Requireable<string>;
    valid: PropTypes.Requireable<boolean>;
    large: PropTypes.Requireable<boolean>;
    docked: PropTypes.Requireable<boolean>;
    dockedFirst: PropTypes.Requireable<boolean>;
    dockedMiddle: PropTypes.Requireable<boolean>;
    dockedLast: PropTypes.Requireable<boolean>;
    inputRef: PropTypes.Requireable<(...args: any[]) => any>;
    clearButtonMode: PropTypes.Requireable<string>;
    clearButtonLabel: (props: any, propName: string, componentName: string) => Error | null;
    onClear: (props: any, propName: string, componentName: string) => Error | null;
};
export declare const defaultProps: {
    type: "text";
    valid: null;
    large: boolean;
    docked: boolean;
    dockedFirst: boolean;
    dockedMiddle: boolean;
    dockedLast: boolean;
    inputRef: null;
    clearButtonMode: "never";
    clearButtonLabel: null;
    onClear: null;
};
export {};
