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

import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import {BpkButtonV2, BUTTON_TYPES} from '../../bpk-component-button';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkGraphicPromo.module.scss';

const getClassName = cssModules(STYLES);

const ACCESSIBILITY_KEYS = {
  Enter: 13 /* Enter */,
  Space: 32 /* Space */,
};

const isAccessibilityClick = (event: KeyboardEvent<HTMLElement>) =>
  Object.keys(ACCESSIBILITY_KEYS).includes(event.key) ||
  Object.values(ACCESSIBILITY_KEYS).includes(event.keyCode || event.which);

export const TEXT_ALIGN = {
  start: 'start',
  center: 'center',
  end: 'end',
} as const;

export type Props = {
  className?: string | null;
  contentId?: string | null;
  tagline?: string | null;
  headline: string;
  subheading?: string | null;
  /**
   * An object that groups together all the sponsor related properties. This should only be provided if the graphic promo is sponsored, in which case all of the object's properties are required.
   */
  sponsor?: {
    label: string;
    logo: string;
    altText: string;
  } | null;
  buttonText: string;
  onClick: () => void;
  invertVertically?: boolean;
  textAlign: (typeof TEXT_ALIGN)[keyof typeof TEXT_ALIGN];
  style?: {};
  /**
   * Optional link href. If provided, the component will render as an anchor tag <a> instead of a <div>.
   * This improves semantic HTML and SEO.
   */
  href?: string | null;
};

const constructAriaLabel = ({
  buttonText,
  headline,
  sponsor,
  subheading,
  tagline,
}: Pick<
  Props,
  'buttonText' | 'headline' | 'sponsor' | 'subheading' | 'tagline'
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
type WrapperProps = {
  id?: string;
  cardClasses?: string;
  style?: {[key: string]: string | number};
  href?: string | null;
  'aria-label'?: string;
  tabIndex?: number;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  children?: ReactNode;
};

const Wrapper = ({
  'aria-label': ariaLabel = '',
  cardClasses = '',
  children,
  href,
  id,
  onClick,
  onKeyDown,
  style = {},
  tabIndex = 0,
}: WrapperProps) => {
  const commonProps = { 
    id,
    style,
    'aria-label': ariaLabel,
    onClick,
    onKeyDown,
    className: cardClasses,
  }
  if (href) {
    return (
      <a
        href={href}
        {...commonProps}
      >{children}</a>)
  } 
  return (
    <div
      {...commonProps}
      tabIndex={tabIndex}
      role='link'
      >
        {children}
      </div>
  );
}



const BpkGraphicPromo = ({
  buttonText,
  className = null,
  contentId,
  headline,
  href = null,
  invertVertically = false,
  onClick,
  sponsor = null,
  style = {},
  subheading = null,
  tagline = null,
  textAlign,
}: Props) => {
  // FIXME: Use useCallback() here when React is updated.
  const onClickWrapper = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick();
  };

  const onKeyWrapper = (event: KeyboardEvent<HTMLElement>) =>
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
    <Wrapper
      id={contentId || ''}
      cardClasses={cardClasses}
      style={style}
      href={href}
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
              <span
                className={getClassName('bpk-graphic-promo__sponsor-label')}
              >
                {sponsor.label}
              </span>
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
            <span
              className={getClassName('bpk-graphic-promo__tagline')}
            >
              {tagline}
            </span>
          )}
          <h2
            className={getClassName('bpk-graphic-promo__headline')}
          >
            {headline}
          </h2>
          {subheading && (
            <p
              className={getClassName('bpk-graphic-promo__subheading')}
            >
              {subheading}
            </p>
          )}
          <BpkButtonV2
            type={BUTTON_TYPES.primaryOnDark}
            // TODO: className to be removed
            // eslint-disable-next-line @skyscanner/rules/forbid-component-props
            className={getClassName('bpk-graphic-promo__cta')}
            onClick={onClickWrapper}
            tabIndex={-1} /* button is not focusable for accessibility */
          >
            {buttonText}
          </BpkButtonV2>
        </div>
      </div>
    </Wrapper>
  );
};

export default BpkGraphicPromo;
