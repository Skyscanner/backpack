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

import { createContext, useContext } from 'react';

import { CHATBOT_INPUT_TYPES } from './common-types';

import type { ChatbotInputType } from './common-types';

type BpkChatbotInputContextValue = {
  inputType: ChatbotInputType;
};

export const BpkChatbotInputContext =
  createContext<BpkChatbotInputContextValue>({
    inputType: CHATBOT_INPUT_TYPES.COMPOSER,
  });

export const useChatbotInputContext = () => useContext(BpkChatbotInputContext);
