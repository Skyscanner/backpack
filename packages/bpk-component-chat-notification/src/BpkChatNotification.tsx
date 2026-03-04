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

import { withButtonAlignment } from '../../bpk-component-icon';
import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkChatNotification.module.scss';

const getClassName = cssModules(STYLES);
const AlignedTickCircleIcon = withButtonAlignment(TickCircleIcon);

type SuccessProps = {
  /** Text displayed in the success state. */
  label: string;
  errorLabel?: never;
};

type ErrorProps = {
  /** Text displayed in the error state. */
  errorLabel: string;
  label?: never;
};

export type BpkChatNotificationProps = SuccessProps | ErrorProps;

const BpkChatNotification = ({
  errorLabel,
  label,
}: BpkChatNotificationProps) => (
  <output
    className={getClassName('bpk-chat-notification')}
    aria-atomic="true"
    data-testid="bpk-chat-notification"
    {...getDataComponentAttribute('ChatNotification')}
  >
    {!errorLabel && (
      <span className={getClassName('bpk-chat-notification__icon')}>
        <AlignedTickCircleIcon aria-hidden="true" />
      </span>
    )}
    <BpkText
      tagName="span"
      textStyle={TEXT_STYLES.footnote}
    >
      {errorLabel ?? label}
    </BpkText>
  </output>
);

export default BpkChatNotification;
