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
  BpkButtonV2,
  BUTTON_TYPES,
  SIZE_TYPES,
} from '../../../bpk-component-button';
import {
  withRtlSupport,
  withButtonAlignment,
} from '../../../bpk-component-icon';
import ArrowRightIcon from '../../../bpk-component-icon/sm/long-arrow-right';
import ArrowUpIcon from '../../../bpk-component-icon/sm/long-arrow-up';
import { CHATBOT_INPUT_TYPES } from '../constants';

import type { ChatbotInputType } from '../constants';

const AlignedArrowRightIcon = withButtonAlignment(
  withRtlSupport(ArrowRightIcon),
);
const AlignedArrowUpIcon = withButtonAlignment(ArrowUpIcon);

export interface SendButtonProps {
  ariaLabel: string;
  inputType?: ChatbotInputType;
  disabled?: boolean;
  onClick: () => void;
}

const SendButton = ({
  ariaLabel,
  disabled = false,
  inputType = CHATBOT_INPUT_TYPES.DEFAULT,
  onClick,
}: SendButtonProps) => {
  const isInputTypeDefault = inputType === CHATBOT_INPUT_TYPES.DEFAULT;
  const buttonType = isInputTypeDefault
    ? BUTTON_TYPES.featured
    : BUTTON_TYPES.primary;
  const Icon = isInputTypeDefault ? AlignedArrowRightIcon : AlignedArrowUpIcon;

  return (
    <BpkButtonV2
      type={buttonType}
      size={SIZE_TYPES.small}
      iconOnly
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid="bpk-chatbot-input-send"
    >
      <Icon />
    </BpkButtonV2>
  );
};

export default SendButton;
