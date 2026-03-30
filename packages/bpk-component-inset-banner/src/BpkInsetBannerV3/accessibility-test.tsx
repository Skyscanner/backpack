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

import BpkInsetBannerV3 from './BpkInsetBannerV3';

describe('BpkInsetBannerV3 accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkInsetBannerV3.Root
        backgroundColor="#F55D42"
        textVariant="on-dark"
        aria-label="Sponsored by Skyscanner"
      >
        <BpkInsetBannerV3.LeadingAccessory>
          <img
            src="https://content.skyscnr.com/m/3f4dadbd41da8235/original/Skyland_White_172x96.png"
            alt="Skyscanner"
          />
        </BpkInsetBannerV3.LeadingAccessory>
        <BpkInsetBannerV3.Content>
          <p>Lorem ipsum</p>
          <p>Lorem ipsum dolor sit amet</p>
        </BpkInsetBannerV3.Content>
        <BpkInsetBannerV3.TrailingAccessory
          onClick={() => {}}
          aria-label="About this advert"
        >
          <span>Sponsored</span>
        </BpkInsetBannerV3.TrailingAccessory>
      </BpkInsetBannerV3.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when TrailingAccessory is non-interactive', async () => {
    const { container } = render(
      <BpkInsetBannerV3.Root
        backgroundColor="#FFE300"
        textVariant="on-light"
        aria-label="Banner"
      >
        <BpkInsetBannerV3.Content>
          <p>Content only</p>
        </BpkInsetBannerV3.Content>
        <BpkInsetBannerV3.TrailingAccessory>
          <span>Static label</span>
        </BpkInsetBannerV3.TrailingAccessory>
      </BpkInsetBannerV3.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
