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
 * Context value for checkbox card components.
 * Holds only Backpack-specific props (variant, radius, size).
 * Checkbox state (checked, disabled, etc.) is accessed via Ark UI's useCheckboxContext().
 */
export type CheckboxCardContextValue = {
  /** Visual variant based on background context */
  variant: CheckboxCardVariant;

  /** Border radius style */
  radius: CheckboxCardRadius;

  /** Whether the card is in a loading state (non-interactive, cursor not-allowed) */
  loading: boolean;
};

/**
 * React Context for BPK-specific checkbox card configuration.
 * Checkbox state is managed by Ark UI's CheckboxRoot and accessed via useCheckboxContext().
 */
export const CheckboxCardContext = createContext<CheckboxCardContextValue | null>(null);

/**
 * Hook to access BPK checkbox card context.
 * Must be used within a BpkCheckboxCard.Root component.
 *
 * @throws Error if used outside of BpkCheckboxCard.Root
 * @returns {CheckboxCardContextValue} The checkbox card context value.
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
