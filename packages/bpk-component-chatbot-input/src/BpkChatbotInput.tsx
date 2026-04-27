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

import BpkChatbotInputInput from './BpkChatbotInputInput';
import BpkChatbotInputRoot from './BpkChatbotInputRoot';
import BpkChatbotInputToolbar from './BpkChatbotInputToolbar';

import type { BpkChatbotInputNamespace } from './common-types';

// BpkChatbotInput is a composable namespace for building chatbot input UIs. It groups the Root
// container, text Input, and action Toolbar sub-components so consumers can assemble them in a
// consistent, accessible layout.
// @example
// <BpkChatbotInput.Root>
// <BpkChatbotInput.Input {...inputProps} />
// <BpkChatbotInput.Toolbar>
// <BpkButton type={BUTTON_TYPES.link}>Attach</BpkButton>
// </BpkChatbotInput.Toolbar>
// </BpkChatbotInput.Root>
const BpkChatbotInput: BpkChatbotInputNamespace = {
  Root: BpkChatbotInputRoot,
  Input: BpkChatbotInputInput,
  Toolbar: BpkChatbotInputToolbar,
};

export default BpkChatbotInput;
