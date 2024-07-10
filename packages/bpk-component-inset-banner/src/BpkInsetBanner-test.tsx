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

import '@testing-library/jest-dom';

import BpkInsetBanner, { VARIANT } from './BpkInsetBanner';

describe('BpkInsetBanner', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <BpkInsetBanner
        title="Lorem ipsum"
        backgroundColor="#F55D42"
        variant={VARIANT.onDark}
      />,
    );

    expect(getByText('Lorem ipsum')).toHaveClass('bpk-inset-banner--title');
  });

  it('should render call to action text if provided', () => {
    const { getByText } = render(
      <BpkInsetBanner
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo="https://content.skyscnr.com/m/7950ed6f30581485/Medium-Skyscanner-Vertical-White.png"
        backgroundColor="#F55D42"
        callToAction={{
          text: 'Sponsored',
        }}
        variant={VARIANT.onDark}
      />,
    );

    expect(getByText('Sponsored')).toHaveClass('bpk-inset-banner--cta-text');
  });

  it('should render body if provided', () => {
    const { getByText } = render(
      <BpkInsetBanner
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo="https://content.skyscnr.com/m/7950ed6f30581485/Medium-Skyscanner-Vertical-White.png"
        backgroundColor="#F55D42"
        body={{
          text: 'You can change your destination, date of travel, or both, with no change fee. Valid for all new bookings made up to 31 May for travel between now and 31 December 2020.',
          linkText: 'More information',
          link: 'www.skyscanner.net',
        }}
        variant={VARIANT.onDark}
      />,
    );

    expect(getByText('More information')).toHaveClass(
      'bpk-inset-banner-body-container--link-text',
    );
  });
});
