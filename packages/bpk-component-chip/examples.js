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

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import BpkText, { TEXT_STYLES, WEIGHT_STYLES } from 'bpk-component-text';
import BeachIconSm from 'bpk-component-icon/sm/beach';
import CarWashIconSm from 'bpk-component-icon/sm/car-wash';
import PlusIconSm from 'bpk-component-icon/sm/plus';
import TickIconSm from 'bpk-component-icon/sm/tick';
import FaceHappyIconSm from 'bpk-component-icon/sm/face--happy';
import { AriaLiveDemo } from 'bpk-component-aria-live/examples';

import STYLES from './examples.module.scss';
import { COMMON_PROP_TYPES, COMMON_DEFAULT_PROPS } from './src/commonTypes';

import BpkSelectableChip, {
  type BpkSelectableChipProps,
  CHIP_TYPES,
  BpkDismissibleChip,
} from './index';

const getClassName = cssModules(STYLES);

/* ESLint is fighting with Prettier here, so I had to disable it. */
/* eslint-disable flowtype/generic-spacing */
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
        <div>
          {this.state.chips.map((chip, index) => (
            <BpkDismissibleChip
              {...this.props}
              key={index.toString()}
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
            textStyle={TEXT_STYLES.lg}
            weight={WEIGHT_STYLES.bold}
          >
            Favourite colour
          </BpkText>
          {this.state.chips.map((chip, index) => (
            <BpkSelectableChip
              {...this.props}
              role="radio"
              key={index.toString()}
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
    <div className={getClassName('bpk-chip-examples__wrapper')}>
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
  <div>
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

const DismissibleChipsExample = () => (
  <StatefulDismissibleChipsExample type={CHIP_TYPES.primary} />
);

const SelectableChipsExample = () => <StatefulSelectableChips />;

const RadioGroupChipsExample = () => (
  <StatefulRadioGroupChipsExample type={CHIP_TYPES.primary} />
);

const AllSelectableChipStylesExample = () => (
  <div>
    <h3>Primary</h3>
    <StatefulSelectableChips type={CHIP_TYPES.primary} />
    <h3>Success</h3>
    <StatefulSelectableChips type={CHIP_TYPES.success} />
    <h3>Light</h3>
    <StatefulSelectableChips type={CHIP_TYPES.light} />
  </div>
);

const WithIconsExample = () => (
  <div>
    <div>
      <h3>Selectable chips</h3>
      <StatefulSelectableChips
        type={CHIP_TYPES.primary}
        leadingAccessoryView={<PlusIconSm />}
      />
      <StatefulSelectableChips
        type={CHIP_TYPES.primary}
        trailingAccessoryView={<TickIconSm />}
      />
      <StatefulSelectableChips
        type={CHIP_TYPES.primary}
        leadingAccessoryView={<FaceHappyIconSm />}
        trailingAccessoryView={<TickIconSm />}
      />
    </div>
    <div>
      <h3>Dismissable chips</h3>
      <StatefulDismissibleChipsExample
        type={CHIP_TYPES.primary}
        leadingAccessoryView={<FaceHappyIconSm />}
      />
    </div>
  </div>
);

const AllTypesExample = () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.lg} tagName="h2">
      Selectable chips
    </BpkText>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <>
        <BpkText>{chipType}</BpkText>
        <AllSelectableChips type={chipType} />
      </>
    ))}
    <BpkText textStyle={TEXT_STYLES.lg} tagName="h2">
      Dismissible chips
    </BpkText>
    {Object.keys(CHIP_TYPES).map((chipType) => (
      <>
        <BpkText>{chipType}</BpkText>
        <StatefulDismissibleChipsExample type={chipType} />
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
};
