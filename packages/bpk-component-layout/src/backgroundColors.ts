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

import { SURFACE_COLORS } from '../../bpk-react-utils/src/surfaceColors';

// Canvas colors (day mode only)
const CANVAS_COLORS = {
  canvas: 'canvas',
  canvasContrast: 'canvas-contrast',
} as const;

// Status fill colors (day mode only — only fill, not spot or on-dark)
const STATUS_FILL_COLORS = {
  statusSuccessFill: 'status-success-fill',
  statusDangerFill: 'status-danger-fill',
  statusWarningFill: 'status-warning-fill',
} as const;

export const BACKGROUND_COLORS = {
  ...SURFACE_COLORS,
  ...CANVAS_COLORS,
  ...STATUS_FILL_COLORS,
} as const;

export type BpkLayoutBackgroundColor =
  (typeof BACKGROUND_COLORS)[keyof typeof BACKGROUND_COLORS];
