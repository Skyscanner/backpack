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

import BpkButton, {
  BUTTON_TYPES,
  SIZE_TYPES,
} from '../../../bpk-component-button';
import { withButtonAlignment } from '../../../bpk-component-icon';
import ArrowUpIcon from '../../../bpk-component-icon/sm/long-arrow-up';

const AlignedArrowUpIcon = withButtonAlignment(ArrowUpIcon);

export interface SendButtonProps {
  ariaLabel: string;
  disabled?: boolean;
  onClick: () => void;
}

const SendButton = ({
  ariaLabel,
  disabled = false,
  onClick,
}: SendButtonProps) => (
  <BpkButton
    type={BUTTON_TYPES.primary}
    size={SIZE_TYPES.small}
    iconOnly
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    data-testid="bpk-chatbot-input-send"
  >
    <AlignedArrowUpIcon />
  </BpkButton>
);

export default SendButton;
