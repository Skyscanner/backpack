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

import BpkButton from './BpkButton';
import { BUTTON_TYPES } from './common-types';

describe('BpkButton accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues when used as a button', async () => {
    const { container } = render(<BpkButton>My button</BpkButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when used as a link', async () => {
    const { container } = render(<BpkButton href="#">My button</BpkButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with leadingIcon', async () => {
    const { container } = render(
      <BpkButton leadingIcon={<span aria-hidden="true">★</span>}>Search</BpkButton>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with trailingIcon', async () => {
    const { container } = render(
      <BpkButton trailingIcon={<span aria-hidden="true">→</span>}>Next</BpkButton>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with both icons', async () => {
    const { container } = render(
      <BpkButton
        leadingIcon={<span aria-hidden="true">★</span>}
        trailingIcon={<span aria-hidden="true">→</span>}
      >
        Go
      </BpkButton>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with disabled button and leadingIcon', async () => {
    const { container } = render(
      <BpkButton disabled leadingIcon={<span aria-hidden="true">★</span>}>
        Disabled
      </BpkButton>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkButton loading state accessibility tests', () => {
  Object.values(BUTTON_TYPES).forEach((buttonType) => {
    it(`should not have programmatically-detectable accessibility issues when loading=true with type="${buttonType}"`, async () => {
      const { container } = render(
        <BpkButton type={buttonType} loading>
          Loading
        </BpkButton>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('should have aria-busy="true" when loading', () => {
    const { container } = render(<BpkButton loading>Loading</BpkButton>);
    expect(container.firstElementChild).toHaveAttribute('aria-busy', 'true');
  });
});
