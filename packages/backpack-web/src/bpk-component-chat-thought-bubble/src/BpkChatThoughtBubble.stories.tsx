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

import { cssModules } from '../../bpk-react-utils';

import BpkChatThoughtBubble from './BpkChatThoughtBubble';

import type { Meta } from '@storybook/react';

import STYLES from './BpkChatThoughtBubble.stories.module.scss';

const getClassName = cssModules(STYLES);

const DefaultExample = () => (
  <div className={getClassName('bpk-chat-thought-bubble-examples')}>
    <BpkChatThoughtBubble content="AI is thinking" />
  </div>
);

const CustomContentExample = () => (
  <div className={getClassName('bpk-chat-thought-bubble-examples')}>
    <BpkChatThoughtBubble
      content="Processing your request..."
    />
  </div>
);

const LongContentExample = () => (
  <div className={getClassName('bpk-chat-thought-bubble-examples')}>
    <BpkChatThoughtBubble
      content="We're searching through thousands of flight options to find the best deals for your trip"
    />
  </div>
);

const MultipleExample = () => (
  <div className={getClassName('bpk-chat-thought-bubble-examples__multiple')}>
    <BpkChatThoughtBubble content="Analyzing options..." />
    <BpkChatThoughtBubble content="Comparing prices..." />
    <BpkChatThoughtBubble content="Almost done..." />
  </div>
);

const MixedExample = () => (
  <div className={getClassName('bpk-chat-thought-bubble-examples__mixed')}>
    <BpkChatThoughtBubble content="Loading..." />
    <BpkChatThoughtBubble content="Finding the best options for you" />
    <BpkChatThoughtBubble content="We're checking availability across multiple airlines and travel providers to ensure you get the most comprehensive results" />
  </div>
);

const meta = {
  title: 'bpk-component-chat-thought-bubble',
  component: BpkChatThoughtBubble,
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const CustomContent = {
  render: () => <CustomContentExample />,
};

export const LongContent = {
  render: () => <LongContentExample />,
};

export const Multiple = {
  render: () => <MultipleExample />,
};

export const Mixed = {
  render: () => <MixedExample />,
};

export const VisualTest = {
  render: () => <DefaultExample />,
};

export const VisualTestWithZoom = {
  render: () => <DefaultExample />,
  args: {
    zoomEnabled: true,
  },
};
