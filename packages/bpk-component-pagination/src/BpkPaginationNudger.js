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

import PropTypes from 'prop-types';

import {BpkButtonV2, BUTTON_TYPES} from '../../bpk-component-button';
import { withRtlSupport } from '../../bpk-component-icon';
import ArrowLeftIcon from '../../bpk-component-icon/sm/arrow-left';
import ArrowRightIcon from '../../bpk-component-icon/sm/arrow-right';
import { getClassName } from '../../bpk-react-utils';

import STYLES from './BpkPaginationNudger.module.scss';

const AlignedArrowLeftIcon = withRtlSupport(ArrowLeftIcon);
const AlignedArrowRightIcon = withRtlSupport(ArrowRightIcon);

const nudgerIcon = (forward) =>
  forward ? (
    <AlignedArrowRightIcon
      // TODO: className to be removed
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={getClassName(STYLES["bpk-pagination-nudger__icon"])}
    />
  ) : (
    <AlignedArrowLeftIcon
      // TODO: className to be removed
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={getClassName(STYLES["bpk-pagination-nudger__icon"])}
    />
  );

const BpkPaginationNudger = (props) => {
  const { disabled, forward, label, onNudge } = props;

  return (
    (<BpkButtonV2
      type={BUTTON_TYPES.link}
      onClick={onNudge}
      disabled={disabled}
      // TODO: className to be removed
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={getClassName(STYLES["bpk-pagination-nudger"])}
    >
      {nudgerIcon(forward)}
      <span className={getClassName(STYLES["bpk-pagination-nudger__text--hidden"])}>
        {label}
      </span>
    </BpkButtonV2>)
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
