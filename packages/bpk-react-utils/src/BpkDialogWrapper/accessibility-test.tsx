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
// @ts-nocheck

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { BpkDialogWrapper } from './BpkDialogWrapper';

describe('BpkDialogWrapper accessibility tests', () => {
  const props = {
    closeOnEscPressed: true,
    closeOnScrimClick: true,
    dialogClassName: 'test-class',
    id: "dialog-wrapper",
    isOpen: true,
    onClose: jest.fn(),
    transitionClassNames: { appear: "appear-class", appearActive: "active-class", exit: "exit-class" },
    timeout: { appear: 0, exit: 0 }
  }

  it('should not have programmatically-detectable accessibility issues using ariaLabelledby', async () => {
    const { container } = render(
      <BpkDialogWrapper
        {...props}
        ariaLabelledby='dialog-wrapper'
      >
        Dialog content
      </BpkDialogWrapper>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues using airaLabel', async () => {
    const { container } = render(
      <BpkDialogWrapper
        {...props}
        ariaLabel='dialog wrapper'
      >
        Dialog content
      </BpkDialogWrapper>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
