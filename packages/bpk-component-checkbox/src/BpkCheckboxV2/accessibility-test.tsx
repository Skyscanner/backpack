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

import BpkCheckbox from './BpkCheckbox';

describe('BpkCheckbox accessibility tests', () => {
  it('should not have accessibility issues with simple label', async () => {
    const { container } = render(
      <BpkCheckbox.Root>
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>Accept terms</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with title and description', async () => {
    const { container } = render(
      <BpkCheckbox.Root>
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <div>
          <BpkCheckbox.Label>Price alerts</BpkCheckbox.Label>
          <BpkCheckbox.Description>
            We&apos;ll email you about price drops. Unsubscribe anytime.
          </BpkCheckbox.Description>
        </div>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when checked', async () => {
    const { container } = render(
      <BpkCheckbox.Root defaultChecked>
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>Send me deals</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled', async () => {
    const { container } = render(
      <BpkCheckbox.Root disabled>
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>Disabled option</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled and checked', async () => {
    const { container } = render(
      <BpkCheckbox.Root disabled defaultChecked>
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>Disabled and checked</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when indeterminate', async () => {
    const { container } = render(
      <BpkCheckbox.Root defaultChecked="indeterminate">
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>Weekdays</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when invalid', async () => {
    const { container } = render(
      <BpkCheckbox.Root invalid>
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>I agree to the terms</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with inline link in label', async () => {
    const { container } = render(
      <BpkCheckbox.Root>
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>
          I agree to the <a href="/terms">terms and conditions</a>
        </BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
