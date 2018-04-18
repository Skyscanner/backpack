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
import React, { Component } from 'react';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableHeadCell,
  BpkTableCell,
} from 'bpk-component-table';

import { formatTokenName, getTokenValue } from './../../helpers/tokens-helper';

const platforms = {
  web: {
    id: 'web',
    name: 'Web',
  },
  ios: {
    id: 'ios',
    name: 'iOS',
  },
  android: {
    id: 'android',
    name: 'Android',
  },
};

class TokenSwitcher extends Component {
  constructor() {
    super();

    this.state = {
      selectedPlatform: platforms.web.id,
    };
  }

  onChange = id => {
    this.setState(() => ({
      selectedPlatform: id,
    }));
  };

  render() {
    const { tokens } = this.props;
    const { selectedPlatform } = this.state;
    const isNeo = !!process.env.BPK_NEO;

    const selectedTokens = tokens[selectedPlatform] || {};

    return (
      <div>
        <BpkHorizontalNav>
          {Object.keys(platforms).map(platform => {
            const { id, name } = platforms[platform];

            return (
              <BpkHorizontalNavItem
                key={id}
                selected={this.state.selectedPlatform === id}
                onClick={() => this.onChange(id)}
              >
                {name}
              </BpkHorizontalNavItem>
            );
          })}
        </BpkHorizontalNav>
        <br />
        <BpkTable alternate={isNeo}>
          <BpkTableHead>
            <BpkTableRow>
              <BpkTableHeadCell alternate={isNeo}>Name</BpkTableHeadCell>
              <BpkTableHeadCell alternate={isNeo}>Value</BpkTableHeadCell>
            </BpkTableRow>
          </BpkTableHead>
          <BpkTableBody>
            {Object.keys(selectedTokens).map(tokenName => {
              const token = selectedTokens[tokenName];

              return (
                <BpkTableRow key={tokenName}>
                  <BpkTableCell>{formatTokenName(tokenName)}</BpkTableCell>
                  <BpkTableCell>
                    {getTokenValue(token, selectedPlatform)}
                  </BpkTableCell>
                </BpkTableRow>
              );
            })}
          </BpkTableBody>
        </BpkTable>
      </div>
    );
  }
}

TokenSwitcher.propTypes = {
  tokens: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default TokenSwitcher;
