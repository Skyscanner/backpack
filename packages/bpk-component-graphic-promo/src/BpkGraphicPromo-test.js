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

import BpkGraphicPromo from './BpkGraphicPromo';

const props = {
  kicker: 'Kicker',
  headline: 'Ride your wave',
  strapline:
    'Portugal and 6 more countries have just been added to the UK travel green list',
  image: 'path/to/image.jpg',
  sponsorLabel: 'Sponsored',
  sponsorLogo: 'path/to/logo.png',
  sponsorAltText: 'Airline Name',
  ctaText: 'Learn more',
  ctaUrl: 'https://www.skyscanner.net',
  textAlign: 'start',
  invertVertically: false,
};

describe('BpkGraphicPromo', () => {
  it('should render correctly with all properties set', () => {
    const { asFragment } = render(<BpkGraphicPromo {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkGraphicPromo className="custom-classname" {...props} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(<BpkGraphicPromo testid="123" {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have programmatically-detectable accessibility issues in centre aligned', async () => {
    const customProps = { ...props, textAlign: 'center' };
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have programmatically-detectable accessibility issues in right aligned', async () => {
    const customProps = { ...props, textAlign: 'end' };
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have programmatically-detectable accessibility issues in inverted portrait', async () => {
    const customProps = { ...props, invertVertically: true };
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have programmatically-detectable accessibility issues when optional text is missing', async () => {
    const customProps = { ...props };
    delete customProps.kicker;
    delete customProps.strapline;
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have programmatically-detectable accessibility issues in non-sponsored', async () => {
    const customProps = { ...props };
    delete customProps.sponsorAltText;
    delete customProps.sponsorLabel;
    delete customProps.sponsorLogo;
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
