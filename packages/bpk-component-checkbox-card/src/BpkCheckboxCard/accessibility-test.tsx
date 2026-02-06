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

import BpkCheckboxCard from './BpkCheckboxCard';

describe('BpkCheckboxCard accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Select option"
        price="£100"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when checked', async () => {
    const { container } = render(
      <BpkCheckboxCard
        checked
        onChange={() => {}}
        label="Selected option"
        price="£100"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled', async () => {
    const { container } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Disabled option"
        disabled
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with icon and image', async () => {
    const { container } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Rich content"
        icon={<div role="img" aria-label="Location icon">📍</div>}
        image="test.jpg"
        price="£85"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with ariaLabel only', async () => {
    const { container } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        ariaLabel="Select city centre option for £100"
        icon={<div>📍</div>}
        price="£100"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
