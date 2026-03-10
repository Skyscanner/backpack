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

import type { ReactElement } from 'react';

import {
  BpkButtonV2,
  BUTTON_TYPES,
  SIZE_TYPES,
} from '../../../bpk-component-button';
import {
  BpkSpinner,
  SPINNER_TYPES,
} from '../../../bpk-component-spinner';

export interface LoadingButtonProps {
  ariaLabel: string;
  iconLoading?: ReactElement;
}

const LoadingButton = ({
  ariaLabel,
  iconLoading = <BpkSpinner type={SPINNER_TYPES.light} />,
}: LoadingButtonProps) => (
  <BpkButtonV2
    type={BUTTON_TYPES.featured}
    size={SIZE_TYPES.small}
    iconOnly
    disabled
    aria-label={ariaLabel}
    data-testid="bpk-chatbot-input-loading"
  >
    {iconLoading}
  </BpkButtonV2>
);

export default LoadingButton;
