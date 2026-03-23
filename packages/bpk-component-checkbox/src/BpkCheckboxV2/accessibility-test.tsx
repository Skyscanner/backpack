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

import BpkCheckboxV2 from './BpkCheckboxV2';

describe('BpkCheckboxV2 accessibility tests', () => {
  it('should not have accessibility issues with simple label', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>Accept terms</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with title and description', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <div>
          <BpkCheckboxV2.Label>Price alerts</BpkCheckboxV2.Label>
          <BpkCheckboxV2.Description>
            We&apos;ll email you about price drops. Unsubscribe anytime.
          </BpkCheckboxV2.Description>
        </div>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when checked', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root defaultChecked>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>Send me deals</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root disabled>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>Disabled option</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled and checked', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root disabled defaultChecked>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>Disabled and checked</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when indeterminate', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root defaultChecked="indeterminate">
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>Weekdays</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues when invalid', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root invalid>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>I agree to the terms</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with inline link in label', async () => {
    const { container } = render(
      <BpkCheckboxV2.Root>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>
          I agree to the <a href="/terms">terms and conditions</a>
        </BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
