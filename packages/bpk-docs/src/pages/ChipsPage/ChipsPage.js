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

/* @flow */

import React, { Component } from 'react';
import BpkChip from 'bpk-component-chip';
import BpkButton from 'bpk-component-button';
import { cssModules } from 'bpk-react-utils';
import chipReadme from 'bpk-component-chip/readme.md';

import STYLES from './ChipsPage.scss';
import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/neo/IntroBlurb';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';

const getClassName = cssModules(STYLES);

type State = {
  chipNames: Array<string>,
  nextChipId: number,
};

class DefaultChipContainer extends Component<{}, State> {
  constructor() {
    super();

    this.state = {
      chipNames: ['Example Chip 1', 'Example Chip 2'],
      nextChipId: 3, // eslint-disable-line react/no-unused-state
    };
  }

  addRemovableChip = () => {
    this.setState(state => ({
      chipNames: [...state.chipNames, `Example Chip ${state.nextChipId}`],
      nextChipId: state.nextChipId + 1,
    }));
  };

  removeChip = chipName => {
    this.setState(state => {
      const newChipNames = state.chipNames.slice(0);
      const indexToRemove = newChipNames.indexOf(chipName);

      newChipNames.splice(indexToRemove, 1);

      return { chipNames: newChipNames };
    });
  };

  render() {
    return (
      <div>
        <BpkButton onClick={this.addRemovableChip}>
          Add removable chip!
        </BpkButton>
        <div className={getClassName('bpk-docs-chips-page__chip-container')}>
          {this.state.chipNames.map((chipName, index) => (
            <BpkChip
              closeLabel={`Close ${chipName}`}
              onClose={() => this.removeChip(chipName)}
              className={getClassName('bpk-docs-chips-page__chip')}
              key={index} // eslint-disable-line react/no-array-index-key
            >
              {chipName}
            </BpkChip>
          ))}
        </div>
      </div>
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        The default configuration displays a text value with a close button.
        This button can be assigned a custom action to remove itself from the
        view.
      </Paragraph>,
    ],
    examples: [<DefaultChipContainer />],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <IntroBlurb>
    Chips, sometimes called tags, are useful for displaying keywords or
    categories from common sets of data.
  </IntroBlurb>,
];

const ChipsPage = ({ ...rest }: { [string]: any }) => (
  <DocsPageBuilder
    title="Chips"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={chipReadme}
    {...rest}
  />
);

const NeoChipPage = () => (
  <DocsPageWrapper
    title="Chip"
    blurb={blurb}
    webSubpage={<ChipsPage wrapped />}
  />
);

export default (isNeo ? NeoChipPage : ChipsPage);
