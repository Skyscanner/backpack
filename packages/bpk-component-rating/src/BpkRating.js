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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash.clamp';

import { cssModules } from '../../bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

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

type Props = {
  ariaLabel: string,
  className: ?string,
  ratingScale: $Values<typeof RATING_SCALES>,
  showScale: ?boolean,
  size: $Values<typeof RATING_SIZES>,
  subtitle: ?string,
  title: string | Node,
  value: string | number,
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

  const classNames = getClassName(
    'bpk-rating',
    className,
    size === RATING_SIZES.large && subtitle && 'bpk-rating--large',
  );
  const valueStyles = getClassName('bpk-rating__value');
  const scaleStyles = getClassName('bpk-rating__scale');
  const textWrapperStyles = getClassName(
    'bpk-rating__text-wrapper',
    size === RATING_SIZES.large && 'bpk-rating__text-wrapper--large',
  );
  const titleStyles = getClassName(
    size === RATING_SIZES.large && 'bpk-rating__title--large',
  );
  const subtitleStyles = getClassName(
    'bpk-rating__subtitle',
    size === RATING_SIZES.large && 'bpk-rating__subtitle--large',
  );

  let valueTextSize = TEXT_STYLES.label1;
  let scaleTextSize = TEXT_STYLES.caption;
  let titleTextSize = TEXT_STYLES.label1;
  let subtitleTextSize = TEXT_STYLES.caption;

  if (size === RATING_SIZES.large) {
    valueTextSize = TEXT_STYLES.hero5;
    scaleTextSize = TEXT_STYLES.bodyDefault;
    titleTextSize = TEXT_STYLES.heading5;
    subtitleTextSize = TEXT_STYLES.bodyDefault;
  }

  const minValue = getMinValue();
  const maxValue = getMaxValue(ratingScale);

  let adjustedValue = value;

  if (adjustedValue >= maxValue || adjustedValue <= minValue) {
    adjustedValue = clamp(adjustedValue, minValue, maxValue);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div className={classNames} aria-label={ariaLabel} role="figure" {...rest}>
      <BpkText
        textStyle={valueTextSize}
        tagName="span"
        className={valueStyles}
        aria-hidden="true"
      >
        {adjustedValue}

        {showScale && (
          <BpkText
            textStyle={scaleTextSize}
            className={scaleStyles}
            tagName="span"
            aria-hidden="true"
          >
            /{maxValue}
          </BpkText>
        )}
      </BpkText>

      <div className={textWrapperStyles}>
        <BpkText
          textStyle={titleTextSize}
          className={titleStyles}
          tagName="span"
          aria-hidden="true"
        >
          {title}
        </BpkText>

        {subtitle && (
          <BpkText
            className={subtitleStyles}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
