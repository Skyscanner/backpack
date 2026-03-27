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

import Ellipsis from './subcomponents/Ellipsis';
import Feedback from './subcomponents/Feedback';
import Header from './subcomponents/Header';
import Root from './subcomponents/Root';
import Summary from './subcomponents/Summary';

import type { BpkAiSummaryNamespace } from './common-types';

/**
 * BpkAiSummary is a composable component for displaying AI-generated summaries.
 *
 * Compose subcomponents to build each state:
 *
 * @example
 * // Loading state
 * <BpkAiSummary.Root>
 *   <BpkAiSummary.Header title="Summarized by AI" />
 *   <BpkAiSummary.Summary>
 *     Comparing your shortlist<BpkAiSummary.Ellipsis />
 *   </BpkAiSummary.Summary>
 * </BpkAiSummary.Root>
 *
 * @example
 * // Success state with feedback
 * <BpkAiSummary.Root>
 *   <BpkAiSummary.Header title="Summarized by AI" />
 *   <BpkAiSummary.Summary>{llmText}</BpkAiSummary.Summary>
 *   <BpkAiSummary.Feedback
 *     feedbackText="Was this helpful?"
 *     thankYouText="Thanks for your feedback!"
 *     onFeedback={(positive) => trackEvent(positive ? 'thumb_up' : 'thumb_down')}
 *   />
 * </BpkAiSummary.Root>
 */
const BpkAiSummary: BpkAiSummaryNamespace = {
  Root,
  Header,
  Summary,
  Ellipsis,
  Feedback,
};

export default BpkAiSummary;
