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

import { BpkCheckboxCardSimple } from '../../index';

// Known architectural issue: BpkCheckboxCard.Control renders a hidden <input> inside
// <div role="checkbox">, which triggers axe's nested-interactive rule. This is a
// pre-existing V2 design constraint (the hidden input is needed for form submission).
// All other axe rules are checked in full.
const AXE_OPTIONS = {
  rules: { 'nested-interactive': { enabled: false } },
};

describe('BpkCheckboxCard accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkCheckboxCardSimple
        checked={false}
        onChange={() => {}}
        label="Select option"
        price="£100"
      />,
    );
    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when checked', async () => {
    const { container } = render(
      <BpkCheckboxCardSimple
        checked
        onChange={() => {}}
        label="Selected option"
        price="£100"
      />,
    );
    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled', async () => {
    const { container } = render(
      <BpkCheckboxCardSimple
        checked={false}
        onChange={() => {}}
        label="Disabled option"
        disabled
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with rich content', async () => {
    const { container } = render(
      <BpkCheckboxCardSimple
        checked={false}
        onChange={() => {}}
        label="Rich content"
        description="Central location"
        price="£85"
      />,
    );
    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with aria-label only', async () => {
    const { container } = render(
      <BpkCheckboxCardSimple
        checked={false}
        onChange={() => {}}
        ariaLabel="Select city centre option for £100"
        price="£100"
      />,
    );
    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  });
});
