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

// Declaring this type here as react docgen gets confused and reads them as native input types
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
  type?: (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];
};

type BaseProps = InputProps & ComponentProps<'input'> & {
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
  /**
   * When `clearButtonMode` is set to `always`, validity icons will not appear.
   */
  clearButtonMode: (typeof CLEAR_BUTTON_MODES)[keyof Omit<
    typeof CLEAR_BUTTON_MODES,
    'never'
  >];
  clearButtonLabel: string;
  onClear: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};

export type Props = PropsWithoutClearButonMode | PropsWithClearButtonMode;
