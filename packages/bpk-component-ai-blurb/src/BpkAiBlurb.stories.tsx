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

import { BpkBox, BpkProvider, BpkSpacing } from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import BpkAiBlurb from './BpkAiBlurb';

import type { Meta } from '@storybook/react';

const AiResponseExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="aiResponse"
          aiResponseText={
            <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
              <BpkText tagName="span" textStyle={TEXT_STYLES.label3}>The first EasyTerra deal</BpkText> offers the lowest price and better insurance coverage. The second EasyTerra deal has a higher price but offers a more spacious car type.
            </BpkText>
          }
        />
        <BpkAiBlurb.Feedback
          feedbackText="Was this helpful?"
          thankYouText="Thanks for your feedback!"
          thumbsUpLabel="Thumbs up"
          thumbsDownLabel="Thumbs down"
          onFeedback={(positive) =>
            console.log(`Feedback: ${positive ? 'positive' : 'negative'}`)
          }
        />
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

const LoadingExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="thinking"
          thinkingText="Comparing your shortlist"
        />
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

const ErrorGeneralExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="error"
          errorText="Couldn't load your summary."
          errorLinkText="Retry"
          onErrorClick={() => {}}
        />
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

const ErrorRefreshLimitExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="error"
          errorText="You've reached the refresh limit. Please come back later."
          errorLinkText="Retry"
          onErrorClick={() => {}}
        />
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

const meta = {
  title: 'bpk-component-ai-blurb',
  component: BpkAiBlurb.Root,
} satisfies Meta;

export default meta;

export const AiResponse = {
  render: () => <AiResponseExample />,
};

export const Loading = {
  render: () => <LoadingExample />,
};

export const ErrorGeneral = {
  render: () => <ErrorGeneralExample />,
};

export const ErrorRefreshLimit = {
  render: () => <ErrorRefreshLimitExample />,
};

export const VisualTest = {
  render: () => <AiResponseExample />,
};

export const VisualTestWithZoom = {
  render: () => <AiResponseExample />,
  args: {
    zoomEnabled: true,
  },
};
