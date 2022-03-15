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
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkPanel from 'bpk-component-panel';

import STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  className: ?string,
  kicker: ?string,
  headline: string,
  strapline: ?string,
  image: string,
  sponsorLabel: string,
  sponsorLogo: ?string,
  sponsorAltText: ?string,
  ctaText: string,
  ctaUrl: string,
  invertVertically: boolean,
  textAlign: 'start' | 'center' | 'end',
  textColor: 'white' | 'black',
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
  sponsorLabel,
  sponsorLogo,
  strapline,
  textAlign,
  textColor,
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

  const getTextClasses = (baseClass: string) => {
    const classes = [getClassName(baseClass)];
    if (textAlign) {
      classes.push(getClassName(`${baseClass}--${textAlign}`));
    }

    return classes.join(' ');
  };

  return (
    <BpkPanel
      className={cardClasses.join(' ')}
      style={{ backgroundImage: `url(${image})`, color: textColor }}
      href={ctaUrl}
      padded={false}
    >
      <div className={containerClasses.join(' ')}>
        {sponsorLogo && (
          <div className={getTextClasses('bpk-graphic-promo__sponsor-content')}>
            <BpkText
              tagName="span"
              className={getClassName('bpk-graphic-promo__sponsor-label')}
            >
              {sponsorLabel}
            </BpkText>
            <img
              className={getClassName('bpk-graphic-promo__sponsor-logo')}
              alt={sponsorAltText}
              src={sponsorLogo}
            />
          </div>
        )}
        <div className={getTextClasses('bpk-graphic-promo__promo-content')}>
          {!sponsorLogo && kicker && (
            <BpkText
              tagName="span"
              className={getClassName('bpk-graphic-promo__kicker')}
            >
              {kicker}
            </BpkText>
          )}
          <BpkText
            tagName="h2"
            className={getClassName('bpk-graphic-promo__headline')}
          >
            {headline}
          </BpkText>
          {strapline && (
            <BpkText
              tagName="p"
              className={getClassName('bpk-graphic-promo__strapline')}
            >
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
    </BpkPanel>
  );
};

BpkGraphicPromo.propTypes = {
  className: PropTypes.string,
  kicker: PropTypes.string,
  headline: PropTypes.string.isRequired,
  strapline: PropTypes.string,
  image: PropTypes.string.isRequired,
  sponsorLabel: PropTypes.string,
  sponsorLogo: PropTypes.string,
  sponsorAltText: PropTypes.string,
  ctaText: PropTypes.string.isRequired,
  ctaUrl: PropTypes.string.isRequired,
  invertVertically: PropTypes.string.isRequired,
  textAlign: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
  textColor: PropTypes.oneOf(['white', 'black']),
};

BpkGraphicPromo.defaultProps = {
  className: undefined,
  kicker: undefined,
  strapline: undefined,
  sponsorLabel: undefined,
  sponsorLogo: undefined,
  sponsorAltText: undefined,
  textColor: 'white',
};

export default BpkGraphicPromo;

// TODO: Things to do before submitting:
// 5) Confirm CTA button style.
// 6) Write accessibility tests.
// 7) Write unit tests.
// 8) Fix remaining ESLint issues before final commit.

// DONE
// 1) Translate the "Sponsored" text.
// 2) Set background color for when image fails to load.
// 3) Confirm background image aspect ratio / dimensions.
// 4) Confirm text colour.
