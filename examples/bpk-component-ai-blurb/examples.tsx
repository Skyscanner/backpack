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

import BpkAiBlurb from '../../packages/bpk-component-ai-blurb/src/BpkAiBlurb';
import { BpkBox, BpkProvider, BpkSpacing } from '../../packages/bpk-component-layout';

export const DefaultExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="default"
          text="The first EasyTerra deal offers the lowest price and better insurance coverage. The second EasyTerra deal has a higher price but offers a more spacious car type."
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

export const LoadingExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="thinking"
          text="Comparing your shortlist"
        />
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

export const ErrorGeneralExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="error"
          text="Couldn't load your summary."
          linkText="Retry"
          linkHref="#"
        />
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

export const ErrorRefreshLimitExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary
          state="error"
          text="You've reached the refresh limit. Please come back later."
          linkText="Retry"
          linkHref="#"
        />
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);
