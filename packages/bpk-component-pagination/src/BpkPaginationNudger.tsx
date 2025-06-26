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
import { withRtlSupport, withButtonAlignment } from '../../bpk-component-icon';
import ArrowLeftIcon from '../../bpk-component-icon/sm/arrow-left';
import ArrowRightIcon from '../../bpk-component-icon/sm/arrow-right';
import { cssModules } from '../../bpk-react-utils';


import STYLES from './BpkPaginationNudger.module.scss';

const getClassName = cssModules(STYLES);
const AlignedArrowLeftIcon = withRtlSupport(withButtonAlignment(ArrowLeftIcon));
const AlignedArrowRightIcon = withRtlSupport(withButtonAlignment(ArrowRightIcon));

const nudgerIcon = (forward: any) => forward ? (<AlignedArrowRightIcon/>) : (<AlignedArrowLeftIcon/>);

const BpkPaginationNudger = (props: any) => {
  const { disabled, forward, label, onNudge } = props;

  return (
    <div className={getClassName('bpk-pagination-nudger')}>
      <BpkButtonV2
        type={BUTTON_TYPES.link}
        onClick={onNudge}
        disabled={disabled}
      >
        {nudgerIcon(forward)}
        <span className={getClassName('bpk-pagination-nudger__text--hidden')}>
          {label}
        </span>
      </BpkButtonV2>
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
