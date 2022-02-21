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
import BpkText, { WEIGHT_STYLES } from 'bpk-component-text';

import STYLES from './BpkRating.module.scss';
import { RATING_SIZES, RATING_TYPES, RATING_SCALES } from './common-types';

const getClassName = cssModules(STYLES);

// The thresholds are what determine whether a rating is low, medium or high.
// They are expressed as a percentage of the scale. For example, on a 1-5 scale,
// 5 * 0.8 (4) would be a high rating.
const MEDIUM_RATING_THRESHOLD = 0.6;
const HIGH_RATING_THRESHOLD = 0.8;

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

const getMediumRatingThreshold = (ratingScale) =>
  getMaxValue(ratingScale) * MEDIUM_RATING_THRESHOLD;

const getHighRatingThreshold = (ratingScale) =>
  getMaxValue(ratingScale) * HIGH_RATING_THRESHOLD;

export type Props = {
  ariaLabel: string,
  ratingScale: $Values<typeof RATING_SCALES>,
  size: $Values<typeof RATING_SIZES>,
  title: string,
  type: $Values<typeof RATING_TYPES>,
  value: number,
  vertical: boolean,
  className: ?string,
  subtitle: ?string,
};

const BpkRating = (props: Props) => {
  const {
    ariaLabel,
    className,
    ratingScale,
    size,
    subtitle,
    title,
    type,
    value,
    vertical,
    ...rest
  } = props;
  const classNames = [getClassName('bpk-rating', className)];
  const scoreStyles = [
    getClassName(
      'bpk-rating__component',
      `bpk-rating--${size}-rating`,
      type === RATING_TYPES.pill && `bpk-rating--${size}-pill`,
    ),
  ];
  const textWrapperStyles = [getClassName('bpk-rating__text-wrapper')];
  const textStyles = [getClassName('bpk-rating__text')];

  let textSize = 'base';
  if (size === RATING_SIZES.lg) {
    textSize = 'lg';
  } else if (size === RATING_SIZES.sm) {
    textSize = 'sm';
  }

  const minValue = getMinValue();
  const maxValue = getMaxValue(ratingScale);

  let adjustedValue = value;

  if (adjustedValue >= getHighRatingThreshold(ratingScale)) {
    scoreStyles.push(getClassName('bpk-rating--high-rating'));
  } else if (adjustedValue >= getMediumRatingThreshold(ratingScale)) {
    scoreStyles.push(getClassName('bpk-rating--medium-rating'));
  } else {
    scoreStyles.push(getClassName('bpk-rating--low-rating'));
  }

  if (vertical) {
    classNames.push(getClassName('bpk-rating--vertical'));
    textWrapperStyles.push(getClassName('bpk-rating__text-wrapper--vertical'));
    textStyles.push(getClassName('bpk-rating__text--vertical'));
  } else {
    textWrapperStyles.push(
      getClassName('bpk-rating__text-wrapper--horizontal'),
    );
    textStyles.push(getClassName('bpk-rating__text--horizontal'));
  }

  if (adjustedValue >= maxValue || adjustedValue <= minValue) {
    adjustedValue = clamp(adjustedValue, minValue, maxValue);
  } else {
    adjustedValue = value.toFixed(1);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div className={classNames.join(' ')} aria-label={ariaLabel} {...rest}>
      <BpkText
        textStyle={textSize}
        tagName="span"
        className={scoreStyles.join(' ')}
        aria-hidden="true"
        weight={WEIGHT_STYLES.bold}
      >
        {adjustedValue}
      </BpkText>
      <div className={textWrapperStyles.join(' ')}>
        <BpkText
          className={textStyles.join(' ')}
          textStyle={textSize}
          tagName="span"
          aria-hidden="true"
        >
          <strong>{title}</strong>{' '}
          {subtitle && type === RATING_TYPES.pill && <span>{subtitle}</span>}
        </BpkText>
        {subtitle && type !== RATING_TYPES.pill && (
          <BpkText
            className={textStyles.join(' ')}
            textStyle={size === RATING_SIZES.lg ? 'sm' : 'xs'}
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
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  ratingScale: PropTypes.oneOf(Object.keys(RATING_SCALES)),
  size: PropTypes.oneOf(Object.keys(RATING_SIZES)),
  subtitle: PropTypes.string,
  type: PropTypes.oneOf([RATING_TYPES.default, RATING_TYPES.pill]),
  vertical: PropTypes.bool,
};

BpkRating.defaultProps = {
  className: null,
  ratingScale: RATING_SCALES.zeroToTen,
  size: RATING_SIZES.base,
  subtitle: null,
  type: RATING_TYPES.default,
  vertical: false,
};

export default BpkRating;
