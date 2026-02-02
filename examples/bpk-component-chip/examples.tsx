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

import type { ReactNode } from 'react';
import { useState } from 'react';

import BpkSelectableChip, {
  type BpkSelectableChipProps,
  CHIP_TYPES,
  BpkDismissibleChip,
  BpkDropdownChip,
  BpkIconChip,
} from '../../packages/bpk-component-chip';
import FaceHappyIconSm from '../../packages/bpk-component-icon/sm/face--happy';
import FilterIconSm from '../../packages/bpk-component-icon/sm/filter';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';
import { AriaLiveDemo } from '../bpk-component-aria-live/examples';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

type StatefulSelectableChipProps = Omit<
  BpkSelectableChipProps,
  'accessibilityLabel' | 'onClick'
>;

const StatefulSelectableChip = (props: StatefulSelectableChipProps) => {
  const [selected, setSelected] = useState(props.selected);

  const toggleSelected = () => setSelected(!selected);

  return (
    <BpkSelectableChip
      {...props}
      accessibilityLabel="Toggle chip"
      className={getClassName('bpk-chip-examples__chip')}
      selected={selected}
      onClick={toggleSelected}
    />
  );
};

const StatefulDropdownChip = (props: StatefulSelectableChipProps) => {
  const [selected, setSelected] = useState(props.selected);
  const toggleSelected = () => setSelected(!selected);

  return (
    <BpkDropdownChip
      {...props}
      accessibilityLabel="Toggle chip"
      className={getClassName('bpk-chip-examples__chip')}
      selected={selected}
      onClick={toggleSelected}
    />
  );
};

const StatefulIconChip = (
  props: StatefulSelectableChipProps & { leadingAccessoryView: ReactNode },
) => {
  const [selected, setSelected] = useState(props.selected);

  const toggleSelected = () => setSelected(!selected);

  return (
    <BpkIconChip
      {...props}
      accessibilityLabel="Toggle chip"
      className={getClassName('bpk-chip-examples__chip')}
      selected={selected}
      onClick={toggleSelected}
    />
  );
};

const StatefulDismissibleChipsExample = (
  props: StatefulSelectableChipProps,
) => {
  const [chips, setChips] = useState([
    'Cheapest flights',
    'Direct flights',
    'Most popular',
  ]);
  const [updates, setUpdates] = useState<string[]>([]);

  const removeChip = (indexToRemove: number) => {
    const newChips = [...chips];
    const removedChip = newChips.splice(indexToRemove, 1)[0];

    setChips(newChips);
    setUpdates([...updates, `${removedChip} dismissed.`]);
  };

  return (
    <div>
      <div className={getClassName(`bpk-chip-examples__${props.type}`)}>
        {chips.map((chip, index) => (
          <BpkDismissibleChip
            {...props}
            key={`chip-${index.toString()}`}
            onClick={() => {
              removeChip(index);
            }}
            accessibilityLabel="Remove chip"
            className={getClassName('bpk-chip-examples__chip')}
          >
            {chip}
          </BpkDismissibleChip>
        ))}
      </div>
      <AriaLiveDemo visible>
        <>
          {updates.map((u) => (
            <>
              {u}
              <br />
            </>
          ))}
        </>
      </AriaLiveDemo>
    </div>
  );
};

const StatefulRadioGroupChipsExample = (props: StatefulSelectableChipProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [chips] = useState([
    'Cheapest flights',
    'Direct flights',
    'Most popular',
  ]);
  const [updates, setUpdates] = useState<string[]>([]);

  const selectChip = (indexToSelect: number) => {
    const selectedChip = chips[indexToSelect];

    setSelectedIndex(indexToSelect);
    setUpdates([...updates, `${selectedChip} selected.`]);
  };

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
        {chips.map((chip, index) => (
          <BpkSelectableChip
            {...props}
            role="radio"
            key={`chip-${index.toString()}`}
            onClick={() => {
              selectChip(index);
            }}
            selected={selectedIndex === index}
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
        visible
      >
        <>
          {updates.map((update) => (
            <>
              {update}
              <br />
            </>
          ))}
        </>
      </AriaLiveDemo>
    </div>
  );
};

const StatefulSelectableChips = ({ ...rest }) => (
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

type ValueOf<T> = T[keyof T];
const StatefulIconChips = ({
  ...rest
}: {
  type: ValueOf<typeof CHIP_TYPES>;
  leadingAccessoryView: ReactNode;
}) => (
  <div className={getClassName(`bpk-chip-examples__${rest.type}`)}>
    <StatefulIconChip {...rest} />
    <StatefulIconChip {...rest} selected />
    <StatefulIconChip {...rest} disabled />
  </div>
);

const StatefulDropdownChips = ({ ...rest }) => (
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
    {(Object.keys(CHIP_TYPES) as Array<keyof typeof CHIP_TYPES>).map(
      (chipType) => (
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
      ),
    )}
  </div>
);

const AllIconChipsExample = () => (
  <div>
    {(Object.keys(CHIP_TYPES) as Array<keyof typeof CHIP_TYPES>).map(
      (chipType) => (
        <div className={getClassName(`bpk-chip-examples__container`)}>
          <BpkText textStyle={TEXT_STYLES.heading3}>{chipType}</BpkText>
          <StatefulIconChips
            type={CHIP_TYPES[chipType]}
            leadingAccessoryView={<FilterIconSm />}
          />
        </div>
      ),
    )}
  </div>
);

const AllDropdownChipsExample = () => (
  <div>
    {(Object.keys(CHIP_TYPES) as Array<keyof typeof CHIP_TYPES>).map(
      (chipType) => (
        <div className={getClassName(`bpk-chip-examples__container`)}>
          <BpkText textStyle={TEXT_STYLES.heading3}>{chipType}</BpkText>
          <StatefulDropdownChips type={CHIP_TYPES[chipType]} />
        </div>
      ),
    )}
  </div>
);

const AllDismissibleChipsExample = () => (
  <div>
    {(Object.keys(CHIP_TYPES) as Array<keyof typeof CHIP_TYPES>).map(
      (chipType) => (
        <div className={getClassName(`bpk-chip-examples__container`)}>
          <BpkText textStyle={TEXT_STYLES.heading3}>{chipType}</BpkText>
          <StatefulDismissibleChipsExample type={CHIP_TYPES[chipType]} />
        </div>
      ),
    )}
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
    <BpkText textStyle={TEXT_STYLES.heading1} tagName="h2">
      Icon Chips
    </BpkText>
    <AllIconChipsExample />
  </div>
);

export {
  AllTypesExample,
  AllSelectableChipsExample,
  AllIconChipsExample,
  AllDropdownChipsExample,
  AllDismissibleChipsExample,
  RadioGroupChipsExample,
};
