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

import { BpkModalV2 } from './src/BpkModalV2/BpkModal';
import themeAttributes from './src/themeAttributes';
import BpkModal from './src/BpkModal';
import { MODAL_STYLING } from './src/BpkModalInner';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { propTypes, defaultProps } from './src/legacy-prop-types';

import type { Props } from './src/BpkModal';

export type BpkModalProps = Props;

export default BpkModal;
export { propTypes, defaultProps, themeAttributes, BpkModalV2, MODAL_STYLING };
