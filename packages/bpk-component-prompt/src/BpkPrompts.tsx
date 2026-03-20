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

import BpkPromptItem from '../subcomponents/BpkPromptItem';
import BpkPromptList from '../subcomponents/BpkPromptList';

export type BpkPromptsProps = {
  prompts: Array<{ id: string; text: string }>;
  onPromptClick?: (id: string, promptText: string) => void;
  showVisibleScrollbar?: boolean;
};

/**
 * BpkPrompts — convenience wrapper around BpkPrompt.List + BpkPrompt.Item.
 *
 * Accepts a flat `prompts` array and wires up click handling automatically.
 * For fine-grained control use the compound API instead:
 *
 * @example
 * <BpkPrompt.List onPromptClick={(id, text) => ...}>
 *   {prompts.map(p => <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />)}
 * </BpkPrompt.List>
 *
 * @returns {JSX.Element | null} The rendered prompt list, or null when prompts is empty.
 */
const BpkPrompts = ({
  onPromptClick,
  prompts,
  showVisibleScrollbar = false,
}: BpkPromptsProps) => {
  if (prompts.length === 0) return null;

  return (
    <BpkPromptList
      onPromptClick={onPromptClick}
      showVisibleScrollbar={showVisibleScrollbar}
    >
      {prompts.map(({ id, text }) => (
        <BpkPromptItem key={id} id={id} text={text} />
      ))}
    </BpkPromptList>
  );
};

BpkPrompts.displayName = 'BpkPrompts';

export default BpkPrompts;
