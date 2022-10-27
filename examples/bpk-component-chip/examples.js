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
import BeachIconSm from '../../packages/bpk-component-icon/sm/beach';
import CarWashIconSm from '../../packages/bpk-component-icon/sm/car-wash';
import PlusIconSm from '../../packages/bpk-component-icon/sm/plus';
import TickIconSm from '../../packages/bpk-component-icon/sm/tick';
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
      chips: ['Nara', 'Monteverde', 'Panjin', 'Kolkata'],
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
              disabled={index === 3}
              accessibilityLabel="Remove chip"
              className={getClassName('bpk-chip-examples__chip')}
            >
              {chip}
            </BpkDismissibleChip>
          ))}
        </div>
        <AriaLiveDemo
          className={getClassName('bpk-banner-alert-examples__component')}
        >
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
      chips: ['Nara', 'Monteverde', 'Panjin', 'Kolkata'],
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

const AllSelectableChips = ({ ...rest }) => (
  <div>
    <div
      className={getClassName(
        'bpk-chip-examples__wrapper',
        `bpk-chip-examples__${rest.type}`,
      )}
    >
      <StatefulSelectableChip {...rest}>Not selected</StatefulSelectableChip>
      <StatefulSelectableChip leadingAccessoryView={<BeachIconSm />} {...rest}>
        Leading icon
      </StatefulSelectableChip>
      <StatefulSelectableChip
        trailingAccessoryView={<CarWashIconSm />}
        {...rest}
      >
        Trailing icon
      </StatefulSelectableChip>
      <StatefulSelectableChip
        leadingAccessoryView={<BeachIconSm />}
        trailingAccessoryView={<CarWashIconSm />}
        {...rest}
      >
        Both icons
      </StatefulSelectableChip>
      <StatefulSelectableChip selected {...rest}>
        Selected
      </StatefulSelectableChip>
      <StatefulSelectableChip disabled {...rest}>
        Disabled
      </StatefulSelectableChip>
    </div>
  </div>
);

const StatefulSelectableChips = ({ ...rest }: {}) => (
  <div className={getClassName(`bpk-chip-examples__${rest.type}`)}>
    <StatefulSelectableChip {...rest}>Flights</StatefulSelectableChip>
    <StatefulSelectableChip {...rest} selected>
      Hotels
    </StatefulSelectableChip>
    <StatefulSelectableChip {...rest}>Car hire</StatefulSelectableChip>
    <StatefulSelectableChip {...rest} disabled>
      Disabled
    </StatefulSelectableChip>
  </div>
);

const StatefulDropdownChips = ({ ...rest }: {}) => (
  <div className={getClassName(`bpk-chip-examples__${rest.type}`)}>
    <StatefulDropdownChip {...rest}>Flights</StatefulDropdownChip>
    <StatefulDropdownChip {...rest} selected>
      Hotels
    </StatefulDropdownChip>
    <StatefulDropdownChip {...rest}>Car hire</StatefulDropdownChip>
    <StatefulDropdownChip {...rest} disabled>
      Disabled
    </StatefulDropdownChip>
  </div>
);

const DismissibleChipsExample = () => (
  <StatefulDismissibleChipsExample type={CHIP_TYPES.default} />
);

const SelectableChipsExample = () => <StatefulSelectableChips />;

const DropdownChipsExample = () => <StatefulDropdownChips />;

const RadioGroupChipsExample = () => (
  <StatefulRadioGroupChipsExample type={CHIP_TYPES.default} />
);

const AllSelectableChipStylesExample = () => (
  <div>
    <h3>Default</h3>
    <StatefulSelectableChips type={CHIP_TYPES.default} />
    <h3>OnDark</h3>
    <StatefulSelectableChips type={CHIP_TYPES.onDark} />
    <h3>OnImage</h3>
    <StatefulSelectableChips type={CHIP_TYPES.onImage} />
  </div>
);

const WithIconsExample = () => (
  <div>
    <div>
      <h3>Selectable chips</h3>
      <StatefulSelectableChips
        type={CHIP_TYPES.default}
        leadingAccessoryView={<PlusIconSm />}
      />
      <StatefulSelectableChips
        type={CHIP_TYPES.default}
        trailingAccessoryView={<TickIconSm />}
      />
      <StatefulSelectableChips
        type={CHIP_TYPES.default}
        leadingAccessoryView={<FaceHappyIconSm />}
        trailingAccessoryView={<TickIconSm />}
      />
    </div>
    <div>
      <h3>Dropdown chips</h3>
      <StatefulDropdownChips
        type={CHIP_TYPES.default}
        leadingAccessoryView={<PlusIconSm />}
      />
      <StatefulDropdownChips
        type={CHIP_TYPES.default}
        trailingAccessoryView={<TickIconSm />}
      />
      <StatefulDropdownChips
        type={CHIP_TYPES.default}
        leadingAccessoryView={<FaceHappyIconSm />}
        trailingAccessoryView={<TickIconSm />}
      />
    </div>
    <div>
      <h3>Dismissable chips</h3>
      <StatefulDismissibleChipsExample
        type={CHIP_TYPES.default}
        leadingAccessoryView={<FaceHappyIconSm />}
      />
    </div>
  </div>
);

const AllTypesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.bodyLongform} tagName="h2">
      Selectable chips
    </BpkText>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <>
        <BpkText>{chipType}</BpkText>
        <AllSelectableChips type={CHIP_TYPES[chipType]} />
      </>
    ))}
    <BpkText textStyle={TEXT_STYLES.bodyLongform} tagName="h2">
      Dropdown chips
    </BpkText>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <>
        <BpkText>{chipType}</BpkText>
        <StatefulDropdownChips type={CHIP_TYPES[chipType]} />
      </>
    ))}
    <BpkText textStyle={TEXT_STYLES.bodyLongform} tagName="h2">
      Dismissible chips
    </BpkText>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <>
        <BpkText>{chipType}</BpkText>
        <StatefulDismissibleChipsExample type={CHIP_TYPES[chipType]} />
      </>
    ))}
  </div>
);

export {
  AllTypesExample,
  SelectableChipsExample,
  AllSelectableChipStylesExample,
  WithIconsExample,
  DismissibleChipsExample,
  RadioGroupChipsExample,
  DropdownChipsExample,
};
