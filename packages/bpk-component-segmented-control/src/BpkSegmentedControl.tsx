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

import { cssModules } from '../../bpk-react-utils';

import SEGMENT_TYPES from './segmentTypes';

import type { SegmentTypes } from './segmentTypes';

import STYLES from './BpkSegmentedControl.module.scss';


const getClassName = cssModules(STYLES);

export type Props = {
  buttonContents: string[];
  type?: SegmentTypes;
  onItemClick: () => void; // no parameters and no return value here yet
  selectedIndex: number;
  shadow?: boolean;
};

const BpkSegmentedControl = ({
  buttonContents,
  onItemClick, // default value for type
  selectedIndex,
  shadow,
  type = SEGMENT_TYPES.CanvasDefault,
}: Props) => {
  const classNames = getClassName(
    'bpk-segmented-control-group',
    // `bpk-segmented-control-group--${type}`,
    'bpk-segmented-control',
    `bpk-segmented-control--${type}`,
  );

  return (
    <>
        {/*  double check group role is the best one to use */}
      <div role='group' className={classNames}>
      {buttonContents.map((content) => (
        <button
          type="button"
          onClick={onItemClick}
          className={classNames}
        >
          {content}
          </button>
      ))}
      </div>
    </>
  );
};

// TBC if this needed
// BpkSegmentedControl.propTypes = {
//   type: PropTypes.oneOf(Object.keys(SEGMENT_TYPES)),
//   className: PropTypes.string,
// }

// BpkSegmentedControl.defaultProps = {
//   type: SEGMENT_TYPES.CanvasDefault,
//   className: null,
// }
export default BpkSegmentedControl;
