/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import ArrowDownIcon from 'bpk-component-icon/lg/arrow-down';
import BpkText, {
  WEIGHT_STYLES,
  TEXT_STYLES,
} from 'bpk-component-text/src/BpkText';

import { LatLongPropType, type LatLong } from './common-types';
import BpkBasicMapMarker from './BpkBasicMapMarker';
import STYLES from './BpkPriceMarker.scss';

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
    label,
    position,
    className,
    arrowClassName,
    disabled,
    onClick,
    buttonProps,
    status,
    ...rest
  } = props;

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
        className={getClassName('bpk-price-marker__wrapper')}
        onClick={onClick}
        disabled={disabled}
        {...buttonProps}
      >
        <BpkText
          className={classNames}
          weight={WEIGHT_STYLES.bold}
          textStyle={
            status === PRICE_MARKER_STATUSES.focused
              ? TEXT_STYLES.base
              : TEXT_STYLES.sm
          }
        >
          {label}
        </BpkText>
        <div className={arrowClassNames}>
          <ArrowDownIcon />
        </div>
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
