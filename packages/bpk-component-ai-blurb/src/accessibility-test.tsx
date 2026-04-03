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

import BpkAiBlurb from './BpkAiBlurb';

// Mock layout components that depend on @chakra-ui/react (not available in Jest)
jest.mock('../../bpk-component-layout/src/BpkFlex', () => ({
  BpkFlex: ({ children, ...props }: any) => <div data-testid="mock-flex" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-layout/src/BpkGrid', () => ({
  BpkGrid: ({ children, ...props }: any) => <div data-testid="mock-grid" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-icon/sm/ai', () => {
  const AiIcon = () => <svg data-testid="ai-icon" aria-hidden="true" />;
  return { __esModule: true, default: AiIcon };
});

jest.mock('../../bpk-component-thumb-button/src/BpkThumbButton', () => {
  const BpkThumbButton = ({ accessibilityLabel, onClick, type }: any) => (
    <button
      type="button"
      data-testid={`bpk-thumb-button-${type}`}
      aria-label={accessibilityLabel}
      onClick={() => onClick(type)}
    />
  );
  return { __esModule: true, default: BpkThumbButton };
});

describe('BpkAiBlurb accessibility tests', () => {
  it('default variant should have no a11y issues', async () => {
    const { container } = render(
      <BpkAiBlurb.Root variant="default">
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
        <BpkAiBlurb.Content>Content text</BpkAiBlurb.Content>
        <BpkAiBlurb.Footer onThumbsUp={() => {}} onThumbsDown={() => {}}>
          Was this helpful?
        </BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('thinking variant should have no a11y issues', async () => {
    const { container } = render(
      <BpkAiBlurb.Root variant="thinking">
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
        <BpkAiBlurb.Content>Loading content...</BpkAiBlurb.Content>
      </BpkAiBlurb.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
