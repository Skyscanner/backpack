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
/* @flow strict */

import React from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash.clamp';
import { cssModules } from 'bpk-react-utils';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';

import STYLES from './BpkRating.module.scss';
import { RATING_SIZES, RATING_SCALES } from './common-types';

const getClassName = cssModules(STYLES);

const getMinValue = () =>
  // Currently the min value is zero no matter what scale is used.
  // If this ever changes, this function should be changed to return
  // different values based on the rating scale.
  0;

const getMaxValue = (ratingScale) => {
  switch (ratingScale) {
    case RATING_SCALES.zeroToFive:
      return 5;
    default:
      return 10;
  }
};

export type Props = {
  ariaLabel: string,
  className: ?string,
  ratingScale: $Values<typeof RATING_SCALES>,
  showScale: ?boolean,
  size: $Values<typeof RATING_SIZES>,
  subtitle: ?string,
  title: string,
  value: number,
};

const BpkRating = (props: Props) => {
  const {
    ariaLabel,
    className,
    ratingScale,
    showScale,
    size,
    subtitle,
    title,
    value,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-rating', className)];
  const scoreStyles = [getClassName('bpk-rating__score')];
  const textWrapperStyles = [getClassName('bpk-rating__text-wrapper')];
  const maxValueStyles = [getClassName('bpk-rating__scale')];
  const subtitleStyles = [getClassName('bpk-rating__subtitle')];

  const titleTextSize = TEXT_STYLES.label1;
  let valueTextSize = TEXT_STYLES.label1;
  let maxValueTextSize = TEXT_STYLES.xs;
  let subtitleTextSize = TEXT_STYLES.caption;

  if (size === RATING_SIZES.large) {
    classNames.push(getClassName('bpk-rating--large'));
    textWrapperStyles.push(getClassName('bpk-rating__text-wrapper--large'));
    subtitleStyles.push(getClassName('bpk-rating__subtitle--large'));

    valueTextSize = TEXT_STYLES.xxxxl;
    maxValueTextSize = TEXT_STYLES.base;
    subtitleTextSize = TEXT_STYLES.base;
  }

  const minValue = getMinValue();
  const maxValue = getMaxValue(ratingScale);

  let adjustedValue = value;

  if (adjustedValue >= maxValue || adjustedValue <= minValue) {
    adjustedValue = clamp(adjustedValue, minValue, maxValue).toFixed(1);
  } else {
    adjustedValue = value.toFixed(1);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div className={classNames.join(' ')} aria-label={ariaLabel} {...rest}>
      <BpkText
        textStyle={valueTextSize}
        tagName="span"
        className={scoreStyles.join(' ')}
        aria-hidden="true"
      >
        {adjustedValue}

        {showScale && (
          <BpkText
            textStyle={maxValueTextSize}
            className={maxValueStyles.join(' ')}
            tagName="span"
            aria-hidden="true"
          >
            /{maxValue}
          </BpkText>
        )}
      </BpkText>

      <div className={textWrapperStyles.join(' ')}>
        <BpkText textStyle={titleTextSize} tagName="span" aria-hidden="true">
          {title}
        </BpkText>

        {subtitle && (
          <BpkText
            className={subtitleStyles.join(' ')}
            textStyle={subtitleTextSize}
            tagName="span"
            aria-hidden="true"
          >
            {subtitle}
          </BpkText>
        )}
      </div>
    </div>
  );
};

BpkRating.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  ratingScale: PropTypes.oneOf(Object.keys(RATING_SCALES)),
  size: PropTypes.oneOf(Object.keys(RATING_SIZES)),
  subtitle: PropTypes.string,
  showScale: PropTypes.bool,
};

BpkRating.defaultProps = {
  className: null,
  ratingScale: RATING_SCALES.zeroToFive,
  size: RATING_SIZES.base,
  subtitle: null,
  showScale: true,
};

export default BpkRating;
