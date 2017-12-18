/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import React from 'react';
import zip from 'lodash/zip';
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableHeadCell,
  BpkTableCell,
} from 'bpk-component-table';

const UsageTable = props => {
  const { data, ...rest } = props;
  const { dos, donts } = data;

  const rows = zip(dos, donts);

  return (
    <BpkTable {...rest}>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>Do&apos;s</BpkTableHeadCell>
          <BpkTableHeadCell>Dont&apos;s</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        {rows.map(cells => (
          <BpkTableRow>
            {cells.map(cell => <BpkTableCell>{cell}</BpkTableCell>)}
          </BpkTableRow>
        ))}
      </BpkTableBody>
    </BpkTable>
  );
};

UsageTable.propTypes = {
  data: PropTypes.shape({
    dos: PropTypes.arrayOf(PropTypes.string.isRequired),
    donts: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default UsageTable;
