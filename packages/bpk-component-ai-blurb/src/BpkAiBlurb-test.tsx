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

import BpkAiBlurb from './BpkAiBlurb';
import { useAiBlurbVariant } from './BpkAiBlurbVariant';
import { AI_BLURB_VARIANTS } from './common-types';

// Mock layout components that depend on @chakra-ui/react (not available in Jest)
jest.mock('../../bpk-component-layout/src/BpkFlex', () => ({
  BpkFlex: ({ children, ...props }: any) => <div data-testid="mock-flex" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-layout/src/BpkGrid', () => ({
  BpkGrid: ({ children, ...props }: any) => <div data-testid="mock-grid" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-icon/sm/ai', () => {
  const AiIcon = () => <svg data-testid="ai-icon" />;
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

describe('BpkAiBlurb.Root', () => {
  it('should render children', () => {
    render(
      <BpkAiBlurb.Root>
        <span>Root content</span>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByText('Root content')).toBeInTheDocument();
  });

  it('should render with default variant', () => {
    const VariantConsumer = () => {
      const variant = useAiBlurbVariant();
      return <span data-testid="variant">{variant}</span>;
    };

    render(
      <BpkAiBlurb.Root>
        <VariantConsumer />
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('variant')).toHaveTextContent(AI_BLURB_VARIANTS.default);
  });

  it('should propagate thinking variant via context', () => {
    const VariantConsumer = () => {
      const variant = useAiBlurbVariant();
      return <span data-testid="variant">{variant}</span>;
    };

    render(
      <BpkAiBlurb.Root variant={AI_BLURB_VARIANTS.thinking}>
        <VariantConsumer />
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('variant')).toHaveTextContent(AI_BLURB_VARIANTS.thinking);
  });
});

describe('BpkAiBlurb.Header', () => {
  it('should render AI icon', () => {
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('ai-icon')).toBeInTheDocument();
  });

  it('should render children text', () => {
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByText('Summarized by AI')).toBeInTheDocument();
  });
});

describe('BpkAiBlurb.Content', () => {
  it('should render children text', () => {
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Content>This is the body content</BpkAiBlurb.Content>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByText('This is the body content')).toBeInTheDocument();
  });
});

describe('BpkAiBlurb.Footer', () => {
  it('should render children text', () => {
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Footer>Was this helpful?</BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByText('Was this helpful?')).toBeInTheDocument();
  });

  it('should render thumbs up and thumbs down buttons', () => {
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Footer onThumbsUp={() => {}} onThumbsDown={() => {}}>
          Was this helpful?
        </BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('bpk-thumb-button-up')).toBeInTheDocument();
    expect(screen.getByTestId('bpk-thumb-button-down')).toBeInTheDocument();
  });

  it('should call onThumbsUp when thumbs up button is clicked', async () => {
    const onThumbsUp = jest.fn();
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Footer onThumbsUp={onThumbsUp}>Was this helpful?</BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Helpful' }));
    expect(onThumbsUp).toHaveBeenCalledTimes(1);
  });

  it('should call onThumbsDown when thumbs down button is clicked', async () => {
    const onThumbsDown = jest.fn();
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Footer onThumbsDown={onThumbsDown}>Was this helpful?</BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Not helpful' }));
    expect(onThumbsDown).toHaveBeenCalledTimes(1);
  });
});

describe('BpkAiBlurb composition', () => {
  it('should render all parts in full default variant composition', () => {
    render(
      <BpkAiBlurb.Root variant={AI_BLURB_VARIANTS.default}>
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
        <BpkAiBlurb.Content>Here is a summary of your trip.</BpkAiBlurb.Content>
        <BpkAiBlurb.Footer onThumbsUp={() => {}} onThumbsDown={() => {}}>
          Was this helpful?
        </BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByText('Summarized by AI')).toBeInTheDocument();
    expect(screen.getByText('Here is a summary of your trip.')).toBeInTheDocument();
    expect(screen.getByText('Was this helpful?')).toBeInTheDocument();
    expect(screen.getByTestId('ai-icon')).toBeInTheDocument();
    expect(screen.getByTestId('bpk-thumb-button-up')).toBeInTheDocument();
    expect(screen.getByTestId('bpk-thumb-button-down')).toBeInTheDocument();
  });

  it('should render thinking variant without footer', () => {
    render(
      <BpkAiBlurb.Root variant={AI_BLURB_VARIANTS.thinking}>
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
        <BpkAiBlurb.Content>Loading...</BpkAiBlurb.Content>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByText('Summarized by AI')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('bpk-thumb-button-up')).not.toBeInTheDocument();
  });

  it('should suppress footer even when explicitly included in thinking variant', () => {
    render(
      <BpkAiBlurb.Root variant={AI_BLURB_VARIANTS.thinking}>
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
        <BpkAiBlurb.Content>Loading...</BpkAiBlurb.Content>
        <BpkAiBlurb.Footer onThumbsUp={() => {}} onThumbsDown={() => {}}>
          Was this helpful?
        </BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    expect(screen.queryByText('Was this helpful?')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bpk-thumb-button-up')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bpk-thumb-button-down')).not.toBeInTheDocument();
  });

  it('should propagate variant context correctly to children', () => {
    const VariantConsumer = () => {
      const variant = useAiBlurbVariant();
      return <span data-testid="variant-value">{variant}</span>;
    };

    render(
      <BpkAiBlurb.Root variant={AI_BLURB_VARIANTS.thinking}>
        <BpkAiBlurb.Header>AI Header</BpkAiBlurb.Header>
        <VariantConsumer />
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('variant-value')).toHaveTextContent(AI_BLURB_VARIANTS.thinking);
  });
});
