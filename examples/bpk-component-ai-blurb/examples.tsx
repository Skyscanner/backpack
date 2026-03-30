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
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

export const DefaultExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary>
          <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
            <strong>The first EasyTerra deal</strong> offers the lowest price and better insurance coverage. The second EasyTerra deal has a higher price but offers a more spacious car type.
          </BpkText>
        </BpkAiBlurb.Summary>
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
        <BpkAiBlurb.Summary>
          <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
            Comparing your shortlist
            <BpkAiBlurb.Ellipsis />
          </BpkText>
        </BpkAiBlurb.Summary>
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

export const ErrorGeneralExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary>
          <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
            Couldn&apos;t load your summary.{' '}
            <button
              type="button"
              // eslint-disable-next-line backpack/use-tokens
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit', textDecoration: 'underline' }}
              onClick={() => {}}
            >
              Retry
            </button>
          </BpkText>
        </BpkAiBlurb.Summary>
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);

export const ErrorRefreshLimitExample = () => (
  <BpkProvider>
    <BpkBox maxWidth="50rem" padding={BpkSpacing.Base}>
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary>
          <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
            You&apos;ve reached the refresh limit. Please come back later.{' '}
            <button
              type="button"
              // eslint-disable-next-line backpack/use-tokens
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit', textDecoration: 'underline' }}
              onClick={() => {}}
            >
              Retry
            </button>
          </BpkText>
        </BpkAiBlurb.Summary>
      </BpkAiBlurb.Root>
    </BpkBox>
  </BpkProvider>
);
