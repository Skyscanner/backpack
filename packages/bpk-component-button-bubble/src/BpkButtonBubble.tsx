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

import type { CSSProperties, ReactNode } from 'react';

import { iconSizeSm, lineHeightBase } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../bpk-component-button';
import { withAlignment } from '../../bpk-component-icon';
import RedoSmIcon from '../../bpk-component-icon/sm/redo';
import BpkThumbButton from '../../bpk-component-thumb-button';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import type { ThumbsButtonType } from '../../bpk-component-thumb-button';

import STYLES from './BpkButtonBubble.module.scss';

const getClassName = cssModules(STYLES);

const AlignedRedoIcon = withAlignment(RedoSmIcon, lineHeightBase, iconSizeSm);

const clampAndSnap = (ms: number, max = 300): number => {
  const v = Math.min(ms, max);
  return Math.round(v / 50) * 50;
};

export type ButtonBubbleType = 'user' | 'bot' | 'retry' | 'suggestion';
export type BubblePosition = 'first' | 'middle' | 'last';

type BaseBubbleProps = {
  /** Content to render inside the bubble */
  children?: ReactNode;
  /** Position within a sequence of same-sender bubbles, affects border-radius */
  systemPosition?: BubblePosition;
  /** Position within a sequence of user bubbles, affects border-radius */
  userPosition?: BubblePosition;
  /** Animation entrance delay in milliseconds (0–300, snapped to nearest 50ms) */
  animationDelay?: number;
};

export type BpkButtonBubbleProps =
  | (BaseBubbleProps & { type: 'user' })
  | (BaseBubbleProps & {
      type: 'bot';
      /** Show thumbs up/down feedback buttons */
      showFeedback?: boolean;
      /** Currently selected feedback type */
      selectedFeedback?: ThumbsButtonType | null;
      /** Called when a feedback thumb button is clicked */
      onFeedbackClick?: (type: ThumbsButtonType) => void;
    })
  | (BaseBubbleProps & {
      type: 'retry';
      /** Label for the retry button */
      retryLabel: string;
      /** Called when retry button is clicked */
      onRetry?: () => void;
      /** Whether the retry button is disabled */
      retryDisabled?: boolean;
    })
  | (BaseBubbleProps & {
      type: 'suggestion';
      /** Accessibility label for the suggestion button */
      suggestionAriaLabel: string;
      /** Called when the suggestion is clicked */
      onSuggestionClick?: () => void;
    });

const BpkButtonBubble = (props: BpkButtonBubbleProps) => {
  const { animationDelay = 0, children, systemPosition, type, userPosition } =
    props;
  const showFeedback =
    'showFeedback' in props ? (props.showFeedback ?? false) : false;
  const selectedFeedback =
    'selectedFeedback' in props ? (props.selectedFeedback ?? null) : null;
  const onFeedbackClick =
    'onFeedbackClick' in props ? props.onFeedbackClick : undefined;
  const onRetry = 'onRetry' in props ? props.onRetry : undefined;
  const retryDisabled =
    'retryDisabled' in props ? (props.retryDisabled ?? false) : false;
  const retryLabel = 'retryLabel' in props ? props.retryLabel : '';
  const onSuggestionClick =
    'onSuggestionClick' in props ? props.onSuggestionClick : undefined;
  const suggestionAriaLabel =
    'suggestionAriaLabel' in props ? props.suggestionAriaLabel : '';
  const isUser = type === 'user';
  const isSuggestion = type === 'suggestion';
  const isRetry = type === 'retry';
  const isBot = type === 'bot';

  const snapped = clampAndSnap(animationDelay);
  type CustomStyle = CSSProperties & Record<string, string | number>;
  const inlineStyle = { '--anim-delay': `${snapped}ms` } as CustomStyle;

  const containerClassName = getClassName(
    'bpk-button-bubble',
    'bpk-button-bubble--animated',
    isUser && 'bpk-button-bubble--user',
    isBot && 'bpk-button-bubble--bot',
    isRetry && 'bpk-button-bubble--retry',
    isSuggestion && 'bpk-button-bubble--suggestion',
    isUser && userPosition === 'first' && 'bpk-button-bubble--user-first',
    isUser && userPosition === 'middle' && 'bpk-button-bubble--user-middle',
    isUser && userPosition === 'last' && 'bpk-button-bubble--user-last',
    (isBot || isRetry) && systemPosition === 'first' && 'bpk-button-bubble--system-first',
    (isBot || isRetry) && systemPosition === 'middle' && 'bpk-button-bubble--system-middle',
    (isBot || isRetry) && systemPosition === 'last' && 'bpk-button-bubble--system-last',
  );

  if (isSuggestion) {
    return (
      <button
        type="button"
        className={containerClassName}
        style={inlineStyle}
        onClick={onSuggestionClick}
        aria-label={suggestionAriaLabel}
        data-testid="bpk-button-bubble-suggestion"
        {...getDataComponentAttribute('ButtonBubble')}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={containerClassName}
      style={inlineStyle}
      data-testid="bpk-button-bubble"
      {...getDataComponentAttribute('ButtonBubble')}
    >
      <div className={getClassName('bpk-button-bubble__content')}>
        {children}
        {isRetry && onRetry && (
          <div className={getClassName('bpk-button-bubble__retry')}>
            <BpkButton
              type={BUTTON_TYPES.primary}
              size={SIZE_TYPES.small}
              onClick={onRetry}
              disabled={retryDisabled}
            >
              <AlignedRedoIcon />
              {retryLabel}
            </BpkButton>
          </div>
        )}
      </div>
      {showFeedback && isBot && (
        <div className={getClassName('bpk-button-bubble__thumbs')}>
          <BpkThumbButton
            type="up"
            selected={selectedFeedback === 'up'}
            onClick={onFeedbackClick ?? (() => {})}
            accessibilityLabel="Rate as useful"
          />
          <BpkThumbButton
            type="down"
            selected={selectedFeedback === 'down'}
            onClick={onFeedbackClick ?? (() => {})}
            accessibilityLabel="Rate as not useful"
          />
        </div>
      )}
    </div>
  );
};

export default BpkButtonBubble;
