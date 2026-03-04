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

import BpkChatNotification from '../../packages/bpk-component-chat-notification/src/BpkChatNotification';

const DEFAULT_LABEL = 'Thanks for your feedback!';
const ERROR_LABEL = 'Something went wrong. Please try again.';

export const DefaultExample = () => (
  <BpkChatNotification label={DEFAULT_LABEL} />
);

export const ErrorExample = () => (
  <BpkChatNotification errorLabel={ERROR_LABEL} />
);

export const VisualTestExample = () => (
  <BpkChatNotification label={DEFAULT_LABEL} />
);
