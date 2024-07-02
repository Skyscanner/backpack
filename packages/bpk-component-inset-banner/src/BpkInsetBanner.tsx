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

import type { SyntheticEvent } from 'react';

import InfoIcon from '../../bpk-component-icon/sm/information-circle';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkInsetBanner.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  title?: string;
  subheadline?: string;
  logo?: string;
  backgroundColor: string;
  variant: 'onLight' | 'onDark';
  body?: {
    text: string;
    link?: string;
    linkText?: string;
  };
  callToAction?: {
    text: string;
    accessibilityLabel?: string;
    showIcon: boolean;
    onClick?: (event: SyntheticEvent) => unknown;
  };
};

const BpkInsetBanner = ({
  backgroundColor,
  body,
  callToAction,
  logo,
  subheadline,
  title,
  variant,
}: Props) => {
  const classNames = [];
  if (variant === 'onLight') {
    classNames.push('bpk-inset-banner--on-light');
  }
  if (variant === 'onDark') {
    classNames.push('bpk-inset-banner--on-dark');
  }
  if (body) {
    classNames.push('bpk-inset-banner--with-body');
  }

  return (
    <div>
      <div
        className={getClassName('bpk-inset-banner', ...classNames)}
        style={{
          // @ts-expect-error TS is reporting this incorrectly as --background-color is valid
          'background-color': backgroundColor,
        }}
      >
        <div className={getClassName('bpk-inset-banner--content-container')}>
          {logo ? (
            <img
              className={getClassName('bpk-inset-banner--image')}
              src={logo}
              alt=""
              aria-hidden
            />
          ) : null}
          <div className={getClassName('bpk-inset-banner--text-container')}>
            <div className={getClassName('bpk-inset-banner--title')}>
              {title}
            </div>
            <div className={getClassName('bpk-inset-banner--subheadline')}>
              {subheadline}
            </div>
          </div>
        </div>
        <div className={getClassName('bpk-inset-banner--cta-container')}>
          {callToAction && callToAction.showIcon ? (
            <button
              onClick={callToAction.onClick}
              className={getClassName('bpk-inset-banner--cta-button')}
              type="button"
              aria-label={callToAction.accessibilityLabel}
            >
              <div className={getClassName('bpk-inset-banner--cta-text')}>
                {callToAction.text}
              </div>
              <div className={getClassName('bpk-inset-banner--cta-icon')}>
                <InfoIcon />
              </div>
            </button>
          ) : null}
          {callToAction && !callToAction.showIcon ? (
            <div className={getClassName('bpk-inset-banner--cta-text')}>
              {callToAction.text}
            </div>
          ) : null}
        </div>
      </div>
      {body ? (
        <div className={getClassName('bpk-inset-banner-body-container')}>
          {body.text}
          {body.link && body.linkText ? (
            <a
              href={body.link}
              className={getClassName(
                'bpk-inset-banner-body-container--link-text',
              )}
            >
              {body.linkText}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default BpkInsetBanner;
