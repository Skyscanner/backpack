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

import CARD_STYLES from '../../bpk-component-card/src/BpkCard.module.scss';

import GP_STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(GP_STYLES);
const getCardClassName = cssModules(CARD_STYLES);

const ACCESSIBILITY_KEYS = {
  Enter: 13 /* Enter */,
  Space: 32 /* Space */,
};

export const TEXT_ALIGN = {
  start: 'start',
  center: 'center',
  end: 'end',
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
  style: ?{},
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
    style,
    subheading,
    tagline,
    textAlign,
  } = props;

  const onClickWrapper = React.useCallback(
    (
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
      if (event.type === 'click') {
        event.stopPropagation();
      } else if (
        !Object.values(ACCESSIBILITY_KEYS).includes(
          event.keyCode || event.which,
        )
      ) {
        return;
      }

      onClick();
    },
    [onClick],
  );

  const cardClasses = getClassName(
    getCardClassName('bpk-card'),
    'bpk-graphic-promo',
    className,
  );
  const containerClasses = getClassName(
    'bpk-graphic-promo__container',
    `bpk-graphic-promo__container--${textAlign}`,
    invertVertically && 'bpk-graphic-promo__container--inverted',
  );

  const getTextClasses = (baseClass: string) =>
    getClassName(baseClass, `${baseClass}--${textAlign}`);

  return (
    // The card appears as a single component for the screen reader; its children are hidden. The card handles mouse
    // clicks and key presses (Enter) for the whole component, as described here:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
    <div
      className={cardClasses}
      style={style}
      role="link"
      aria-label={constructAriaLabel(props)}
      tabIndex={0}
      onClick={onClickWrapper}
      onKeyDown={onClickWrapper}
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
            primaryOnDark
            className={getClassName('bpk-graphic-promo__cta')}
            onClick={onClickWrapper}
            tabIndex={-1} /* button is not focusable for accessibility */
          >
            {buttonText}
          </BpkButton>
        </div>
      </div>
    </div>
  );
};

BpkGraphicPromo.propTypes = {
  className: PropTypes.string,
  tagline: PropTypes.string,
  headline: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  sponsor: PropTypes.shape({
    label: PropTypes.string,
    logo: PropTypes.string,
    altText: PropTypes.string,
  }),
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  invertVertically: PropTypes.bool,
  textAlign: PropTypes.oneOf(Object.values(TEXT_ALIGN)).isRequired,
  style: PropTypes.shape({ [PropTypes.string]: PropTypes.string }),
};

BpkGraphicPromo.defaultProps = {
  className: null,
  tagline: null,
  subheading: null,
  sponsor: null,
  invertVertically: false,
  style: {},
};

export default BpkGraphicPromo;
