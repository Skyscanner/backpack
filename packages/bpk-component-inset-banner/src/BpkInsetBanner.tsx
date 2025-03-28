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

import InfoIcon from '../../bpk-component-icon/sm/information-circle';
import BpkPopover from '../../bpk-component-popover/src/BpkPopover';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { cssModules } from '../../bpk-react-utils';

import type { Placement } from '@floating-ui/react';

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
  callToAction?: {
    text?: string;
    popoverMessage?: string;
    popoverPlacement?: Placement;
    buttonCloseLabel?: string;
    buttonA11yLabel?: string;
    popverLabel?: string;
    popoverId?: string;
    labelTitle?: boolean;
    closeBtnIcon?: boolean;
    zIndexCustom?: number;
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
        {callToAction && callToAction.popoverMessage && (
          <div
            role="presentation"
            className={getClassName('bpk-inset-banner--cta-container')}
            onClick={(e) => {
              // Do not propagate the click on the trigger OR popover content up the DOM tree.
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <BpkPopover
              id={callToAction?.popoverId || ''}
              label={callToAction?.popverLabel || ''}
              placement={callToAction?.popoverPlacement || 'bottom'}
              onClose={(e: {
                stopPropagation: () => void;
                preventDefault: () => void;
              } | null) => {         
                  e?.stopPropagation();
                  e?.preventDefault();
              }}
              closeButtonText={callToAction?.buttonCloseLabel}
              closeButtonIcon={callToAction?.closeBtnIcon}
              labelAsTitle={callToAction?.labelTitle}
              zIndexValue={callToAction?.zIndexCustom}
              target={
                <button
                  aria-label={callToAction?.buttonA11yLabel}
                  className={getClassName('bpk-inset-banner--cta-button')}
                  data-testid="ctaBtn"
                  aria-hidden="false"
                  type="button"
                >
                  <div
                    className={getClassName('bpk-inset-banner--cta-content')}
                  >
                    {callToAction?.text && (
                      <BpkText textStyle={TEXT_STYLES.caption}>
                        {callToAction.text}
                      </BpkText>
                    )}

                    <div
                      className={getClassName(
                        'bpk-inset-banner--cta-info-icon',
                      )}
                    >
                      <InfoIcon />
                    </div>
                  </div>
                </button>
              }
            >
              <BpkText tagName="p">{callToAction?.popoverMessage}</BpkText>
            </BpkPopover>
          </div>
        )}
        {callToAction && !callToAction.popoverMessage && callToAction.text && (
          <div className={getClassName('bpk-inset-banner--cta-text')}>
            <BpkText textStyle={TEXT_STYLES.caption}>
              {callToAction.text}
            </BpkText>
          </div>
        )}
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
