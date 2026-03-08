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

import GridLayoutIcon from '../../packages/bpk-component-icon/sm/grid-layout';
import ListIcon from '../../packages/bpk-component-icon/sm/list';
import {
  BpkBox,
  BpkProvider,
  BpkSpacing,
  BpkVStack,
} from '../../packages/bpk-component-layout';
import {
  BpkSegmentedControlV2,
  SEGMENT_TYPES_V2,
} from '../../packages/bpk-component-segmented-control';
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
      <BpkSegmentedControlV2.Item value="price">
        Price
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="rating">
        Rating
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="duration">
        Duration
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const UncontrolledDefaultValue = () => (
  <BpkSegmentedControlV2.Root label="View mode" defaultValue="grid">
    <BpkSegmentedControlV2.Item value="grid">Grid</BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="list">List</BpkSegmentedControlV2.Item>
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
        <BpkSegmentedControlV2.Item value="flights">
          Flights
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="hotels">
          Hotels
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="cars">
          Cars
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
      <BpkSegmentedControlV2.Item value="one-way">
        One way
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="return">
        Return
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="multi-city">
        Multi-city
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
        <BpkSegmentedControlV2.Item value="economy">
          Economy
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="business">
          Business
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="first">
          First
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
      <BpkSegmentedControlV2.Item value="all">All</BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="direct">
        Direct
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="one-stop">
        1 stop
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const RootDisabled = () => (
  <BpkSegmentedControlV2.Root
    label="Unavailable filter"
    defaultValue="all"
    disabled
  >
    <BpkSegmentedControlV2.Item value="all">All</BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="direct">
      Direct
    </BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="one-stop">
      1 stop
    </BpkSegmentedControlV2.Item>
  </BpkSegmentedControlV2.Root>
);

const IndividualItemDisabled = () => {
  const [selected, setSelected] = useState('economy');
  return (
    <BpkSegmentedControlV2.Root
      label="Cabin class"
      value={selected}
      onChange={setSelected}
    >
      <BpkSegmentedControlV2.Item value="economy">
        Economy
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="premium" disabled>
        Premium (sold out)
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="business">
        Business
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
      <BpkSegmentedControlV2.Item value="grid">
        <GridLayoutIcon />
        Grid
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="list">
        <ListIcon />
        List
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
      <BpkSegmentedControlV2.Item value="grid">
        <GridLayoutIcon />
        <BpkVisuallyHidden>Grid view</BpkVisuallyHidden>
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="list">
        <ListIcon />
        <BpkVisuallyHidden>List view</BpkVisuallyHidden>
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
        <BpkSegmentedControlV2.Item value="price">
          السعر
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          التقييم
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">
          المدة
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
      <BpkSegmentedControlV2.Item value="one-way">
        One way
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="return">
        Return
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
        <BpkSegmentedControlV2.Item value="departure">
          <span className={getClassName('bpk-component-segmented-control-stories__custom-button')}>
            Earliest departure time
          </span>
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="arrival">
          <span className={getClassName('bpk-component-segmented-control-stories__custom-button')}>
            Earliest arrival time
          </span>
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="price">
          <span className={getClassName('bpk-component-segmented-control-stories__custom-button')}>
            Cheapest price available
          </span>
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>
    </div>
  );
};

const NoInitialSelection = () => (
  <BpkSegmentedControlV2.Root label="Select option">
    <BpkSegmentedControlV2.Item value="a">Option A</BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="b">Option B</BpkSegmentedControlV2.Item>
  </BpkSegmentedControlV2.Root>
);

// Stacks multi-line item content vertically, matching v1's block-layout buttons.
const ComplexItemContent = ({
  duration,
  label,
  price,
}: {
  duration: string;
  label: string;
  price: string;
}) => (
  <BpkVStack gap={BpkSpacing.XS}>
    <BpkBox>{label}</BpkBox>
    <BpkBox>{price}</BpkBox>
    <BpkBox>{duration}</BpkBox>
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
    <div className={getClassName(wrapperClassByType[type])}>
      <BpkSegmentedControlV2.Root
        label="Sort flight itineraries"
        defaultValue="cheapest"
        type={type}
        shadow
      >
        <BpkSegmentedControlV2.Item value="best">
          <ComplexItemContent label="Best" price="£84" duration="2h average" />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="cheapest">
          <ComplexItemContent
            label="Cheapest"
            price="£34"
            duration="9h average"
          />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="fastest">
          <ComplexItemContent
            label="Fastest"
            price="£90"
            duration="1h average"
          />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>
    </div>
  </BpkProvider>
);

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

export {
  DefaultCanvasDefault,
  UncontrolledDefaultValue,
  ComplexTypeExample,
  CanvasContrast,
  SurfaceDefault,
  SurfaceContrast,
  WithShadow,
  RootDisabled,
  IndividualItemDisabled,
  WithIconAndText,
  IconOnly,
  RtlLayout,
  TwoItems,
  LongLabels,
  NoInitialSelection,
  VisualExample,
};
