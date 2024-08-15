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

import type { ReactNode } from "react";

export const BUTTON_TYPES = {
  secondary: 'secondary',
  secondaryOnDark: 'secondary-on-dark',
} as const;

export type CommonProps = {
  id: string;
  min:  number;
  max:  number;
  value:  number;
  onValueChange: (arg0: number) => void;
  name?: string | undefined;
  step?: number;
  className?: string | null;
  /**
   * This is the label that will be read out when screen reader users tab to the increase button. Make sure you use a descriptive label.
   */
  /**
   * Function that handle the incrementing of the current selected value.
   */
  increaseButtonLabel: string;
  inputClassName?: string | undefined;
  /**
   * This is the label that will be read out when screen reader users tab to the decrease button. Make sure you use a descriptive label
   */
  decreaseButtonLabel: string;
  buttonType?: keyof typeof BUTTON_TYPES;
  /**
   * Title, subtitle and icon together make up the label for the nudger.
   * This label will be read aloud as a whole by screen readers. They all are optional props, however, if you wish to use a label then you will need to pass a title as the label will not work without it.
   */
  title?: string;
  subtitle?: string;
  icon? : ReactNode;
};
