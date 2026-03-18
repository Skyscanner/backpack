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
import type { ComponentProps } from 'react';

import {
  borderRadiusLg,
  corePrimaryDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkChatbotInput, {
  CHATBOT_INPUT_TYPES,
  themeAttributes,
} from '../../packages/bpk-component-chatbot-input';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../packages/bpk-theming';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const LOADING_ARIA_LABEL = 'Loading';
const SEND_ARIA_LABEL = 'Send';
const PLACEHOLDER = 'Ask away';

const sampleSentence =
  'These are sample sentences to test the maximum character limit.';
const targetLength = 501;
const longText = sampleSentence
  .repeat(Math.ceil(targetLength / sampleSentence.length))
  .slice(0, targetLength);

const ChatbotInputWithState = ({
  initialValue = '',
  ...props
}: Partial<ComponentProps<typeof BpkChatbotInput>> & {
  initialValue?: string;
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <BpkChatbotInput
      inputValue={inputValue}
      loadingAriaLabel={LOADING_ARIA_LABEL}
      sendAriaLabel={SEND_ARIA_LABEL}
      placeholder={PLACEHOLDER}
      onInputChange={setInputValue}
      onInputFocus={() => {}}
      onInputBlur={() => {}}
      onSubmit={() => {}}
      {...props}
    />
  );
};

export const ComposerExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.COMPOSER} />
  </div>
);

export const ComposerWithValueExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.COMPOSER}
      initialValue="Your message"
    />
  </div>
);

export const ComposerSendingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.COMPOSER}
      isSending
      initialValue="Your message"
    />
  </div>
);

export const ComposerOver500Example = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.COMPOSER}
      initialValue={longText}
    />
  </div>
);

export const CarsExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS} />
  </div>
);

export const CarsWithValueExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      initialValue="I'd like to hire a car in Edinburgh for the weekend"
    />
  </div>
);

export const CarsPollingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      isPolling
      initialValue={sampleSentence}
    />
  </div>
);

export const CarsSendingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      isSending
      initialValue="Some message"
    />
  </div>
);

export const CarsOver500Example = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      initialValue={longText}
    />
  </div>
);

export const CarsComposerExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER} />
  </div>
);

export const CarsComposerWithValueExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
      initialValue="I'd like to hire a car in Edinburgh for the weekend"
    />
  </div>
);

export const CarsComposerPollingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
      isPolling
      initialValue="I'd like to hire a car in Edinburgh for the weekend"
    />
  </div>
);

export const CarsComposerOver500Example = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
      initialValue={longText}
    />
  </div>
);

export const ThemedExample = () => (
  <div>
    <BpkText
      tagName="p"
      textStyle={TEXT_STYLES.label1}
      className={getClassName(
        'bpk-chatbot-input-examples__section-label',
        'bpk-chatbot-input-examples__section-label--first',
      )}
    >
      With theme override (pill border-radius + navy focus colour)
    </BpkText>
    <BpkThemeProvider
      theme={{
        chatbotInputBorderRadius: borderRadiusLg,
        chatbotInputFocusBorderColor: corePrimaryDay,
      }}
      themeAttributes={themeAttributes}
    >
      <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
        <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
          {CHATBOT_INPUT_TYPES.COMPOSER}
        </BpkText>
        <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.COMPOSER} />
      </div>
      <div className={getClassName('bpk-chatbot-input-examples')}>
        <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
          {CHATBOT_INPUT_TYPES.CARS}
        </BpkText>
        <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS} />
      </div>
      <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
        <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
          {CHATBOT_INPUT_TYPES.CARS_COMPOSER}
        </BpkText>
        <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER} />
      </div>
    </BpkThemeProvider>

    <BpkText
      tagName="p"
      textStyle={TEXT_STYLES.label1}
      className={getClassName('bpk-chatbot-input-examples__section-label')}
    >
      Default theme (no override)
    </BpkText>
    <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
      <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
        {CHATBOT_INPUT_TYPES.COMPOSER}
      </BpkText>
      <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.COMPOSER} />
    </div>
    <div className={getClassName('bpk-chatbot-input-examples')}>
      <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
        {CHATBOT_INPUT_TYPES.CARS}
      </BpkText>
      <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS} />
    </div>
    <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
      <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
        {CHATBOT_INPUT_TYPES.CARS_COMPOSER}
      </BpkText>
      <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER} />
    </div>
  </div>
);

export const MixedExample = () => (
  <div>
    <ComposerExample />
    <ComposerWithValueExample />
    <CarsExample />
    <CarsPollingExample />
    <CarsComposerExample />
    <CarsComposerWithValueExample />
  </div>
);
