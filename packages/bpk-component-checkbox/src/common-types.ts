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

import type { ReactNode, InputHTMLAttributes, ChangeEvent } from 'react';

/**
 * Base props that extend native HTML input attributes, excluding conflicting props.
 */
export type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>;

/**
 * Validation state for the checkbox.
 * - true: Valid state (optional visual indicator)
 * - false: Invalid state (shows error styling, sets aria-invalid)
 * - null: Neutral state (no validation styling)
 */
export type ValidationState = boolean | null;

/**
 * Callback signature for onChange event (legacy API).
 */
export type OnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

/**
 * Callback signature for onCheckedChange event (Ark UI API).
 */
export type OnCheckedChangeHandler = (details: { checked: boolean }) => void;

/**
 * Props for simple/legacy checkbox usage with label prop.
 */
export type BpkCheckboxSimpleProps = NativeInputProps & {
  /**
   * Form input name attribute (required for form submission).
   */
  name: string;

  /**
   * Label text or content displayed next to the checkbox.
   * Required when not using composable children.
   */
  label: ReactNode;

  /**
   * Whether checkbox is required (shows asterisk when true).
   * @default false
   */
  required?: boolean;

  /**
   * Whether checkbox is disabled (prevents interaction).
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to render white variant (for dark backgrounds).
   * @default false
   */
  white?: boolean;

  /**
   * Additional CSS class for the root element.
   */
  className?: string | null;

  /**
   * Whether to render label with small text style.
   * @default false
   */
  smallLabel?: boolean;

  /**
   * Validation state.
   * - false: Shows invalid styling
   * - null: Neutral (default)
   * - true: Valid state
   * @default null
   */
  valid?: ValidationState;

  /**
   * Whether checkbox shows indeterminate state (visual only).
   * Displays a dash/minus symbol instead of checkmark.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Controlled checked state.
   */
  checked?: boolean;

  /**
   * Initial checked state for uncontrolled mode.
   */
  defaultChecked?: boolean;

  /**
   * Change handler (legacy API).
   */
  onChange?: OnChangeHandler;

  /**
   * Change handler (Ark UI API).
   * Can be used alongside or instead of onChange.
   */
  onCheckedChange?: OnCheckedChangeHandler;
};

/**
 * Props for composable checkbox usage with children.
 */
export type BpkCheckboxComposableProps = NativeInputProps & {
  /**
   * Form input name attribute (required for form submission).
   */
  name: string;

  /**
   * Composable child elements (Control, Label, Indicator, HiddenInput, and custom elements).
   * When provided, the label prop is not used.
   */
  children: ReactNode;

  /**
   * Whether checkbox is required (shows asterisk when true).
   * @default false
   */
  required?: boolean;

  /**
   * Whether checkbox is disabled (prevents interaction).
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to render white variant (for dark backgrounds).
   * @default false
   */
  white?: boolean;

  /**
   * Additional CSS class for the root element.
   */
  className?: string | null;

  /**
   * Whether to render label with small text style (affects Label sub-component).
   * @default false
   */
  smallLabel?: boolean;

  /**
   * Validation state.
   * - false: Shows invalid styling
   * - null: Neutral (default)
   * - true: Valid state
   * @default null
   */
  valid?: ValidationState;

  /**
   * Whether checkbox shows indeterminate state (visual only).
   * Displays a dash/minus symbol instead of checkmark.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Controlled checked state.
   */
  checked?: boolean;

  /**
   * Initial checked state for uncontrolled mode.
   */
  defaultChecked?: boolean;

  /**
   * Change handler (legacy API).
   */
  onChange?: OnChangeHandler;

  /**
   * Change handler (Ark UI API).
   * Can be used alongside or instead of onChange.
   */
  onCheckedChange?: OnCheckedChangeHandler;
};

/**
 * Main component props - union of simple and composable variants.
 */
export type BpkCheckboxProps = BpkCheckboxSimpleProps | BpkCheckboxComposableProps;

/**
 * Props for BpkCheckboxRoot (explicit composable entry point).
 * When using BpkCheckbox.Root or BpkCheckboxRoot, children are required.
 */
export type BpkCheckboxRootProps = BpkCheckboxComposableProps;

/**
 * Props for BpkCheckboxControl.
 */
export type BpkCheckboxControlProps = {
  /**
   * Additional CSS class for the control element.
   */
  className?: string;

  /**
   * Custom content to render inside the control.
   * Typically used for custom checkmark icons.
   */
  children?: ReactNode;
};

/**
 * Props for BpkCheckboxLabel.
 */
export type BpkCheckboxLabelProps = {
  /**
   * Additional CSS class for the label element.
   */
  className?: string;

  /**
   * Label text or content (required).
   */
  children: ReactNode;
};

/**
 * Props for BpkCheckboxIndicator.
 */
export type BpkCheckboxIndicatorProps = {
  /**
   * Additional CSS class for the indicator element.
   */
  className?: string;

  /**
   * Custom indicator content (optional).
   * If not provided, default checkmark/dash icons are used.
   */
  children?: ReactNode;
};

/**
 * Props for BpkCheckboxHiddenInput.
 */
export type BpkCheckboxHiddenInputProps = InputHTMLAttributes<HTMLInputElement>;
