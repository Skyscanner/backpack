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

import type { ReactNode } from 'react';

import type { ThumbsButtonType } from '../../bpk-component-thumb-button';

export const CHAT_BUBBLE_TYPE = {
  user: 'user',
  bot: 'bot',
  retry: 'retry',
  button: 'button',
} as const;

export const CHAT_BUBBLE_POSITION = {
  first: 'first',
  middle: 'middle',
  last: 'last',
} as const;

export type ChatBubbleType =
  (typeof CHAT_BUBBLE_TYPE)[keyof typeof CHAT_BUBBLE_TYPE];

export type BubblePosition =
  (typeof CHAT_BUBBLE_POSITION)[keyof typeof CHAT_BUBBLE_POSITION];

type BaseBubbleProps = {
  /** Content to render inside the bubble */
  children?: ReactNode;
  /** Animation entrance delay in milliseconds (0–300, snapped to nearest 50ms) */
  animationDelay?: number;
};

export type BpkChatBubbleProps =
  | (BaseBubbleProps & {
      type: 'user';
      /** Position within a sequence of user bubbles, affects border-radius */
      userPosition?: BubblePosition;
    })
  | (BaseBubbleProps & {
      type: 'bot';
      /** Position within a sequence of same-sender bubbles, affects border-radius */
      systemPosition?: BubblePosition;
      /** Show thumbs up/down feedback buttons */
      showFeedback?: boolean;
      /** Currently selected feedback type */
      selectedFeedback?: ThumbsButtonType | null;
      /** Called when a feedback thumb button is clicked */
      onFeedbackClick?: (type: ThumbsButtonType) => void;
      /** Accessibility label for the thumbs up button (defaults to "Rate as useful") */
      thumbsUpLabel?: string;
      /** Accessibility label for the thumbs down button (defaults to "Rate as not useful") */
      thumbsDownLabel?: string;
    })
  | (BaseBubbleProps & {
      type: 'retry';
      /** Position within a sequence of same-sender bubbles, affects border-radius */
      systemPosition?: BubblePosition;
      /** Label for the retry button */
      retryLabel: string;
      /** Called when retry button is clicked */
      onRetry?: () => void;
      /** Whether the retry button is disabled */
      retryDisabled?: boolean;
    })
  | (BaseBubbleProps & {
      type: 'button';
      /** Called when the suggestion is clicked */
      onSuggestionClick?: () => void;
    });
