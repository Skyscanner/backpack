/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
/* @flow strict */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { BpkDismissibleChip } from 'bpk-component-chip';

import BpkAriaLive from './index';

class StatefulChipsWithAriaLive extends React.Component<
  {},
  { categories: { Flights: boolean, Hotels: boolean, 'Car hire': boolean } },
> {
  constructor() {
    super();
    this.state = {
      categories: {
        Flights: true,
        Hotels: true,
        'Car hire': true,
      },
    };
  }

  hideCategory = category => {
    this.setState(prevState => {
      const newState = prevState;
      newState.categories[category] = false;
      return prevState;
    });
  };

  render() {
    return (
      <div>
        <div>
          {Object.keys(this.state.categories).map(
            category =>
              this.state.categories[category] && (
                <BpkDismissibleChip
                  accessibilityLabel={category}
                  onClick={() => {
                    this.hideCategory(category);
                  }}
                >
                  {category}
                </BpkDismissibleChip>
              ),
          )}
        </div>
        <BpkAriaLive visible>
          <p>
            Usually this would be hidden, but it has the &apos;visible&apos;
            prop for demonstration purposes.
          </p>
          {Object.keys(this.state.categories).map(
            category =>
              this.state.categories[category] && (
                <p>
                  <strong>{category}</strong> is enabled.
                </p>
              ),
          )}
        </BpkAriaLive>
      </div>
    );
  }
}

storiesOf('bpk-component-aria-live', module)
  .add('Default', () => (
    <div>
      There is an instance of BpkAriaLive below this text. By default, it&apos;s
      visually hidden so can only be seen using accessibility tools.
      <BpkAriaLive>
        By default the aria-live component is visually hidden and only seen to
        screen readers.
      </BpkAriaLive>
    </div>
  ))
  .add('Visible', () => (
    <BpkAriaLive visible>Some visible aria-live content.</BpkAriaLive>
  ))
  .add('Real-world example', () => (
    <div>
      <StatefulChipsWithAriaLive />
    </div>
  ));
