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

import BpkIconHeart from '../../bpk-component-icon/sm/heart';

import BpkFloatingNotification from './BpkFloatingNotification';

const props = {
  text: 'View',
};

describe('BpkFloatingNotification accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<BpkFloatingNotification {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with long text', async () => {
    const { container } = render(
      <BpkFloatingNotification text="Killer Combo saved to New York and Miami 🎉" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with icon', async () => {
    const { container } = render(
      <BpkFloatingNotification icon={BpkIconHeart} {...props} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with cta', async () => {
    const { container } = render(
      <BpkFloatingNotification ctaText="View" {...props} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with icon and cta', async () => {
    const { container } = render(
      <BpkFloatingNotification icon={BpkIconHeart} ctaText="View" {...props} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
