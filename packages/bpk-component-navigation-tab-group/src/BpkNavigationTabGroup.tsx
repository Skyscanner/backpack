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

import type { FunctionComponent, ReactElement } from 'react';
import { useState } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkNavigationTabGroup.module.scss';

const getClassName = cssModules(STYLES);

export const NAVIGATION_TAB_GROUP_TYPES = {
  CanvasDefault: 'canvas-default',
  SurfaceContrast: 'surface-contrast',
};
export type NavigationTabGroupTypes =
  (typeof NAVIGATION_TAB_GROUP_TYPES)[keyof typeof NAVIGATION_TAB_GROUP_TYPES];

type TabItem = {
  text: string;
  icon?: FunctionComponent<any> | null;
  href?: string;
};
export type Props = {
  tabs: TabItem[];
  type?: NavigationTabGroupTypes;
  /*
   * Index parameter to track which is clicked
   */
  onItemClick: (tab: TabItem, index: number) => void;
  selectedIndex: number;
};

type TabWrapProps = {
  tab: TabItem;
  type: NavigationTabGroupTypes;
  selected: boolean;
  children: ReactElement;
  onClick: () => void;
};

const TabWrap = ({ children, onClick, selected, tab, type }: TabWrapProps) => {
  const tabStyling = getClassName(
    'bpk-navigation-tab-wrap',
    `bpk-navigation-tab-wrap--${type}`,
    selected && `bpk-navigation-tab-wrap--${type}-selected`,
  );

  return tab.href ? (
    <a
      className={tabStyling}
      href={tab.href}
      onClick={onClick}
      aria-current={selected ? 'page' : undefined}
    >
      {children}
    </a>
  ) : (
    <button
      className={tabStyling}
      type="button"
      onClick={onClick}
      aria-current={selected ? 'page' : undefined}
      role='link'
    >
      {children}
    </button>
  );
};

const BpkNavigationTabGroup = ({
  onItemClick,
  selectedIndex,
  tabs,
  type = NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(selectedIndex);
  const handleButtonClick = (tab: TabItem, index: number) => {
    if (index !== selectedTab) {
      setSelectedTab(index);
    }
    onItemClick(tab, index);
  };

  const containerStyling = getClassName('bpk-navigation-tab-group');

  return (
    <nav
      className={containerStyling}
      role="navigation"
      aria-label="Tab Navigation"
    >
      {tabs.map((tab, index) => {
        const selected = index === selectedTab;
        const Icon = tab.icon;
        return (
          <TabWrap
            key={`index-${index.toString()}`}
            tab={tab}
            selected={selected}
            onClick={() => handleButtonClick(tab, index)}
            type={type}
          >
            <>
              {Icon ? (
                <span
                  className={getClassName(
                    'bpk-navigation-tab-icon',
                    `bpk-navigation-tab-icon--${type}`,
                    selected && `bpk-navigation-tab-icon--${type}-selected`,
                  )}
                >
                  <Icon />
                </span>
              ) : null}
              <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
                {tab.text}
              </BpkText>
            </>
          </TabWrap>
        );
      })}
    </nav>
  );
};

export default BpkNavigationTabGroup;
