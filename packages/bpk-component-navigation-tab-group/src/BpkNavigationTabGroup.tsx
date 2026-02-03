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
// @ts-nocheck

import type { MouseEvent, FunctionComponent, ReactElement } from 'react';
import { useState } from 'react';

import BpkBubble from '../../bpk-component-bubble/src/BpkBubble';
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

type TabWrapItem = {
  id: string;
  href?: string;
  [rest: string]: any;
};

type TabItem = TabWrapItem & {
  text: string;
  icon?: FunctionComponent<any> | null;
  badgeText?: string;
};
export type Props = {
  id: string;
  tabs: TabItem[];
  type?: NavigationTabGroupTypes;
  /*
   * Index parameter to track which is clicked
   */
  onItemClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,tab: TabItem, index: number) => void;
  selectedIndex: number;
  ariaLabel: string;
};

type TabWrapProps = {
  tab: TabWrapItem;
  type: NavigationTabGroupTypes;
  selected: boolean;
  children: ReactElement;
  onClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

const TabWrap = ({ children, onClick, selected, tab, type }: TabWrapProps) => {
  const tabStyling = getClassName(
    'bpk-navigation-tab-wrap',
    `bpk-navigation-tab-wrap--${type}`,
    selected && `bpk-navigation-tab-wrap--${type}-selected`,
  );

  return tab.href ? (
    <a
      {...tab}
      id={tab.id}
      className={tabStyling}
      href={tab.href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => onClick(e)}
      role="tab"
      aria-selected={selected}
    >
      {children}
    </a>
  ) : (
    <button
      {...tab}
      id={tab.id}
      className={tabStyling}
      type="button"
      onClick={(e: MouseEvent<HTMLButtonElement>) => onClick(e)}
      role="tab"
      aria-selected={selected}
    >
      {children}
    </button>
  );
};

const BpkNavigationTabGroup = ({
  ariaLabel,
  id,
  onItemClick,
  selectedIndex,
  tabs,
  type = NAVIGATION_TAB_GROUP_TYPES.SurfaceContrast,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(selectedIndex);
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>, tab: TabItem, index: number) => {
    if (index !== selectedTab && tab.target !== '_blank') {
      setSelectedTab(index);
    }
    onItemClick(e, tab, index);
  };

  const containerStyling = getClassName('bpk-navigation-tab-group');

  return (
    <nav
      id={id}
      className={containerStyling}
      role="navigation"
      aria-label={ariaLabel}
    >
      <div role="tablist" className={getClassName('bpk-navigation-tab-list')}>
        {tabs.map((tab, index) => {
          const selected = index === selectedTab;
          const {badgeText,icon,text,...tabWrapItem} = tab;
          const Icon = icon;
          return (
            <TabWrap
              key={`index-${index.toString()}`}
              tab={tabWrapItem}
              selected={selected}
              onClick={(e) => handleButtonClick(e, tab, index)}
              type={type}
            >
              <>
                <div className={getClassName('bpk-navigation-tab-content-wrapper')}>
                  {Icon && (
                    <span
                      className={getClassName(
                        'bpk-navigation-tab-icon',
                        `bpk-navigation-tab-icon--${type}`,
                        selected && `bpk-navigation-tab-icon--${type}-selected`,
                      )}
                    >
                      <Icon />
                    </span>)}

                    <BpkText tagName="span" textStyle={TEXT_STYLES.label2}>
                      {text}
                    </BpkText>
                </div>

                {badgeText && (
                  <span className={getClassName('bpk-navigation-tab-bubble-wrapper')}>
                    <BpkBubble>
                      {badgeText}
                    </BpkBubble>
                  </span>)}
              </>
            </TabWrap>);
        })}
      </div>
    </nav>
  );
};

export default BpkNavigationTabGroup;
