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
/* @flow strict */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { cssModules } from 'bpk-react-utils';

import BpkGraphicPromo, { TEXT_ALIGN } from './BpkGraphicPromo';
import STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(STYLES);

const props = {
  tagline: 'Tagline',
  headline: 'Ride your wave',
  subheading:
    'Portugal and 6 more countries have just been added to the UK travel green list',
  sponsor: {
    label: 'Sponsored',
    logo: 'path/to/logo.png',
    altText: 'Airline Name',
  },
  buttonText: 'Learn more',
  onClick: jest.fn(),
  textAlign: TEXT_ALIGN.start,
};

describe('BpkGraphicPromo', () => {
  beforeEach(() => {
    props.onClick.mockReset();
  });

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

  it('should render correctly when centre aligned', () => {
    const customProps = { ...props, textAlign: 'center' };
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when right aligned', () => {
    const customProps = { ...props, textAlign: 'end' };
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when inverted portrait', () => {
    const customProps = { ...props, invertVertically: true };
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not display tagline or subheading when not provided', () => {
    const customProps = { ...props };
    delete customProps.tagline;
    delete customProps.subheading;
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the tagline and no sponsor for non-sponsored ad', () => {
    const customProps = { ...props };
    delete customProps.sponsor;
    const { asFragment } = render(<BpkGraphicPromo {...customProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should redirect us to link when card is clicked', () => {
    render(<BpkGraphicPromo {...props} />);

    const graphicPromo = document.getElementsByClassName(
      getClassName('bpk-graphic-promo'),
    )[0];
    fireEvent.click(graphicPromo);

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('should redirect us to link when button is clicked', () => {
    render(<BpkGraphicPromo {...props} />);

    const graphicPromoCTA = document.getElementsByClassName(
      getClassName('bpk-graphic-promo__cta'),
    )[0];
    fireEvent.click(graphicPromoCTA);

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
