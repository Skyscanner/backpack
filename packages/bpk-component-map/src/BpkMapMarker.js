/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

/* @flow */

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import ArrowDownIcon from 'bpk-component-icon/sm/arrow-down';

import { LatLongPropType, type LatLong } from './common-types';
import BpkBasicMapMarker from './BpkBasicMapMarker';
import STYLES from './BpkMapMarker.scss';

const getClassName = cssModules(STYLES);

export const MARKER_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
};

export type MarkerType = $Keys<typeof MARKER_TYPES>;

type Props = {
  icon: Node,
  position: LatLong,
  type: MarkerType,
  className: ?string,
  arrowClassName: ?string,
  large: ?boolean,
  onClick: ?(event: SyntheticEvent<>) => mixed,
};

const BpkMapMarker = (props: Props) => {
  const {
    icon,
    position,
    className,
    arrowClassName,
    large,
    onClick,
    type,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-map-marker',
    `bpk-map-marker--${type}`,
    onClick && 'bpk-map-marker--dynamic',
    large && 'bpk-map-marker--large',
    className,
  );

  const arrowClassNames = getClassName('bpk-map-marker__arrow', arrowClassName);

  return (
    <BpkBasicMapMarker position={position} {...rest}>
      <button
        type="button"
        className={getClassName('bpk-map-marker__wrapper')}
        onClick={onClick}
      >
        <div className={classNames}>{icon}</div>
        <div className={arrowClassNames}>
          <ArrowDownIcon />
        </div>
      </button>
    </BpkBasicMapMarker>
  );
};

BpkMapMarker.propTypes = {
  icon: PropTypes.node.isRequired,
  position: LatLongPropType.isRequired,
  className: PropTypes.string,
  arrowClassName: PropTypes.string,
  large: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.keys(MARKER_TYPES)),
};

BpkMapMarker.defaultProps = {
  className: null,
  arrowClassName: null,
  large: false,
  onClick: null,
  type: MARKER_TYPES.primary,
};

export default BpkMapMarker;
