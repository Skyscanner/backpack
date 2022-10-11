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

import React from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { cssModules } from '../../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkText from '../../bpk-component-text';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButton from '../../bpk-component-button';

import STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(STYLES);

const ACCESSIBILITY_KEYS = {
  Enter: 13 /* Enter */,
  Space: 32 /* Space */,
};

const isAccessibilityClick = (event: React.KeyboardEvent<HTMLElement>) =>
  Object.keys(ACCESSIBILITY_KEYS).includes(event.key) ||
  Object.values(ACCESSIBILITY_KEYS).includes(event.keyCode || event.which);

export const TEXT_ALIGN = {
  start: 'start',
  center: 'center',
  end: 'end',
}; // as const; // Temp disabling TS types due to non TS projects compatibility.

export type Props = {
  className?: string | null,
  contentId?: string | null,
  tagline?: string | null,
  headline: string,
  subheading?: string | null,
  sponsor?: {
    label: string,
    logo: string,
    altText: string,
  } | null,
  buttonText: string,
  onClick: () => void,
  invertVertically?: boolean,
  textAlign: $Keys<typeof TEXT_ALIGN>, // typeof TEXT_ALIGN[keyof typeof TEXT_ALIGN]; // Temp disabling TS types due to non TS projects compatibility.
  style?: {},
};

const constructAriaLabel = ({
  buttonText,
  headline,
  sponsor,
  subheading,
  tagline,
}: Pick<
  Props,
  'buttonText' | 'headline' | 'sponsor' | 'subheading' | 'tagline',
>) => {
  const text: string[] = [];
  const addText = (value?: string | null) => value && text.push(value);

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

const BpkGraphicPromo = ({
  buttonText,
  className = null,
  contentId,
  headline,
  invertVertically = false,
  onClick,
  sponsor = null,
  style = {},
  subheading = null,
  tagline = null,
  textAlign,
}: Props) => {
  // FIXME: Use useCallback() here when React is updated.
  const onClickWrapper = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick();
  };
  const onKeyWrapper = (event: React.KeyboardEvent<HTMLElement>) =>
    isAccessibilityClick(event) && onClick();

  const cardClasses = getClassName('bpk-card', 'bpk-graphic-promo', className);
  const containerClasses = getClassName(
    'bpk-graphic-promo__container',
    `bpk-graphic-promo__container--${textAlign}`,
    invertVertically && 'bpk-graphic-promo__container--inverted',
  );

  const getTextClasses = (baseClass: string) =>
    getClassName(baseClass, `${baseClass}--${textAlign}`);

  return (
    // The card appears as a single component for the screen reader; its children are hidden. The card handles mouse
    // clicks and key presses (Enter/Space) for the whole component, as described here:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
    <div
      id={contentId || ''}
      className={cardClasses}
      style={style}
      role="link"
      aria-label={constructAriaLabel({
        buttonText,
        headline,
        sponsor,
        subheading,
        tagline,
      })}
      tabIndex={0}
      onClick={onClickWrapper}
      onKeyDown={onKeyWrapper}
    >
      <div
        id={(contentId && `${contentId}__content`) || ''}
        className={containerClasses}
        aria-hidden
      >
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

BpkGraphicPromo.defaultProps = {
  className: null,
  contentId: null,
  tagline: null,
  subheading: null,
  sponsor: null,
  invertVertically: false,
  style: {},
};

export default BpkGraphicPromo;
