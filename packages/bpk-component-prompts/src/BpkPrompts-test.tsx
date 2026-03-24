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

import { BpkProvider } from '../../bpk-component-layout';

import BpkPrompts from './BpkPrompts';

const renderWithProvider = (ui: ReactElement) =>
  render(ui, { wrapper: BpkProvider });

const defaultPrompts = [
  {
    id: 'first',
    text: 'I need a small automatic car for 2 people with unlimited mileage',
  },
  { id: 'second', text: 'What insurance do I need?' },
  { id: 'third', text: 'Do I need to pay a deposit?' },
];

describe('BpkPrompts', () => {
  it('should render correctly with default props', () => {
    const { asFragment } = renderWithProvider(
      <BpkPrompts prompts={defaultPrompts} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a list of prompts', () => {
    renderWithProvider(<BpkPrompts prompts={defaultPrompts} />);
    const list = screen.getByRole('list', { name: /suggestions/i });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('should render with data-testid', () => {
    renderWithProvider(<BpkPrompts prompts={defaultPrompts} />);
    expect(screen.getByTestId('bpk-prompts')).toBeInTheDocument();
  });

  it('should call onPromptClick with id and promptText when a prompt is clicked', () => {
    const mockOnPromptClick = jest.fn();
    renderWithProvider(
      <BpkPrompts prompts={defaultPrompts} onPromptClick={mockOnPromptClick} />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'What insurance do I need?' }),
    );

    expect(mockOnPromptClick).toHaveBeenCalledTimes(1);
    expect(mockOnPromptClick).toHaveBeenCalledWith(
      'second',
      'What insurance do I need?',
    );
  });

  it('should render nothing when prompts array is empty', () => {
    const { container } = renderWithProvider(<BpkPrompts prompts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render with showVisibleScrollbar', () => {
    const { asFragment } = renderWithProvider(
      <BpkPrompts prompts={defaultPrompts} showVisibleScrollbar />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
