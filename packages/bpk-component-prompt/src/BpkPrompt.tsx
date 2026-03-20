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
import BpkPromptRoot from '../subcomponents/BpkPromptRoot';

export type { BpkPromptRootProps } from '../subcomponents/BpkPromptRoot';
export type { BpkPromptListProps } from '../subcomponents/BpkPromptList';
export type { BpkPromptItemProps } from '../subcomponents/BpkPromptItem';

/**
 * BpkPrompt — compound component following the Ark UI namespace pattern.
 *
 * @example
 * // Compound usage (recommended)
 * <BpkPrompt.List onPromptClick={(id, text) => ...}>
 *   {prompts.map(p => <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />)}
 * </BpkPrompt.List>
 *
 * // Standalone card
 * <BpkPrompt.Root promptText="What insurance do I need?" onClick={...} />
 */
const BpkPrompt = {
  Root: BpkPromptRoot,
  List: BpkPromptList,
  Item: BpkPromptItem,
};

export default BpkPrompt;
