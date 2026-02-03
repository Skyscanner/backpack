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

import BpkInsetBannerSponsored from './BpkInsetBannerSponsored';
import { VARIANT } from './common-types';

describe('BpkInsetBanner accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkInsetBannerSponsored
        title="Lorem ipsum"
        subheadline="Lorem ipsum dolor sit amet"
        logo="https://content.skyscnr.com/m/7950ed6f30581485/Medium-Skyscanner-Vertical-White.png"
        backgroundColor="#F55D42"
        callToAction={{
          text: 'Sponsored',
          bottomSheetContent: [
            {
              title: 'Lorem ipsum dolor sit amet',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
              title: 'Consectetur adipiscing elit',
              description:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
          ],
          bottomSheetTitle: 'About this advert',
          closeBtnIcon: true,
          labelTitle: true,
          bottomSheetLabel: 'Info',
          buttonCloseLabel: 'Close',
        }}
        variant={VARIANT.onDark}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
