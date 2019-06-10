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
  plain: 'plain',
};

export type MarkerType = $Keys<typeof MARKER_TYPES>;

type Props = {
  icon: Node,
  position: LatLong,
  selected: boolean,
  type: MarkerType,
  className: ?string,
  arrowClassName: ?string,
  large: ?boolean,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  buttonProps: ?{ [string]: any },
};

const BpkMapMarker = (props: Props) => {
  const {
    icon,
    position,
    className,
    arrowClassName,
    large,
    selected,
    onClick,
    type,
    buttonProps,
    ...rest
  } = props;

  const classNames = getClassName(
    'bpk-map-marker',
    `bpk-map-marker--${type}`,
    onClick && 'bpk-map-marker--dynamic',
    large && 'bpk-map-marker--large',
    selected && `bpk-map-marker--${type}-selected`,
    className,
  );

  const arrowClassNames = getClassName(
    'bpk-map-marker__arrow',
    selected && `bpk-map-marker__arrow--${type}-selected`,
    arrowClassName,
  );

  return (
    <BpkBasicMapMarker position={position} {...rest}>
      <button
        type="button"
        className={getClassName('bpk-map-marker__wrapper')}
        onClick={onClick}
        {...buttonProps}
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
  arrowClassName: PropTypes.string,
  className: PropTypes.string,
  large: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(MARKER_TYPES)),
  buttonProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkMapMarker.defaultProps = {
  className: null,
  arrowClassName: null,
  large: false,
  onClick: null,
  selected: false,
  type: MARKER_TYPES.primary,
  buttonProps: null,
};

export default BpkMapMarker;
