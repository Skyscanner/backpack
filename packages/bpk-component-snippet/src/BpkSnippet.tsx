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

import { BpkButtonV2, BUTTON_TYPES } from '../../bpk-component-button';
import BpkText, {
  TEXT_STYLES,
  type TextStyle,
} from '../../bpk-component-text/src/BpkText';
import { cssModules } from '../../bpk-react-utils';

import type { ButtonType } from '../../bpk-component-button/src/BpkButtonV2/common-types';

import STYLES from './BpkSnippet.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  src: string;
  altText: string;
  headline?: string | null;
  subheading?: string | null;
  bodyText?: string | null;
  buttonText?: string | null;
  bodyStyle?: typeof TEXT_STYLES.bodyDefault | typeof TEXT_STYLES.bodyLongform;
  buttonStyle?: ButtonType;
  headlineStyle?: TextStyle;
  desktopLayout?: 'imageLeft' | 'imageRight' | 'vertical';
  imageOrientation?: 'landscape' | 'portrait' | 'square';
  imageRadius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void;
};

const BpkSnippet = ({
  altText,
  bodyStyle = TEXT_STYLES.bodyDefault,
  bodyText,
  buttonStyle = BUTTON_TYPES.primary,
  buttonText,
  desktopLayout = 'imageLeft',
  headline,
  headlineStyle = TEXT_STYLES.hero5,
  imageOrientation,
  imageRadius,
  onClick,
  src,
  subheading,
}: Props) => (
  <div
    className={getClassName(
      'bpk-snippet',
      desktopLayout === 'imageRight' && 'bpk-snippet--row-reverse',
      desktopLayout === 'vertical' && 'bpk-snippet--vertical',
    )}
  >
    <div
      className={getClassName(
        desktopLayout === 'vertical'
          ? 'bpk-snippet--vertical--container'
          : 'bpk-snippet--container',
        `bpk-snippet--image__${imageOrientation}`,
      )}
    >
      <img
        className={getClassName(
          'bpk-snippet--image',
          `bpk-snippet--image__radius--${imageRadius}`,
        )}
        alt={altText || ''}
        src={src}
        loading="lazy"
      />
    </div>
    <div
      className={getClassName(
        desktopLayout === 'vertical'
          ? 'bpk-snippet--vertical--container'
          : 'bpk-snippet--container',
        desktopLayout === 'vertical'
          ? ' bpk-snippet--vertical--content'
          : 'bpk-snippet--content',
      )}
    >
      {headline && (
        <div className={getClassName('bpk-snippet--headline')}>
          <BpkText textStyle={headlineStyle} tagName="h3">
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
          <BpkText textStyle={bodyStyle}>{bodyText}</BpkText>
        </div>
      )}
      {buttonText && onClick && (
        <BpkButtonV2 type={buttonStyle} onClick={onClick}>
          {buttonText}
        </BpkButtonV2>
      )}
    </div>
  </div>
);

export default BpkSnippet;
