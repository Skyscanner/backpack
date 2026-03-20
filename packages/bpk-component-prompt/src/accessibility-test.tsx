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

import { BpkProvider } from '../../bpk-component-layout';

import BpkPrompt from './BpkPrompt';
import BpkPrompts from './BpkPrompts';

const renderWithProvider = (ui: React.ReactElement) =>
  render(ui, { wrapper: BpkProvider });

const defaultPrompts = [
  { id: 'first', text: 'I need a small automatic car for 2 people with unlimited mileage' },
  { id: 'second', text: 'What insurance do I need?' },
  { id: 'third', text: 'Do I need to pay a deposit?' },
];

describe('BpkPrompt accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = renderWithProvider(
      <BpkPrompt.Root promptText="What insurance do I need?" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with onClick handler', async () => {
    const { container } = renderWithProvider(
      <BpkPrompt.Root
        promptText="What insurance do I need?"
        onClick={jest.fn()}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkPrompts accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = renderWithProvider(<BpkPrompts prompts={defaultPrompts} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with onPromptClick handler', async () => {
    const { container } = renderWithProvider(
      <BpkPrompts prompts={defaultPrompts} onPromptClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
