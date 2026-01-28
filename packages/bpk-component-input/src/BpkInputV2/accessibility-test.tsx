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

import BpkInputV2 from './BpkInputV2';

describe('BpkInputV2 accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <div>
        {/* Adding a label to ensure it meets accessibility. */}
        <label htmlFor="test">Label</label>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test">Label</label>
        <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
      </div>,
    );
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();

    // Verify input can receive focus
    input?.focus();
    expect(document.activeElement).toBe(input);
  });

  it('should have accessible name via label', () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Test Label</label>
        <BpkInputV2 id="test-input" name="test" value="" onChange={() => {}} />
      </div>,
    );
    const input = container.querySelector('input');
    expect(input).toHaveAccessibleName('Test Label');
  });

  it('should have accessible name via aria-label', () => {
    const { container } = render(
      <BpkInputV2
        id="test"
        name="test"
        value=""
        aria-label="Test Input"
        onChange={() => {}}
      />,
    );
    const input = container.querySelector('input');
    expect(input).toHaveAccessibleName('Test Input');
  });
});
