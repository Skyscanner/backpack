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
import type { ReactElement } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { BpkProvider } from '../../../bpk-component-layout';

import Item from './Item';
import Root from './Root';

const renderWithProvider = (ui: ReactElement) =>
  render(ui, { wrapper: BpkProvider });

describe('Item', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProvider(
      <Root ariaLabel="Suggestions">
        <Item id="test" text="What insurance do I need?" />
      </Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the prompt text', () => {
    renderWithProvider(
      <Root ariaLabel="Suggestions">
        <Item id="test" text="What insurance do I need?" />
      </Root>,
    );
    expect(screen.getByText('What insurance do I need?')).toBeInTheDocument();
  });

  it('should render with data-testid', () => {
    renderWithProvider(
      <Root ariaLabel="Suggestions">
        <Item id="test" text="What insurance do I need?" />
      </Root>,
    );
    expect(screen.getByTestId('bpk-prompt')).toBeInTheDocument();
  });

  it('should call onPromptClick from context when clicked', () => {
    const mockOnPromptClick = jest.fn();
    renderWithProvider(
      <Root ariaLabel="Suggestions" onPromptClick={mockOnPromptClick}>
        <Item id="insurance" text="What insurance do I need?" />
      </Root>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'What insurance do I need?' }),
    );

    expect(mockOnPromptClick).toHaveBeenCalledWith(
      'insurance',
      'What insurance do I need?',
    );
  });

  it('should call onPromptClick when Enter key is pressed', () => {
    const mockOnPromptClick = jest.fn();
    renderWithProvider(
      <Root ariaLabel="Suggestions" onPromptClick={mockOnPromptClick}>
        <Item id="insurance" text="What insurance do I need?" />
      </Root>,
    );

    fireEvent.keyDown(screen.getByTestId('bpk-prompt'), { key: 'Enter' });

    expect(mockOnPromptClick).toHaveBeenCalledWith(
      'insurance',
      'What insurance do I need?',
    );
  });

  it('should call onPromptClick when Space key is pressed', () => {
    const mockOnPromptClick = jest.fn();
    renderWithProvider(
      <Root ariaLabel="Suggestions" onPromptClick={mockOnPromptClick}>
        <Item id="insurance" text="What insurance do I need?" />
      </Root>,
    );

    fireEvent.keyDown(screen.getByTestId('bpk-prompt'), { key: ' ' });

    expect(mockOnPromptClick).toHaveBeenCalledTimes(1);
  });

  it('should not throw when no onPromptClick in context', () => {
    renderWithProvider(
      <Root ariaLabel="Suggestions">
        <Item id="test" text="What insurance do I need?" />
      </Root>,
    );
    expect(() => {
      fireEvent.click(screen.getByTestId('bpk-prompt'));
    }).not.toThrow();
  });
});
