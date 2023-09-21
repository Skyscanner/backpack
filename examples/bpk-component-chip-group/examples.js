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


import BpkSelectableChip from '../../packages/bpk-component-chip';
import BpkChipGroup, { CHIP_GROUP_TYPES } from '../../packages/bpk-component-chip-group';
import {
  BpkChipGroupMultiSelect,
  BpkChipGroupSingleSelect,
} from '../../packages/bpk-component-chip-group/src/BpkChipGroup';
import { useState } from 'react';
import FilterIconSm from '../../packages/bpk-component-icon/sm/filter';


const chips = [
  {
    text: 'London',
    accessibilityLabel: 'London',
    onClick: () => {},
  },
  {
    text: 'Berlin',
    accessibilityLabel: 'Berlin',
    onClick: () => {},
  },
  {
    text: 'Florence',
    accessibilityLabel: 'Florence',
    onClick: () => {},
  },
  {
    text: 'Stockholm',
    accessibilityLabel: 'Stockholm',
    onClick: () => {},
  },
  {
    text: 'Copenhagen',
    accessibilityLabel: 'Copenhagen',
    onClick: () => {},
  },
  {
    text: 'Salzburg',
    accessibilityLabel: 'Salzburg',
    onClick: () => {},
  },
  {
    text: 'Graz',
    accessibilityLabel: 'Graz',
    onClick: () => {},
  },
  {
    text: 'Lanzarote',
    accessibilityLabel: 'Lanzarote',
    onClick: () => {},
  },
  {
    text: 'Valencia',
    accessibilityLabel: 'Valencia',
    onClick: () => {},
  },
  {
    text: 'Reykjavik',
    accessibilityLabel: 'Copenhagen',
    onClick: () => {},
  },
  {
    text: 'Tallinn',
    accessibilityLabel: 'Tallinn',
    onClick: () => {},
  },
  {
    text: 'Sofia',
    accessibilityLabel: 'Sofia',
    onClick: () => {},
  },
]


export const BpkChipGroupWrapping = () => {

  return (
    <div>
      <BpkChipGroupMultiSelect
        type={CHIP_GROUP_TYPES.wrap}
        chips={chips}
      >
      </BpkChipGroupMultiSelect>
    </div>
  );
};

export const BpkSingleChipGroupWrapping = () => {
  // const [selected]

  return (
    <div>
      <BpkChipGroupSingleSelect
        type={CHIP_GROUP_TYPES.wrap}
        chips={chips}
      >
      </BpkChipGroupSingleSelect>
    </div>
  );
};


export const BpkChipGroupRail = () => {

  return (
    <div>
      <BpkChipGroupMultiSelect
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
      >
      </BpkChipGroupMultiSelect>
    </div>
  );
};


export const BpkChipGroupSticky = () => {

  // const chips = [
  //   {
  //     text: 'London',
  //     accessibilityLabel: 'London',
  //     onClick: () => {},
  //   },
  //   {
  //     text: 'Berlin',
  //     accessibilityLabel: 'Berlin',
  //     onClick: () => {},
  //   },
  //   {
  //     text: 'Florence',
  //     accessibilityLabel: 'Florence',
  //     onClick: () => {},
  //   },
  //   {
  //     text: 'Stockholm',
  //     accessibilityLabel: 'Stockholm',
  //     onClick: () => {},
  //   },
  //   {
  //     text: 'Copenhagen',
  //     accessibilityLabel: 'Copenhagen',
  //     onClick: () => {},
  //   },
  // ]

  const stickyChip = {
    text: 'Sort & Filter',
    accessibilityLabel: 'Sort & Filter',
    leadingAccessoryView: <FilterIconSm />
    // onClick: () => {},
  }

  return (
    <div>
      <BpkChipGroupMultiSelect
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
        onClick={(selected) => setSelected(selected)}
        stickyChip={stickyChip}
      >
      </BpkChipGroupMultiSelect>
    </div>
  );
};
