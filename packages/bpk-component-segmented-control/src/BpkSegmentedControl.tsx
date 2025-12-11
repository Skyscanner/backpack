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

import type { KeyboardEvent, ReactNode } from 'react';
import { useId, useMemo, useRef, useState } from 'react';

import { cssModules, isRTL } from '../../bpk-react-utils';

import STYLES from './BpkSegmentedControl.module.scss';

const getClassName = cssModules(STYLES);

export const SEGMENT_TYPES = {
  CanvasDefault: 'canvas-default',
  CanvasContrast: 'canvas-contrast',
  SurfaceDefault: 'surface-default',
  SurfaceContrast: 'surface-contrast',
};
export type SegmentTypes = (typeof SEGMENT_TYPES)[keyof typeof SEGMENT_TYPES];

export type TabPanelProps = {
  id: string;
  role: 'tabpanel';
  'aria-labelledby': string;
  hidden: boolean;
  tabIndex: 0;
};

const getPanelId = (baseId: string, index: number) =>
  `${baseId}-panel-${index}`;

const getTabId = (baseId: string, index: number) => `${baseId}-tab-${index}`;

/**
 * Helper function to get accessibility props for tab panel elements.
 * Use this to ensure proper ARIA relationships between tabs and their panels.
 *
 * Note: For a simpler API, consider using the useSegmentedControlPanels hook instead,
 * which manages IDs automatically and reduces boilerplate.
 * This function is kept for backward compatibility.
 *
 * @param {string} baseId - The base ID used to generate unique IDs for tabs and panels.
 * @param {number} index - The index of the tab panel.
 * @param {number} selectedIndex - The currently selected tab index.
 * @returns {TabPanelProps} An object containing the necessary props for a tab panel.
 */
const getTabPanelProps = (
  baseId: string,
  index: number,
  selectedIndex: number,
): TabPanelProps => ({
  id: getPanelId(baseId, index),
  role: 'tabpanel',
  'aria-labelledby': getTabId(baseId, index),
  hidden: index !== selectedIndex,
  tabIndex: 0,
});

/**
 * Custom hook to manage segmented control and its panels with automatic ID generation.
 * Simplifies the API by eliminating the need to manually track IDs.
 *
 * @param {Array<string | ReactNode>} buttonContents - Array of button content (strings or ReactNodes)
 * @param {number} selectedIndex - Currently selected tab index
 * @returns {Object} Object with controlProps (for BpkSegmentedControl) and getPanelProps function
 */
export const useSegmentedControlPanels = (
  buttonContents: string[] | ReactNode[],
  selectedIndex: number,
) => {
  const baseId = useId();

  const controlProps = useMemo(
    () => ({
      id: baseId,
      buttonContents,
      selectedIndex,
    }),
    [baseId, buttonContents, selectedIndex],
  );

  const getPanelProps = useMemo(
    () =>
      (index: number): TabPanelProps =>
        getTabPanelProps(baseId, index, selectedIndex),
    [baseId, selectedIndex],
  );

  return { controlProps, getPanelProps };
};

export type Props = {
  buttonContents: string[] | ReactNode[];
  /**
   * Accessible label for the segmented control group.
   */
  label?: string;
  /**
   * Optional ID for the segmented control. If not provided, an ID will be auto-generated.
   * Required when manually managing tab panels with getTabPanelProps.
   */
  id?: string;
  type?: SegmentTypes;
  /**
   * Callback fired when a tab is selected. Receives the index of the selected tab.
   */
  onItemClick: (id: number) => void;
  selectedIndex: number;
  shadow?: boolean;
  activationMode?: 'automatic' | 'manual';
};

const BpkSegmentedControl = ({
  activationMode = 'manual',
  buttonContents,
  id: providedId,
  label,
  onItemClick,
  selectedIndex,
  shadow = false,
  type = SEGMENT_TYPES.CanvasDefault,
}: Props) => {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelIds = Array.from({ length: buttonContents.length }, (_, i) =>
    providedId ? getPanelId(providedId, i) : undefined,
  );

  // TODO: Consider removing internal state - component is controlled via selectedIndex prop.
  // Internal state may cause sync issues if selectedIndex changes externally.
  const [selectedButton, setSelectedButton] = useState(selectedIndex);

  const handleButtonClick = (index: number) => {
    if (index !== selectedButton) {
      setSelectedButton(index);
      onItemClick(index);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    const lastIndex = buttonContents.length - 1;
    let newIndex = currentIndex;

    const nextItem = () => {
      newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    };

    const previousItem = () => {
      newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    };

    switch (event.key) {
      case 'ArrowRight':
        if (isRTL()) {
          previousItem();
        } else {
          nextItem();
        }
        break;
      case 'ArrowLeft':
        if (isRTL()) {
          nextItem();
        } else {
          previousItem();
        }
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = lastIndex;
        break;
      case ' ':
      case 'Enter':
        if (activationMode === 'manual') {
          setSelectedButton(currentIndex);
          onItemClick(currentIndex);
        }
        return;
      default:
        return;
    }

    event.preventDefault();
    if (activationMode === 'automatic') {
      setSelectedButton(newIndex);
      onItemClick(newIndex);
    }
    buttonRefs.current[newIndex]?.focus();
  };

  const containerStyling = getClassName(
    'bpk-segmented-control-group',
    shadow && 'bpk-segmented-control-group-shadow',
  );

  return (
    <div
      className={containerStyling}
      role="tablist"
      aria-orientation="horizontal"
      {...(label ? { 'aria-label': label } : {})}
    >
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

        const tabId = providedId ? getTabId(providedId, index) : undefined;
        return (
          <button
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            key={tabId}
            id={tabId}
            type="button"
            role="tab"
            onClick={() => handleButtonClick(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={buttonStyling}
            tabIndex={isSelected ? 0 : -1}
            aria-selected={isSelected}
            aria-controls={panelIds[index]}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default BpkSegmentedControl;
