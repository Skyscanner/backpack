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
import { useBlurbState } from './BpkAiBlurbContext';
import { AI_BLURB_STATES } from './common-types';

// Mock BpkButton to avoid bpk-component-spinner transitive dependency in Jest
jest.mock('../../bpk-component-button/src/BpkButton', () => {
  const BpkButton = ({ children, onClick, ...props }: any) => (
    <button type="button" onClick={onClick} {...props}>{children}</button>
  );
  return { __esModule: true, default: BpkButton };
});

// Mock layout components that depend on @chakra-ui/react (not available in Jest)
jest.mock('../../bpk-component-layout/src/BpkStack', () => ({
  BpkVStack: ({ children, ...props }: any) => <div data-testid="mock-vstack" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-layout/src/BpkBox', () => ({
  BpkBox: ({ children, ...props }: any) => <div data-testid="mock-box" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-layout/src/BpkFlex', () => ({
  BpkFlex: ({ children, ...props }: any) => <div data-testid="mock-flex" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-icon/sm/ai', () => {
  const AiIcon = () => <svg data-testid="ai-icon" />;
  return { __esModule: true, default: AiIcon };
});

jest.mock('../../bpk-component-icon/sm/thumbs-up', () => {
  const ThumbsUpIcon = () => <svg data-testid="thumbs-up-icon" />;
  return { __esModule: true, default: ThumbsUpIcon };
});

jest.mock('../../bpk-component-icon/sm/thumbs-down', () => {
  const ThumbsDownIcon = () => <svg data-testid="thumbs-down-icon" />;
  return { __esModule: true, default: ThumbsDownIcon };
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

  it('should render with default state', () => {
    const StateConsumer = () => {
      const state = useBlurbState();
      return <span data-testid="state">{state}</span>;
    };

    render(
      <BpkAiBlurb.Root>
        <StateConsumer />
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('state')).toHaveTextContent(AI_BLURB_STATES.default);
  });

  it('should propagate thinking state via context', () => {
    const StateConsumer = () => {
      const state = useBlurbState();
      return <span data-testid="state">{state}</span>;
    };

    render(
      <BpkAiBlurb.Root state={AI_BLURB_STATES.thinking}>
        <StateConsumer />
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('state')).toHaveTextContent(AI_BLURB_STATES.thinking);
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

  it('should render thumbs up and thumbs down icons', () => {
    render(
      <BpkAiBlurb.Root>
        <BpkAiBlurb.Footer onThumbsUp={() => {}} onThumbsDown={() => {}}>
          Was this helpful?
        </BpkAiBlurb.Footer>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('thumbs-up-icon')).toBeInTheDocument();
    expect(screen.getByTestId('thumbs-down-icon')).toBeInTheDocument();
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
  it('should render all parts in full default state composition', () => {
    render(
      <BpkAiBlurb.Root state={AI_BLURB_STATES.default}>
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
    expect(screen.getByTestId('thumbs-up-icon')).toBeInTheDocument();
    expect(screen.getByTestId('thumbs-down-icon')).toBeInTheDocument();
  });

  it('should render thinking state without footer', () => {
    render(
      <BpkAiBlurb.Root state={AI_BLURB_STATES.thinking}>
        <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
        <BpkAiBlurb.Content>Loading...</BpkAiBlurb.Content>
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByText('Summarized by AI')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('thumbs-up-icon')).not.toBeInTheDocument();
  });

  it('should propagate state context correctly to children', () => {
    const StateConsumer = () => {
      const state = useBlurbState();
      return <span data-testid="state-value">{state}</span>;
    };

    render(
      <BpkAiBlurb.Root state={AI_BLURB_STATES.thinking}>
        <BpkAiBlurb.Header>AI Header</BpkAiBlurb.Header>
        <StateConsumer />
      </BpkAiBlurb.Root>,
    );
    expect(screen.getByTestId('state-value')).toHaveTextContent(AI_BLURB_STATES.thinking);
  });
});
