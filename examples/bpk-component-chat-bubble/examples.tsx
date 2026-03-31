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

import BpkChatBubble from '../../packages/bpk-component-chat-bubble/src/BpkChatBubble';
import {
  BpkBox,
  BpkSpacing,
  BpkStack,
} from '../../packages/bpk-component-layout';

import type { ThumbsButtonType } from '../../packages/bpk-component-thumb-button';

export const UserBubbleExample = () => (
  <BpkBox padding={BpkSpacing.Base} background="canvasContrastDay">
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble type="user">
        What should I do if I booked on the wrong date?
      </BpkChatBubble>
    </BpkStack>
  </BpkBox>
);

export const BotBubbleExample = () => (
  <BpkBox padding={BpkSpacing.Base} background="canvasContrastDay">
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble type="bot">
        Hey! I&apos;m your car hire assistant. Feel free to ask me anything
        about renting a car, and I&apos;ll put my thinking cap on.
      </BpkChatBubble>
    </BpkStack>
  </BpkBox>
);

export const RetryBubbleExample = () => (
  <BpkBox padding={BpkSpacing.Base} background="canvasContrastDay">
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble
        type="retry"
        onRetry={() => {}}
        retryLabel="Try again"
      >
        Sorry, I couldn&apos;t connect. Please check your connection.
      </BpkChatBubble>
    </BpkStack>
  </BpkBox>
);

export const ButtonBubbleExample = () => (
  <BpkBox padding={BpkSpacing.Base} background="canvasContrastDay">
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble
        type="button"
        onSuggestionClick={() => {}}
        suggestionAriaLabel="What are the cheapest rental options?"
      >
        What are the cheapest rental options?
      </BpkChatBubble>
    </BpkStack>
  </BpkBox>
);

export const BotBubbleWithFeedbackExample = () => {
  const [selected, setSelected] = useState<ThumbsButtonType | null>(null);

  return (
    <BpkBox padding={BpkSpacing.Base} background="canvasContrastDay">
      <BpkStack gap={BpkSpacing.SM}>
        <BpkChatBubble
          type="bot"
          showFeedback
          selectedFeedback={selected}
          onFeedbackClick={(type) => setSelected(type)}
        >
          You can modify your booking by calling the car hire company directly or
          using their online portal.
        </BpkChatBubble>
      </BpkStack>
    </BpkBox>
  );
};

export const SequenceExample = () => (
  <BpkBox padding={BpkSpacing.Base} background="canvasContrastDay">
    <BpkStack gap={BpkSpacing.SM}>
      <BpkChatBubble type="bot" systemPosition="first" animationDelay={0}>
        I can help with that!
      </BpkChatBubble>
      <BpkChatBubble type="bot" systemPosition="middle" animationDelay={50}>
        Here are the steps to modify your booking:
      </BpkChatBubble>
      <BpkChatBubble type="bot" systemPosition="last" animationDelay={100}>
        {"1. Log in to the website\n2. Find your booking\n3. Select 'Modify'"}
      </BpkChatBubble>
      <BpkChatBubble type="user" userPosition="first" animationDelay={200}>
        Thanks, that helped!
      </BpkChatBubble>
      <BpkChatBubble type="user" userPosition="last" animationDelay={250}>
        Got it sorted now.
      </BpkChatBubble>
    </BpkStack>
  </BpkBox>
);

export const MixedExample = () => {
  const [selected, setSelected] = useState<ThumbsButtonType | null>(null);

  return (
    <BpkBox padding={BpkSpacing.Base} background="canvasContrastDay">
      <BpkStack gap={BpkSpacing.SM}>
        <BpkChatBubble type="bot">
          Hey! I&apos;m your car hire assistant. Feel free to ask me anything
          about renting a car, and I&apos;ll put my thinking cap on.
        </BpkChatBubble>
        <BpkChatBubble type="user">
          What should I do if I booked on the wrong date?
        </BpkChatBubble>
        <BpkChatBubble type="retry" onRetry={() => {}} retryLabel="Try again">
          Sorry, I couldn&apos;t connect. Please check your connection.
        </BpkChatBubble>
        <BpkChatBubble
          type="button"
          onSuggestionClick={() => {}}
          suggestionAriaLabel="What are the cheapest rental options?"
        >
          What are the cheapest rental options?
        </BpkChatBubble>
        <BpkChatBubble
          type="bot"
          showFeedback
          selectedFeedback={selected}
          onFeedbackClick={(type) => setSelected(type)}
        >
          You can modify your booking by calling the car hire company directly or
          using their online portal.
        </BpkChatBubble>
        <BpkChatBubble type="bot" systemPosition="first" animationDelay={0}>
          I can help with that!
        </BpkChatBubble>
        <BpkChatBubble type="bot" systemPosition="last" animationDelay={50}>
          Here are the steps to modify your booking.
        </BpkChatBubble>
        <BpkChatBubble type="user" userPosition="first" animationDelay={100}>
          Thanks, that helped!
        </BpkChatBubble>
        <BpkChatBubble type="user" userPosition="last" animationDelay={150}>
          Got it sorted now.
        </BpkChatBubble>
      </BpkStack>
    </BpkBox>
  );
};
