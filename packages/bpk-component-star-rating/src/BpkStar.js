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

import PropTypes from 'prop-types';

import { withRtlSupport } from '../../bpk-component-icon';
import LargeIcon from '../../bpk-component-icon/lg/star';
import HalfLargeIcon from '../../bpk-component-icon/lg/star-half';
import OutlineLargeIcon from '../../bpk-component-icon/lg/star-outline';
import SmallIcon from '../../bpk-component-icon/sm/star';
import HalfSmallIcon from '../../bpk-component-icon/sm/star-half';
import OutlineSmallIcon from '../../bpk-component-icon/sm/star-outline';
// Notice: The naming of the icons and props are extra large, but the
// actual size is xxxl, 3rem. This is designed on purpose.
import ExtraLargeIcon from '../../bpk-component-icon/xxxl/star';
import HalfExtraLargeIcon from '../../bpk-component-icon/xxxl/star-half';
import OutlineExtraLargeIcon from '../../bpk-component-icon/xxxl/star-outline';
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
  extraLarge: boolean,
};

const BpkStar = ({
  className = null,
  extraLarge = false,
  large = false,
  type,
  ...rest
}: Props) => {
  const iconClassNames = getClassName(
    'bpk-star',
    large && 'bpk-star--large',
    extraLarge && 'bpk-star--extra-large',
    type === STAR_TYPES.FULL && 'bpk-star--filled',
    className,
  );

  const containerClassNames = getClassName(
    'bpk-star__container',
    'bpk-star__container--half-star',
    large && 'bpk-star__container--large',
    extraLarge && 'bpk-star__container--extra-large',
    className,
  );

  const halfIconClassNames = getClassName(
    'bpk-star',
    'bpk-star--half',
    'bpk-star--filled',
  );

  let Icon = SmallIcon;
  let OutlineIcon = OutlineSmallIcon;
  let HalfIcon = withRtlSupport(HalfSmallIcon);

  if (large) {
    Icon = LargeIcon;
    OutlineIcon = OutlineLargeIcon;
    HalfIcon = withRtlSupport(HalfLargeIcon);
  }

  if (extraLarge) {
    Icon = ExtraLargeIcon;
    OutlineIcon = OutlineExtraLargeIcon;
    HalfIcon = withRtlSupport(HalfExtraLargeIcon);
  }

  if (type === STAR_TYPES.HALF) {
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
      <span className={[containerClassNames, halfIconClassNames]} {...rest}>
        <HalfIcon />
      </span>
    );
  }

  return type === STAR_TYPES.FULL ? (
    <span className={iconClassNames}>
      <Icon
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
        {...rest}
      />
    </span>
  ) : (
    <span className={iconClassNames}>
      <OutlineIcon
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md
        {...rest}
      />
    </span>
  );
};

BpkStar.propTypes = {
  type: PropTypes.oneOf([STAR_TYPES.EMPTY, STAR_TYPES.HALF, STAR_TYPES.FULL])
    .isRequired,
  className: PropTypes.string,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

export const BpkStarNonRtl = BpkStar;
export default withRtlSupport(BpkStar);
