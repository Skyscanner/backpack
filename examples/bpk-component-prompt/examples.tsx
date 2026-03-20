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

const defaultPrompts = [
  {
    id: 'first',
    text: 'I need a small automatic car for 2 people with unlimited mileage',
  },
  { id: 'second', text: 'What insurance do I need?' },
  { id: 'third', text: 'Do I need to pay a deposit?' },
];

export const DefaultPromptExample = () => (
  <BpkPrompt.Root promptText="What insurance do I need?" />
);

export const PromptWithClickExample = () => (
  <BpkPrompt.Root
    promptText="What insurance do I need?"
    onClick={(text) => {
      // eslint-disable-next-line no-console
      console.log('Prompt clicked:', text);
    }}
  />
);

export const DefaultPromptsExample = () => (
  <BpkPrompts
    prompts={defaultPrompts}
    onPromptClick={(id, text) => {
      // eslint-disable-next-line no-console
      console.log('Prompt clicked:', id, text);
    }}
  />
);

export const PromptsWithScrollbarExample = () => (
  <BpkPrompts prompts={defaultPrompts} showVisibleScrollbar />
);

export const CompoundExample = () => (
  <BpkPrompt.List
    onPromptClick={(id, text) => {
      // eslint-disable-next-line no-console
      console.log('Prompt clicked:', id, text);
    }}
  >
    {defaultPrompts.map((p) => (
      <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />
    ))}
  </BpkPrompt.List>
);
