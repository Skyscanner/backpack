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

import type { InputHTMLAttributes } from 'react';

import { Checkbox } from '@ark-ui/react';

// `className` and `style` are intentionally blocked — Backpack owns the visual
// layer. The other props are managed by `BpkCheckboxV2.Root` to keep a single
// source of truth.
export type BpkCheckboxV2HiddenInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'className'
  | 'style'
  | 'checked'
  | 'defaultChecked'
  | 'disabled'
  | 'name'
  | 'required'
  | 'value'
  | 'onChange'
  | 'children'
>;

// Renders Ark's visually hidden native <input type="checkbox">.
// Include when the checkbox is inside a <form> for native form submission.
const BpkCheckboxV2HiddenInput = (props: BpkCheckboxV2HiddenInputProps = {}) => {
  const { className, style, ...safeProps } = props as BpkCheckboxV2HiddenInputProps & {
    className?: unknown;
    style?: unknown;
  };

  if (process.env.NODE_ENV !== 'production' && (className || style)) {
    // eslint-disable-next-line no-console
    console.warn(
      '[BpkCheckboxV2.HiddenInput] `className` and `style` are not supported.',
    );
  }

  return <Checkbox.HiddenInput {...safeProps} />;
};

export default BpkCheckboxV2HiddenInput;
