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

import type { ComponentPropsWithoutRef } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkThinking.module.scss';

const getClassName = cssModules(STYLES);

export type BpkThinkingProps = {
  /**
   * The content to display in the thinking bubble.
   * If not provided, a default "Thinking..." message will be shown.
   */
  content?: string;
  /**
   * The accessibility label for the thinking component.
   * This is required for screen reader support.
   */
  accessibilityLabel: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

const BpkThinking = ({
  accessibilityLabel,
  className,
  content = 'Thinking...',
  ...rest
}: BpkThinkingProps) => {
  const classNames = getClassName('bpk-thinking', className);

  return (
    <div
      className={classNames}
      aria-label={accessibilityLabel}
      data-testid="bpk-thinking"
      {...rest}
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
};

export default BpkThinking;
