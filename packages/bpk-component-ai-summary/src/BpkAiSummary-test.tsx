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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkAiSummary from './BpkAiSummary';

describe('BpkAiSummary displayNames', () => {
  it('should have correct displayName for each subcomponent', () => {
    expect(BpkAiSummary.Root.displayName).toBe('BpkAiSummary.Root');
    expect(BpkAiSummary.Header.displayName).toBe('BpkAiSummary.Header');
    expect(BpkAiSummary.Summary.displayName).toBe('BpkAiSummary.Summary');
    expect(BpkAiSummary.Ellipsis.displayName).toBe('BpkAiSummary.Ellipsis');
    expect(BpkAiSummary.Feedback.displayName).toBe('BpkAiSummary.Feedback');
  });
});

describe('BpkAiSummary.Root', () => {
  it('should render children', () => {
    render(<BpkAiSummary.Root><span>content</span></BpkAiSummary.Root>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('should have data-backpack-ds-component attribute', () => {
    const { container } = render(<BpkAiSummary.Root><span /></BpkAiSummary.Root>);
    expect(container.firstChild).toHaveAttribute('data-backpack-ds-component', 'AiSummary');
  });
});

describe('BpkAiSummary.Header', () => {
  it('should render the title', () => {
    render(<BpkAiSummary.Header title="Summarized by AI" />);
    expect(screen.getByText('Summarized by AI')).toBeInTheDocument();
  });

  it('should render the AI icon', () => {
    const { container } = render(<BpkAiSummary.Header title="Summarized by AI" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render any consumer-provided title string', () => {
    render(<BpkAiSummary.Header title="Résumé par IA" />);
    expect(screen.getByText('Résumé par IA')).toBeInTheDocument();
  });
});

describe('BpkAiSummary.Summary', () => {
  it('should render children', () => {
    render(<BpkAiSummary.Summary>Summary text</BpkAiSummary.Summary>);
    expect(screen.getByText('Summary text')).toBeInTheDocument();
  });

  it('should render mixed rich content', () => {
    render(
      <BpkAiSummary.Summary>
        <strong>Bold text</strong> and normal text
      </BpkAiSummary.Summary>,
    );
    expect(screen.getByText('Bold text')).toBeInTheDocument();
  });
});

describe('BpkAiSummary.Ellipsis', () => {
  it('should render three dot elements', () => {
    const { container } = render(<BpkAiSummary.Ellipsis />);
    const dots = container.querySelectorAll('.bpk-ai-summary__ellipsis-dot');
    expect(dots).toHaveLength(3);
  });

  it('should be hidden from assistive technology', () => {
    const { container } = render(<BpkAiSummary.Ellipsis />);
    const ellipsis = container.querySelector('.bpk-ai-summary__ellipsis');
    expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('BpkAiSummary.Feedback', () => {
  const defaultProps = {
    feedbackText: 'Was this helpful?',
    thankYouText: 'Thanks for your feedback!',
  };

  it('should render feedback text and thumb buttons before a vote', () => {
    render(<BpkAiSummary.Feedback {...defaultProps} />);
    expect(screen.getByText('Was this helpful?')).toBeInTheDocument();
    expect(screen.getByLabelText('Thumbs up')).toBeInTheDocument();
    expect(screen.getByLabelText('Thumbs down')).toBeInTheDocument();
  });

  it('should show thank-you text and hide thumbs after thumbs-up', async () => {
    render(<BpkAiSummary.Feedback {...defaultProps} />);
    await userEvent.click(screen.getByLabelText('Thumbs up'));
    expect(screen.getByText('Thanks for your feedback!')).toBeInTheDocument();
    expect(screen.queryByLabelText('Thumbs up')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Thumbs down')).not.toBeInTheDocument();
  });

  it('should show thank-you text and hide thumbs after thumbs-down', async () => {
    render(<BpkAiSummary.Feedback {...defaultProps} />);
    await userEvent.click(screen.getByLabelText('Thumbs down'));
    expect(screen.getByText('Thanks for your feedback!')).toBeInTheDocument();
    expect(screen.queryByLabelText('Thumbs up')).not.toBeInTheDocument();
  });

  it('should call onFeedback with true when thumbs-up pressed', async () => {
    const onFeedback = jest.fn();
    render(<BpkAiSummary.Feedback {...defaultProps} onFeedback={onFeedback} />);
    await userEvent.click(screen.getByLabelText('Thumbs up'));
    expect(onFeedback).toHaveBeenCalledWith(true);
  });

  it('should call onFeedback with false when thumbs-down pressed', async () => {
    const onFeedback = jest.fn();
    render(<BpkAiSummary.Feedback {...defaultProps} onFeedback={onFeedback} />);
    await userEvent.click(screen.getByLabelText('Thumbs down'));
    expect(onFeedback).toHaveBeenCalledWith(false);
  });

  it('should not throw when onFeedback is not provided', async () => {
    render(<BpkAiSummary.Feedback {...defaultProps} />);
    await expect(
      userEvent.click(screen.getByLabelText('Thumbs up')),
    ).resolves.not.toThrow();
  });

  it('should prevent re-voting after first vote', async () => {
    const onFeedback = jest.fn();
    render(<BpkAiSummary.Feedback {...defaultProps} onFeedback={onFeedback} />);
    await userEvent.click(screen.getByLabelText('Thumbs up'));
    expect(onFeedback).toHaveBeenCalledTimes(1);
    expect(screen.queryByLabelText('Thumbs up')).not.toBeInTheDocument();
  });
});
