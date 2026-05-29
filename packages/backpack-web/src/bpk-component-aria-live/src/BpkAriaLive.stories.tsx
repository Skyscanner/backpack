/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { Component } from 'react';
import type { ChangeEvent } from 'react';

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import BpkChip from '../../bpk-component-chip';
import { BpkCode } from '../../bpk-component-code';
import BpkFieldset from '../../bpk-component-fieldset';
import BpkSelect from '../../bpk-component-select';
import BpkSwitch from '../../bpk-component-switch';
import { cssModules } from '../../bpk-react-utils';

import BpkAriaLive from './BpkAriaLive';
import AriaLiveDemo from './BpkAriaLive.story-helpers';

import type { Meta } from '@storybook/react';

import STYLES from './BpkAriaLive.stories.module.scss';

const getClassName = cssModules(STYLES);

class SelectExample<SProps extends {}> extends Component<
  SProps,
  { destination: string; direct: boolean }
> {
  constructor(props: SProps) {
    super(props);
    this.state = {
      destination: 'Panjin',
      direct: false,
    };
  }

  onChangeDestination = (destination: string) => {
    this.setState({ destination });
  };

  toggleDirectness = () => {
    this.setState((prevState) => ({ direct: !prevState.direct }));
  };

  id = 'aria-live-select-example';

  render() {
    const { destination, direct } = this.state;
    return (
      <div>
        <div>
          <p>
            Interactive component with
            <BpkCode>aria-controls=&quot;{this.id}&quot;</BpkCode> to link it to
            the ARIA live region below with the same ID.
          </p>
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
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  this.onChangeDestination(event?.target?.value);
                }}
              >
                <option value="Abisko">Abisko</option>
                <option value="Nara">Nara</option>
                <option value="Panjin">Panjin</option>
              </BpkSelect>
            </BpkFieldset>
            <div
              className={getClassName('bpk-storybook-aria-live-demo__switch-wrapper')}
            >
              <span>Direct flights only</span>
              <BpkSwitch
                ariaLabel="Direct flights only"
                checked={direct}
                onChange={this.toggleDirectness}
              />
            </div>
          </div>
        </div>
        <AriaLiveDemo
          aria-atomic
          visible
          id={this.id}
          className={getClassName('bpk-storybook-aria-live-demo__aria-live')}
          preamble={
            <p>
              This region has <BpkCode>id=&quot;{this.id}&quot;</BpkCode>.
              <br />
              It also has <BpkCode>aria-atomic=&quot;true&quot;</BpkCode> to
              instruct assistive technologies to read out everything when
              something changes, not just the part that changed.
            </p>
          }
        >
          <p>
            <strong>
              Searching for {direct ? 'direct ' : ''}flights to {destination}.
            </strong>
          </p>
        </AriaLiveDemo>
      </div>
    );
  }
}

class ChipsExample<CProps extends {}> extends Component<
  CProps,
  {
    categories: { Flights: boolean; Hotels: boolean; 'Car hire': boolean };
    updates: string[];
  }
> {
  constructor(props: CProps) {
    super(props);
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

  toggleCategory = (category: 'Flights' | 'Hotels' | 'Car hire') => {
    this.setState((prevState) => {
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
          <p>
            Interactive component with
            <BpkCode>aria-controls=&quot;{this.id}&quot;</BpkCode> to link it to
            the ARIA live region below with the same ID.
          </p>
          {(Object.keys(categories) as Array<keyof typeof categories>).map(
            (category) => (
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
            ),
          )}
        </div>
        <AriaLiveDemo
          id={this.id}
          className={getClassName('bpk-storybook-aria-live-demo__aria-live')}
          preamble={
            <p>
              This region has <BpkCode>id=&quot;{this.id}&quot;</BpkCode>.
              <br />
              As the above chips are toggled, updates appear here.
            </p>
          }
        >
          <>
            {updates.map((update) => (
              <p>
                <strong>{update}</strong>
              </p>
            ))}
          </>
        </AriaLiveDemo>
      </div>
    );
  }
}

const meta = {
  title: 'bpk-component-aria-live',
  component: BpkAriaLive,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            {`**Note:** \`aria-relevant\` and \`aria-atomic\` props can also be set.
            \`aria-relevant\` determines what sort of changes should be read out. By default it is \`text\` but can be \`additions\`, \`removals\` or \`all\`. [Read more about \`aria-relevant\` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-relevant).
            \`aria-atomic\` is a boolean which determines whether changes should be read out, or the whole region should be read out. [Read more about \`aria-atomic\` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#Use_Case:_Clock).
            `}
          </Markdown>
        </>
      ),
    },
  },
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <ChipsExample />,
};

export const Visible = {
  render: () => <SelectExample />,
};
