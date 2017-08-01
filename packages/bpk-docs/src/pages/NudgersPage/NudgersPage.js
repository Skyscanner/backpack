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
import BpkNudger from 'bpk-component-nudger';
import nudgersReadme from 'bpk-component-nudger/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

class NudgerContainer extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 2,
    };
  }
  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <BpkNudger
        id="my-nudger"
        min={1}
        max={10}
        value={this.state.value}
        onChange={this.handleChange}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        Nudgers come with decrease and increase buttons to either side of the selected value. A minimum and maximum
        value needs to be provided.
      </Paragraph>,
    ],
    examples: [
      <NudgerContainer />,
    ],
  },
];

const NudgersPage = () => <DocsPageBuilder
  title="Nudgers"
  blurb={[
    <Paragraph>
      Nudgers allow users to quickly specify a value within a given range.
    </Paragraph>,
    <Paragraph>
      They should only be used for small number ranges. If users have to click many times to get to the desired value,
      a different UI element might be better suited.
    </Paragraph>,
  ]}
  components={components}
  readme={nudgersReadme}
/>;

export default NudgersPage;
