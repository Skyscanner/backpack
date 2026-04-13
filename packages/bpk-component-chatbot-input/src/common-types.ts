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

import type { KeyboardEvent, ReactNode } from 'react';

import type { BpkStackProps } from '../../bpk-component-layout';

export const CHATBOT_INPUT_TYPES = {
  CARS: 'cars',
  CARS_COMPOSER: 'cars-composer',
  COMPOSER: 'composer',
} as const;

export type ChatbotInputType =
  (typeof CHATBOT_INPUT_TYPES)[keyof typeof CHATBOT_INPUT_TYPES];

export type BpkChatbotInputInputProps = {
  inputValue: string;
  /** Accessible label for the loading state button (required for screen readers). */
  loadingAriaLabel: string;
  /** Accessible label for the send button (required for screen readers). */
  sendAriaLabel: string;
  onInputChange: (value: string) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
  onSubmit: () => void | Promise<void>;
  placeholder: string;
  isSending?: boolean;
  isPolling?: boolean;
  maxCharacters?: number;
  onInputClick?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
};

export type BpkChatbotInputRootProps = BpkStackProps & {
  inputType?: ChatbotInputType;
};

export type BpkChatbotInputToolbarProps = BpkStackProps;

export type BpkChatbotInputNamespace = {
  Root: (props: BpkChatbotInputRootProps) => ReactNode;
  Input: (props: BpkChatbotInputInputProps) => ReactNode;
  Toolbar: (props: BpkChatbotInputToolbarProps) => ReactNode;
};

export interface BaseInputFieldProps {
  value: string;
  placeholder: string;
  disabled?: boolean;
  isOverLimit?: boolean;
  dataTestId: string;
  onInputChange: (value: string) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
  onInputClick: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
}
