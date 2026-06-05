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

import type { CSSProperties } from 'react';

import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../bpk-component-button';
import RedoSmIcon from '../../bpk-component-icon/sm/redo';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import BpkThumbButton from '../../bpk-component-thumb-button';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { CHAT_BUBBLE_TYPE } from './common-types';

import type { BpkChatBubbleProps } from './common-types';

import STYLES from './BpkChatBubble.module.scss';

const getClassName = cssModules(STYLES);

const clampAndSnap = (ms: number, maxDelay = 300): number => {
  const v = Math.min(ms, maxDelay);
  return Math.round(v / 50) * 50;
};

const BpkChatBubble = (props: BpkChatBubbleProps) => {
  const { animationDelay = 0, children, type } = props;
  const userPosition = 'userPosition' in props ? props.userPosition : undefined;
  const systemPosition =
    'systemPosition' in props ? props.systemPosition : undefined;
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
  const thumbsUpLabel =
    'thumbsUpLabel' in props ? (props.thumbsUpLabel ?? 'Rate as useful') : 'Rate as useful';
  const thumbsDownLabel =
    'thumbsDownLabel' in props ? (props.thumbsDownLabel ?? 'Rate as not useful') : 'Rate as not useful';
  const isUser = type === CHAT_BUBBLE_TYPE.user;
  const isSuggestion = type === CHAT_BUBBLE_TYPE.button;
  const isRetry = type === CHAT_BUBBLE_TYPE.retry;
  const isBot = type === CHAT_BUBBLE_TYPE.bot;
  const isSystem = isBot || isRetry;

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
    isSystem && systemPosition === 'first' && 'bpk-chat-bubble--system-first',
    isSystem && systemPosition === 'middle' && 'bpk-chat-bubble--system-middle',
    isSystem && systemPosition === 'last' && 'bpk-chat-bubble--system-last',
  );

  if (isSuggestion) {
    return (
      <button
        type="button"
        className={containerClassName}
        style={inlineStyle}
        onClick={onSuggestionClick}
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
              leadingIcon={<RedoSmIcon />}
            >
              <BpkText textStyle={TEXT_STYLES.label1}>{retryLabel}</BpkText>
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
            accessibilityLabel={thumbsUpLabel}
          />
          <BpkThumbButton
            type="down"
            selected={selectedFeedback === 'down'}
            onClick={onFeedbackClick ?? (() => {})}
            accessibilityLabel={thumbsDownLabel}
          />
        </div>
      )}
    </div>
  );
};

export default BpkChatBubble;
