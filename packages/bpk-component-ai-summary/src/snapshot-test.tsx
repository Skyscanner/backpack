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

import BpkAiSummary from './BpkAiSummary';

const SUMMARY_TEXT =
  'The first EasyTerra deal offers the lowest price and better insurance coverage.';

describe('BpkAiSummary snapshots', () => {
  it('should render loading state correctly', () => {
    const { asFragment } = render(
      <BpkAiSummary.Root>
        <BpkAiSummary.Header title="Summarized by AI" />
        <BpkAiSummary.Summary>
          Comparing your shortlist
          <BpkAiSummary.Ellipsis />
        </BpkAiSummary.Summary>
      </BpkAiSummary.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render success state correctly', () => {
    const { asFragment } = render(
      <BpkAiSummary.Root>
        <BpkAiSummary.Header title="Summarized by AI" />
        <BpkAiSummary.Summary>{SUMMARY_TEXT}</BpkAiSummary.Summary>
        <BpkAiSummary.Feedback
          feedbackText="Was this helpful?"
          thankYouText="Thanks for your feedback!"
        />
      </BpkAiSummary.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render post-vote state correctly', async () => {
    const { asFragment, getByLabelText } = render(
      <BpkAiSummary.Root>
        <BpkAiSummary.Header title="Summarized by AI" />
        <BpkAiSummary.Summary>{SUMMARY_TEXT}</BpkAiSummary.Summary>
        <BpkAiSummary.Feedback
          feedbackText="Was this helpful?"
          thankYouText="Thanks for your feedback!"
        />
      </BpkAiSummary.Root>,
    );
    await userEvent.click(getByLabelText('Thumbs up'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render error state correctly', () => {
    const { asFragment } = render(
      <BpkAiSummary.Root>
        <BpkAiSummary.Header title="Summarized by AI" />
        <BpkAiSummary.Summary>
          You&apos;ve reached the refresh limit. Please come back later.{' '}
          <a href="#retry">Retry</a>
        </BpkAiSummary.Summary>
      </BpkAiSummary.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
