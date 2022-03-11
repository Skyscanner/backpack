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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  className?: string,
  kicker?: string,
  headline: string,
  strapline?: string,
  image: string,
  sponsorLogo?: string,
  sponsorAltText?: string,
  ctaText: string,
  ctaUrl: string,
  invertVertically: boolean,
  textAlign: 'start' | 'center' | 'end',
};
const BpkGraphicPromo = ({
  className,
  ctaText,
  ctaUrl,
  headline,
  image,
  invertVertically,
  kicker,
  sponsorAltText,
  sponsorLogo,
  strapline,
  textAlign,
}: Props) => {
  const classNames = getClassName('bpk-graphic-promo', className);

  return (
    <div>
      <div id="SponsorContent" />
      <div id="PromoContent" />
    </div>
  );
};

BpkGraphicPromo.propTypes = {
  className: PropTypes.string,
  kicker: PropTypes.string,
  headline: PropTypes.string.isRequired,
  strapline: PropTypes.string,
  image: PropTypes.string.isRequired,
  sponsorLogo: PropTypes.string,
  sponsorAltText: PropTypes.string,
  ctaText: PropTypes.string.isRequired,
  ctaUrl: PropTypes.string.isRequired,
  invertVertically: PropTypes.string.isRequired,
  textAlign: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
};

BpkGraphicPromo.defaultProps = {
  className: undefined,
  kicker: undefined,
  strapline: undefined,
  sponsorLogo: undefined,
  sponsorAltText: undefined,
};

export default BpkGraphicPromo;
