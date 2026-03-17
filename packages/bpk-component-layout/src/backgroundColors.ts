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

// Values must stay in sync with BpkBox.module.scss

import { SURFACE_COLORS } from '../../bpk-react-utils';

/**
 * Background color tokens available on BpkBox.
 *
 * Values map to CSS class suffixes generated in BpkBox.module.scss.
 * Surface colors are shared with bpk-react-utils/SURFACE_COLORS (used by BpkPanel etc.).
 * Status fill and canvas colors are additional to BpkBox.
 *
 * @example
 * import { BACKGROUND_COLORS } from '@skyscanner/backpack-web/bpk-component-layout';
 * <BpkBox backgroundColor={BACKGROUND_COLORS.surfaceDefault} />
 */
export const BACKGROUND_COLORS = {
  // Surface colors — shared across components via bpk-react-utils
  ...SURFACE_COLORS,

  // Status fill colors
  statusSuccessFill: 'status-success-fill',
  statusDangerFill: 'status-danger-fill',
  statusWarningFill: 'status-warning-fill',

  // Canvas colors
  canvas: 'canvas',
  canvasContrast: 'canvas-contrast',
} as const;

export type BpkBoxBackgroundColor =
  (typeof BACKGROUND_COLORS)[keyof typeof BACKGROUND_COLORS];
