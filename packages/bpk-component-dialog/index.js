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

/* @flow strict */

import BpkDialog from './src/BpkDialog';
import { HEADER_ICON_TYPES, type Props } from './src/common-types';

import BpkDialogV2, { type Props as BpkDialogV2Props } from './src/BpkDialogV2';

export type BpkDialogProps = Props;
export default BpkDialog;
export { HEADER_ICON_TYPES };

export type { BpkDialogV2Props };
export default BpkDialogV2;
