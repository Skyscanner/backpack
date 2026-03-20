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

import { render, screen, fireEvent } from '@testing-library/react';

import { BpkProvider } from '../../bpk-component-layout';

import BpkPrompt from './BpkPrompt';

const renderWithProvider = (ui: React.ReactElement) =>
  render(ui, { wrapper: BpkProvider });

const defaultPrompts = [
  { id: 'first', text: 'I need a small automatic car for 2 people with unlimited mileage' },
  { id: 'second', text: 'What insurance do I need?' },
  { id: 'third', text: 'Do I need to pay a deposit?' },
];

describe('BpkPrompt.Root', () => {
  it('should render correctly with default props', () => {
    const { asFragment } = render(
      <BpkPrompt.Root promptText="What insurance do I need?" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the prompt text', () => {
    render(<BpkPrompt.Root promptText="What insurance do I need?" />);
    expect(screen.getByText('What insurance do I need?')).toBeInTheDocument();
  });

  it('should render with data-testid', () => {
    render(<BpkPrompt.Root promptText="What insurance do I need?" />);
    expect(screen.getByTestId('bpk-prompt')).toBeInTheDocument();
  });

  it('should call onClick with promptText when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <BpkPrompt.Root
        promptText="What insurance do I need?"
        onClick={mockOnClick}
      />,
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'What insurance do I need?' }),
    );
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('What insurance do I need?');
  });

  it('should not throw when clicked without onClick handler', () => {
    render(<BpkPrompt.Root promptText="What insurance do I need?" />);
    expect(() => {
      fireEvent.click(screen.getByTestId('bpk-prompt'));
    }).not.toThrow();
  });
});

describe('BpkPrompt.List + BpkPrompt.Item', () => {
  it('should render correctly with default props', () => {
    const { asFragment } = renderWithProvider(
      <BpkPrompt.List>
        {defaultPrompts.map((p) => (
          <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />
        ))}
      </BpkPrompt.List>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render all prompt items', () => {
    renderWithProvider(
      <BpkPrompt.List>
        {defaultPrompts.map((p) => (
          <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />
        ))}
      </BpkPrompt.List>,
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('should render with data-testid', () => {
    renderWithProvider(
      <BpkPrompt.List>
        {defaultPrompts.map((p) => (
          <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />
        ))}
      </BpkPrompt.List>,
    );
    expect(screen.getByTestId('bpk-prompts')).toBeInTheDocument();
  });

  it('should call onPromptClick with id and text when an item is clicked', () => {
    const mockOnPromptClick = jest.fn();
    renderWithProvider(
      <BpkPrompt.List onPromptClick={mockOnPromptClick}>
        {defaultPrompts.map((p) => (
          <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />
        ))}
      </BpkPrompt.List>,
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'What insurance do I need?' }),
    );
    expect(mockOnPromptClick).toHaveBeenCalledWith(
      'second',
      'What insurance do I need?',
    );
  });

  it('should render with showVisibleScrollbar', () => {
    const { asFragment } = renderWithProvider(
      <BpkPrompt.List showVisibleScrollbar>
        {defaultPrompts.map((p) => (
          <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />
        ))}
      </BpkPrompt.List>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
