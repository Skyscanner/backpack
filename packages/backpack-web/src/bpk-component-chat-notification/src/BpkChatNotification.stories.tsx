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

import { ArgTypes, Markdown } from '@storybook/addon-docs/blocks';

import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import readme from '../README.md';

import BpkChatNotification from './BpkChatNotification';

import type { Meta } from '@storybook/react';

const TEXT = 'Thanks for your feedback!';

const DefaultExample = () => (
  <BpkChatNotification text={TEXT} />
);

const WithIconExample = () => (
  <BpkChatNotification
    text={TEXT}
    icon={TickCircleIcon}
  />
);

const VisualTestExample = () => (
  <BpkChatNotification
    text={TEXT}
    icon={TickCircleIcon}
  />
);

const meta = {
  title: 'bpk-component-chat-notification',
  component: BpkChatNotification,
  parameters: {
    docs: {
      page: () => (
        <>

          <Markdown>{readme}</Markdown>
          <ArgTypes exclude={['zoomEnabled']} />
        </>
      ),
    },
  },
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const WithIcon = {
  render: () => <WithIconExample />,
};

export const VisualTest = {
  render: () => <VisualTestExample />,
};

export const VisualTestWithZoom = {
  render: () => <VisualTestExample />,
  args: {
    zoomEnabled: true,
  },
};
