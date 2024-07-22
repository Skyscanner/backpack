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

import BpkInsetBanner, { VARIANT } from './BpkInsetBanner';

describe('BpkInsetBanner accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkInsetBanner
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo="https://content.skyscnr.com/m/7950ed6f30581485/Medium-Skyscanner-Vertical-White.png"
        backgroundColor="#F55D42"
        callToAction={{
          text: 'Sponsored',
        }}
        body={{
          text: 'You can change your destination, date of travel, or both, with no change fee. Valid for all new bookings made up to 31 May for travel between now and 31 December 2020.',
          linkText: 'More information',
          link: 'www.skyscanner.net',
        }}
        variant={VARIANT.onDark}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
