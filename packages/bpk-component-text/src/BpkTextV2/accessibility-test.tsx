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

import BpkText from './BpkText';

describe('BpkText accessibility tests', () => {
  const TestIcon = () => <svg aria-hidden="true">icon</svg>;

  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with leading icon', async () => {
    const { container } = render(
      <BpkText>
        <BpkText.LeadingIcon>
          <TestIcon />
        </BpkText.LeadingIcon>
        Text with leading icon
      </BpkText>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with trailing icon', async () => {
    const { container } = render(
      <BpkText>
        Text with trailing icon
        <BpkText.TrailingIcon>
          <TestIcon />
        </BpkText.TrailingIcon>
      </BpkText>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with icon-only mode', async () => {
    const { container } = render(
      <BpkText accessibilityLabel="Close">
        <BpkText.LeadingIcon>
          <TestIcon />
        </BpkText.LeadingIcon>
      </BpkText>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with heading and icons', async () => {
    const { container } = render(
      <BpkText tagName="h1" textStyle="heading-1">
        <BpkText.LeadingIcon>
          <TestIcon />
        </BpkText.LeadingIcon>
        Heading with icon
        <BpkText.TrailingIcon>
          <TestIcon />
        </BpkText.TrailingIcon>
      </BpkText>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
