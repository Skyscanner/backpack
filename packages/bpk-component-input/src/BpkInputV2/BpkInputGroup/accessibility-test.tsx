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

import BpkInputV2 from '../BpkInputV2';

import BpkInputGroup from './BpkInputGroup';

describe('BpkInputGroup accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test">Price</label>
        <BpkInputGroup startElement={<span>$</span>}>
          <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
        </BpkInputGroup>
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have aria-hidden on decorative start element', () => {
    const { container } = render(
      <div>
        <label htmlFor="test">Price</label>
        <BpkInputGroup startElement={<span>$</span>}>
          <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />
        </BpkInputGroup>
      </div>,
    );
    // The start element container should be decorative
    const startContainer = container.querySelector('[aria-hidden="true"]');
    expect(startContainer).toBeInTheDocument();
  });

  it('should ensure input remains properly labeled within group', () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Amount</label>
        <BpkInputGroup startElement={<span>$</span>} endElement={<span>USD</span>}>
          <BpkInputV2 id="test-input" name="test" value="" onChange={() => {}} />
        </BpkInputGroup>
      </div>,
    );
    const input = container.querySelector('input');
    expect(input).toHaveAccessibleName('Amount');
  });
});
