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

import BpkPrompt from '../../packages/bpk-component-prompt/src/BpkPrompt';
import BpkPrompts from '../../packages/bpk-component-prompt/src/BpkPrompts';

import {
  CompoundExample,
  DefaultPromptExample,
  DefaultPromptsExample,
  PromptWithClickExample,
  PromptsWithScrollbarExample,
} from './examples';

export default {
  title: 'bpk-component-prompt',
  component: BpkPrompt,
  subcomponents: { BpkPrompts },
};

export const Default = DefaultPromptExample;
export const WithClick = PromptWithClickExample;
export const Prompts = DefaultPromptsExample;
export const PromptsWithScrollbar = PromptsWithScrollbarExample;
export const Compound = CompoundExample;

export const VisualTest = DefaultPromptsExample;
export const VisualTestWithZoom = {
  render: DefaultPromptsExample,
  args: {
    zoomEnabled: true,
  },
};
