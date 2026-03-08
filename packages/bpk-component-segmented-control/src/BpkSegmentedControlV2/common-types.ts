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

import type { ReactNode } from 'react';

export const SEGMENT_TYPES_V2 = {
  CanvasDefault: 'canvas-default',
  CanvasContrast: 'canvas-contrast',
  SurfaceDefault: 'surface-default',
  SurfaceContrast: 'surface-contrast',
} as const;

export type SegmentTypesV2 = (typeof SEGMENT_TYPES_V2)[keyof typeof SEGMENT_TYPES_V2];

export type BpkSegmentedControlV2RootProps = {
  /**
   * One or more BpkSegmentedControlV2.Item elements.
   */
  children: ReactNode;
  /**
   * Controlled selected value. When provided, onChange must also be provided.
   */
  value?: string;
  /**
   * Initial selected value for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Called when the selected segment changes. Receives the value of the newly selected item.
   */
  onChange?: (value: string) => void;
  /**
   * Pre-defined surface theme controlling default token values.
   * @default 'canvas-default'
   */
  type?: SegmentTypesV2;
  /**
   * Applies a box shadow to the group container.
   * @default false
   */
  shadow?: boolean;
  /**
   * Disables all items in the group.
   * @default false
   */
  disabled?: boolean;
  /**
   * Controls whether arrow-key navigation automatically selects the focused item.
   * 'automatic': selection follows focus immediately.
   * 'manual': selection requires an explicit Space or Enter keypress.
   * @default 'automatic'
   */
  activationMode?: 'automatic' | 'manual';
  /**
   * Accessible label for the radiogroup. Always required to satisfy WCAG 4.1.2
   * (the role="radiogroup" element must have an accessible name).
   */
  label: string;
};

export type BpkSegmentedControlV2ItemProps = {
  /**
   * Unique identifier for this segment within the group.
   */
  value: string;
  /**
   * Visible content of the segment — text, icons, or a combination.
   */
  children: ReactNode;
  /**
   * Disables this individual item.
   * @default false
   */
  disabled?: boolean;
};
