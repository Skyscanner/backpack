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

import { useState } from 'react';

import { cssModules } from '../../bpk-react-utils';

import SEGMENT_TYPES from './segmentTypes';

import type { SegmentTypes } from './segmentTypes';

import STYLES from './BpkSegmentedControl.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  buttonContents: string[];
  type?: SegmentTypes;
  onItemClick: (id: number) => void; // index param to track which one is clicked
  selectedIndex: number;
  shadow?: boolean;
};

const BpkSegmentedControl = ({
  buttonContents,
  onItemClick,
  selectedIndex,
  shadow,
  type = SEGMENT_TYPES.CanvasDefault,
}: Props) => {
  const [selectedButton, setSelectedButton] = useState(selectedIndex);

  const containerStyling = getClassName('bpk-segmented-control-group');

  // onClick - the button is selected, the state of the button changes and styling of button changes
  const handleButtonClick = (id: number) => {
   if (id !== selectedButton) {
      setSelectedButton(id);
      onItemClick(id);
    }
  }

  return (
    <div role="radiogroup" className={containerStyling}>
      {buttonContents.map((content, index) => {
        const isSelected = selectedButton;
        const buttonStyling = getClassName(
          'bpk-segmented-control',
          `bpk-segmented-control--${type}`,
          {
            [`bpk-segmented-control--${type}-selected`]: isSelected,
            [`bpk-segmented-control--${type}-shadow`]: shadow,
            [`bpk-segmented-control--${type}-selected-shadow`]: shadow && isSelected,
          }
        );

        return (
          <button
            id={index}
            type="button"
            onClick={() => handleButtonClick(index)}
            className={buttonStyling}
            aria-pressed={!!isSelected}
            aria-label={content}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default BpkSegmentedControl;

// Q for design
// want the ability for it to specify which one is be selected on load?
