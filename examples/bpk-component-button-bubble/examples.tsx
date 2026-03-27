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

import BpkButtonBubble from '../../packages/bpk-component-button-bubble/src/BpkButtonBubble';
import { cssModules } from '../../packages/bpk-react-utils';

import type { ThumbsButtonType } from '../../packages/bpk-component-thumb-button';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

export const UserBubbleExample = () => (
  <div className={getClassName('bpk-button-bubble-examples')}>
    <BpkButtonBubble type="user">
      What should I do if I booked on the wrong date?
    </BpkButtonBubble>
  </div>
);

export const BotBubbleExample = () => (
  <div className={getClassName('bpk-button-bubble-examples')}>
    <BpkButtonBubble type="bot">
      {"Hey! I'm your car hire assistant. Feel free to ask me anything about renting a car, and I\u0027ll put my thinking cap on."}
    </BpkButtonBubble>
  </div>
);

export const RetryBubbleExample = () => (
  <div className={getClassName('bpk-button-bubble-examples')}>
    <BpkButtonBubble
      type="retry"
      onRetry={() => {}}
      retryLabel="Try again"
    >
      Sorry, I couldn&apos;t connect. Please check your connection.
    </BpkButtonBubble>
  </div>
);

export const SuggestionBubbleExample = () => (
  <div className={getClassName('bpk-button-bubble-examples')}>
    <BpkButtonBubble
      type="suggestion"
      onSuggestionClick={() => {}}
      suggestionAriaLabel="What are the cheapest rental options?"
    >
      What are the cheapest rental options?
    </BpkButtonBubble>
  </div>
);

export const BotBubbleWithFeedbackExample = () => {
  const [selected, setSelected] = useState<ThumbsButtonType | null>(null);

  return (
    <div className={getClassName('bpk-button-bubble-examples')}>
      <BpkButtonBubble
        type="bot"
        showFeedback
        selectedFeedback={selected}
        onFeedbackClick={(type) => setSelected(type)}
      >
        You can modify your booking by calling the car hire company directly or
        using their online portal.
      </BpkButtonBubble>
    </div>
  );
};

export const SequenceExample = () => (
  <div className={getClassName('bpk-button-bubble-examples')}>
    <BpkButtonBubble type="bot" systemPosition="first" animationDelay={0}>
      I can help with that!
    </BpkButtonBubble>
    <BpkButtonBubble type="bot" systemPosition="middle" animationDelay={50}>
      Here are the steps to modify your booking:
    </BpkButtonBubble>
    <BpkButtonBubble type="bot" systemPosition="last" animationDelay={100}>
      {"1. Log in to the website\n2. Find your booking\n3. Select 'Modify'"}
    </BpkButtonBubble>
    <BpkButtonBubble type="user" userPosition="first" animationDelay={200}>
      Thanks, that helped!
    </BpkButtonBubble>
    <BpkButtonBubble type="user" userPosition="last" animationDelay={250}>
      Got it sorted now.
    </BpkButtonBubble>
  </div>
);

export const MixedExample = () => {
  const [selected, setSelected] = useState<ThumbsButtonType | null>(null);

  return (
    <div className={getClassName('bpk-button-bubble-examples')}>
      <BpkButtonBubble type="bot">
        Hey! I&apos;m your car hire assistant. Feel free to ask me anything
        about renting a car, and I&apos;ll put my thinking cap on.
      </BpkButtonBubble>
      <BpkButtonBubble type="user">
        What should I do if I booked on the wrong date?
      </BpkButtonBubble>
      <BpkButtonBubble type="retry" onRetry={() => {}} retryLabel="Try again">
        Sorry, I couldn&apos;t connect. Please check your connection.
      </BpkButtonBubble>
      <BpkButtonBubble
        type="suggestion"
        onSuggestionClick={() => {}}
        suggestionAriaLabel="What are the cheapest rental options?"
      >
        What are the cheapest rental options?
      </BpkButtonBubble>
      <BpkButtonBubble
        type="bot"
        showFeedback
        selectedFeedback={selected}
        onFeedbackClick={(type) => setSelected(type)}
      >
        You can modify your booking by calling the car hire company directly or
        using their online portal.
      </BpkButtonBubble>
      <BpkButtonBubble type="bot" systemPosition="first" animationDelay={0}>
        I can help with that!
      </BpkButtonBubble>
      <BpkButtonBubble type="bot" systemPosition="last" animationDelay={50}>
        Here are the steps to modify your booking.
      </BpkButtonBubble>
      <BpkButtonBubble type="user" userPosition="first" animationDelay={100}>
        Thanks, that helped!
      </BpkButtonBubble>
      <BpkButtonBubble type="user" userPosition="last" animationDelay={150}>
        Got it sorted now.
      </BpkButtonBubble>
    </div>
  );
};
