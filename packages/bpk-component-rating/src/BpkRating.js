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
import { cssModules } from 'bpk-react-utils';
import BpkText from 'bpk-component-text';

import STYLES from './BpkRating.scss';
// import RATING_SIZES from './BpkRatingSizes'; TODO: make use of this

const getClassName = cssModules(STYLES);
const MEDIUM_RATING_THRESHOLD = 6;
const HIGH_RATING_THRESHOLD = 8;

export type Props = {
  ariaLabel: string,
  title: string,
  subtitle: string,
  // size: string, TODO: make use of this
  value: number,
  className: ?string,
};
const BpkRating = (props: Props) => {
  const { ariaLabel, title, subtitle, value, className } = props;
  const classNames = getClassName('bpk-rating', className);
  // const scoreStyles = [getClassName(`bpk-rating--${size}-rating`)]; TODO: make use of this when we add sizes
  const scoreStyles = [getClassName('bpk-rating--base-rating')];

  if (value >= HIGH_RATING_THRESHOLD) {
    scoreStyles.push(getClassName('bpk-rating--high-rating'));
  } else if (value >= MEDIUM_RATING_THRESHOLD) {
    scoreStyles.push(getClassName('bpk-rating--medium-rating'));
  } else {
    scoreStyles.push(getClassName('bpk-rating--low-rating'));
  }

  return (
    <div>
      <div className={classNames} aria-label={ariaLabel}>
        <BpkText
          textStyle="base"
          tagName="span"
          className={scoreStyles.join(' ')}
          aria-hidden="true"
        >
          <strong>{value}</strong>
        </BpkText>
        <div className={getClassName('bpk-rating--text')}>
          <BpkText textStyle="base" tagName="p" aria-hidden="true">
            <strong>{title}</strong>
          </BpkText>
          <BpkText textStyle="xs" tagName="p" aria-hidden="true">
            {subtitle}
          </BpkText>
        </div>
      </div>
    </div>
  );
};

BpkRating.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  // size: PropTypes.oneOf(Object.keys(RATING_SIZES)), TODO: make use of this
};

BpkRating.defaultProps = {
  className: null,
  // size: RATING_SIZES.base, TODO: make use of this.
};

export default BpkRating;
