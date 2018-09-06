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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';

import ArrowLeftIcon from 'bpk-component-icon/lg/arrow-left';
import ArrowRightIcon from 'bpk-component-icon/lg/arrow-right';

import STYLES from './bpk-pagination-nudger.css';

const getClassName = cssModules(STYLES);
const AlignedArrowLeftIcon = withButtonAlignment(withRtlSupport(ArrowLeftIcon));
const AlignedArrowRightIcon = withButtonAlignment(
  withRtlSupport(ArrowRightIcon),
);

const nudgerIcon = forward =>
  forward ? (
    <AlignedArrowRightIcon
      className={getClassName('bpk-pagination-nudger__icon')}
    />
  ) : (
    <AlignedArrowLeftIcon
      className={getClassName('bpk-pagination-nudger__icon')}
    />
  );

const BpkPaginationNudger = props => {
  const { label, onNudge, forward, disabled } = props;

  return (
    <div className={getClassName('bpk-pagination-nudger')}>
      <button
        type="button"
        className={getClassName('bpk-pagination-nudger__button')}
        onClick={onNudge}
        disabled={disabled}
      >
        {nudgerIcon(forward)}
        <span className={getClassName('bpk-pagination-nudger__text--hidden')}>
          {label}
        </span>
      </button>
    </div>
  );
};

BpkPaginationNudger.propTypes = {
  label: PropTypes.string.isRequired,
  onNudge: PropTypes.func.isRequired,
  forward: PropTypes.bool,
  disabled: PropTypes.bool,
};

BpkPaginationNudger.defaultProps = {
  forward: false,
  disabled: false,
};

export default BpkPaginationNudger;
