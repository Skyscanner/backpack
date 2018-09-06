/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import PropTypes from 'prop-types';
import SmallIcon from 'bpk-component-icon/sm/star';
import LargeIcon from 'bpk-component-icon/lg/star';
import HalfSmallIcon from 'bpk-component-icon/sm/star-half';
import HalfLargeIcon from 'bpk-component-icon/lg/star-half';
import { withRtlSupport } from 'bpk-component-icon';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkStar.css';

const getClassName = cssModules(STYLES);

export const STAR_TYPES = {
  EMPTY: 'empty',
  HALF: 'half',
  FULL: 'full',
};

const BpkStar = props => {
  const { type, large, className, ...rest } = props;
  const iconClassNames = [getClassName('bpk-star')];
  const containerClassNames = [
    'bpk-star__container',
    'bpk-star__container--half-star',
  ].map(getClassName);
  const halfIconClassNamesLeft = [
    'bpk-star',
    'bpk-star--half',
    'bpk-star--filled',
  ].map(getClassName);
  const halfIconClassNamesRight = [
    'bpk-star',
    'bpk-star--half',
    'bpk-star--half-flipped',
  ].map(getClassName);

  let Icon = SmallIcon;
  let HalfIcon = HalfSmallIcon;

  if (large) {
    Icon = LargeIcon;
    HalfIcon = HalfLargeIcon;
    iconClassNames.push(getClassName('bpk-star--large'));
    containerClassNames.push(getClassName('bpk-star__container--large'));
  }

  if (type === STAR_TYPES.HALF) {
    if (className) {
      containerClassNames.push(className);
    }
    return (
      <span className={containerClassNames.join(' ')} {...rest}>
        <HalfIcon className={halfIconClassNamesLeft.join(' ')} />
        <HalfIcon className={halfIconClassNamesRight.join(' ')} />
      </span>
    );
  }

  if (type === STAR_TYPES.FULL) {
    iconClassNames.push(getClassName('bpk-star--filled'));
  }

  if (className) {
    iconClassNames.push(className);
  }

  return <Icon className={iconClassNames.join(' ')} {...rest} />;
};

BpkStar.propTypes = {
  type: PropTypes.oneOf([STAR_TYPES.EMPTY, STAR_TYPES.HALF, STAR_TYPES.FULL])
    .isRequired,
  className: PropTypes.string,
  large: PropTypes.bool,
};

BpkStar.defaultProps = {
  className: null,
  large: false,
};

export default withRtlSupport(BpkStar);
