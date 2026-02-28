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

import type { ComponentProps, ReactNode, RefObject, SyntheticEvent } from 'react';

// Constants for input types
export const INPUT_TYPES = {
  text: 'text',
  email: 'email',
  number: 'number',
  password: 'password',
  tel: 'tel',
} as const;

// Constants for clear button modes
export const CLEAR_BUTTON_MODES = {
  never: 'never',
  whileEditing: 'whileEditing',
  always: 'always',
} as const;

/**
 * Props for the BpkInputRoot component.
 * The root container that provides context for Input and InputAdornment components.
 */
export type BpkInputRootProps = {
  /**
   * The gap between elements (CSS length unit).
   * @default "0"
   */
  gap?: string;
  /**
   * Whether to apply large size variant to all children.
   * @default false
   */
  large?: boolean;
  /**
   * Additional CSS class name.
   */
  className?: string;
  /**
   * Child components (Input and InputAdornment).
   */
  children: ReactNode;
};

/**
 * Base props shared by all input variants.
 */
type BaseInputProps = {
  /**
   * Unique identifier for the input element.
   */
  id: string;
  /**
   * Name attribute for form submission.
   */
  name: string;
  /**
   * Current input value.
   */
  value: string | number;
  /**
   * Input type.
   * @default 'text'
   */
  type?: keyof typeof INPUT_TYPES;
  /**
   * Validation state. true = valid, false = invalid, null/undefined = neutral.
   * @default null
   */
  valid?: boolean | null;
  /**
   * Ref callback for the input element.
   */
  inputRef?: ((ref: HTMLInputElement) => void) | null;
  /**
   * Additional CSS class name.
   */
  className?: string;
} & Omit<ComponentProps<'input'>, 'id' | 'name' | 'value' | 'type'>;

/**
 * Props when clearButtonMode is 'never' or undefined.
 * In this case, clearButtonLabel and onClear are optional.
 */
export type PropsWithoutClearButtonMode = BaseInputProps & {
  clearButtonMode?: 'never';
  clearButtonLabel?: string | null;
  onClear?: ((e?: SyntheticEvent<HTMLButtonElement>) => void) | null;
};

/**
 * Props when clearButtonMode is 'whileEditing' or 'always'.
 * In this case, clearButtonLabel and onClear are required.
 */
export type PropsWithClearButtonMode = BaseInputProps & {
  clearButtonMode: 'whileEditing' | 'always';
  /**
   * Accessible label for the clear button (required when clearButtonMode is set).
   */
  clearButtonLabel: string;
  /**
   * Callback when the clear button is clicked (required when clearButtonMode is set).
   */
  onClear: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};

/**
 * Discriminated union for BpkInput props.
 * Ensures clearButtonLabel and onClear are required when clearButtonMode is set.
 */
export type BpkInputProps = PropsWithoutClearButtonMode | PropsWithClearButtonMode;

/**
 * Props for the BpkInputAdornment component.
 */
export type BpkInputAdornmentProps = {
  /**
   * Content to render inside the adornment (icon or text).
   */
  children: ReactNode;
  /**
   * Additional CSS class name.
   */
  className?: string;
  /**
   * Internal prop for auto-generated ID (not documented for users).
   * @internal
   */
  'data-input-adornment-id'?: string;
};

/**
 * Context value provided by BpkInputRoot.
 * @internal
 */
export interface BpkInputContextValue {
  /**
   * The gap between elements (CSS length unit).
   */
  gap: string;
  /**
   * Whether large size variant is applied.
   */
  large: boolean;
  /**
   * Register an input element with the context.
   */
  registerInput: (id: string, ref: RefObject<HTMLInputElement>) => void;
  /**
   * Unregister an input element from the context.
   */
  unregisterInput: (id: string) => void;
  /**
   * Register an adornment element with its position in the children array.
   */
  registerAdornment: (id: string, position: number) => void;
  /**
   * Unregister an adornment element from the context.
   */
  unregisterAdornment: (id: string) => void;
  /**
   * Get the input ID that an adornment belongs to.
   */
  getInputForAdornment: (adornmentId: string) => string | null;
  /**
   * Get the position information for an input (index and total count).
   */
  getInputPosition: (inputId: string) => { index: number; total: number } | null;
  /**
   * Get the position type of an adornment relative to its nearest input.
   * Returns 'start' if before input, 'end' if after input, or null if no input found.
   */
  getAdornmentPositionType: (adornmentId: string) => 'start' | 'end' | null;
}
