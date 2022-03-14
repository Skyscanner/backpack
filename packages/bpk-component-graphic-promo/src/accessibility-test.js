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
/* @flow strict */

import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkGraphicPromo from './BpkGraphicPromo';

describe('BpkGraphicPromo accessibility tests', () => {
  const image = './path/to/image.jpg';

  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkGraphicPromo
        kicker="Kicker"
        headline="Headline"
        strapline="Strapline"
        image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
        sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
        sponsorAltText="easyJet"
        ctaText="Learn More"
        textAlign="start"
        invertVertically={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in centre aligned', async () => {
    const { container } = render(
      <BpkGraphicPromo
        kicker="Kicker"
        headline="Headline"
        strapline="Strapline"
        image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
        sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
        sponsorAltText="easyJet"
        ctaText="Learn More"
        textAlign="center"
        invertVertically={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in right aligned', async () => {
    const { container } = render(
      <BpkGraphicPromo
        kicker="Kicker"
        headline="Headline"
        strapline="Strapline"
        image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
        sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
        sponsorAltText="easyJet"
        ctaText="Learn More"
        textAlign="end"
        invertVertically={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in inverted portrait', async () => {
    const { container } = render(
      <BpkGraphicPromo
        kicker="Kicker"
        headline="Headline"
        strapline="Strapline"
        image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
        sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
        ctaText="Learn More"
        textAlign="start"
        invertVertically
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in minimalistic', async () => {
    const { container } = render(
      <BpkGraphicPromo
        headline="Headline"
        image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
        sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
        ctaText="Learn More"
        textAlign="start"
        invertVertically={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in non-sponsored', async () => {
    const { container } = render(
      <BpkGraphicPromo
        kicker="Kicker"
        headline="Headline"
        strapline="Strapline"
        image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
        ctaText="Learn More"
        textAlign="start"
        invertVertically={false}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
