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
import type { ChangeEvent, ReactElement } from 'react';

import BpkAriaLive, {
  ARIA_LIVE_POLITENESS_SETTINGS,
} from '../../packages/bpk-component-aria-live';
import BpkChip from '../../packages/bpk-component-chip';
import { BpkCode } from '../../packages/bpk-component-code';
import BpkFieldset from '../../packages/bpk-component-fieldset';
import BpkSelect from '../../packages/bpk-component-select';
import BpkSwitch from '../../packages/bpk-component-switch';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  preamble?: ReactElement | null;
  children: ReactElement;
  className?: string | null;
  style?: {};
  visible?: Boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

const AriaLiveDemo = ({
  children,
  className = null,
  preamble = null,
  style = undefined,
  visible = false,
  ...rest
}: Props) => (
  <div
    className={getClassName('bpk-storybook-aria-live-demo', className)}
    style={style}
  >
    <p>
      <strong>ARIA live region:</strong>
    </p>
    <p>
      {visible
        ? 'This content is relevant to everyone, not just assistive technologies, so it is permanently visible.'
        : 'This would usually be visually hidden, and only visible to assistive technologies. It is visible here for demo purposes.'}
    </p>
    {preamble}
    <BpkAriaLive
      {...rest}
      visible
      politenessSetting={ARIA_LIVE_POLITENESS_SETTINGS.assertive}
    >
      {children}
    </BpkAriaLive>
  </div>
);

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
            // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
            <BpkFieldset
              label="Destination"
              className={getClassName('bpk-storybook-aria-live-demo__select')}
            >
              // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
              // @ts-expect-error TS(2322): Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
              // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
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

export { AriaLiveDemo, ChipsExample, SelectExample };
