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


import { BpkDismissibleChip, BpkDropdownChip } from '../../packages/bpk-component-chip';
import BpkChipGroup, { BpkChipGroupState, BpkChipGroupSingleSelectState, CHIP_GROUP_TYPES } from '../../packages/bpk-component-chip-group';
import { useState } from 'react';
import FilterIconSm from '../../packages/bpk-component-icon/sm/filter';


const chips = [
  {
    text: 'London',
  },
  {
    text: 'Berlin',
  },
  {
    text: 'Florence',
  },
  {
    text: 'Stockholm',
  },
  {
    text: 'Copenhagen',
  },
  {
    text: 'Salzburg',
  },
  {
    text: 'Graz',
  },
  {
    text: 'Lanzarote',
  },
  {
    text: 'Valencia',
  },
  {
    text: 'Reykjavik',
  },
  {
    text: 'Tallinn',
  },
  {
    text: 'Sofia',
  },
]


export const BpkChipGroupWrapping = () => {

  return (
    <div>
      <BpkChipGroupState
        type={CHIP_GROUP_TYPES.wrap}
        chips={chips}
      >
      </BpkChipGroupState>
    </div>
  );
};

export const BpkSingleChipGroupWrapping = () => {
  return (
    <div>
      <BpkChipGroupSingleSelectState
        type={CHIP_GROUP_TYPES.wrap}
        chips={chips}
      >
      </BpkChipGroupSingleSelectState>
    </div>
  );
};


export const BpkChipGroupRail = () => {
  return (
    <div>
      <BpkChipGroupState
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
      />
    </div>
  );
};


export const BpkChipGroupSticky = () => {

  const stickyChip = {
    text: 'Sort & Filter',
    leadingAccessoryView: <FilterIconSm />
  }

  return (
    <div>
      <BpkChipGroupState
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
        stickyChip={stickyChip}
      />
      {/*TODO*/}
      {/*<BpkChipGroupState*/}
      {/*  type={CHIP_GROUP_TYPES.rail}*/}
      {/*  chips={chips}*/}
      {/*  stickyChip={{...stickyChip, text: undefined}}*/}
      {/*/>*/}
    </div>
  );
};
