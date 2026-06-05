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

import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  BpkSpacing,
  BpkStack,
  BpkProvider,
} from '../../bpk-component-layout';
import { cssModules } from '../../bpk-react-utils';

import BpkChatBubble from './BpkChatBubble';
import { CHAT_BUBBLE_TYPE, CHAT_BUBBLE_POSITION } from './common-types';

import type { ThumbsButtonType } from '../../bpk-component-thumb-button';
import type { Meta } from '@storybook/react';

import STYLES from './BpkChatBubble.stories.module.scss';

const getClassName = cssModules(STYLES);

const UserBubbleExample = () => (
  <div className={getClassName('bpk-chat-bubble-examples')}>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble type={CHAT_BUBBLE_TYPE.user}>
        Default — all corners large
      </BpkChatBubble>
      <BpkChatBubble
        type={CHAT_BUBBLE_TYPE.user}
        userPosition={CHAT_BUBBLE_POSITION.first}
      >
        First — small corner bottom-right
      </BpkChatBubble>
      <BpkChatBubble
        type={CHAT_BUBBLE_TYPE.user}
        userPosition={CHAT_BUBBLE_POSITION.last}
      >
        Last — small corner top-right
      </BpkChatBubble>
    </BpkStack>
  </div>
);

const BotBubbleExample = () => (
  <div className={getClassName('bpk-chat-bubble-examples')}>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot}>
        Default — all corners large
      </BpkChatBubble>
      <BpkChatBubble
        type={CHAT_BUBBLE_TYPE.bot}
        systemPosition={CHAT_BUBBLE_POSITION.first}
      >
        First — small corner bottom-left
      </BpkChatBubble>
      <BpkChatBubble
        type={CHAT_BUBBLE_TYPE.bot}
        systemPosition={CHAT_BUBBLE_POSITION.middle}
      >
        Middle — small corners top-left and bottom-left
      </BpkChatBubble>
      <BpkChatBubble
        type={CHAT_BUBBLE_TYPE.bot}
        systemPosition={CHAT_BUBBLE_POSITION.last}
      >
        Last — small corner top-left
      </BpkChatBubble>
    </BpkStack>
  </div>
);

const RetryBubbleExample = () => (
  <div className={getClassName('bpk-chat-bubble-examples')}>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble
        type={CHAT_BUBBLE_TYPE.retry}
        onRetry={() => {}}
        retryLabel="Try again"
      >
        Sorry, I couldn&apos;t connect. Please check your connection.
      </BpkChatBubble>
    </BpkStack>
  </div>
);

const ButtonBubbleExample = () => (
  <div className={getClassName('bpk-chat-bubble-examples')}>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble
        type={CHAT_BUBBLE_TYPE.button}
        onSuggestionClick={() => {}}
        >
        What are the cheapest options?
      </BpkChatBubble>
    </BpkStack>
  </div>
);

const BotBubbleWithFeedbackExample = () => {
  const [selected, setSelected] = useState<ThumbsButtonType | null>(null);

  return (
    <div className={getClassName('bpk-chat-bubble-examples')}>
      <BpkStack gap={BpkSpacing.SM}>
        <BpkChatBubble
          type={CHAT_BUBBLE_TYPE.bot}
          showFeedback
          selectedFeedback={selected}
          onFeedbackClick={(type) => setSelected(type)}
        >
          You can modify your booking by calling the car hire company directly or
          using their online portal.
        </BpkChatBubble>
      </BpkStack>
    </div>
  );
};

const SequenceExample = () => (
  <div className={getClassName('bpk-chat-bubble-examples')}>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot} systemPosition={CHAT_BUBBLE_POSITION.first} animationDelay={0}>
        I can help with that!
      </BpkChatBubble>
      <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot} systemPosition={CHAT_BUBBLE_POSITION.middle} animationDelay={50}>
        Here are the steps to modify your booking:
      </BpkChatBubble>
      <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot} systemPosition={CHAT_BUBBLE_POSITION.last} animationDelay={100}>
        {"1. Log in to the website\n2. Find your booking\n3. Select 'Modify'"}
      </BpkChatBubble>
      <BpkChatBubble type={CHAT_BUBBLE_TYPE.user} userPosition={CHAT_BUBBLE_POSITION.first} animationDelay={200}>
        Thanks, that helped!
      </BpkChatBubble>
      <BpkChatBubble type={CHAT_BUBBLE_TYPE.user} userPosition={CHAT_BUBBLE_POSITION.last} animationDelay={250}>
        Got it sorted now.
      </BpkChatBubble>
    </BpkStack>
  </div>
);

const MixedExample = () => {
  const [selected, setSelected] = useState<ThumbsButtonType | null>(null);

  return (
    <div className={getClassName('bpk-chat-bubble-examples')}>
      <BpkStack gap={BpkSpacing.SM}>
        <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot}>
          Hey! I&apos;m your car hire assistant. Feel free to ask me anything
          about renting a car, and I&apos;ll put my thinking cap on.
        </BpkChatBubble>
        <BpkChatBubble type={CHAT_BUBBLE_TYPE.user}>
          What should I do if I booked on the wrong date?
        </BpkChatBubble>
        <BpkChatBubble type={CHAT_BUBBLE_TYPE.retry} onRetry={() => {}} retryLabel="Try again">
          Sorry, I couldn&apos;t connect. Please check your connection.
        </BpkChatBubble>
        <BpkChatBubble
          type={CHAT_BUBBLE_TYPE.button}
          onSuggestionClick={() => {}}
            >
          What are the cheapest options?
        </BpkChatBubble>
        <BpkChatBubble
          type={CHAT_BUBBLE_TYPE.bot}
          showFeedback
          selectedFeedback={selected}
          onFeedbackClick={(type) => setSelected(type)}
        >
          You can modify your booking by calling the car hire company directly or
          using their online portal.
        </BpkChatBubble>
        <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot} systemPosition={CHAT_BUBBLE_POSITION.first} animationDelay={0}>
          I can help with that!
        </BpkChatBubble>
        <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot} systemPosition={CHAT_BUBBLE_POSITION.last} animationDelay={50}>
          Here are the steps to modify your booking.
        </BpkChatBubble>
        <BpkChatBubble type={CHAT_BUBBLE_TYPE.user} userPosition={CHAT_BUBBLE_POSITION.first} animationDelay={100}>
          Thanks, that helped!
        </BpkChatBubble>
        <BpkChatBubble type={CHAT_BUBBLE_TYPE.user} userPosition={CHAT_BUBBLE_POSITION.last} animationDelay={150}>
          Got it sorted now.
        </BpkChatBubble>
      </BpkStack>
    </div>
  );
};

const meta = {
  title: 'bpk-component-chat-bubble',
  component: BpkChatBubble,
  decorators: [(story: () => ReactNode) => <BpkProvider>{story()}</BpkProvider>],
} satisfies Meta;

export default meta;

export const UserBubble = {
  render: () => <UserBubbleExample />,
};

export const BotBubble = {
  render: () => <BotBubbleExample />,
};

export const RetryBubble = {
  render: () => <RetryBubbleExample />,
};

export const ButtonBubble = {
  render: () => <ButtonBubbleExample />,
};

export const BotBubbleWithFeedback = {
  render: () => <BotBubbleWithFeedbackExample />,
};

export const Sequence = {
  render: () => <SequenceExample />,
};

export const Mixed = {
  render: () => <MixedExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
