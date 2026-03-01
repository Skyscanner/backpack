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

import type { ChangeEvent } from 'react';

/**
 * Variant types for visual presentation based on canvas/surface background
 * - onCanvasDefault: For use on default/white backgrounds (selected: dark blue #05203C)
 * - onCanvasContrast: For use on contrast/colored backgrounds (selected: dark blue #05203C)
 * - onSurfaceContrast: For use on contrast surfaces (selected: accent blue #0062E3)
 */
export const CHECKBOX_CARD_VARIANTS = {
  onCanvasDefault: 'on-canvas-default',
  onCanvasContrast: 'on-canvas-contrast',
  onSurfaceContrast: 'on-surface-contrast',
} as const;

export type CheckboxCardVariant =
  (typeof CHECKBOX_CARD_VARIANTS)[keyof typeof CHECKBOX_CARD_VARIANTS];

/**
 * Radius types for border-radius
 */
export const CHECKBOX_CARD_RADIUS = {
  square: 'square',
  rounded: 'rounded',
} as const;

export type CheckboxCardRadius =
  (typeof CHECKBOX_CARD_RADIUS)[keyof typeof CHECKBOX_CARD_RADIUS];

/**
 * Change handler signature for checkbox card
 */
export type CheckboxCardChangeHandler = (
  checked: boolean,
  event: ChangeEvent<HTMLInputElement>,
) => void;
