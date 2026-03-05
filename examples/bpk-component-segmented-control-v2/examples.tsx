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
import type { CSSProperties } from 'react';

import {
  BpkSegmentedControlV2,
  SEGMENT_TYPES_V2,
} from '../../packages/bpk-component-segmented-control';
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
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
          <rect x="1" y="1" width="6" height="6" />
          <rect x="9" y="1" width="6" height="6" />
          <rect x="1" y="9" width="6" height="6" />
          <rect x="9" y="9" width="6" height="6" />
        </svg>
        Grid
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="list">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
          <rect x="1" y="3" width="14" height="2" />
          <rect x="1" y="7" width="14" height="2" />
          <rect x="1" y="11" width="14" height="2" />
        </svg>
        List
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const IconOnlyWithAccessibilityLabel = () => {
  const [selected, setSelected] = useState('grid');
  return (
    <BpkSegmentedControlV2.Root
      label="View layout"
      value={selected}
      onChange={setSelected}
    >
      <BpkSegmentedControlV2.Item value="grid" accessibilityLabel="Grid view">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
          <rect x="1" y="1" width="6" height="6" />
          <rect x="9" y="1" width="6" height="6" />
          <rect x="1" y="9" width="6" height="6" />
          <rect x="9" y="9" width="6" height="6" />
        </svg>
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="list" accessibilityLabel="List view">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
          <rect x="1" y="3" width="14" height="2" />
          <rect x="1" y="7" width="14" height="2" />
          <rect x="1" y="11" width="14" height="2" />
        </svg>
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};

const Vdl2ThemeOverride = () => {
  const [selected, setSelected] = useState('price');
  return (
    <div
      style={
        {
          '--bpk-segmented-control-bg': '#e8f0fe',
          '--bpk-segmented-control-indicator-bg': '#0066cc',
          '--bpk-segmented-control-indicator-color': '#ffffff',
          '--bpk-segmented-control-item-color': '#1a1a2e',
          '--bpk-segmented-control-border-radius': '0.5rem',
          '--bpk-segmented-control-divider-color': '#c0cbdb',
        } as CSSProperties
      }
    >
      <BpkSegmentedControlV2.Root
        label="Sort by"
        value={selected}
        onChange={setSelected}
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
    </div>
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
          Earliest departure time
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="arrival">
          Earliest arrival time
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="price">
          Cheapest price available
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
  <div
    className={getClassName(
      'bpk-component-segmented-control-stories__complex-content',
    )}
  >
    <div>{label}</div>
    <div>{price}</div>
    <div>{duration}</div>
  </div>
);

const ComplexCanvasDefault = () => (
  <div
    className={getClassName(
      'bpk-component-segmented-control-stories__canvas-default-wrapper',
    )}
  >
    <BpkSegmentedControlV2.Root
      label="Sort flight itineraries"
      defaultValue="cheapest"
      type={SEGMENT_TYPES_V2.CanvasDefault}
      shadow
    >
      <BpkSegmentedControlV2.Item
        value="best"
        accessibilityLabel="Best, £84, 2h average"
      >
        <ComplexItemContent label="Best" price="£84" duration="2h average" />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="cheapest"
        accessibilityLabel="Cheapest, £34, 9h average"
      >
        <ComplexItemContent
          label="Cheapest"
          price="£34"
          duration="9h average"
        />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="fastest"
        accessibilityLabel="Fastest, £90, 1h average"
      >
        <ComplexItemContent label="Fastest" price="£90" duration="1h average" />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  </div>
);

const ComplexCanvasContrast = () => (
  <div
    className={getClassName(
      'bpk-component-segmented-control-stories__canvas-contrast-wrapper',
    )}
  >
    <BpkSegmentedControlV2.Root
      label="Sort flight itineraries"
      defaultValue="cheapest"
      type={SEGMENT_TYPES_V2.CanvasContrast}
      shadow
    >
      <BpkSegmentedControlV2.Item
        value="best"
        accessibilityLabel="Best, £84, 2h average"
      >
        <ComplexItemContent label="Best" price="£84" duration="2h average" />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="cheapest"
        accessibilityLabel="Cheapest, £34, 9h average"
      >
        <ComplexItemContent
          label="Cheapest"
          price="£34"
          duration="9h average"
        />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="fastest"
        accessibilityLabel="Fastest, £90, 1h average"
      >
        <ComplexItemContent label="Fastest" price="£90" duration="1h average" />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  </div>
);

const ComplexSurfaceDefault = () => (
  <div
    className={getClassName(
      'bpk-component-segmented-control-stories__canvas-default-wrapper',
    )}
  >
    <BpkSegmentedControlV2.Root
      label="Sort flight itineraries"
      defaultValue="cheapest"
      type={SEGMENT_TYPES_V2.SurfaceDefault}
      shadow
    >
      <BpkSegmentedControlV2.Item
        value="best"
        accessibilityLabel="Best, £84, 2h average"
      >
        <ComplexItemContent label="Best" price="£84" duration="2h average" />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="cheapest"
        accessibilityLabel="Cheapest, £34, 9h average"
      >
        <ComplexItemContent
          label="Cheapest"
          price="£34"
          duration="9h average"
        />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="fastest"
        accessibilityLabel="Fastest, £90, 1h average"
      >
        <ComplexItemContent label="Fastest" price="£90" duration="1h average" />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  </div>
);

const ComplexSurfaceContrast = () => (
  <div
    className={getClassName(
      'bpk-component-segmented-control-stories__surface-contrast-wrapper',
    )}
  >
    <BpkSegmentedControlV2.Root
      label="Sort flight itineraries"
      defaultValue="cheapest"
      type={SEGMENT_TYPES_V2.SurfaceContrast}
      shadow
    >
      <BpkSegmentedControlV2.Item
        value="best"
        accessibilityLabel="Best, £84, 2h average"
      >
        <ComplexItemContent label="Best" price="£84" duration="2h average" />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="cheapest"
        accessibilityLabel="Cheapest, £34, 9h average"
      >
        <ComplexItemContent
          label="Cheapest"
          price="£34"
          duration="9h average"
        />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item
        value="fastest"
        accessibilityLabel="Fastest, £90, 1h average"
      >
        <ComplexItemContent label="Fastest" price="£90" duration="1h average" />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  </div>
);

const VisualExample = () => (
  <>
    <ComplexCanvasDefault />
    <br />
    <ComplexCanvasContrast />
    <br />
    <ComplexSurfaceDefault />
    <br />
    <ComplexSurfaceContrast />
  </>
);

export {
  DefaultCanvasDefault,
  UncontrolledDefaultValue,
  CanvasContrast,
  SurfaceDefault,
  SurfaceContrast,
  WithShadow,
  RootDisabled,
  IndividualItemDisabled,
  WithIconAndText,
  IconOnlyWithAccessibilityLabel,
  Vdl2ThemeOverride,
  RtlLayout,
  TwoItems,
  LongLabels,
  NoInitialSelection,
  VisualExample,
};
