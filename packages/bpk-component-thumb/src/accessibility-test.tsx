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

import BpkThumb from './BpkThumb';

describe('BpkThumb accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkThumb accessibilityLabel="Thumbs up" type="up" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with selected state', async () => {
    const { container } = render(
      <BpkThumb accessibilityLabel="Thumbs up" type="up" selected />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with thumbs down', async () => {
    const { container } = render(
      <BpkThumb accessibilityLabel="Thumbs down" type="down" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled', async () => {
    const { container } = render(
      <BpkThumb accessibilityLabel="Thumbs up" type="up" disabled />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
