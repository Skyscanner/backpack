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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';

import STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(STYLES);

export const TEXT_ALIGN = {
  start: 'start',
  center: 'center',
  end: 'end',
};
export const TEXT_COLORS = {
  black: 'black',
  white: 'white',
};

export type Props = {
  className: ?string,
  tagline: ?string,
  headline: string,
  subheading: ?string,
  sponsor: ?{
    label: string,
    logo: string,
    altText: string,
  },
  buttonText: string,
  onClick: () => void,
  invertVertically: boolean,
  textAlign: TEXT_ALIGN,
  textColor: TEXT_COLORS,
  style: string,
};

const constructAriaLabel = ({
  buttonText,
  headline,
  sponsor,
  subheading,
  tagline,
}: Props) => {
  const text = [];
  const addText = (value) => value && text.push(value);

  if (sponsor) {
    addText(sponsor.label);
    addText(sponsor.altText);
  } else {
    addText(tagline);
  }
  addText(headline);
  addText(subheading);
  addText(buttonText);

  return text.join('. ');
};

const BpkGraphicPromo = (props: Props) => {
  const {
    buttonText,
    className,
    headline,
    invertVertically,
    onClick,
    sponsor,
    subheading,
    tagline,
    textAlign,
    textColor,
    style
  } = props;

  // FIXME: Use useCallback() here when React is updated.
  const onClickWrapper = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick();
  };

  const cardClasses = getClassName('bpk-graphic-promo', className);
  const containerClasses = getClassName(
    'bpk-graphic-promo__container',
    `bpk-graphic-promo__container--${textAlign}`,
    invertVertically && 'bpk-graphic-promo__container--inverted',
  );

  const getTextClasses = (baseClass: string) =>
    getClassName(baseClass, `${baseClass}--${textAlign}`);
  return (
    <BpkCard
      className={cardClasses}
      style={{
        color: textColor,
        ...style
      }}
      onClick={onClickWrapper}
      aria-label={constructAriaLabel(props)}
      padded={false}
    >
      <div className={containerClasses} aria-hidden>
        <div className={getTextClasses('bpk-graphic-promo__sponsor-content')}>
          {sponsor && (
            <>
              <BpkText
                tagName="span"
                className={getClassName('bpk-graphic-promo__sponsor-label')}
              >
                {sponsor.label}
              </BpkText>
              <img
                className={getClassName('bpk-graphic-promo__sponsor-logo')}
                alt={sponsor.altText}
                src={sponsor.logo}
              />
            </>
          )}
        </div>
        <div className={getTextClasses('bpk-graphic-promo__promo-content')}>
          {!sponsor && tagline && (
            <BpkText
              tagName="span"
              className={getClassName('bpk-graphic-promo__tagline')}
            >
              {tagline}
            </BpkText>
          )}
          <BpkText
            tagName="h2"
            className={getClassName('bpk-graphic-promo__headline')}
          >
            {headline}
          </BpkText>
          {subheading && (
            <BpkText
              tagName="p"
              className={getClassName('bpk-graphic-promo__subheading')}
            >
              {subheading}
            </BpkText>
          )}
          <BpkButton
            className={getClassName('bpk-graphic-promo__cta')}
            onClick={onClickWrapper}
            tabIndex={-1} /* button is not focusable for accessibility */
          >
            {buttonText}
          </BpkButton>
        </div>
      </div>
    </BpkCard>
  );
};

BpkGraphicPromo.propTypes = {
  className: PropTypes.string,
  tagline: PropTypes.string,
  headline: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  backgroundImageMobile: PropTypes.string.isRequired,
  backgroundImageTablet: PropTypes.string.isRequired,
  backgroundImageDesktop: PropTypes.string.isRequired,
  sponsor: PropTypes.shape({
    label: PropTypes.string,
    logo: PropTypes.string,
    altText: PropTypes.string,
  }),
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  invertVertically: PropTypes.bool,
  textAlign: PropTypes.oneOf(Object.values(TEXT_ALIGN)).isRequired,
  textColor: PropTypes.oneOf(Object.values(TEXT_COLORS)),
};

BpkGraphicPromo.defaultProps = {
  className: null,
  tagline: null,
  subheading: null,
  sponsor: null,
  invertVertically: false,
  textColor: TEXT_COLORS.white,
};

export default BpkGraphicPromo;
