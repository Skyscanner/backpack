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

import SmallIcon from '../../bpk-component-icon/sm/star';
import LargeIcon from '../../bpk-component-icon/lg/star';
import OutlineSmallIcon from '../../bpk-component-icon/sm/star-outline';
import OutlineLargeIcon from '../../bpk-component-icon/lg/star-outline';
import HalfSmallIcon from '../../bpk-component-icon/sm/star-half';
import HalfLargeIcon from '../../bpk-component-icon/lg/star-half';
import { withRtlSupport } from '../../bpk-component-icon';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkStar.module.scss';

const getClassName = cssModules(STYLES);

export const STAR_TYPES = {
  EMPTY: 'empty',
  HALF: 'half',
  FULL: 'full',
};

type Props = {
  type: $Keys<typeof STAR_TYPES>,
  className: ?string,
  large: boolean,
};

const BpkStar = (props: Props) => {
  const { className, large, type, ...rest } = props;
  const iconClassNames = getClassName(
    'bpk-star',
    large && 'bpk-star--large',
    type === STAR_TYPES.FULL && 'bpk-star--filled',
    className,
  );

  const containerClassNames = getClassName(
    'bpk-star__container',
    'bpk-star__container--half-star',
    large && 'bpk-star__container--large',
    className,
  );

  const halfIconClassNames = getClassName(
    'bpk-star',
    'bpk-star--half',
    'bpk-star--filled',
  );

  let Icon = SmallIcon;
  let OutlineIcon = OutlineSmallIcon;
  let HalfIcon = HalfSmallIcon;

  if (large) {
    Icon = LargeIcon;
    OutlineIcon = OutlineLargeIcon;
    HalfIcon = HalfLargeIcon;
  }

  if (type === STAR_TYPES.HALF) {
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
      <span className={containerClassNames} {...rest}>
        <HalfIcon className={halfIconClassNames} />
      </span>
    );
  }

  return type === STAR_TYPES.FULL ? (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
    <Icon className={iconClassNames} {...rest} />
  ) : (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
    <OutlineIcon className={iconClassNames} {...rest} />
  );
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

export const BpkStarNonRtl = BpkStar;
export default withRtlSupport(BpkStar);
