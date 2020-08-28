/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import STYLES from './BpkRating.scss';
import { RATING_SIZES, RATING_TYPES } from './common-types';

const getClassName = cssModules(STYLES);
const MEDIUM_RATING_THRESHOLD = 6;
const HIGH_RATING_THRESHOLD = 8;
const MAX_VALUE = 10;
const MIN_VALUE = 0;

export type Props = {
  ariaLabel: string,
  title: string,
  value: number,
  className: ?string,
  size: $Values<typeof RATING_SIZES>,
  subtitle: ?string,
  type: $Values<typeof RATING_TYPES>,
  vertical: boolean,
};

const BpkRating = (props: Props) => {
  const {
    ariaLabel,
    title,
    subtitle,
    value,
    className,
    size,
    type,
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

  let adjustedValue = value;

  if (adjustedValue >= HIGH_RATING_THRESHOLD) {
    scoreStyles.push(getClassName('bpk-rating--high-rating'));
  } else if (adjustedValue >= MEDIUM_RATING_THRESHOLD) {
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

  if (adjustedValue >= MAX_VALUE || adjustedValue <= MIN_VALUE) {
    adjustedValue = clamp(adjustedValue, MIN_VALUE, MAX_VALUE);
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
  size: PropTypes.oneOf(Object.keys(RATING_SIZES)),
  subtitle: PropTypes.string,
  type: PropTypes.oneOf([RATING_TYPES.default, RATING_TYPES.pill]),
  vertical: PropTypes.bool,
};

BpkRating.defaultProps = {
  className: null,
  size: RATING_SIZES.base,
  subtitle: null,
  type: RATING_TYPES.default,
  vertical: false,
};

export default BpkRating;
