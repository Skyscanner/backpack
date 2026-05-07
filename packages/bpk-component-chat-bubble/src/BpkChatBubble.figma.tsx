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

import figma from '@figma/code-connect';

import BpkChatBubble from './BpkChatBubble';
import { CHAT_BUBBLE_TYPE, CHAT_BUBBLE_POSITION } from './common-types';

figma.connect(
  BpkChatBubble,
  'https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=14703%3A2848',
  {
    props: {
      type: figma.enum('Type', {
        System: CHAT_BUBBLE_TYPE.bot,
        User: CHAT_BUBBLE_TYPE.user,
      }),
      position: figma.enum('State', {
        Top: CHAT_BUBBLE_POSITION.first,
        Middle: CHAT_BUBBLE_POSITION.middle,
        Bottom: CHAT_BUBBLE_POSITION.last,
      }),
      content: figma.textContent('chat text'),
    },
    example: ({ content, position, type }) => (
      <BpkChatBubble type={type} systemPosition={position}>
        {content}
      </BpkChatBubble>
    ),
  },
);
