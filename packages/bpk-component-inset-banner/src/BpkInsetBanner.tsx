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
import { surfaceHighlightDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkInsetBanner.module.scss';

const getClassName = cssModules(STYLES);

export const VARIANT = {
  onLight: 'on-light',
  onDark: 'on-dark',
};

export type Props = {
  accessibilityLabel?: string;
  backgroundColor?: string;
  body?: {
    text: string;
    link?: string;
    linkText?: string;
  };
  // [TO-DO] In future iteration we will add a button to CTA section with popover functionality
  callToAction?: {
    text?: string;
  };
  logo?: string;
  subheadline?: string;
  title?: string;
  variant?: (typeof VARIANT)[keyof typeof VARIANT];
};

const BpkInsetBanner = ({
  accessibilityLabel,
  backgroundColor = surfaceHighlightDay,
  body,
  callToAction,
  logo,
  subheadline,
  title,
  variant = VARIANT.onLight,
}: Props) => {
  const classNames = getClassName(
    'bpk-inset-banner',
    `bpk-inset-banner--${variant}`,
    body && 'bpk-inset-banner--with-body',
  );

  return (
    <div>
      <div
        aria-label={accessibilityLabel}
        className={classNames}
        style={{
          backgroundColor,
        }}
      >
        <div className={getClassName('bpk-inset-banner--content-container')}>
          {logo && (
            <img
              className={getClassName('bpk-inset-banner--image')}
              src={logo}
              alt=""
              aria-hidden
            />
          )}
          <div className={getClassName('bpk-inset-banner--text-container')}>
            <BpkText textStyle={TEXT_STYLES.label2}>{title}</BpkText>
            <BpkText textStyle={TEXT_STYLES.caption}>{subheadline}</BpkText>
          </div>
        </div>
        <div className={getClassName('bpk-inset-banner--cta-container')}>
          {callToAction?.text && (
            <BpkText textStyle={TEXT_STYLES.caption}>
              {callToAction.text}
            </BpkText>
          )}
        </div>
      </div>
      {body && (
        <div className={getClassName('bpk-inset-banner-body-container')}>
          <BpkText textStyle={TEXT_STYLES.caption}>{body.text}</BpkText>
          {body.link && body.linkText && (
            <a
              href={body.link}
              className={getClassName(
                'bpk-inset-banner-body-container--link-text',
              )}
            >
              <BpkText textStyle={TEXT_STYLES.caption}>{body.linkText}</BpkText>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default BpkInsetBanner;
