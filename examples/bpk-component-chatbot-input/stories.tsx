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

import BpkChatbotInput from '../../packages/bpk-component-chatbot-input/src/BpkChatbotInput';

import {
  CarsComposerExample,
  CarsComposerOver500Example,
  CarsComposerWithValueExample,
  CarsComposerPollingExample,
  CarsExample,
  CarsPollingExample,
  CarsOver500Example,
  CarsSendingExample,
  CarsWithValueExample,
  ComposerExample,
  ComposerWithValueExample,
  ComposerSendingExample,
  ComposerOver500Example,
  MixedExample,
  ThemedExample,
} from './examples';

export default {
  title: 'bpk-component-chatbot-input',
  component: BpkChatbotInput,
};

export const Composer = ComposerExample;
export const ComposerWithValue = ComposerWithValueExample;
export const ComposerSending = ComposerSendingExample;
export const ComposerOver500 = ComposerOver500Example;
export const Cars = CarsExample;
export const CarsWithValue = CarsWithValueExample;
export const CarsPolling = CarsPollingExample;
export const CarsSending = CarsSendingExample;
export const CarsOver500 = CarsOver500Example;
export const CarsComposer = CarsComposerExample;
export const CarsComposerWithValue = CarsComposerWithValueExample;
export const CarsComposerOver500 = CarsComposerOver500Example;
export const CarsComposerPolling = CarsComposerPollingExample;
export const Themed = ThemedExample;
export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
