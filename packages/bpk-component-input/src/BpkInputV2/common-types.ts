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

import type { ComponentProps, SyntheticEvent } from 'react';

export const CLEAR_BUTTON_MODES = {
  never: 'never',
  whileEditing: 'whileEditing',
  always: 'always',
} as const;

export const INPUT_TYPES = {
  text: 'text',
  email: 'email',
  number: 'number',
  password: 'password',
  tel: 'tel',
} as const;

/**
 * Input prop types required for BpkInputV2
 */
type InputProps = {
  /**
   * **Required:** The id attribute of the input.
   */
  id: string;
  /**
   * **Required:** The name attribute of the input.
   */
  name: string;
  /**
   * **Required:** The value attribute of the input.
   */
  value: string | number;
  /**
   * The type attribute of the input.
   * Defaults to 'text'.
   */
  type?: (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];
};

/**
 * Base props shared by all BpkInputV2 configurations
 */
type BaseProps = InputProps & ComponentProps<'input'> & {
  /**
   * Whether the input is in a valid state.
   * - true: Shows valid indicator
   * - false: Shows invalid indicator
   * - null/undefined: Shows no indicator
   */
  valid?: boolean | null;
  /**
   * Whether to render the large variant of the input.
   */
  large?: boolean;
  /**
   * Whether the input is part of a docked layout.
   */
  docked?: boolean;
  /**
   * Whether the input is the first element in a docked layout.
   */
  dockedFirst?: boolean;
  /**
   * Whether the input is a middle element in a docked layout.
   */
  dockedMiddle?: boolean;
  /**
   * Whether the input is the last element in a docked layout.
   */
  dockedLast?: boolean;
  /**
   * A ref callback for the underlying input element.
   */
  inputRef?: ((ref: HTMLInputElement) => void) | null;
};

/**
 * Props when clearButtonMode is not set or set to 'never'.
 * In this case, clearButtonLabel and onClear are optional.
 */
export type PropsWithoutClearButtonMode = BaseProps & {
  clearButtonMode?: 'never';
  clearButtonLabel?: string | null;
  onClear?: ((e?: SyntheticEvent<HTMLButtonElement>) => void) | null;
};

/**
 * Props when clearButtonMode is set to 'whileEditing' or 'always'.
 * In this case, clearButtonLabel and onClear are required.
 *
 * Note: When clearButtonMode is set to 'always', validity icons will not appear.
 */
export type PropsWithClearButtonMode = BaseProps & {
  clearButtonMode: (typeof CLEAR_BUTTON_MODES)[keyof Omit<
    typeof CLEAR_BUTTON_MODES,
    'never'
  >];
  /**
   * **Required when clearButtonMode is not 'never':**
   * Accessible label for the clear button.
   */
  clearButtonLabel: string;
  /**
   * **Required when clearButtonMode is not 'never':**
   * Callback invoked when the clear button is clicked.
   */
  onClear: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};

/**
 * Discriminated union type for BpkInputV2 props.
 * Ensures compile-time validation that clearButtonLabel and onClear
 * are provided when clearButtonMode is not 'never'.
 */
export type BpkInputV2Props = PropsWithoutClearButtonMode | PropsWithClearButtonMode;

/**
 * Default prop values for BpkInputV2
 */
export const defaultProps = {
  type: INPUT_TYPES.text,
  valid: null,
  large: false,
  docked: false,
  dockedFirst: false,
  dockedMiddle: false,
  dockedLast: false,
  inputRef: null,
  clearButtonMode: CLEAR_BUTTON_MODES.never,
  clearButtonLabel: null,
  onClear: null,
};
