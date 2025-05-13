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

import type { ReactNode } from 'react';
import { useState } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSegmentedControl.module.scss';

const getClassName = cssModules(STYLES);

export const SEGMENT_TYPES = {
  CanvasDefault: 'canvas-default',
  CanvasContrast: 'canvas-contrast',
  SurfaceDefault: 'surface-default',
  SurfaceContrast: 'surface-contrast',
};
export type SegmentTypes = (typeof SEGMENT_TYPES)[keyof typeof SEGMENT_TYPES];

export type Props = {
  buttonContents: string[] | ReactNode[];
  type?: SegmentTypes;
  /*
   * Index parameter to track which is clicked
   */
  onItemClick: (id: number) => void;
  selectedIndex: number;
  shadow?: boolean;
};

const BpkSegmentedControl = ({
  buttonContents,
  onItemClick,
  selectedIndex,
  shadow = false,
  type = SEGMENT_TYPES.CanvasDefault,
}: Props) => {
  const [selectedButton, setSelectedButton] = useState(selectedIndex);
  const handleButtonClick = (id: number) => {
    if (id !== selectedButton) {
      setSelectedButton(id);
      onItemClick(id);
    }
  };
  const containerStyling = getClassName(
    'bpk-segmented-control-group',
    shadow && 'bpk-segmented-control-group-shadow',
  );

  return (
    <div className={containerStyling} role="tablist">
      {buttonContents.map((content, index) => {
        const isSelected = index === selectedButton;
        const rightOfOption = index === selectedButton + 1;
        const buttonStyling = getClassName(
          'bpk-segmented-control',
          `bpk-segmented-control--${type}`,
          isSelected && `bpk-segmented-control--${type}-selected`,
          rightOfOption && `bpk-segmented-control--${type}-rightOfOption`,
          shadow &&
            isSelected &&
            `bpk-segmented-control--${type}-selected-shadow`,
        );

        return (
          <button
            key={`index-${index.toString()}`}
            id={index.toString()}
            type="button"
            role="tab"
            onClick={() => handleButtonClick(index)}
            className={buttonStyling}
            aria-selected={isSelected}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default BpkSegmentedControl;
