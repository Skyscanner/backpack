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

import type { Dispatch, ReactElement, SetStateAction } from 'react';

import { BpkButtonV2 } from '../../../bpk-component-button';
import { cssModules } from '../../../bpk-react-utils';
import BpkExpand from '../BpkExpand';

import STYLES from './BpkCardListGrid.module.scss';

const getClassName = cssModules(STYLES);

type BpkCardListGridProps = {
  accessory?: 'expand' | 'button';
  cardList: ReactElement[];
  expandText?: string;
  showContent: () => void;
  hideContent: () => void;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const BpkCardListGrid = ({
  accessory,
  cardList,
  collapsed,
  expandText,
  hideContent,
  setCollapsed,
  showContent,
}: BpkCardListGridProps) => {
  const cards = cardList.map((card: any, index: number) => (
    <div className={getClassName('bpk-card-list-grid--card')}>{card}</div>
  ));

  return (
    <>
      <div className={getClassName(`bpk-card-list-grid`, 'flex-wrap')}>
        {cards}
      </div>

      {!expandText &&
        (accessory === 'expand' ? (
          <BpkExpand
            showContent={showContent}
            hideContent={hideContent}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        ) : (
          <BpkButtonV2>Action</BpkButtonV2>
        ))}
    </>
  );
};

export default BpkCardListGrid;
