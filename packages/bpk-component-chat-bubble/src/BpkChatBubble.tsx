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

import STYLES from './BpkChatBubble.module.scss';

const getClassName = cssModules(STYLES);

const AlignedRedoIcon = withAlignment(RedoSmIcon, lineHeightBase, iconSizeSm);

const clampAndSnap = (ms: number, max = 300): number => {
  const v = Math.min(ms, max);
  return Math.round(v / 50) * 50;
};

export type ChatBubbleType = 'user' | 'bot' | 'retry' | 'button';
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

export type BpkChatBubbleProps =
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
      type: 'button';
      /** Accessibility label for the suggestion button */
      suggestionAriaLabel: string;
      /** Called when the suggestion is clicked */
      onSuggestionClick?: () => void;
    });

const BpkChatBubble = (props: BpkChatBubbleProps) => {
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
  const isSuggestion = type === 'button';
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
    isSuggestion && 'bpk-chat-bubble--button',
    isUser && userPosition === 'first' && 'bpk-chat-bubble--user-first',
    isUser && userPosition === 'middle' && 'bpk-chat-bubble--user-middle',
    isUser && userPosition === 'last' && 'bpk-chat-bubble--user-last',
    (isBot || isRetry) && systemPosition === 'first' && 'bpk-chat-bubble--system-first',
    (isBot || isRetry) && systemPosition === 'middle' && 'bpk-chat-bubble--system-middle',
    (isBot || isRetry) && systemPosition === 'last' && 'bpk-chat-bubble--system-last',
  );

  if (isSuggestion) {
    return (
      <button
        type="button"
        className={containerClassName}
        style={inlineStyle}
        onClick={onSuggestionClick}
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
