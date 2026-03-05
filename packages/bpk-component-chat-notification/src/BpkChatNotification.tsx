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

import type { FunctionComponent } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkChatNotification.module.scss';

const getClassName = cssModules(STYLES);

export type BpkChatNotificationProps = {
  /** Text displayed in the notification. */
  text: string;
  /** Optional icon to display before the text. */
  icon?: FunctionComponent<any>;
};

const BpkChatNotification = ({
  icon: Icon,
  text,
}: BpkChatNotificationProps) => (
  <output
    className={getClassName('bpk-chat-notification')}
    aria-atomic="true"
    data-testid="bpk-chat-notification"
    {...getDataComponentAttribute('ChatNotification')}
  >
    {Icon && (
      <span className={getClassName('bpk-chat-notification__icon')}>
        <Icon aria-hidden="true" />
      </span>
    )}
    <BpkText
      tagName="span"
      textStyle={TEXT_STYLES.footnote}
    >
      {text}
    </BpkText>
  </output>
);

export default BpkChatNotification;
