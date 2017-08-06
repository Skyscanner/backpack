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
import { spacingSm } from 'bpk-tokens/tokens/base.es6';

export default class LinkChipContainer extends Component {
  constructor() {
    super();

    this.removeChip = this.removeChip.bind(this);

    this.state = {
      chips: [
        {
          name: 'Bollinger',
          link: 'https://www.champagne-bollinger.com/',
          // background: '#82232c',
          color: '#ffffff',
        },
        {
          name: 'Guinness',
          link: 'https://www.guinness.com/',
          // background: '#000000',
          color: '#d1ae79',
        },
      ],
    };
  }

  removeChip(chipName) {
    const newChips = this.state.chips.filter(obj => obj.name !== chipName);

    this.setState({
      chips: newChips,
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.chips.map((chip, index) => (
            <span
              style={{ display: 'inline-block', marginTop: spacingSm, marginRight: spacingSm }}
              key={index.toString()}
            >
              <BpkChip
                href={chip.link}
                onClose={() => this.removeChip(chip.name)}
                style={{ background: chip.background, color: chip.color }}
              >
                {chip.name}
              </BpkChip>
            </span>
          ))}
        </div>
      </div>
    );
  }
}
