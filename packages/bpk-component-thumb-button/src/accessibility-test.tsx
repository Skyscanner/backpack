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

import BpkThumbButton from './BpkThumbButton';

describe('BpkThumbButton accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkThumbButton accessibilityLabel="Thumbs up" type="up" onClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with selected state', async () => {
    const { container } = render(
      <BpkThumbButton accessibilityLabel="Thumbs up" type="up" selected onClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with thumbs down', async () => {
    const { container } = render(
      <BpkThumbButton accessibilityLabel="Thumbs down" type="down" onClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with size="small"', async () => {
    const { container } = render(
      <BpkThumbButton accessibilityLabel="Thumbs up" type="up" size="small" onClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with iconColor="primary"', async () => {
    const { container } = render(
      <BpkThumbButton accessibilityLabel="Thumbs up" type="up" iconColor="primary" onClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with size="small" and iconColor="primary"', async () => {
    const { container } = render(
      <BpkThumbButton accessibilityLabel="Thumbs up" type="up" size="small" iconColor="primary" onClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
