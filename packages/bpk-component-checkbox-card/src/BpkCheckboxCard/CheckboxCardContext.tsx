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

import { createContext, useContext } from 'react';

import type { CheckboxCardVariant, CheckboxCardRadius } from './common-types';

/**
 * Context value for checkbox card components
 * Provides state and configuration to all child components
 */
export type CheckboxCardContextValue = {
  /** Whether the checkbox card is currently checked */
  checked: boolean;

  /** Whether the checkbox card is disabled */
  disabled: boolean;

  /** Visual variant based on background context */
  variant: CheckboxCardVariant;

  /** Border radius style */
  radius: CheckboxCardRadius;

  /** Form name attribute */
  name?: string;

  /** Form value attribute */
  value?: string;

  /** Callback when checked state changes */
  onCheckedChange: (checked: boolean) => void;

  /** Unique ID for the label element */
  labelId: string;

  /** Unique ID for the description element */
  descriptionId: string;

  /** Unique ID for the control (input) element */
  controlId: string;
};

/**
 * React Context for checkbox card state management
 * Allows sub-components to access parent state without prop drilling
 */
export const CheckboxCardContext = createContext<CheckboxCardContextValue | null>(null);

/**
 * Hook to access checkbox card context
 * Must be used within a BpkCheckboxCard.Root component
 *
 * @throws Error if used outside of BpkCheckboxCard.Root
 * @returns The checkbox card context value
 *
 * @example
 * function MyComponent() {
 *   const { checked, onCheckedChange } = useCheckboxCardContext();
 *   return <button onClick={() => onCheckedChange(!checked)}>Toggle</button>;
 * }
 */
export function useCheckboxCardContext(): CheckboxCardContextValue {
  const context = useContext(CheckboxCardContext);

  if (!context) {
    throw new Error(
      'CheckboxCard compound components must be used within BpkCheckboxCard.Root. ' +
        'Make sure you have wrapped your components in <BpkCheckboxCard.Root>.'
    );
  }

  return context;
}
