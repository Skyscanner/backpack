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

/* @flow */

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from 'bpk-component-icon/sm/arrow-down';

import { LatLongPropType, type LatLong } from './common-types';
import BpkBasicMapMarker from './BpkBasicMapMarker';
import STYLES from './BpkMapMarker.scss';

type Props = {
  children: Node,
  position: LatLong,
  themeColor: ?string,
  className: ?string,
  arrowClassName: ?string,
  large: ?boolean,
  onClick: ?(event: SyntheticEvent<>) => mixed,
};

const BpkMapMarker = (props: Props) => {
  const {
    children,
    position,
    themeColor,
    className,
    arrowClassName,
    large,
    onClick,
    ...rest
  } = props;

  const classNames = [
    STYLES['bpk-map-marker'],
    onClick && STYLES['bpk-map-marker--dynamic'],
    large ? STYLES['bpk-map-marker--large'] : null,
    className,
  ];

  const arrowClassNames = [STYLES['bpk-map-marker__arrow'], arrowClassName];

  const bubbleStyle = themeColor ? { backgroundColor: themeColor } : null;

  return (
    <BpkBasicMapMarker position={position} {...rest}>
      <button
        type="button"
        className={STYLES['bpk-map-marker__wrapper']}
        onClick={onClick}
      >
        <div className={classNames.join(' ')} style={bubbleStyle}>
          {children}
        </div>
        <div className={arrowClassNames.join(' ')}>
          <ArrowDownIcon />
        </div>
      </button>
    </BpkBasicMapMarker>
  );
};

BpkMapMarker.propTypes = {
  children: PropTypes.node.isRequired,
  position: LatLongPropType.isRequired,
  themeColor: PropTypes.string,
  className: PropTypes.string,
  arrowClassName: PropTypes.string,
  large: PropTypes.bool,
  onClick: PropTypes.func,
};

BpkMapMarker.defaultProps = {
  themeColor: null,
  className: null,
  arrowClassName: null,
  large: false,
  onClick: null,
};

export default BpkMapMarker;
