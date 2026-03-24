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

import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';

import BpkThumbButton from '../../bpk-component-thumb-button';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import type { ThumbsButtonType } from '../../bpk-component-thumb-button';

import STYLES from './BpkChatBubble.module.scss';

const getClassName = cssModules(STYLES);

const clampAndSnap = (ms: number, max = 300): number => {
  const v = Math.min(ms, max);
  return Math.round(v / 50) * 50;
};

export type ChatBubbleType = 'user' | 'bot' | 'retry' | 'suggestion';
export type BubblePosition = 'first' | 'middle' | 'last';

export type BpkChatBubbleProps = {
  /** The type of bubble determines visual style and alignment */
  type: ChatBubbleType;
  /** Content to render inside the bubble */
  children?: ReactNode;
  /** Position within a sequence of same-sender bubbles, affects border-radius */
  systemPosition?: BubblePosition;
  /** Position within a sequence of user bubbles, affects border-radius */
  userPosition?: BubblePosition;
  /** Show thumbs up/down feedback buttons (bot bubbles only) */
  showFeedback?: boolean;
  /** Currently selected feedback type */
  selectedFeedback?: ThumbsButtonType | null;
  /** Called when a feedback thumb button is clicked */
  onFeedbackClick?: (type: ThumbsButtonType) => void;
  /** Called when retry button is clicked (retry bubbles only) */
  onRetry?: () => void;
  /** Whether the retry button is disabled */
  retryDisabled?: boolean;
  /** Label for the retry button */
  retryLabel?: string;
  /** Called when a suggestion bubble is clicked */
  onSuggestionClick?: () => void;
  /** Accessibility label for suggestion button */
  suggestionAriaLabel?: string;
  /** Animation entrance delay in milliseconds (0–300, snapped to nearest 50ms) */
  animationDelay?: number;
};

const BpkChatBubble = ({
  animationDelay = 0,
  children,
  onFeedbackClick,
  onRetry,
  onSuggestionClick,
  retryDisabled = false,
  retryLabel,
  selectedFeedback = null,
  showFeedback = false,
  suggestionAriaLabel,
  systemPosition,
  type,
  userPosition,
}: BpkChatBubbleProps) => {
  const isUser = type === 'user';
  const isSuggestion = type === 'suggestion';
  const isRetry = type === 'retry';
  const isBot = type === 'bot';

  const snapped = clampAndSnap(animationDelay);
  type CustomStyle = CSSProperties & Record<string, string | number>;
  const inlineStyle = { '--anim-delay': `${snapped}ms` } as CustomStyle;

  const containerClassName = getClassName(
    'bpk-chat-bubble',
    'bpk-chat-bubble--animated',
    isUser && 'bpk-chat-bubble--user',
    isBot && 'bpk-chat-bubble--bot',
    isRetry && 'bpk-chat-bubble--retry',
    isSuggestion && 'bpk-chat-bubble--suggestion',
    isUser && userPosition === 'first' && 'bpk-chat-bubble--user-first',
    isUser && userPosition === 'middle' && 'bpk-chat-bubble--user-middle',
    isUser && userPosition === 'last' && 'bpk-chat-bubble--user-last',
    isBot && systemPosition === 'first' && 'bpk-chat-bubble--system-first',
    isBot && systemPosition === 'middle' && 'bpk-chat-bubble--system-middle',
    isBot && systemPosition === 'last' && 'bpk-chat-bubble--system-last',
  );

  const handleSuggestionKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSuggestionClick?.();
    }
  };

  if (isSuggestion) {
    return (
      <button
        type="button"
        className={containerClassName}
        style={inlineStyle}
        onClick={onSuggestionClick}
        onKeyDown={handleSuggestionKeyDown}
        aria-label={suggestionAriaLabel}
        data-testid="bpk-chat-bubble-suggestion"
        {...getDataComponentAttribute('ChatBubble')}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={containerClassName}
      style={inlineStyle}
      data-testid="bpk-chat-bubble"
      {...getDataComponentAttribute('ChatBubble')}
    >
      <div className={getClassName('bpk-chat-bubble__content')}>
        {children}
        {isRetry && onRetry && (
          <div className={getClassName('bpk-chat-bubble__retry')}>
            <button
              type="button"
              className={getClassName('bpk-chat-bubble__retry-button')}
              onClick={onRetry}
              disabled={retryDisabled}
            >
              {retryLabel}
            </button>
          </div>
        )}
      </div>
      {showFeedback && isBot && (
        <div className={getClassName('bpk-chat-bubble__thumbs')}>
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

export default BpkChatBubble;
