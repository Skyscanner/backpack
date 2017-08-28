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

import React, { Component } from 'react';
import BpkChip from 'bpk-component-chip';
import BpkButton from 'bpk-component-button';
import { spacingSm } from 'bpk-tokens/tokens/base.es6';

export default class DefaultChipContainer extends Component {
  constructor() {
    super();

    this.removeChip = this.removeChip.bind(this);
    this.addRemovableChip = this.addRemovableChip.bind(this);

    this.state = {
      chipNames: ['Example Chip 1', 'Example Chip 2'],
      nextChipId: 3,
    };
  }

  addRemovableChip() {
    const newChipNames = this.state.chipNames.slice(0);
    newChipNames.push(`Example Chip ${this.state.nextChipId}`);
    this.setState({
      chipNames: newChipNames,
      nextChipId: this.state.nextChipId + 1,
    });
  }

  removeChip(chipName) {
    const newChipNames = this.state.chipNames.slice(0);
    const indexToRemove = newChipNames.indexOf(chipName);
    newChipNames.splice(indexToRemove, 1);
    this.setState({
      chipNames: newChipNames,
    });
  }

  render() {
    return (
      <div>
        <BpkButton onClick={this.addRemovableChip} >
          Add removable chip!
        </BpkButton>
        <div>
          {this.state.chipNames.map((chipName, index) => (
            <span
              style={{ display: 'inline-block', marginTop: spacingSm, marginRight: spacingSm }}
              key={index.toString()}
            >
              <BpkChip
                onClose={() => this.removeChip(chipName)}
                closeLabel={`Close ${chipName}`}
              >
                {chipName}
              </BpkChip>
            </span>
          ))}
        </div>
      </div>
    );
  }
}
