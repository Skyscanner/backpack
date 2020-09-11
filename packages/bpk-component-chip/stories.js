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
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { cssModules } from 'bpk-react-utils';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';
import BeachIconSm from 'bpk-component-icon/sm/beach';
import CarWashIconSm from 'bpk-component-icon/sm/car-wash';

import STYLES from './stories.scss';
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
    selected: PropTypes.bool,
    trailingAccessoryView: PropTypes.node,
  };

  static defaultProps = {
    ...COMMON_DEFAULT_PROPS,
    selected: false,
    trailingAccessoryView: null,
  };

  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  toggleSelected = () => {
    this.setState(prevState => {
      return { selected: !prevState.selected };
    });
  };

  render() {
    return (
      <BpkSelectableChip
        {...this.props}
        accessibilityLabel="Toggle chip"
        className={getClassName('bpk-chip-stories__chip')}
        selected={this.state.selected}
        onClick={this.toggleSelected}
      />
    );
  }
}

class StatefulDismissibleChipsExample extends React.Component<
  { type: $Keys<typeof CHIP_TYPES> },
  { chips: Array<string> },
> {
  constructor() {
    super();
    this.state = { chips: ['One', 'Two', 'Three', 'Four'] };
  }

  removeChip = indexToRemove => {
    this.setState(prevState => {
      // I can't figure out how to fix this error, and as it is a non-consumer facing
      // component I don't think it's worth investing time to fix it.
      // $FlowFixMe[incompatible-shape]
      return prevState.chips.splice(indexToRemove, 1);
    });
  };

  render() {
    return (
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
            className={getClassName('bpk-chip-stories__chip')}
          >
            Chip {chip}
          </BpkDismissibleChip>
        ))}
      </div>
    );
  }
}

const ChipsExample = ({ ...rest }) => (
  <div>
    <div className={getClassName('bpk-chip-stories__wrapper')}>
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

storiesOf('bpk-component-chip', module).add('Default', () => (
  <div>
    <BpkText textStyle={TEXT_STYLES.lg} tagName="h2">
      Selectable chips
    </BpkText>
    {Object.keys(CHIP_TYPES).map(chipType => (
      <>
        <BpkText>{chipType}</BpkText>
        <ChipsExample type={chipType} />
      </>
    ))}
    <BpkText textStyle={TEXT_STYLES.lg} tagName="h2">
      Dismissible chips
    </BpkText>
    {Object.keys(CHIP_TYPES).map(chipType => (
      <>
        <BpkText>{chipType}</BpkText>
        <StatefulDismissibleChipsExample type={chipType} />
      </>
    ))}
  </div>
));
