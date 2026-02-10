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

import BpkCheckbox from '../index';

describe('BpkCheckbox v2 accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues (default)', async () => {
    const { container } = render(
      <BpkCheckbox.Root name="checkbox">
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test checkbox</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues (checked)', async () => {
    const { container } = render(
      <BpkCheckbox.Root name="checkbox" checked onCheckedChange={() => {}}>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test checkbox</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues (disabled)', async () => {
    const { container } = render(
      <BpkCheckbox.Root name="checkbox" disabled>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test checkbox</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues (invalid)', async () => {
    const { container } = render(
      <BpkCheckbox.Root name="checkbox" invalid>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test checkbox</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues (required)', async () => {
    const { container } = render(
      <BpkCheckbox.Root name="checkbox" required>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test checkbox</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
