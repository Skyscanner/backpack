/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableHeadCell,
  BpkTableCell,
} from 'bpk-component-table';

import { formatTokenName, getTokenValue } from './../../helpers/tokens-helper';

const TokenTable = props => {
  const { tokens, platform } = props;

  const selectedTokens = tokens[platform] || {};
  const keys = Object.keys(selectedTokens);
  return (
    <BpkTable alternate>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell alternate>Name</BpkTableHeadCell>
          <BpkTableHeadCell alternate>Value</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        {!keys.length && (
          <BpkTableRow key="notAvailable">
            <BpkTableCell colSpan="2">N/A</BpkTableCell>
          </BpkTableRow>
        )}
        {!!keys.length &&
          keys.map(tokenName => {
            const token = selectedTokens[tokenName];
            return (
              <BpkTableRow key={tokenName}>
                <BpkTableCell>{formatTokenName(tokenName)}</BpkTableCell>
                <BpkTableCell>{getTokenValue(token, platform)}</BpkTableCell>
              </BpkTableRow>
            );
          })}
      </BpkTableBody>
    </BpkTable>
  );
};

TokenTable.propTypes = {
  tokens: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  platform: PropTypes.string,
};

TokenTable.defaultProps = {
  platform: null,
};

export default TokenTable;
