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

export type BpkAiBlurbRootProps = {
  /** Content to render inside the AI summary container */
  children: ReactNode;
};

export type BpkAiBlurbHeaderProps = {
  /** Title string displayed next to the AI spark icon. Not translated by Backpack. */
  title: string;
};

export type BpkAiBlurbSummaryProps =
  | {
      /** Controls which content is displayed. */
      state: 'aiResponse';
      /** AI response content. Consumer controls formatting. */
      aiResponseText: ReactNode;
    }
  | {
      /** Controls which content is displayed. */
      state: 'thinking';
      /** Text displayed followed by an animated ellipsis. */
      thinkingText: string;
    }
  | {
      /** Controls which content is displayed. */
      state: 'error';
      /** Text displayed before the error action. */
      errorText: string;
      /** Text for the inline error action. */
      errorLinkText: string;
      /** Called when the inline error action is clicked (e.g. to retry). */
      onErrorClick: () => void;
    };

export type BpkAiBlurbFeedbackProps = {
  /** Text displayed before a vote is cast. e.g. "Was this helpful?" — not translated by Backpack. */
  feedbackText: string;
  /** Text displayed after a vote is cast. e.g. "Thanks for your feedback!" — not translated by Backpack. */
  thankYouText: string;
  /** Accessible label for the thumbs-up button. Not translated by Backpack. */
  thumbsUpLabel: string;
  /** Accessible label for the thumbs-down button. Not translated by Backpack. */
  thumbsDownLabel: string;
  /**
   * Called when either thumb button is pressed.
   * `positive` is `true` for thumbs-up, `false` for thumbs-down.
   */
  onFeedback?: (positive: boolean) => void;
};

export type BpkAiBlurbNamespace = {
  Root: { (props: BpkAiBlurbRootProps): ReactNode; displayName?: string };
  Header: { (props: BpkAiBlurbHeaderProps): ReactNode; displayName?: string };
  Summary: { (props: BpkAiBlurbSummaryProps): ReactNode; displayName?: string };
  Ellipsis: { (): ReactNode; displayName?: string };
  Feedback: { (props: BpkAiBlurbFeedbackProps): ReactNode; displayName?: string };
};
