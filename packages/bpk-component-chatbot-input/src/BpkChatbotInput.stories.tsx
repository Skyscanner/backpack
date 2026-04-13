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

import BpkButton, { BUTTON_TYPES } from '../../bpk-component-button';
import SmallFilterIcon from '../../bpk-component-icon/sm/filter';
import SmallPlusIcon from '../../bpk-component-icon/sm/plus';
import SmallSettingsIcon from '../../bpk-component-icon/sm/settings';
import { BpkProvider } from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import BpkVisuallyHidden from '../../bpk-component-visually-hidden';
import { cssModules } from '../../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../bpk-theming';

import BpkChatbotInput from './BpkChatbotInput';
import { CHATBOT_INPUT_TYPES } from './common-types';
import themeAttributes from './themeAttributes';

import type { Meta } from '@storybook/react';

import STYLES from './BpkChatbotInput.stories.module.scss';

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
  inputType,
  ...props
}: Partial<ComponentProps<typeof BpkChatbotInput.Input>> & {
  initialValue?: string;
  inputType?: ComponentProps<typeof BpkChatbotInput.Root>['inputType'];
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <BpkChatbotInput.Root inputType={inputType}>
      <BpkChatbotInput.Input
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
    </BpkChatbotInput.Root>
  );
};

const ComposerExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.COMPOSER} />
  </div>
);

const ComposerWithValueExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.COMPOSER}
      initialValue="Your message"
    />
  </div>
);

const ComposerSendingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.COMPOSER}
      isSending
      initialValue="Your message"
    />
  </div>
);

const ComposerOver500Example = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.COMPOSER}
      initialValue={longText}
    />
  </div>
);

const CarsExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS} />
  </div>
);

const CarsWithValueExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      initialValue="I'd like to hire a car in Edinburgh for the weekend"
    />
  </div>
);

const CarsPollingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      isPolling
      initialValue={sampleSentence}
    />
  </div>
);

const CarsSendingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      isSending
      initialValue="Some message"
    />
  </div>
);

const CarsOver500Example = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS}
      initialValue={longText}
    />
  </div>
);

const CarsComposerExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER} />
  </div>
);

const CarsComposerWithValueExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
      initialValue="I'd like to hire a car in Edinburgh for the weekend"
    />
  </div>
);

const CarsComposerPollingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
      isPolling
      initialValue="I'd like to hire a car in Edinburgh for the weekend"
    />
  </div>
);

const CarsComposerOver500Example = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
      initialValue={longText}
    />
  </div>
);

const ThemedExample = () => (
  <div>
    <div className={getClassName('bpk-chatbot-input-examples__section-label')}>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
        With theme override (pill border-radius + navy focus colour)
      </BpkText>
    </div>
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

    <div className={getClassName('bpk-chatbot-input-examples__section-label')}>
      <BpkText tagName="p" textStyle={TEXT_STYLES.label1}>
        Default theme (no override)
      </BpkText>
    </div>
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

const MixedExample = () => (
  <div>
    <ComposerExample />
    <ComposerWithValueExample />
    <CarsExample />
    <CarsPollingExample />
    <CarsComposerExample />
    <CarsComposerWithValueExample />
  </div>
);

const WithToolbarExample = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
      <BpkChatbotInput.Root>
        <BpkChatbotInput.Input
          inputValue={inputValue}
          loadingAriaLabel={LOADING_ARIA_LABEL}
          sendAriaLabel={SEND_ARIA_LABEL}
          placeholder={PLACEHOLDER}
          onInputChange={setInputValue}
          onInputFocus={() => {}}
          onInputBlur={() => {}}
          onSubmit={() => {}}
        />
        <BpkChatbotInput.Toolbar>
          <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={() => {}}>
            <SmallPlusIcon />
            <BpkVisuallyHidden>Add</BpkVisuallyHidden>
          </BpkButton>
          <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={() => {}}>
            <SmallFilterIcon />
            <BpkVisuallyHidden>Filter</BpkVisuallyHidden>
          </BpkButton>
          <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={() => {}}>
            <SmallSettingsIcon />
            <BpkVisuallyHidden>Settings</BpkVisuallyHidden>
          </BpkButton>
        </BpkChatbotInput.Toolbar>
      </BpkChatbotInput.Root>
    </div>
  );
};

const meta = {
  title: 'bpk-component-chatbot-input',
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
} satisfies Meta;

export default meta;

export const Composer = {
  render: () => <ComposerExample />,
};

export const ComposerWithValue = {
  render: () => <ComposerWithValueExample />,
};

export const ComposerSending = {
  render: () => <ComposerSendingExample />,
};

export const ComposerOver500 = {
  render: () => <ComposerOver500Example />,
};

export const Cars = {
  render: () => <CarsExample />,
};

export const CarsWithValue = {
  render: () => <CarsWithValueExample />,
};

export const CarsPolling = {
  render: () => <CarsPollingExample />,
};

export const CarsSending = {
  render: () => <CarsSendingExample />,
};

export const CarsOver500 = {
  render: () => <CarsOver500Example />,
};

export const CarsComposer = {
  render: () => <CarsComposerExample />,
};

export const CarsComposerWithValue = {
  render: () => <CarsComposerWithValueExample />,
};

export const CarsComposerOver500 = {
  render: () => <CarsComposerOver500Example />,
};

export const CarsComposerPolling = {
  render: () => <CarsComposerPollingExample />,
};

export const Themed = {
  render: () => <ThemedExample />,
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

export const WithToolbar = {
  render: () => <WithToolbarExample />,
};
