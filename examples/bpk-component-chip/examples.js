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

/* @flow strict */

// eslint-disable-next-line max-classes-per-file
import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../../packages/bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import FaceHappyIconSm from '../../packages/bpk-component-icon/sm/face--happy';
import { AriaLiveDemo } from '../bpk-component-aria-live/examples';
import BpkSelectableChip, {
  type BpkSelectableChipProps,
  CHIP_TYPES,
  BpkDismissibleChip,
  BpkDropdownChip,
} from '../../packages/bpk-component-chip';
import {
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from '../../packages/bpk-component-chip/src/commonTypes';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

/* ESLint is fighting with Prettier here, so I had to disable it. */
type StatefulSelectableChipProps = $Diff<
  BpkSelectableChipProps,
  {
    accessibilityLabel: string,
    onClick: (event: SyntheticEvent<>) => mixed,
  },
>;
/* eslint-enable */

class StatefulSelectableChip extends React.Component<
  StatefulSelectableChipProps,
  { selected: boolean },
> {
  static propTypes = {
    ...COMMON_PROP_TYPES,
    role: PropTypes.string,
    selected: PropTypes.bool,
    trailingAccessoryView: PropTypes.node,
  };

  static defaultProps = {
    ...COMMON_DEFAULT_PROPS,
    role: 'checkbox',
    selected: false,
    trailingAccessoryView: null,
  };

  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  toggleSelected = () => {
    this.setState((prevState) => ({ selected: !prevState.selected }));
  };

  render() {
    return (
      <BpkSelectableChip
        {...this.props}
        accessibilityLabel="Toggle chip"
        className={getClassName('bpk-chip-examples__chip')}
        selected={this.state.selected}
        onClick={this.toggleSelected}
      />
    );
  }
}

class StatefulDropdownChip extends React.Component<
  { type: $Keys<typeof CHIP_TYPES> },
  { chips: Array<string>, updates: Array<string> },
> {
  static propTypes = {
    ...COMMON_PROP_TYPES,
    role: PropTypes.string,
    selected: PropTypes.bool,
    trailingAccessoryView: PropTypes.node,
  };

  static defaultProps = {
    ...COMMON_DEFAULT_PROPS,
    role: 'checkbox',
    selected: false,
    trailingAccessoryView: null,
  };

  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  toggleSelected = () => {
    this.setState((prevState) => ({ selected: !prevState.selected }));
  };

  render() {
    return (
      <BpkDropdownChip
        {...this.props}
        accessibilityLabel="Toggle chip"
        className={getClassName('bpk-chip-examples__chip')}
        selected={this.state.selected}
        onClick={this.toggleSelected}
      />
    );
  }
}

class StatefulDismissibleChipsExample extends React.Component<
  { type: $Keys<typeof CHIP_TYPES> },
  { chips: Array<string>, updates: Array<string> },
> {
  constructor() {
    super();
    this.state = {
      chips: ['Cheapest flights', 'Direct flights', 'Most popular'],
      updates: [],
    };
  }

  removeChip = (indexToRemove: number) => {
    this.setState((prevState) => {
      const newChips = prevState.chips;
      const removedChip = newChips.splice(indexToRemove, 1)[0];

      return {
        chips: newChips,
        updates: [...prevState.updates, `${removedChip} dismissed.`],
      };
    });
  };

  render() {
    return (
      <div>
        <div className={getClassName(`bpk-chip-examples__${this.props.type}`)}>
          {this.state.chips.map((chip, index) => (
            <BpkDismissibleChip
              {...this.props}
              key={`chip-${index.toString()}`}
              onClick={() => {
                this.removeChip(index);
              }}
              accessibilityLabel="Remove chip"
              className={getClassName('bpk-chip-examples__chip')}
            >
              {chip}
            </BpkDismissibleChip>
          ))}
        </div>
        <AriaLiveDemo>
          {this.state.updates.map((u) => (
            <>
              {u}
              <br />
            </>
          ))}
        </AriaLiveDemo>
      </div>
    );
  }
}

class StatefulRadioGroupChipsExample extends React.Component<
  { type: $Keys<typeof CHIP_TYPES> },
  { chips: Array<string>, updates: Array<string>, selectedIndex: number },
> {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      chips: ['Cheapest flights', 'Direct flights', 'Most popular'],
      updates: [],
    };
  }

  selectChip = (indexToSelect: number) => {
    const selectedChip = this.state.chips[indexToSelect];

    this.setState((prevState) => ({
      selectedIndex: indexToSelect,
      updates: [...prevState.updates, `${selectedChip} selected.`],
    }));
  };

  render() {
    return (
      <div>
        <div role="radiogroup" aria-labelledby="favorite-color-label">
          <BpkText
            id="favorite-color-label"
            aria-hidden
            tagName="h1"
            textStyle={TEXT_STYLES.heading4}
          >
            Favourite colour
          </BpkText>
          {this.state.chips.map((chip, index) => (
            <BpkSelectableChip
              {...this.props}
              role="radio"
              key={`chip-${index.toString()}`}
              onClick={() => {
                this.selectChip(index);
              }}
              selected={this.state.selectedIndex === index}
              disabled={index === 3}
              className={getClassName('bpk-chip-examples__chip')}
              accessibilityLabel={chip}
            >
              {chip}
            </BpkSelectableChip>
          ))}
        </div>
        <AriaLiveDemo
          className={getClassName('bpk-banner-alert-examples__component')}
        >
          {this.state.updates.map((update) => (
            <>
              {update}
              <br />
            </>
          ))}
        </AriaLiveDemo>
      </div>
    );
  }
}

const StatefulSelectableChips = ({ ...rest }: {}) => (
  <div className={getClassName(`bpk-chip-examples__${rest.type}`)}>
    <StatefulSelectableChip {...rest}>Cheapest flights</StatefulSelectableChip>
    <StatefulSelectableChip {...rest} selected>
      Direct flights
    </StatefulSelectableChip>
    <StatefulSelectableChip {...rest} disabled>
      Most popular
    </StatefulSelectableChip>
  </div>
);

const StatefulDropdownChips = ({ ...rest }: {}) => (
  <div className={getClassName(`bpk-chip-examples__${rest.type}`)}>
    <StatefulDropdownChip {...rest}>Car type</StatefulDropdownChip>
    <StatefulDropdownChip {...rest} selected>
      Pick-up
    </StatefulDropdownChip>
    <StatefulDropdownChip {...rest} disabled>
      Seats
    </StatefulDropdownChip>
  </div>
);

const RadioGroupChipsExample = () => (
  <StatefulRadioGroupChipsExample type={CHIP_TYPES.default} />
);

const AllSelectableChipsExample = () => (
  <div>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <>
        <div className={getClassName(`bpk-chip-examples__container`)}>
          <BpkText textStyle={TEXT_STYLES.heading3}>{chipType}</BpkText>
          <StatefulSelectableChips type={CHIP_TYPES[chipType]} />
        </div>
        <div className={getClassName(`bpk-chip-examples__container`)}>
          <BpkText textStyle={TEXT_STYLES.heading3}>
            {chipType} with leading icon
          </BpkText>
          <StatefulSelectableChips
            type={CHIP_TYPES[chipType]}
            leadingAccessoryView={<FaceHappyIconSm />}
          />
        </div>
      </>
    ))}
  </div>
);

const AllDropdownChipsExample = () => (
  <div>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <div className={getClassName(`bpk-chip-examples__container`)}>
        <BpkText textStyle={TEXT_STYLES.heading3}>{chipType}</BpkText>
        <StatefulDropdownChips type={CHIP_TYPES[chipType]} />
      </div>
    ))}
  </div>
);

const AllDismissibleChipsExample = () => (
  <div>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <div className={getClassName(`bpk-chip-examples__container`)}>
        <BpkText textStyle={TEXT_STYLES.heading3}>{chipType}</BpkText>
        <StatefulDismissibleChipsExample type={CHIP_TYPES[chipType]} />
      </div>
    ))}
  </div>
);

const AllTypesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.heading1} tagName="h2">
      Selectable chips
    </BpkText>
    <AllSelectableChipsExample />
    <BpkText textStyle={TEXT_STYLES.heading1} tagName="h2">
      Dropdown chips
    </BpkText>
    <AllDropdownChipsExample />
    <BpkText textStyle={TEXT_STYLES.heading1} tagName="h2">
      Dismissible chips
    </BpkText>
    <AllDismissibleChipsExample />
  </div>
);

export {
  AllTypesExample,
  AllSelectableChipsExample,
  AllDropdownChipsExample,
  AllDismissibleChipsExample,
  RadioGroupChipsExample,
};
