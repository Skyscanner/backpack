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

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../bpk-component-button';
import SmallFilterIcon from '../../bpk-component-icon/sm/filter';
import { BpkProvider } from '../../bpk-component-layout';

import BpkChatbotInput from './BpkChatbotInput';
import { CHATBOT_INPUT_TYPES } from './common-types';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

const defaultProps = {
  inputValue: '',
  placeholder: 'Ask away',
  loadingAriaLabel: 'Loading',
  sendAriaLabel: 'Send',
  onInputChange: jest.fn(),
  onInputFocus: jest.fn(),
  onInputBlur: jest.fn(),
  onSubmit: jest.fn(),
};

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkChatbotInput accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues (composer type — default)', async () => {
    const { container } = renderWithProvider(
      <BpkChatbotInput.Root>
        <BpkChatbotInput.Input {...defaultProps} />
      </BpkChatbotInput.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues (cars type)', async () => {
    const { container } = renderWithProvider(
      <BpkChatbotInput.Root inputType={CHATBOT_INPUT_TYPES.CARS}>
        <BpkChatbotInput.Input {...defaultProps} />
      </BpkChatbotInput.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues (cars-composer type)', async () => {
    const { container } = renderWithProvider(
      <BpkChatbotInput.Root inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}>
        <BpkChatbotInput.Input {...defaultProps} />
      </BpkChatbotInput.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues (composer type)', async () => {
    const { container } = renderWithProvider(
      <BpkChatbotInput.Root inputType={CHATBOT_INPUT_TYPES.COMPOSER}>
        <BpkChatbotInput.Input {...defaultProps} />
      </BpkChatbotInput.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when loading', async () => {
    const { container } = renderWithProvider(
      <BpkChatbotInput.Root>
        <BpkChatbotInput.Input {...defaultProps} isPolling />
      </BpkChatbotInput.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues (with toolbar)', async () => {
    const { container } = renderWithProvider(
      <BpkChatbotInput.Root>
        <BpkChatbotInput.Input {...defaultProps} />
        <BpkChatbotInput.Toolbar>
          <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.small} iconOnly aria-label="Filter">
            <SmallFilterIcon />
          </BpkButton>
        </BpkChatbotInput.Toolbar>
      </BpkChatbotInput.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
