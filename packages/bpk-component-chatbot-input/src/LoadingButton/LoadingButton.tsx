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

import {
  BpkSpinner,
  SPINNER_TYPES,
} from '../../../bpk-component-spinner';
import { cssModules } from '../../../bpk-react-utils';

import STYLES from './LoadingButton.module.scss';

const getClassName = cssModules(STYLES);

export interface LoadingButtonProps {
  ariaLabel: string;
}

const LoadingButton = ({ ariaLabel }: LoadingButtonProps) => (
  <button
    type="button"
    className={getClassName('bpk-chatbot-loading-button')}
    aria-label={ariaLabel}
    disabled
    data-testid="bpk-chatbot-input-loading"
  >
    <BpkSpinner type={SPINNER_TYPES.light} />
  </button>
);

export default LoadingButton;
