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

const image = 'path/to/image.jpg';
const sponsorLabel = 'Sponsored';
const sponsorLogo = 'path/to/logo.png';
const sponsorAltText = 'Airline Name';
const ctaText = 'Learn more';
const ctaUrl = 'https://www.skyscanner.net';

const kicker = 'Kicker';
const headline = 'Ride your wave';
const strapline =
  'Portugal and 6 more countries have just been added to the UK travel green list';

describe('BpkGraphicPromo accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkGraphicPromo
        kicker={kicker}
        headline={headline}
        strapline={strapline}
        image={image}
        sponsorLabel={sponsorLabel}
        sponsorLogo={sponsorLogo}
        sponsorAltText={sponsorAltText}
        ctaText={ctaText}
        ctaUrl={ctaUrl}
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
        kicker={kicker}
        headline={headline}
        strapline={strapline}
        image={image}
        sponsorLabel={sponsorLabel}
        sponsorLogo={sponsorLogo}
        sponsorAltText={sponsorAltText}
        ctaText={ctaText}
        ctaUrl={ctaUrl}
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
        kicker={kicker}
        headline={headline}
        strapline={strapline}
        image={image}
        sponsorLabel={sponsorLabel}
        sponsorLogo={sponsorLogo}
        sponsorAltText={sponsorAltText}
        ctaText={ctaText}
        ctaUrl={ctaUrl}
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
        kicker={kicker}
        headline={headline}
        strapline={strapline}
        image={image}
        sponsorLabel={sponsorLabel}
        sponsorLogo={sponsorLogo}
        sponsorAltText={sponsorAltText}
        ctaText={ctaText}
        ctaUrl={ctaUrl}
        textAlign="start"
        invertVertically
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when optional text is missing', async () => {
    const { container } = render(
      <BpkGraphicPromo
        headline={headline}
        image={image}
        sponsorLabel={sponsorLabel}
        sponsorLogo={sponsorLogo}
        sponsorAltText={sponsorAltText}
        ctaText={ctaText}
        ctaUrl={ctaUrl}
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
        kicker={kicker}
        headline={headline}
        strapline={strapline}
        image={image}
        sponsorLabel={sponsorLabel}
        ctaText={ctaText}
        ctaUrl={ctaUrl}
        textAlign="start"
        invertVertically={false}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
