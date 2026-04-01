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
import { axe } from 'jest-axe';

import BpkChatBubble from './BpkChatBubble';

describe('BpkChatBubble accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues for user bubble', async () => {
    const { container } = render(
      <BpkChatBubble type="user">Hello there</BpkChatBubble>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues for bot bubble', async () => {
    const { container } = render(
      <BpkChatBubble type="bot">How can I help?</BpkChatBubble>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues for retry bubble', async () => {
    const { container } = render(
      <BpkChatBubble type="retry" onRetry={() => {}} retryLabel="Try again">
        Something went wrong.
      </BpkChatBubble>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues for suggestion bubble', async () => {
    const { container } = render(
      <BpkChatBubble
        type="button"
        onSuggestionClick={() => {}}
      >
        Show me options
      </BpkChatBubble>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with feedback buttons', async () => {
    const { container } = render(
      <BpkChatBubble
        type="bot"
        showFeedback
        onFeedbackClick={() => {}}
      >
        Here is some information
      </BpkChatBubble>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
