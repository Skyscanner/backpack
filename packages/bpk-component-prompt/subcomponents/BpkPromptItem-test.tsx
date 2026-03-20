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

import BpkPromptItem from './BpkPromptItem';
import BpkPromptList from './BpkPromptList';

const renderWithProvider = (ui: React.ReactElement) =>
  render(ui, { wrapper: BpkProvider });

describe('BpkPromptItem', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProvider(
      <BpkPromptList>
        <BpkPromptItem id="test" text="What insurance do I need?" />
      </BpkPromptList>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the prompt text', () => {
    renderWithProvider(
      <BpkPromptList>
        <BpkPromptItem id="test" text="What insurance do I need?" />
      </BpkPromptList>,
    );
    expect(screen.getByText('What insurance do I need?')).toBeInTheDocument();
  });

  it('should call onPromptClick from context when clicked', () => {
    const mockOnPromptClick = jest.fn();
    renderWithProvider(
      <BpkPromptList onPromptClick={mockOnPromptClick}>
        <BpkPromptItem id="insurance" text="What insurance do I need?" />
      </BpkPromptList>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'What insurance do I need?' }),
    );

    expect(mockOnPromptClick).toHaveBeenCalledWith(
      'insurance',
      'What insurance do I need?',
    );
  });

  it('should not throw when no onPromptClick in context', () => {
    renderWithProvider(
      <BpkPromptList>
        <BpkPromptItem id="test" text="What insurance do I need?" />
      </BpkPromptList>,
    );
    expect(() => {
      fireEvent.click(screen.getByTestId('bpk-prompt'));
    }).not.toThrow();
  });
});
