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

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkThinking.module.scss';

const getClassName = cssModules(STYLES);

export const THINKING_TYPES = {
  default: 'default',
  onDark: 'on-dark',
} as const;

export type ThinkingType = (typeof THINKING_TYPES)[keyof typeof THINKING_TYPES];

export type BpkThinkingProps = {
  /**
   * The content to display in the thinking bubble.
   */
  content: string;
  /**
   * The visual style of the thinking component.
   * - default: Dark bubble with light text (for use on light backgrounds)
   * - onDark: Light bubble with dark text (for use on dark backgrounds)
   */
  type?: ThinkingType;
};

const BpkThinking = ({
  content,
  type = THINKING_TYPES.default,
}: BpkThinkingProps) => (
    <div
      className={getClassName('bpk-thinking', `bpk-thinking--${type}`)}
      data-testid="bpk-thinking"
    >
      <div className={getClassName('bpk-thinking__dots')} aria-hidden="true">
        <div
          className={getClassName(
            'bpk-thinking__dots--dot',
            'bpk-thinking__dots--dot-first',
          )}
        />
        <div
          className={getClassName(
            'bpk-thinking__dots--dot',
            'bpk-thinking__dots--dot-second',
          )}
        />
      </div>
      <div className={getClassName('bpk-thinking__bubble')}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>{content}</BpkText>
      </div>
    </div>
);

export default BpkThinking;
