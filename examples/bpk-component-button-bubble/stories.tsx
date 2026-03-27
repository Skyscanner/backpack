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

import BpkButtonBubble from '../../packages/bpk-component-button-bubble/src/BpkButtonBubble';

import {
  BotBubbleExample,
  BotBubbleWithFeedbackExample,
  MixedExample,
  RetryBubbleExample,
  SequenceExample,
  SuggestionBubbleExample,
  UserBubbleExample,
} from './examples';

export default {
  title: 'bpk-component-button-bubble',
  component: BpkButtonBubble,
};

export const UserBubble = UserBubbleExample;
export const BotBubble = BotBubbleExample;
export const RetryBubble = RetryBubbleExample;
export const SuggestionBubble = SuggestionBubbleExample;
export const BotBubbleWithFeedback = BotBubbleWithFeedbackExample;
export const Sequence = SequenceExample;
export const Mixed = MixedExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: MixedExample,
  args: {
    zoomEnabled: true,
  },
};
