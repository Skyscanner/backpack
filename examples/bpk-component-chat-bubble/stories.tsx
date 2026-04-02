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

import BpkChatBubble from '../../packages/bpk-component-chat-bubble/src/BpkChatBubble';
import { BpkProvider } from '../../packages/bpk-component-layout';

import {
  BotBubbleExample,
  BotBubbleWithFeedbackExample,
  MixedExample,
  RetryBubbleExample,
  SequenceExample,
  ButtonBubbleExample,
  UserBubbleExample,
} from './examples';

export default {
  title: 'bpk-component-chat-bubble',
  component: BpkChatBubble,
  decorators: [(story: () => ReactNode) => <BpkProvider>{story()}</BpkProvider>],
};

export const UserBubble = UserBubbleExample;
export const BotBubble = BotBubbleExample;
export const RetryBubble = RetryBubbleExample;
export const ButtonBubble = ButtonBubbleExample;
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
