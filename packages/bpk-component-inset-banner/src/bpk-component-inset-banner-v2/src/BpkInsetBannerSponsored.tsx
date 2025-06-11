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
import { useState } from 'react';

import { surfaceHighlightDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBottomSheet from '../../../../bpk-component-bottom-sheet';
import ViewIcon from '../../../../bpk-component-icon/lg/view';
import InfoIcon from '../../../../bpk-component-icon/sm/information-circle';
import BpkImage from '../../../../bpk-component-image';
import BpkText, { TEXT_STYLES } from '../../../../bpk-component-text/src/BpkText';
import { cssModules } from '../../../../bpk-react-utils';

import STYLES from './BpkInsetBannerSponsored.module.scss';

const getClassName = cssModules(STYLES);

export const VARIANT = {
  onLight: 'on-light',
  onDark: 'on-dark',
};
type callToActionType = {
  text?: string;
  bottomSheetContent: Array<{
    title: string;
    description: string;
  }>;
  bottomSheetTitle?: string;
  buttonCloseLabel?: string;
  buttonA11yLabel?: string;
  bottomSheetLabel?: string;
  bottomSheetId?: string;
  bottomSheetWidth?: string;
  bottomSheetMarginStart?: string;
  bottomSheetMarginEnd?: string;
  bottomSheetA11yLabel?: string;
  labelTitle?: boolean;
  closeBtnIcon?: boolean;
  zIndexCustom?: number;
}

export type Props = {
  accessibilityLabel?: string;
  backgroundColor?: string;
  callToAction?: callToActionType & {bottomSheetContent: callToActionType['bottomSheetContent']};
  logo?: string;
  subheadline?: string;
  title?: string;
  variant?: (typeof VARIANT)[keyof typeof VARIANT];
  image?: {
    src: string;
    altText: string;
    aspectRatio: number;
  }
};

export const BpkInsetBannerSponsored = ({
  accessibilityLabel,
  backgroundColor = surfaceHighlightDay,
  callToAction,
  image,
  logo,
  subheadline,
  title,
  variant = VARIANT.onLight,
}: Props) => {
  const classNames = getClassName(
    'bpk-inset-banner',
    `bpk-inset-banner--${variant}`,
    image && 'bpk-inset-banner--with-image',
  );

  const [sheetOpen, setSheetOpen] = useState(false);

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
        {callToAction && callToAction.bottomSheetContent && (
          <div
            role="presentation"
            className={getClassName('bpk-inset-banner--cta-container')}
            onClick={(e) => {
              // Do not propagate the click on the trigger OR bottomSheet content up the DOM tree.
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <button
              aria-label={callToAction?.buttonA11yLabel}
              className={getClassName('bpk-inset-banner--cta-button')}
              data-testid="ctaBtn"
              aria-hidden="false"
              type="button"
              onClick={() => setSheetOpen(true)}
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
            <BpkBottomSheet
              id="InsetBannerBottomSheet"
              isOpen={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title={callToAction?.bottomSheetTitle || ''}
              closeLabel="Close bottom sheet"
              ariaLabel={callToAction?.bottomSheetA11yLabel || ''}
            >
              {
                callToAction.bottomSheetContent.map((item, index) => (
                  <div
                    key={item.title}
                    className={getClassName(
                      'bpk-inset-banner--bottom-sheet-content',
                    )}
                  >
                    <div
                      className={getClassName(
                        'bpk-inset-banner--bottom-sheet-icon',
                      )}
                    >
                      {index === 0 ? <ViewIcon height={24} width={24} /> : <InfoIcon height={24} width={24}/>}
                    </div>
                    <div className={getClassName('bpk-inset-banner--bottom-sheet-text')}>
                      <div className={getClassName('bpk-inset-banner--bottom-sheet-title')}>
                        <BpkText textStyle={TEXT_STYLES.heading4}>
                          {item.title}
                        </BpkText>
                      </div>
                      <div className={getClassName('bpk-inset-banner--bottom-sheet-description')}>
                        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                          {item.description}
                        </BpkText>
                      </div>
                    </div>
                  </div>
                ))
              }
            </BpkBottomSheet>
          </div>
        )}
      </div>
      {image && (
        <div className={getClassName('bpk-inset-banner-image-container')} >
          <BpkImage src={image.src} altText={image.altText} aspectRatio={image.aspectRatio} />
        </div>
      )}
    </div>
  );
};
