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

import BpkRating, { RATING_SIZES, RATING_SCALES } from '../index';

describe('BpkRating accessibility tests', () => {
  const defaultProps = {
      ratingScale: RATING_SCALES.zeroToFive,
      size: RATING_SIZES.base,
  };

  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkRating
      {...defaultProps}
        ariaLabel="3.6 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={3.6}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
