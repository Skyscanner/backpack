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

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkAiBlurb from './BpkAiBlurb';

const SUMMARY_TEXT =
  'The first EasyTerra deal offers the lowest price and better insurance coverage.';

describe('BpkAiBlurb snapshots', () => {
  it('should render loading state correctly', () => {
    const { asFragment } = render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary>
          Comparing your shortlist
          <BpkAiBlurb.Ellipsis />
        </BpkAiBlurb.Summary>
      </BpkAiBlurb.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render success state correctly', () => {
    const { asFragment } = render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary>{SUMMARY_TEXT}</BpkAiBlurb.Summary>
        <BpkAiBlurb.Feedback
          feedbackText="Was this helpful?"
          thankYouText="Thanks for your feedback!"
        />
      </BpkAiBlurb.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render post-vote state correctly', async () => {
    const { asFragment, getByLabelText } = render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary>{SUMMARY_TEXT}</BpkAiBlurb.Summary>
        <BpkAiBlurb.Feedback
          feedbackText="Was this helpful?"
          thankYouText="Thanks for your feedback!"
        />
      </BpkAiBlurb.Root>,
    );
    await userEvent.click(getByLabelText('Thumbs up'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render error state correctly', () => {
    const { asFragment } = render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI" />
        <BpkAiBlurb.Summary>
          You&apos;ve reached the refresh limit. Please come back later.{' '}
          <a href="#retry">Retry</a>
        </BpkAiBlurb.Summary>
      </BpkAiBlurb.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
