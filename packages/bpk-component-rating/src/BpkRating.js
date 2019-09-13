/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import BpkText from 'bpk-component-text';

import STYLES from './BpkRating.scss';
import RATING_SIZES from './BpkRatingSizes';

const getClassName = cssModules(STYLES);
const MEDIUM_RATING_THRESHOLD = 6;
const HIGH_RATING_THRESHOLD = 8;
const MAX_VALUE = 10;
const MIN_VALUE = 0;

export type Props = {
  ariaLabel: string,
  title: string,
  subtitle: ?string,
  size: string,
  value: number,
  className: ?string,
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
    vertical,
    ...rest
  } = props;
  const classNames = [getClassName('bpk-rating', className)];
  const scoreStyles = [
    getClassName('bpk-rating__component', `bpk-rating--${size}-rating`),
  ];
  const textWrapperStyles = [getClassName('bpk-rating__text-wrapper')];
  const textStyles = [getClassName('bpk-rating__text')];

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
    <div className={classNames.join(' ')} aria-label={ariaLabel} {...rest}>
      <BpkText
        textStyle="base"
        tagName="span"
        className={scoreStyles.join(' ')}
        aria-hidden="true"
      >
        <strong>{adjustedValue}</strong>
      </BpkText>
      <div className={textWrapperStyles.join(' ')}>
        <BpkText
          className={textStyles.join(' ')}
          textStyle={RATING_SIZES[size]}
          tagName="span"
          aria-hidden="true"
        >
          <strong>{title}</strong>
        </BpkText>
        {subtitle && (
          <BpkText
            className={textStyles.join(' ')}
            textStyle={size === RATING_SIZES.lg ? 'base' : 'sm'}
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
  vertical: PropTypes.bool,
};

BpkRating.defaultProps = {
  className: null,
  size: RATING_SIZES.base,
  subtitle: null,
  vertical: false,
};

export default BpkRating;
