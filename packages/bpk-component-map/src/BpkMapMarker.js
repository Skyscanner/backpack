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

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import BpkMapMarkerBackground from './BpkMapMarkerBackground';
import { LatLongPropType, type LatLong } from './common-types';
import BpkBasicMapMarker from './BpkBasicMapMarker';
import STYLES from './BpkMapMarker.scss';

const getClassName = cssModules(STYLES);

type Props = {
  icon: Node,
  position: LatLong,
  disabled: boolean,
  selected: boolean,
  className: ?string,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  buttonProps: ?{ [string]: any },
};

const BpkMapMarker = (props: Props) => {
  const {
    icon,
    position,
    className,
    disabled,
    selected,
    onClick,
    buttonProps,
    ...rest
  } = props;

  const wrapperClassNames = getClassName(
    'bpk-map-marker__wrapper',
    selected && 'bpk-map-marker__wrapper--selected',
    className,
  );

  const iconClassNames = getClassName(
    'bpk-map-marker__icon',
    onClick && !disabled && 'bpk-map-marker__icon--interactive',
    disabled && 'bpk-map-marker__icon--disabled',
    selected && 'bpk-map-marker__icon--selected',
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkBasicMapMarker position={position} {...rest}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <button
        type="button"
        className={wrapperClassNames}
        onClick={onClick}
        disabled={disabled}
        {...buttonProps}
      >
        <BpkMapMarkerBackground
          disabled={disabled}
          interactive={onClick && !disabled}
          selected={selected}
        />
        <div className={iconClassNames}>{icon}</div>
      </button>
    </BpkBasicMapMarker>
  );
};

BpkMapMarker.propTypes = {
  icon: PropTypes.node.isRequired,
  position: LatLongPropType.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  buttonProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkMapMarker.defaultProps = {
  className: null,
  disabled: false,
  onClick: null,
  selected: false,
  buttonProps: null,
};

export default BpkMapMarker;
