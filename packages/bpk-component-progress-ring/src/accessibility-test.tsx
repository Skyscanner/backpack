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

import BpkProgressRing, { PROGRESS_RING_SIZES } from './BpkProgressRing';

describe('BpkProgressRing accessibility tests', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<BpkProgressRing value={50} aria-label="Loading progress" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have any accessibility violations with content', async () => {
    const { container } = render(
      <BpkProgressRing value={75} aria-label="Upload progress">
        75%
      </BpkProgressRing>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have any accessibility violations for all sizes', async () => {
    for (const size of Object.values(PROGRESS_RING_SIZES)) {
      const { container } = render(
        <BpkProgressRing value={60} size={size} aria-label={`Progress ${size}`} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have any accessibility violations with aria-describedby', async () => {
    const { container } = render(
      <div>
        <div id="progress-description">File upload in progress</div>
        <BpkProgressRing 
          value={30} 
          aria-label="Upload progress"
          aria-describedby="progress-description"
        />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});