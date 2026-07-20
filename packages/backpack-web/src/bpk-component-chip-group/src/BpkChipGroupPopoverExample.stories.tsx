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
import BpkPopover from '../../bpk-component-popover';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import BpkMultiSelectChipGroup, {
  CHIP_GROUP_TYPES,
  CHIP_COMPONENT,
} from './BpkMultiSelectChipGroup';

import type { ChipItem } from './BpkMultiSelectChipGroup';
import type { Meta } from '@storybook/react';

import STYLES from './BpkChipGroupPopoverExample.stories.module.scss';

const getClassName = cssModules(STYLES);

const FILTER_CONTENT: Record<string, string> = {
  Stops: 'Stops filter: Direct, 1 stop, 2+ stops',
  Airlines: 'Airlines filter: BA, Ryanair, EasyJet…',
  Times: 'Times filter: Depart 06:00–12:00',
  Duration: 'Duration filter: Up to 5 hours',
  Price: 'Price filter: £0–£500',
  Bags: 'Bags filter: Cabin bag, Hold bag',
};

const ChipGroupWithPopoversExample = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const handleChipClick = (label: string) => {
    setActiveLabel((prev) => (prev === label ? null : label));
  };

  const chips: ChipItem[] = Object.keys(FILTER_CONTENT).map((label) => ({
    text: label,
    component: CHIP_COMPONENT.dropdown,
    selected: activeLabel === label,
    onClick: () => handleChipClick(label),
  }));

  return (
    <div className={getClassName('bpk-chip-group-popover-example__wrapper')}>
      <BpkText textStyle={TEXT_STYLES.heading3} tagName="h2">
        BpkChipGroup + BpkPopover — anchoring limitation
      </BpkText>
      <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
        Click any chip. The popover opens, but it cannot anchor to the specific
        chip that was clicked. <code>BpkMultiSelectChipGroup</code> renders
        chips internally and they do not expose a <code>ref</code>, so{' '}
        <code>BpkPopover</code> attaches to the whole group container instead.
        The popover always appears at the same fixed position regardless of
        which chip is selected.
      </BpkText>

      <div className={getClassName('bpk-chip-group-popover-example__image-bg')}>
        <div className={getClassName('bpk-chip-group-popover-example__rail-wrapper')}>
          {/*
            BpkPopover's target must be a React element it can clone and attach
            a ref to. We use a zero-size div as the anchor — it sits at the
            start of the rail. Because BpkMultiSelectChipGroup renders chips
            inside a scroll container and chips don't expose refs, this group-
            level anchor is the only viable positioning point. The popover
            always appears at the left edge of the group, not below the clicked chip.
          */}
          <BpkPopover
            key={activeLabel ?? 'closed'}
            id="chip-group-popover"
            isOpen={activeLabel !== null}
            label={activeLabel ?? ''}
            labelAsTitle
            closeButtonLabel="Close"
            onClose={() => setActiveLabel(null)}
            target={<div className={getClassName('bpk-chip-group-popover-example__anchor')} />}
            placement="bottom-start"
            showArrow={false}
          >
            <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
              {activeLabel ? FILTER_CONTENT[activeLabel] : ''}
            </BpkText>
          </BpkPopover>

          <BpkMultiSelectChipGroup
            type={CHIP_GROUP_TYPES.rail}
            chips={chips}
            chipStyle={CHIP_TYPES.onImage}
            ariaLabel="Filter results"
            leadingNudgerLabel="Scroll back"
            trailingNudgerLabel="Scroll forward"
          />
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'bpk-component-chip-group/ChipGroupPopoverIssue',
} satisfies Meta;

export default meta;

export const PopoverAnchoringIssue = {
  name: 'Popover anchoring issue (on-image chips)',
  render: () => <ChipGroupWithPopoversExample />,
};
