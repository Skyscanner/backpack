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

import BpkButton, { BUTTON_TYPES } from '../../packages/bpk-component-button';
import { BpkCheckboxV2 } from '../../packages/bpk-component-checkbox';
import ChevronDownIcon from '../../packages/bpk-component-icon/sm/chevron-down';
import GridLayoutIcon from '../../packages/bpk-component-icon/sm/grid-layout';
import InformationCircleIcon from '../../packages/bpk-component-icon/sm/information-circle';
import ListIcon from '../../packages/bpk-component-icon/sm/list';
import {
  BpkHStack,
  BpkProvider,
  BpkSpacing,
  BpkVStack,
} from '../../packages/bpk-component-layout';
import {
  BpkSegmentedControlV2,
  SEGMENT_TYPES_V2,
} from '../../packages/bpk-component-segmented-control';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkVisuallyHidden from '../../packages/bpk-component-visually-hidden';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const DefaultCanvasDefault = () => {
  const [selected, setSelected] = useState('price');
  return (
    <BpkSegmentedControlV2.Root
      label="Sort results by"
      value={selected}
      onChange={setSelected}
      type={SEGMENT_TYPES_V2.CanvasDefault}
    >
      <BpkSegmentedControlV2.Indicator />
      <BpkSegmentedControlV2.Item value="price">
        <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="rating">
        <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="duration">
        <BpkSegmentedControlV2.ItemText>Duration</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const UncontrolledDefaultValue = () => (
  <BpkSegmentedControlV2.Root label="View mode" defaultValue="grid">
    <BpkSegmentedControlV2.Indicator />
    <BpkSegmentedControlV2.Item value="grid">
      <BpkSegmentedControlV2.ItemText>Grid</BpkSegmentedControlV2.ItemText>
      <BpkSegmentedControlV2.ItemControl />
      <BpkSegmentedControlV2.ItemHiddenInput />
    </BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="list">
      <BpkSegmentedControlV2.ItemText>List</BpkSegmentedControlV2.ItemText>
      <BpkSegmentedControlV2.ItemControl />
      <BpkSegmentedControlV2.ItemHiddenInput />
    </BpkSegmentedControlV2.Item>
  </BpkSegmentedControlV2.Root>
);

const CanvasContrast = () => {
  const [selected, setSelected] = useState('flights');
  return (
    <div
      className={getClassName(
        'bpk-component-segmented-control-stories__canvas-contrast-demo',
      )}
    >
      <BpkSegmentedControlV2.Root
        label="Travel type"
        value={selected}
        onChange={setSelected}
        type={SEGMENT_TYPES_V2.CanvasContrast}
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="flights">
          <BpkSegmentedControlV2.ItemText>Flights</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="hotels">
          <BpkSegmentedControlV2.ItemText>Hotels</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="cars">
          <BpkSegmentedControlV2.ItemText>Cars</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>
    </div>
  );
};

const SurfaceDefault = () => {
  const [selected, setSelected] = useState('one-way');
  return (
    <BpkSegmentedControlV2.Root
      label="Trip type"
      value={selected}
      onChange={setSelected}
      type={SEGMENT_TYPES_V2.SurfaceDefault}
    >
      <BpkSegmentedControlV2.Indicator />
      <BpkSegmentedControlV2.Item value="one-way">
        <BpkSegmentedControlV2.ItemText>One way</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="return">
        <BpkSegmentedControlV2.ItemText>Return</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="multi-city">
        <BpkSegmentedControlV2.ItemText>Multi-city</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const SurfaceContrast = () => {
  const [selected, setSelected] = useState('economy');
  return (
    <div
      className={getClassName(
        'bpk-component-segmented-control-stories__surface-contrast-demo',
      )}
    >
      <BpkSegmentedControlV2.Root
        label="Cabin class"
        value={selected}
        onChange={setSelected}
        type={SEGMENT_TYPES_V2.SurfaceContrast}
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="economy">
          <BpkSegmentedControlV2.ItemText>Economy</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="business">
          <BpkSegmentedControlV2.ItemText>Business</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="first">
          <BpkSegmentedControlV2.ItemText>First</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>
    </div>
  );
};

const WithShadow = () => {
  const [selected, setSelected] = useState('all');
  return (
    <BpkSegmentedControlV2.Root
      label="Filter"
      value={selected}
      onChange={setSelected}
      shadow
    >
      <BpkSegmentedControlV2.Indicator />
      <BpkSegmentedControlV2.Item value="all">
        <BpkSegmentedControlV2.ItemText>All</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="direct">
        <BpkSegmentedControlV2.ItemText>Direct</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="one-stop">
        <BpkSegmentedControlV2.ItemText>1 stop</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const WithIconAndText = () => {
  const [selected, setSelected] = useState('grid');
  return (
    <BpkSegmentedControlV2.Root
      label="View layout"
      value={selected}
      onChange={setSelected}
    >
      <BpkSegmentedControlV2.Indicator />
      <BpkSegmentedControlV2.Item value="grid">
        <BpkSegmentedControlV2.ItemText>
          <GridLayoutIcon />
          Grid
        </BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="list">
        <BpkSegmentedControlV2.ItemText>
          <ListIcon />
          List
        </BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const IconOnly = () => {
  const [selected, setSelected] = useState('grid');
  return (
    <BpkSegmentedControlV2.Root
      label="View layout"
      value={selected}
      onChange={setSelected}
    >
      <BpkSegmentedControlV2.Indicator />
      <BpkSegmentedControlV2.Item value="grid">
        <BpkSegmentedControlV2.ItemText>
          <GridLayoutIcon />
          <BpkVisuallyHidden>Grid view</BpkVisuallyHidden>
        </BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="list">
        <BpkSegmentedControlV2.ItemText>
          <ListIcon />
          <BpkVisuallyHidden>List view</BpkVisuallyHidden>
        </BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const RtlLayout = () => {
  const [selected, setSelected] = useState('price');
  return (
    <div dir="rtl">
      <BpkSegmentedControlV2.Root
        label="ترتيب حسب"
        value={selected}
        onChange={setSelected}
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="price">
          <BpkSegmentedControlV2.ItemText>السعر</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          <BpkSegmentedControlV2.ItemText>التقييم</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">
          <BpkSegmentedControlV2.ItemText>المدة</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>
    </div>
  );
};

const TwoItems = () => {
  const [selected, setSelected] = useState('one-way');
  return (
    <BpkSegmentedControlV2.Root
      label="Trip type"
      value={selected}
      onChange={setSelected}
    >
      <BpkSegmentedControlV2.Indicator />
      <BpkSegmentedControlV2.Item value="one-way">
        <BpkSegmentedControlV2.ItemText>One way</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="return">
        <BpkSegmentedControlV2.ItemText>Return</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const LongLabels = () => {
  const [selected, setSelected] = useState('departure');
  return (
    <div style={{ width: '300px' }}>
      <BpkSegmentedControlV2.Root
        label="Sort results"
        value={selected}
        onChange={setSelected}
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="departure">
          <BpkSegmentedControlV2.ItemText>
            <span
              className={getClassName(
                'bpk-component-segmented-control-stories__custom-button',
              )}
            >
              Earliest departure time
            </span>
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="arrival">
          <BpkSegmentedControlV2.ItemText>
            <span
              className={getClassName(
                'bpk-component-segmented-control-stories__custom-button',
              )}
            >
              Earliest arrival time
            </span>
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="price">
          <BpkSegmentedControlV2.ItemText>
            <span
              className={getClassName(
                'bpk-component-segmented-control-stories__custom-button',
              )}
            >
              Cheapest price available
            </span>
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>
    </div>
  );
};

const NoInitialSelection = () => (
  <BpkSegmentedControlV2.Root label="Select option">
    <BpkSegmentedControlV2.Indicator />
    <BpkSegmentedControlV2.Item value="a">
      <BpkSegmentedControlV2.ItemText>Option A</BpkSegmentedControlV2.ItemText>
      <BpkSegmentedControlV2.ItemControl />
      <BpkSegmentedControlV2.ItemHiddenInput />
    </BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="b">
      <BpkSegmentedControlV2.ItemText>Option B</BpkSegmentedControlV2.ItemText>
      <BpkSegmentedControlV2.ItemControl />
      <BpkSegmentedControlV2.ItemHiddenInput />
    </BpkSegmentedControlV2.Item>
  </BpkSegmentedControlV2.Root>
);

const ComplexItemContent = ({
  duration,
  label,
  price,
}: {
  duration: string;
  label: string;
  price: string;
}) => (
  <BpkVStack gap={BpkSpacing.None} align="start">
    <BpkText textStyle={TEXT_STYLES.caption}>{label}</BpkText>
    <BpkText textStyle={TEXT_STYLES.heading5}>{price}</BpkText>
    <BpkText textStyle={TEXT_STYLES.caption}>{duration}</BpkText>
  </BpkVStack>
);

const wrapperClassByType: Record<
  (typeof SEGMENT_TYPES_V2)[keyof typeof SEGMENT_TYPES_V2],
  string
> = {
  [SEGMENT_TYPES_V2.CanvasDefault]:
    'bpk-component-segmented-control-stories__canvas-default-wrapper',
  [SEGMENT_TYPES_V2.CanvasContrast]:
    'bpk-component-segmented-control-stories__canvas-contrast-wrapper',
  [SEGMENT_TYPES_V2.SurfaceDefault]:
    'bpk-component-segmented-control-stories__canvas-default-wrapper',
  [SEGMENT_TYPES_V2.SurfaceContrast]:
    'bpk-component-segmented-control-stories__surface-contrast-wrapper',
};

const ComplexTypeExample = ({
  type = SEGMENT_TYPES_V2.CanvasDefault,
}: {
  type?: (typeof SEGMENT_TYPES_V2)[keyof typeof SEGMENT_TYPES_V2];
}) => (
  <BpkProvider>
    <div
      className={getClassName(
        wrapperClassByType[type],
        'bpk-component-segmented-control-stories__complex',
      )}
    >
      <BpkSegmentedControlV2.Root
        label="Sort flight itineraries"
        defaultValue="cheapest"
        type={type}
        shadow
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="best">
          <BpkSegmentedControlV2.ItemText>
            <ComplexItemContent label="Best" price="£84" duration="2h average" />
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="cheapest">
          <BpkSegmentedControlV2.ItemText>
            <ComplexItemContent
              label="Cheapest"
              price="£34"
              duration="9h average"
            />
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="fastest">
          <BpkSegmentedControlV2.ItemText>
            <ComplexItemContent
              label="Fastest"
              price="£90"
              duration="1h average"
            />
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>
    </div>
  </BpkProvider>
);

const flightSortItems = [
  {
    value: 'best',
    label: 'Best',
    price: '£84',
    duration: '2h 18 average',
    showInfoIcon: true,
  },
  {
    value: 'cheapest',
    label: 'Cheapest',
    price: '£72',
    duration: '2h 18 average',
    showInfoIcon: false,
  },
  {
    value: 'fastest',
    label: 'Fastest',
    price: '£110',
    duration: '2h 18 average',
    showInfoIcon: false,
  },
];

const ComplexContentWithIcon = () => {
  const [selected, setSelected] = useState('best');

  return (
    <BpkProvider>
      <div
        className={getClassName(
          'bpk-component-segmented-control-stories__complex',
        )}
      >
        <BpkSegmentedControlV2.Root
          label="Sort flight itineraries"
          value={selected}
          onChange={setSelected}
        >
          <BpkSegmentedControlV2.Indicator />
          {flightSortItems.map(
            ({ duration, label, price, showInfoIcon, value }) => (
              <BpkSegmentedControlV2.Item key={value} value={value}>
                <BpkSegmentedControlV2.ItemText>
                  <BpkVStack gap={BpkSpacing.None} align="start">
                    <BpkText textStyle={TEXT_STYLES.caption}>{label}</BpkText>
                    <BpkHStack gap={BpkSpacing.XS} align="center">
                      <BpkText textStyle={TEXT_STYLES.heading5}>{price}</BpkText>
                      {showInfoIcon && (
                        <InformationCircleIcon focusable="false" />
                      )}
                    </BpkHStack>
                    <BpkText textStyle={TEXT_STYLES.caption}>{duration}</BpkText>
                  </BpkVStack>
                </BpkSegmentedControlV2.ItemText>
                <BpkSegmentedControlV2.ItemControl />
                <BpkSegmentedControlV2.ItemHiddenInput />
              </BpkSegmentedControlV2.Item>
            ),
          )}
        </BpkSegmentedControlV2.Root>
      </div>
    </BpkProvider>
  );
};

const ComplexContentWithButton = () => {
  const [selected, setSelected] = useState('best');

  return (
    <BpkProvider>
      <div
        className={getClassName(
          'bpk-component-segmented-control-stories__complex',
        )}
      >
        <BpkSegmentedControlV2.Root
          label="Sort flight itineraries"
          value={selected}
          onChange={setSelected}
        >
          <BpkSegmentedControlV2.Indicator />
          {flightSortItems.map(
            ({ duration, label, price, showInfoIcon, value }) => (
              <BpkSegmentedControlV2.Item key={value} value={value}>
                <BpkSegmentedControlV2.ItemText>
                  <BpkVStack gap={BpkSpacing.None} align="start">
                    <BpkText textStyle={TEXT_STYLES.caption}>{label}</BpkText>
                    <BpkHStack gap={BpkSpacing.XS} align="center">
                      <BpkText textStyle={TEXT_STYLES.heading5}>{price}</BpkText>
                      {showInfoIcon && (
                        <InformationCircleIcon focusable="false" />
                      )}
                    </BpkHStack>
                    <BpkText textStyle={TEXT_STYLES.caption}>{duration}</BpkText>
                  </BpkVStack>
                </BpkSegmentedControlV2.ItemText>
                <BpkSegmentedControlV2.ItemControl />
                <BpkSegmentedControlV2.ItemHiddenInput />
              </BpkSegmentedControlV2.Item>
            ),
          )}
          <BpkSegmentedControlV2.Item value="sort">
            <BpkSegmentedControlV2.ItemText>
              <BpkButton
                type={BUTTON_TYPES.link}
                className={getClassName(
                  'bpk-component-segmented-control-stories__sort-btn',
                )}
                onClick={() => setSelected('sort')}
              >
                Sort
                <ChevronDownIcon focusable="false" />
              </BpkButton>
            </BpkSegmentedControlV2.ItemText>
            <BpkSegmentedControlV2.ItemControl />
            <BpkSegmentedControlV2.ItemHiddenInput />
          </BpkSegmentedControlV2.Item>
        </BpkSegmentedControlV2.Root>
      </div>
    </BpkProvider>
  );
};

const VisualExample = () => (
  <BpkProvider>
    <BpkVStack
      gap={BpkSpacing.None}
      align="stretch"
      paddingTop={BpkSpacing.SM}
      paddingBottom={BpkSpacing.SM}
    >
      <ComplexTypeExample type={SEGMENT_TYPES_V2.CanvasDefault} />
      <ComplexTypeExample type={SEGMENT_TYPES_V2.CanvasContrast} />
      <ComplexTypeExample type={SEGMENT_TYPES_V2.SurfaceDefault} />
      <ComplexTypeExample type={SEGMENT_TYPES_V2.SurfaceContrast} />
    </BpkVStack>
  </BpkProvider>
);

/*
 * RTL Spike Option 2 — Mixed live toggle (US3 + US4)
 *
 * Renders both Ark-based components (BpkSegmentedControlV2, BpkCheckboxV2)
 * and a non-Ark component (BpkText) inside a single BpkProvider.
 *
 * BpkSegmentedControlV2 and BpkCheckboxV2 use Ark's LocaleProvider (via BpkProvider)
 * for RTL layout. BpkText uses CSS [dir="rtl"] selectors for RTL text alignment.
 *
 * To validate: use the Storybook RTL toolbar toggle (sets html[dir="rtl"]).
 * Expected: all three components update their layouts simultaneously without reload.
 * - BpkSegmentedControlV2: indicator mirrors to the correct RTL position
 * - BpkCheckboxV2: indicator appears on the right
 * - BpkText: text aligns right (CSS-driven, not Ark context)
 */
const RtlOption2MixedLiveToggle = () => {
  const [selected, setSelected] = useState('price');

  return (
    <BpkProvider>
      <BpkVStack gap={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          ترتيب النتائج
        </BpkText>
        <BpkSegmentedControlV2.Root
          label="ترتيب حسب"
          value={selected}
          onChange={setSelected}
        >
          <BpkSegmentedControlV2.Indicator />
          <BpkSegmentedControlV2.Item value="price">
            <BpkSegmentedControlV2.ItemText>السعر</BpkSegmentedControlV2.ItemText>
            <BpkSegmentedControlV2.ItemControl />
            <BpkSegmentedControlV2.ItemHiddenInput />
          </BpkSegmentedControlV2.Item>
          <BpkSegmentedControlV2.Item value="rating">
            <BpkSegmentedControlV2.ItemText>التقييم</BpkSegmentedControlV2.ItemText>
            <BpkSegmentedControlV2.ItemControl />
            <BpkSegmentedControlV2.ItemHiddenInput />
          </BpkSegmentedControlV2.Item>
          <BpkSegmentedControlV2.Item value="duration">
            <BpkSegmentedControlV2.ItemText>المدة</BpkSegmentedControlV2.ItemText>
            <BpkSegmentedControlV2.ItemControl />
            <BpkSegmentedControlV2.ItemHiddenInput />
          </BpkSegmentedControlV2.Item>
        </BpkSegmentedControlV2.Root>
        <BpkCheckboxV2.Root defaultChecked>
          <BpkCheckboxV2.Control>
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label>تنبيهات الأسعار (مكوّن Ark)</BpkCheckboxV2.Label>
          <BpkCheckboxV2.HiddenInput />
        </BpkCheckboxV2.Root>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          نص عادي من BpkText — يستجيب لـ CSS فقط (غير Ark)
        </BpkText>
      </BpkVStack>
    </BpkProvider>
  );
};

export {
  ComplexContentWithButton,
  ComplexContentWithIcon,
  DefaultCanvasDefault,
  UncontrolledDefaultValue,
  ComplexTypeExample,
  CanvasContrast,
  SurfaceDefault,
  SurfaceContrast,
  WithShadow,
  WithIconAndText,
  IconOnly,
  RtlLayout,
  RtlOption2MixedLiveToggle,
  TwoItems,
  LongLabels,
  NoInitialSelection,
  VisualExample,
};
