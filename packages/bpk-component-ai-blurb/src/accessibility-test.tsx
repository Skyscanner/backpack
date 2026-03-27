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
import { axe } from 'jest-axe';

import BpkAiBlurb from './BpkAiBlurb';

describe('BpkAiBlurb accessibility tests', () => {
  it('Ellipsis should be hidden from assistive technology', async () => {
    const { container } = render(
      <BpkAiBlurb.Summary>
        Comparing your shortlist
        <BpkAiBlurb.Ellipsis />
      </BpkAiBlurb.Summary>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Feedback thumb buttons should have accessible labels', async () => {
    const { container } = render(
      <BpkAiBlurb.Feedback
        feedbackText="Was this helpful?"
        thankYouText="Thanks for your feedback!"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Feedback should have no violations after a vote is cast', async () => {
    const { container, getByLabelText } = render(
      <BpkAiBlurb.Feedback
        feedbackText="Was this helpful?"
        thankYouText="Thanks for your feedback!"
      />,
    );
    await userEvent.click(getByLabelText('Thumbs up'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Header should have no violations', async () => {
    const { container } = render(
      <BpkAiBlurb.Header title="Summarized by AI" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
