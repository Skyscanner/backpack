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

import { cssModules } from '../../bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';

import { LatLongPropType, type LatLong } from './common-types';
import BpkBasicMapMarker from './BpkBasicMapMarker';
import STYLES from './BpkPriceMarker.module.scss';

const getClassName = cssModules(STYLES);

export const PRICE_MARKER_STATUSES = {
  default: 'default',
  focused: 'focused',
  viewed: 'viewed',
};

type Props = {
  label: string,
  position: LatLong,
  disabled: boolean,
  className: ?string,
  arrowClassName: ?string,
  onClick: ?(event: SyntheticEvent<>) => mixed,
  buttonProps: ?{ [string]: any },
  status: $Keys<typeof PRICE_MARKER_STATUSES>,
};

const BpkPriceMarker = (props: Props) => {
  const {
    arrowClassName,
    buttonProps,
    className,
    disabled,
    label,
    onClick,
    position,
    status,
    ...rest
  } = props;

  const markerWrapperClassNames = getClassName('bpk-price-marker__wrapper');

  const classNames = getClassName(
    'bpk-price-marker',
    `bpk-price-marker-${status}`,
    onClick && 'bpk-price-marker--dynamic',
    className,
    disabled && `bpk-price-marker-disabled`,
  );

  const arrowClassNames = getClassName(
    'bpk-price-marker__arrow',
    `bpk-price-marker__arrow-${status}`,
    arrowClassName,
    disabled && `bpk-price-marker__arrow-disabled`,
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <BpkBasicMapMarker position={position} {...rest}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <button
        type="button"
        className={markerWrapperClassNames}
        onClick={onClick}
        disabled={disabled}
        {...buttonProps}
      >
        <BpkText
          className={classNames}
          textStyle={
            status === PRICE_MARKER_STATUSES.focused
              ? TEXT_STYLES.label1
              : TEXT_STYLES.label2
          }
        >
          {label}
        </BpkText>
        <div className={arrowClassNames} />
      </button>
    </BpkBasicMapMarker>
  );
};

BpkPriceMarker.propTypes = {
  label: PropTypes.string.isRequired,
  position: LatLongPropType.isRequired,
  arrowClassName: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  status: PropTypes.oneOf(Object.keys(PRICE_MARKER_STATUSES)),
  buttonProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkPriceMarker.defaultProps = {
  className: null,
  arrowClassName: null,
  onClick: null,
  disabled: false,
  status: PRICE_MARKER_STATUSES.default,
  buttonProps: null,
};

export default BpkPriceMarker;
