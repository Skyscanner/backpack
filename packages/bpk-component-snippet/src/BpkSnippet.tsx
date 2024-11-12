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

import type { MouseEvent } from 'react';

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import { BpkButtonV2, BUTTON_TYPES } from '../../bpk-component-button';
import BpkImage, {
  BORDER_RADIUS_STYLES,
  withLazyLoading,
} from '../../bpk-component-image';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSnippet.module.scss';

const getClassName = cssModules(STYLES);

export const BODY_STYLE = {
  bodyDefault: TEXT_STYLES.bodyDefault,
  bodyLongform: TEXT_STYLES.bodyLongform,
} as const;

export const BUTTON_STYLE = {
  primary: BUTTON_TYPES.primary,
  featured: BUTTON_TYPES.featured,
} as const;

export const HEADLINE_STYLE = {
  heading1: TEXT_STYLES.heading1,
  heading2: TEXT_STYLES.heading2,
  heading3: TEXT_STYLES.heading3,
  heading4: TEXT_STYLES.heading4,
  heading5: TEXT_STYLES.heading5,
  hero1: TEXT_STYLES.hero1,
  hero2: TEXT_STYLES.hero2,
  hero3: TEXT_STYLES.hero3,
  hero4: TEXT_STYLES.hero4,
  hero5: TEXT_STYLES.hero5,
} as const;

export const DESKTOP_LAYOUT = {
  imageLeft: 'imageLeft',
  imageRight: 'imageRight',
  vertical: 'vertical',
} as const;

export const IMAGE_ORIENTATION = {
  landscape: 'landscape',
  portrait: 'portrait',
  square: 'square',
} as const;

export type Props = {
  src: string;
  altText: string;
  headline?: string | null;
  subheading?: string | null;
  bodyText?: string | null;
  buttonText?: string | null;
  bodyStyle?: (typeof BODY_STYLE)[keyof typeof BODY_STYLE];
  buttonStyle?: (typeof BUTTON_STYLE)[keyof typeof BUTTON_STYLE];
  headlineStyle?: (typeof HEADLINE_STYLE)[keyof typeof HEADLINE_STYLE];
  desktopLayout?: (typeof DESKTOP_LAYOUT)[keyof typeof DESKTOP_LAYOUT];
  imageOrientation?: (typeof IMAGE_ORIENTATION)[keyof typeof IMAGE_ORIENTATION];
  imageRadius?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void;
};

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LazyLoadedImage = withLazyLoading(BpkImage, documentIfExists);

const getImageAspectRatio = (
  imageOrientation?: (typeof IMAGE_ORIENTATION)[keyof typeof IMAGE_ORIENTATION],
) => {
  let imageAspectRatio;
  switch (imageOrientation) {
    case 'landscape':
      imageAspectRatio = 3 / 2;
      break;
    case 'square':
      imageAspectRatio = 1;
      break;
    case 'portrait':
      imageAspectRatio = 5 / 7;
      break;
    default:
      imageAspectRatio = 3 / 2;
      break;
  }

  return imageAspectRatio;
};

const BpkSnippet = ({
  altText,
  bodyStyle = BODY_STYLE.bodyDefault,
  bodyText,
  buttonStyle = BUTTON_STYLE.primary,
  buttonText,
  desktopLayout = DESKTOP_LAYOUT.imageLeft,
  headline,
  headlineStyle = HEADLINE_STYLE.hero5,
  imageOrientation,
  imageRadius = true,
  onClick,
  src,
  subheading,
}: Props) => (
  <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
    {(isMobile: boolean) => (
      <div
        className={getClassName(
          'bpk-snippet',
          desktopLayout === 'imageRight' && 'bpk-snippet--row-reverse',
          desktopLayout === 'vertical' && 'bpk-snippet--vertical',
        )}
      >
        <div
          className={getClassName(
            'bpk-snippet--image',
            desktopLayout === 'vertical'
              ? 'bpk-snippet--vertical--container'
              : 'bpk-snippet--container',
          )}
        >
          <LazyLoadedImage
            altText={altText}
            aspectRatio={getImageAspectRatio(imageOrientation)}
            borderRadiusStyle={
              imageRadius ? BORDER_RADIUS_STYLES.sm : BORDER_RADIUS_STYLES.none
            }
            src={src}
          />
        </div>
        <div
          className={
            desktopLayout === 'vertical'
              ? getClassName(
                  'bpk-snippet--vertical--container',
                  'bpk-snippet--vertical--content',
                )
              : getClassName('bpk-snippet--container', 'bpk-snippet--content')
          }
        >
          {headline && (
            <div className={getClassName('bpk-snippet--headline')}>
              <BpkText
                textStyle={isMobile ? HEADLINE_STYLE.heading4 : headlineStyle}
              >
                {headline}
              </BpkText>
            </div>
          )}
          {subheading && (
            <div className={getClassName('bpk-snippet--subheading')}>
              <BpkText textStyle={TEXT_STYLES.subheading}>{subheading}</BpkText>
            </div>
          )}
          {bodyText && (
            <div className={getClassName('bpk-snippet--bodyText')}>
              <BpkText
                textStyle={isMobile ? BODY_STYLE.bodyDefault : bodyStyle}
              >
                {bodyText}
              </BpkText>
            </div>
          )}
          {buttonText && onClick && (
            <BpkButtonV2 type={buttonStyle} onClick={onClick}>
              {buttonText}
            </BpkButtonV2>
          )}
        </div>
      </div>
    )}
  </BpkBreakpoint>
);

export default BpkSnippet;
