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

import { cssModules } from '../../bpk-react-utils';

import { useBpkPromptContext } from './BpkPromptContext';
import BpkPromptRoot from './BpkPromptRoot';

import STYLES from './BpkPromptList.module.scss';

const getClassName = cssModules(STYLES);

export type BpkPromptItemProps = {
  id: string;
  text: string;
};

const BpkPromptItem = ({ id, text }: BpkPromptItemProps) => {
  const { onPromptClick } = useBpkPromptContext();

  return (
    <li key={`bpk-prompt-${id}`} className={getClassName('bpk-prompt-list__item')}>
      <BpkPromptRoot
        promptText={text}
        onClick={(promptText) => onPromptClick?.(id, promptText)}
      />
    </li>
  );
};

BpkPromptItem.displayName = 'BpkPrompt.Item';

export default BpkPromptItem;
