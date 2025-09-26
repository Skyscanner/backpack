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

import BpkBottomSheet from '../../../bpk-component-bottom-sheet';
import ViewIcon from '../../../bpk-component-icon/lg/view';
import InfoIcon from '../../../bpk-component-icon/sm/information-circle';
import BpkImage from '../../../bpk-component-image';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text/src/BpkText';
import { cssModules } from '../../../bpk-react-utils';

import { VARIANT, type CommonProps } from './common-types';

import STYLES from './BpkInsetBannerSponsored.module.scss';

const getClassName = cssModules(STYLES);

const BpkInsetBannerSponsored = ({
  accessibilityLabel,
  adInfoA11yLabel = '',
  ariaAdScenicA11yLabel = '',
  backgroundColor = surfaceHighlightDay,
  callToAction,
  image,
  logo,
  subheadline,
  title,
  variant = VARIANT.onLight,
}: CommonProps) => {
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
        <div className={getClassName('bpk-inset-banner--logo')}>
          {logo && (
            <img
              className={getClassName('bpk-inset-banner--image')}
              src={logo}
              alt={ariaAdScenicA11yLabel}
            />
          )}
        </div>
        <div className={getClassName('bpk-inset-banner--text-container')}>
          <BpkText textStyle={TEXT_STYLES.label2}>{title}</BpkText>
          <BpkText textStyle={TEXT_STYLES.caption}>{subheadline}</BpkText>
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
              className={getClassName('bpk-inset-banner--cta-button')}
              data-testid="ctaBtn"
              aria-hidden="false"
              type="button"
              onClick={() => setSheetOpen(true)}
            >
              <div className={getClassName('bpk-inset-banner--cta-content')}>
                {callToAction?.text && (
                  <BpkText textStyle={TEXT_STYLES.caption}>
                    {callToAction.text}
                  </BpkText>
                )}

                <div
                  className={getClassName('bpk-inset-banner--cta-info-icon')}
                  aria-label={adInfoA11yLabel}
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
              closeOnScrimClick
              closeOnEscPressed
              paddingType='base'
            >
              {callToAction.bottomSheetContent.map((item, index) => (
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
                    data-testid="bottom-sheet-icon-container"
                  >
                    {index === 0 ? (
                      <ViewIcon height={24} width={24} data-testid="view-icon" />
                    ) : (
                      callToAction.bottomSheetContent.length > 1 && <InfoIcon height={24} width={24} data-testid="info-icon" />
                    )}
                  </div>
                  <div
                    className={getClassName(
                      'bpk-inset-banner--bottom-sheet-text',
                    )}
                  >
                    <div
                      className={getClassName(
                        'bpk-inset-banner--bottom-sheet-title',
                      )}
                    >
                      <BpkText textStyle={TEXT_STYLES.heading4}>
                        {item.title}
                      </BpkText>
                    </div>
                    <div
                      className={getClassName(
                        'bpk-inset-banner--bottom-sheet-description',
                      )}
                    >
                      <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                        {item.description}
                      </BpkText>
                    </div>
                  </div>
                </div>
              ))}
            </BpkBottomSheet>
          </div>
        )}
      </div>
      {image && (
        <div className={getClassName('bpk-inset-banner-image-container')}>
          <BpkImage
            src={image.src}
            altText={image.altText}
            aspectRatio={image.aspectRatio}
          />
        </div>
      )}
    </div>
  );
};

export default BpkInsetBannerSponsored;
