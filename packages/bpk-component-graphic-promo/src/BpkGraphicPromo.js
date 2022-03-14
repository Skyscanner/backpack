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
import BpkText, { TEXT_STYLES } from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';

import STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  className: ?string,
  kicker: ?string,
  headline: string,
  strapline: ?string,
  image: string,
  sponsorLogo: ?string,
  sponsorAltText: ?string,
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
  const cardClasses = [getClassName('bpk-graphic-promo')];
  if (className) {
    cardClasses.push(className);
  }

  const containerClasses = [
    getClassName('bpk-graphic-promo__container'),
    getClassName(`bpk-graphic-promo__container--${textAlign}`),
  ];
  if (invertVertically) {
    containerClasses.push(
      getClassName('bpk-graphic-promo__container--inverted'),
    );
  }

  return (
    <BpkCard
      padded={false}
      className={cardClasses.join(' ')}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={containerClasses.join(' ')}>
        {sponsorLogo && (
          <div className={getClassName('bpk-graphic-promo__sponsor-content')}>
            <BpkText tagName="span" textStyle={TEXT_STYLES.label1}>
              Sponsored
            </BpkText>
            <img
              className={getClassName('bpk-graphic-promo__sponsor-logo')}
              alt={sponsorAltText}
              src={sponsorLogo}
            />
          </div>
        )}
        <div className={getClassName('bpk-graphic-promo__promo-content')}>
          {!sponsorLogo && kicker && (
            <BpkText tagName="span" textStyle={TEXT_STYLES.label1}>
              {kicker}
            </BpkText>
          )}
          <BpkText tagName="h2" textStyle={TEXT_STYLES.hero5}>
            {headline}
          </BpkText>
          {strapline && (
            <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
              {strapline}
            </BpkText>
          )}
          <BpkButton
            className={getClassName('bpk-graphic-promo__cta')}
            href={ctaUrl}
            primary
          >
            {ctaText}
          </BpkButton>
        </div>
      </div>
    </BpkCard>
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
