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

import { useState } from 'react';

import { CHIP_TYPES } from '../../bpk-component-chip';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import BpkMultiSelectChipGroup, {
  CHIP_GROUP_TYPES,
  CHIP_COMPONENT,
} from './BpkMultiSelectChipGroup';
import BpkSingleSelectChipGroup from './BpkSingleSelectChipGroup';

import type { MultiSelectProps, ChipItem } from './BpkMultiSelectChipGroup';
import type { SingleSelectProps } from './BpkSingleSelectChipGroup';
import type { Meta } from '@storybook/react';

import STYLES from './BpkChipGroup.stories.module.scss';

const getClassName = cssModules(STYLES);

const BpkMultiSelectChipGroupState = ({
  chips,
  ...rest
}: MultiSelectProps) => {
  const [selectedChips, setSelectedChips] = useState(
    chips.map((c) => Boolean(c.selected)),
  );

  const statefulChips = chips.map(
    (chip, index) =>
      chip && {
        ...chip,
        selected: selectedChips[index],
        onClick: (selected: boolean, selectedIndex: number) => {
          if (chip.onClick) {
            chip.onClick(selected, selectedIndex);
          }

          const nextSelectedChips = [...selectedChips];
          nextSelectedChips[selectedIndex] = selected;
          setSelectedChips(nextSelectedChips);
        },
      },
  );

  return <BpkMultiSelectChipGroup chips={statefulChips} {...rest} />;
};

const BpkSingleSelectChipGroupState = ({
  onItemClick,
  selectedIndex: initiallySelectedIndex = -1,
  ...rest
}: SingleSelectProps) => {
  const [selectedIndex, setSelectedIndex] = useState(initiallySelectedIndex);

  const onItemClickWithState = (
    item: ChipItem,
    selected: boolean,
    index: number,
  ) => {
    if (onItemClick) {
      onItemClick(item, selected, index);
    }
    setSelectedIndex(selected ? index : -1);
  };

  return (
    <BpkSingleSelectChipGroup
      selectedIndex={selectedIndex}
      onItemClick={onItemClickWithState}
      {...rest}
    />
  );
};

const chips = [
  {
    text: 'London',
  },
  {
    text: 'Berlin',
    selected: true,
  },
  {
    text: 'Florence',
  },
  {
    text: 'Stockholm',
  },
  {
    text: 'Copenhagen',
  },
  {
    text: 'Salzburg',
  },
  {
    text: 'Graz',
  },
  {
    text: 'Lanzarote',
  },
  {
    text: 'Valencia',
  },
  {
    text: 'Reykjavik',
  },
  {
    text: 'Tallinn',
  },
  {
    text: 'Sofia',
  },
];

const BpkChipGroupWrapping = () => (
  <div className={getClassName('bpk-chip-group-examples__fixed-width')}>
    <BpkMultiSelectChipGroupState
      type={CHIP_GROUP_TYPES.wrap}
      chips={chips}
      ariaLabel="Select cities"
    />
  </div>
);

const BpkSingleChipGroupWrapping = () => (
  <div>
    <BpkSingleSelectChipGroupState
      type={CHIP_GROUP_TYPES.wrap}
      chips={chips}
      selectedIndex={0}
      ariaLabel="Select a city"
    />
  </div>
);

const BpkChipGroupRail = () => (
  <div>
    <BpkMultiSelectChipGroupState
      type={CHIP_GROUP_TYPES.rail}
      chips={chips}
      ariaLabel="Select cities"
      leadingNudgerLabel="Scroll back"
      trailingNudgerLabel="Scroll forward"
    />
  </div>
);

const BpkChipGroupSticky = () => {
  const stickyChip = {
    text: 'Sort & Filter',
  };

  return (
    <div>
      <BpkMultiSelectChipGroupState
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
        stickyChip={stickyChip}
        ariaLabel="Select cities"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />
    </div>
  );
};

const OnContrastChipGroup = () => {
  const stickyChip = {
    text: 'Sort & Filter',
  };

  return (
    <div className={getClassName('bpk-chip-group-examples__contrast')}>
      <BpkMultiSelectChipGroupState
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
        stickyChip={stickyChip}
        chipStyle={CHIP_TYPES.default}
        ariaLabel="Select cities"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />
    </div>
  );
};

const OnDarkChipGroup = () => {
  const stickyChip = {
    text: 'Sort & Filter',
  };

  return (
    <div className={getClassName('bpk-chip-group-examples__dark')}>
      <BpkMultiSelectChipGroupState
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
        stickyChip={stickyChip}
        chipStyle={CHIP_TYPES.onDark}
        ariaLabel="Select cities"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />
    </div>
  );
};

const OnImageChipGroup = () => {
  const stickyChip = {
    text: 'Sort & Filter',
  };

  return (
    <div className={getClassName('bpk-chip-group-examples__image')}>
      <BpkMultiSelectChipGroupState
        type={CHIP_GROUP_TYPES.rail}
        chips={chips}
        stickyChip={stickyChip}
        chipStyle={CHIP_TYPES.onImage}
        ariaLabel="Select cities"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />
    </div>
  );
};

const BpkChipGroupWithLabel = () => (
  <div className={getClassName('bpk-chip-group-examples__with-label')}>
    <BpkMultiSelectChipGroupState
      type={CHIP_GROUP_TYPES.rail}
      chips={chips}
      chipStyle={CHIP_TYPES.default}
      label="Filter"
      ariaLabel="Select cities to filter by"
      leadingNudgerLabel="Scroll back"
      trailingNudgerLabel="Scroll forward"
    />
  </div>
);

const AllChipTypesGroup = () => {
  const [dismissed, setDismissed] = useState(false);

  const allChips = [
    {
      text: 'Disabled',
      disabled: true,
    },
    {
      text: 'Dismissible',
      onClick: () => setDismissed(true),
      component: CHIP_COMPONENT.dismissible,
      hidden: dismissed,
    },
    {
      text: 'Dropdown',
      component: CHIP_COMPONENT.dropdown,
    },
    {
      text: 'Selectable',
    },
    {
      text: 'Initially selected',
      selected: true,
    },
  ];

  return (
    <BpkMultiSelectChipGroupState
      chips={allChips}
      type={CHIP_GROUP_TYPES.wrap}
      ariaLabel="Select chips"
    />
  );
};

const StateManagement = () => {
  const [route, setRoute] = useState('flights');

  return (
    <BpkMultiSelectChipGroup
      type={CHIP_GROUP_TYPES.rail}
      ariaLabel="Filter your search"
      ariaMultiselectable={false}
      leadingNudgerLabel="Scroll back"
      trailingNudgerLabel="Scroll forward"
      chips={[
        {
          text: 'Flights',
          selected: route === 'flights',
          onClick: () => setRoute('flights'),
        },
        {
          text: 'Car Hire',
          selected: route === 'cars',
          onClick: () => setRoute('cars'),
        },
        {
          text: 'Hotels',
          selected: route === 'hotels',
          onClick: () => setRoute('hotels'),
        },
        {
          text: 'Trains',
          selected: route === 'trains',
          onClick: () => setRoute('trains'),
        },
        {
          component: CHIP_COMPONENT.dropdown,
          text: 'More',
          accessibilityLabel: 'Show more filter options',
           
          onClick: (selected: boolean) =>
            console.log(`Open dropdown: ${selected}`),
        },
      ]}
    />
  );
};

const MixedExample = () => (
  <div className={getClassName('bpk-chip-group-examples__mixed-container')}>
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      Rail
    </BpkText>
    <BpkChipGroupRail />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      Rail with sticky chip
    </BpkText>
    <BpkChipGroupSticky />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      On Contrast
    </BpkText>
    <OnContrastChipGroup />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      On Dark
    </BpkText>
    <OnDarkChipGroup />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      On Image
    </BpkText>
    <OnImageChipGroup />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      With Label
    </BpkText>
    <BpkChipGroupWithLabel />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      Wrapped
    </BpkText>
    <BpkChipGroupWrapping />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      All chip types
    </BpkText>
    <AllChipTypesGroup />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      Single Select Group
    </BpkText>
    <BpkSingleChipGroupWrapping />
    <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
      State example
    </BpkText>
    <StateManagement />
    <br />
  </div>
);

const meta = {
  title: 'bpk-component-chip-group',
  component: BpkMultiSelectChipGroup,
  subcomponents: {
    BpkChipGroupSingleSelect: BpkSingleSelectChipGroup,
    // TODO: can we show the shape of ChipItem here?
  },
} satisfies Meta;

export default meta;

export const WrappedChipGroup = {
  render: () => <BpkChipGroupWrapping />,
};

export const SingleSelectChipGroup = {
  render: () => <BpkSingleChipGroupWrapping />,
};

export const RailChipGroup = {
  render: () => <BpkChipGroupRail />,
};

export const StickyChipGroup = {
  render: () => <BpkChipGroupSticky />,
};

export const OnContrast = {
  render: () => <OnContrastChipGroup />,
};

export const OnDark = {
  render: () => <OnDarkChipGroup />,
};

export const OnImage = {
  render: () => <OnImageChipGroup />,
};

export const WithLabel = {
  render: () => <BpkChipGroupWithLabel />,
};

export const AllChipTypes = {
  render: () => <AllChipTypesGroup />,
};

export const ExampleStateManagement = {
  render: () => <StateManagement />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
