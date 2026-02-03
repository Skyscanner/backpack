/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import BpkGraphicPromo, { TEXT_ALIGN } from './BpkGraphicPromo';

const sponsor = {
  label: 'Sponsored',
  logo: 'path/to/logo.png',
  altText: 'Airline Name',
};
const buttonText = 'Learn more';
const onClick = () => {
  window.location.href = 'https://www.skyscanner.net';
};

const tagline = 'Tagline';
const headline = 'Ride your wave';
const subheading =
  'Portugal and 6 more countries have just been added to the UK travel green list';

describe('BpkGraphicPromo accessibility tests', () => {
  // TODO: Temporarily disabling tests due to a newer version of jest-axe which causes tests to fail when using nested interactive elements

  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkGraphicPromo
        buttonText={buttonText}
        className="test"
        headline={headline}
        invertVertically={false}
        onClick={onClick}
        sponsor={sponsor}
        subheading={subheading}
        tagline={tagline}
        textAlign={TEXT_ALIGN.start}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in centre aligned', async () => {
    const { container } = render(
      <BpkGraphicPromo
        buttonText={buttonText}
        headline={headline}
        invertVertically={false}
        onClick={onClick}
        sponsor={sponsor}
        subheading={subheading}
        tagline={tagline}
        textAlign={TEXT_ALIGN.center}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in right aligned', async () => {
    const { container } = render(
      <BpkGraphicPromo
        buttonText={buttonText}
        headline={headline}
        invertVertically={false}
        onClick={onClick}
        sponsor={sponsor}
        subheading={subheading}
        tagline={tagline}
        textAlign={TEXT_ALIGN.end}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in inverted portrait', async () => {
    const { container } = render(
      <BpkGraphicPromo
        buttonText={buttonText}
        headline={headline}
        invertVertically
        onClick={onClick}
        sponsor={sponsor}
        subheading={subheading}
        tagline={tagline}
        textAlign={TEXT_ALIGN.start}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when optional text is missing', async () => {
    const { container } = render(
      <BpkGraphicPromo
        buttonText={buttonText}
        headline={headline}
        invertVertically={false}
        onClick={onClick}
        sponsor={sponsor}
        textAlign={TEXT_ALIGN.start}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in non-sponsored', async () => {
    const { container } = render(
      <BpkGraphicPromo
        buttonText={buttonText}
        headline={headline}
        invertVertically={false}
        onClick={onClick}
        subheading={subheading}
        tagline={tagline}
        textAlign={TEXT_ALIGN.start}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
