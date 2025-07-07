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

import type { ReactNode } from 'react';

import clamp from 'lodash.clamp';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { RATING_SIZES, RATING_SCALES } from './common-types';

import STYLES from './BpkRating.module.scss';

const getClassName = cssModules(STYLES);

const getMinValue = () =>
  // Currently the min value is zero no matter what scale is used.
  // If this ever changes, this function should be changed to return
  // different values based on the rating scale.
  0;

type ValueOf<T> = T[keyof T];
const getMaxValue = (ratingScale: ValueOf<typeof RATING_SCALES>) => {
  switch (ratingScale) {
    case RATING_SCALES.zeroToFive:
      return 5;
    default:
      return 10;
  }
};

type Props = {
  ariaLabel: string,
  className?: string,
  ratingScale: ValueOf<typeof RATING_SCALES>,
  showScale?: boolean,
  size: ValueOf<typeof RATING_SIZES>,
  subtitle?: string,
  title?: string | ReactNode,
  value: string | number,
  [rest: string]: any
};

const BpkRating = ({
  ariaLabel,
  className,
  ratingScale = RATING_SCALES.zeroToFive,
  showScale = true,
  size = RATING_SIZES.base,
  subtitle = undefined,
  title = null,
  value,
  ...rest
}: Props) => {

  const classNames = getClassName(
    'bpk-rating',
    className,
    size === RATING_SIZES.large && title && subtitle && 'bpk-rating--large',
  );
  const valueStyles = getClassName('bpk-rating__value');
  const scaleStyles = getClassName('bpk-rating__scale');
  const textWrapperStyles = getClassName(
    'bpk-rating__text-wrapper',
    size === RATING_SIZES.large && 'bpk-rating__text-wrapper--large',
  );
  const titleStyles = getClassName(
    subtitle && 'bpk-rating__title--with-subtitle',
  );
  const subtitleStyles = getClassName(
    'bpk-rating__subtitle',
  );

  let valueTextSize: ValueOf<typeof TEXT_STYLES> = TEXT_STYLES.label1;
  let scaleTextSize: ValueOf<typeof TEXT_STYLES> = TEXT_STYLES.caption;
  let titleTextSize: ValueOf<typeof TEXT_STYLES> = TEXT_STYLES.label1;
  let subtitleTextSize: ValueOf<typeof TEXT_STYLES> = TEXT_STYLES.caption;

  if (size === RATING_SIZES.large) {
    valueTextSize = TEXT_STYLES.hero5;
    scaleTextSize = TEXT_STYLES.bodyDefault;
    titleTextSize = TEXT_STYLES.heading5;
    subtitleTextSize = TEXT_STYLES.bodyDefault;
  }

  const minValue = getMinValue();
  const maxValue = getMaxValue(ratingScale);

  let adjustedValue = value;

  if(typeof adjustedValue === "number") {
    if (adjustedValue >= maxValue || adjustedValue <= minValue) {
      adjustedValue = clamp(adjustedValue, minValue, maxValue);
    }
  }

  return (
    <div className={classNames} aria-label={ariaLabel} role="figure" {...rest}>
      <div className={valueStyles}>
        <BpkText
          textStyle={valueTextSize}
          tagName="span"
          aria-hidden="true"
        >
          {adjustedValue}
        </BpkText>
        {showScale && (
          <BpkText
            textStyle={scaleTextSize}
            tagName="span"
            aria-hidden="true"
          >
            <span className={scaleStyles}>/{maxValue}</span>
          </BpkText>
        )}
      </div>

      <div className={textWrapperStyles}>
        {title && (
          <span className={titleStyles}>
            <BpkText
              textStyle={titleTextSize}
              tagName="span"
              aria-hidden="true"
            >
              {title}
            </BpkText>
          </span>
        )}

        {subtitle && (<span className={subtitleStyles}>
          <BpkText
            textStyle={subtitleTextSize}
            tagName="span"
            aria-hidden="true"
          >
            {subtitle}
          </BpkText>
          </span>
        )}
      </div>
    </div>
  );
};

export default BpkRating;
