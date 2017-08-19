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
import { BpkChipInput } from 'bpk-component-chip';

export default class DefaultChipInput extends Component {
  constructor() {
    super();

    this.textInputChanged = this.textInputChanged.bind(this);
    this.selectionChanged = this.selectionChanged.bind(this);
    this.addValue = this.addValue.bind(this);
    this.removeValue = this.removeValue.bind(this);

    this.state = {
      chipNames: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
      selectedValue: null,
      textInputValue: '',
    };
  }

  textInputChanged(newValue) {
    this.setState({ textInputValue: newValue });
  }

  selectionChanged(newValue) {
    this.setState({ selectedValue: newValue });
  }

  addValue(newValue) {
    if (this.state.chipNames.indexOf(newValue) < 0) {
      const newChipNames = this.state.chipNames.slice(0);
      newChipNames.push(newValue);
      this.setState({
        chipNames: newChipNames,
      });
    }
  }

  removeValue(removedValue) {
    const newChipNames = this.state.chipNames.slice(0);
    const indexToRemove = newChipNames.indexOf(removedValue);
    newChipNames.splice(indexToRemove, 1);
    this.setState({
      chipNames: newChipNames,
    });
  }

  render() {
    return (
      <BpkChipInput
        values={this.state.chipNames}
        selectedItem={this.state.selectedValue}
        textInputValue={this.state.textInputValue}
        closeLabel={(chipName => `Remove ${chipName}`)}
        onTextInputChanged={newValue => this.textInputChanged(newValue)}
        onSelectionChanged={newValue => this.selectionChanged(newValue)}
        valueAdded={newValue => this.addValue(newValue)}
        valueRemoved={removedValue => this.removeValue(removedValue)}
        placeholderText="Add a chip..."
      />
    );
  }
}
