/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React, { type Node } from 'react';
import BpkChip from 'bpk-component-chip';
import BpkParagraph from 'bpk-component-paragraph';
import BpkFieldset from 'bpk-component-fieldset';
import BpkSelect from 'bpk-component-select';
import BpkSwitch from 'bpk-component-switch';
import { cssModules } from 'bpk-react-utils';
import { BpkCode } from 'bpk-component-code';

import STYLES from './examples.module.scss';

import BpkAriaLive, { ARIA_LIVE_POLITENESS_SETTINGS } from './index';

const getClassName = cssModules(STYLES);

const AriaLiveDemo = (props: {
  preamble: ?Node,
  children: Node,
  className: ?string,
  style: ?{},
  visible: boolean,
}) => {
  const { preamble, children, className, style, visible, ...rest } = props;

  return (
    <div
      className={getClassName('bpk-storybook-aria-live-demo', className)}
      style={style}
    >
      <BpkParagraph>
        <strong>ARIA live region:</strong>
      </BpkParagraph>
      <BpkParagraph>
        {visible
          ? 'This content is relevant to everyone, not just assistive technologies, so it is permanently visible.'
          : 'This would usually be visually hidden, and only visible to assistive technologies. It is visible here for demo purposes.'}
      </BpkParagraph>
      {preamble}
      <BpkAriaLive
        {...rest}
        visible
        className={getClassName('bpk-storybook-aria-live-demo__aria-content')}
        politenessSetting={ARIA_LIVE_POLITENESS_SETTINGS.assertive}
      >
        {children}
      </BpkAriaLive>
    </div>
  );
};

AriaLiveDemo.defaultProps = {
  preamble: null,
  className: null,
  visible: false,
  style: null,
};

class SelectExample extends React.Component<
  {},
  { destination: string, direct: boolean },
> {
  constructor() {
    super();
    this.state = {
      destination: 'Panjin',
      direct: false,
    };
  }

  onChangeDestination = (destination: string) => {
    this.setState({ destination });
  };

  toggleDirectness = () => {
    this.setState(prevState => ({ direct: !prevState.direct }));
  };

  id = 'aria-live-select-example';

  render() {
    const { destination, direct } = this.state;
    return (
      <div>
        <div>
          <BpkParagraph>
            Interactive component with
            <BpkCode>aria-controls=&quot;{this.id}&quot;</BpkCode> to link it to
            the ARIA live region below with the same ID.
          </BpkParagraph>
          <div
            className={getClassName(
              'bpk-storybook-aria-live-demo__select-wrapper',
            )}
          >
            <BpkFieldset
              label="Destination"
              className={getClassName('bpk-storybook-aria-live-demo__select')}
            >
              <BpkSelect
                id="destination"
                name="destination"
                value={destination}
                onChange={event => {
                  this.onChangeDestination(event.target.value);
                }}
              >
                <option value="Abisko">Abisko</option>
                <option value="Nara">Nara</option>
                <option value="Panjin">Panjin</option>
              </BpkSelect>
            </BpkFieldset>
            <BpkSwitch
              className={getClassName('bpk-storybook-aria-live-demo__switch')}
              label="Direct flights only"
              checked={direct}
              onChange={this.toggleDirectness}
            />
          </div>
        </div>
        <AriaLiveDemo
          aria-atomic
          visible
          id={this.id}
          className={getClassName('bpk-storybook-aria-live-demo__aria-live')}
          preamble={
            <BpkParagraph>
              This region has <BpkCode>id=&quot;{this.id}&quot;</BpkCode>.
              <br />
              It also has <BpkCode>aria-atomic=&quot;true&quot;</BpkCode> to
              instruct assistive technologies to read out everything when
              something changes, not just the part that changed.
            </BpkParagraph>
          }
        >
          <BpkParagraph>
            <strong>
              Searching for {direct ? 'direct ' : ''}flights to {destination}.
            </strong>
          </BpkParagraph>
        </AriaLiveDemo>
      </div>
    );
  }
}

class ChipsExample extends React.Component<
  {},
  {
    categories: { Flights: boolean, Hotels: boolean, 'Car hire': boolean },
    updates: Array<string>,
  },
> {
  constructor() {
    super();
    this.state = {
      categories: {
        Flights: true,
        Hotels: true,
        'Car hire': false,
      },
      updates: [],
    };
  }

  id = 'aria-live-chips-example';

  toggleCategory = (category: string) => {
    this.setState(prevState => {
      const nextState = prevState;
      nextState.categories[category] = !prevState.categories[category];
      nextState.updates.push(
        `${category} became ${
          nextState.categories[category] ? 'enabled' : 'disabled'
        }.`,
      );
      return nextState;
    });
  };

  render() {
    const { categories, updates } = this.state;
    return (
      <div>
        <div
          className={getClassName(
            'bpk-storybook-aria-live-demo__chips-wrapper',
          )}
        >
          <BpkParagraph>
            Interactive component with
            <BpkCode>aria-controls=&quot;{this.id}&quot;</BpkCode> to link it to
            the ARIA live region below with the same ID.
          </BpkParagraph>
          {Object.keys(categories).map(category => (
            <BpkChip
              className={getClassName('bpk-storybook-aria-live-demo__chip')}
              aria-controls={this.id}
              selected={categories[category]}
              accessibilityLabel={category}
              onClick={() => {
                this.toggleCategory(category);
              }}
            >
              {category}
            </BpkChip>
          ))}
        </div>
        <AriaLiveDemo
          id={this.id}
          className={getClassName('bpk-storybook-aria-live-demo__aria-live')}
          preamble={
            <BpkParagraph>
              This region has <BpkCode>id=&quot;{this.id}&quot;</BpkCode>.
              <br />
              As the above chips are toggled, updates appear here.
            </BpkParagraph>
          }
        >
          {updates.map(update => (
            <BpkParagraph>
              <strong>{update}</strong>
            </BpkParagraph>
          ))}
        </AriaLiveDemo>
      </div>
    );
  }
}

export { AriaLiveDemo, ChipsExample, SelectExample };
