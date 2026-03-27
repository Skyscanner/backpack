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

export type BpkAiSummaryRootProps = {
  /** Content to render inside the AI summary container */
  children: ReactNode;
};

export type BpkAiSummaryHeaderProps = {
  /** Title string displayed next to the AI spark icon. Not translated by Backpack. */
  title: string;
};

export type BpkAiSummarySummaryProps = {
  /** Free-slot content. Backpack enforces no typography or layout inside. */
  children: ReactNode;
};

export type BpkAiSummaryFeedbackProps = {
  /** Text displayed before a vote is cast. e.g. "Was this helpful?" — not translated by Backpack. */
  feedbackText: string;
  /** Text displayed after a vote is cast. e.g. "Thanks for your feedback!" — not translated by Backpack. */
  thankYouText: string;
  /**
   * Called when either thumb button is pressed.
   * `positive` is `true` for thumbs-up, `false` for thumbs-down.
   */
  onFeedback?: (positive: boolean) => void;
};

export type BpkAiSummaryNamespace = {
  Root: { (props: BpkAiSummaryRootProps): ReactNode; displayName?: string };
  Header: { (props: BpkAiSummaryHeaderProps): ReactNode; displayName?: string };
  Summary: { (props: BpkAiSummarySummaryProps): ReactNode; displayName?: string };
  Ellipsis: { (): ReactNode; displayName?: string };
  Feedback: { (props: BpkAiSummaryFeedbackProps): ReactNode; displayName?: string };
};
