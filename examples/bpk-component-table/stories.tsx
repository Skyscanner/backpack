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


import BpkTable from '../../packages/bpk-component-table/src/BpkTable';
import BpkTableBody from '../../packages/bpk-component-table/src/BpkTableBody';
import BpkTableCell from '../../packages/bpk-component-table/src/BpkTableCell';
import BpkTableHead from '../../packages/bpk-component-table/src/BpkTableHead';
import BpkTableHeadCell from '../../packages/bpk-component-table/src/BpkTableHeadCell';
import BpkTableRow from '../../packages/bpk-component-table/src/BpkTableRow';

import DefaultExample, { WordBreakExample } from './examples';

export default {
  title: 'bpk-component-table',
  component: BpkTable,
  subcomponents: {
    BpkTableHead,
    BpkTableBody,
    BpkTableRow,
    BpkTableHeadCell,
    BpkTableCell,
  },
};

export const Default = DefaultExample;
export const WordBreak = WordBreakExample;
