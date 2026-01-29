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

import { useMemo, useState } from 'react';

import {
  canvasContrastDay,
  surfaceContrastDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkDarkExampleWrapper } from '../../../examples/bpk-storybook-utils';
import BpkSegmentedControl, {
  useSegmentedControlPanels,
  SEGMENT_TYPES,
  BpkText,
  cssModules,
} from '../index';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const canvasDefaultWrapperStyle = {
  backgroundColor: canvasContrastDay,
  padding: '2rem',
};

const surfaceContrastWrapperStyle = {
  backgroundColor: surfaceContrastDay,
  padding: '2rem',
};

// Simple Segmented Control
const SimpleDefault = () => (
  <BpkSegmentedControl
    buttonContents={['Value', 'Value']}
    label="Segmented control"
    onItemClick={() => {}}
    selectedIndex={0}
    type={SEGMENT_TYPES.CanvasDefault}
  />
);

const SimpleCanvasContrast = () => (
  <div style={canvasDefaultWrapperStyle}>
    <BpkSegmentedControl
      buttonContents={['Value', 'Value', 'Value']}
      label="Segmented control"
      onItemClick={() => {}}
      selectedIndex={2}
      type={SEGMENT_TYPES.CanvasContrast}
    />
  </div>
);

const SimpleSurfaceDefault = () => (
  <div style={surfaceContrastWrapperStyle}>
    <BpkSegmentedControl
      buttonContents={['Value', 'Value', 'Value', 'Value']}
      label="Segmented control"
      onItemClick={() => {}}
      selectedIndex={2}
      type={SEGMENT_TYPES.SurfaceDefault}
    />
  </div>
);

const SimpleSurfaceContrast = () => (
  <BpkDarkExampleWrapper padded>
    <BpkSegmentedControl
      buttonContents={[
        'Very Long Value1',
        'Very Long Value2',
        'Very Long Value3',
        'Very Long Value4',
      ]}
      label="Segmented control"
      onItemClick={() => {}}
      selectedIndex={2}
      type={SEGMENT_TYPES.SurfaceContrast}
    />
  </BpkDarkExampleWrapper>
);

//  Custom Button Segmented Control
const customButtonContentDatesFixed = [
  <span
    className={getClassName(
      'bpk-component-segmented-control-stories__custom-button',
    )}
  >
    Specific dates
  </span>,
];

const customButtonContentDatesFlexible = [
  <span
    className={getClassName(
      'bpk-component-segmented-control-stories__custom-button',
    )}
  >
    Flexible dates
  </span>,
];

const allCustomButtonContent = [
  customButtonContentDatesFixed,
  customButtonContentDatesFlexible,
];

const CustomSurfaceContrast = () => (
  <BpkDarkExampleWrapper padded>
    <BpkSegmentedControl
      buttonContents={allCustomButtonContent}
      label="Choose when to travel"
      onItemClick={() => {}}
      selectedIndex={1}
      type={SEGMENT_TYPES.SurfaceContrast}
      shadow
    />
  </BpkDarkExampleWrapper>
);

const CustomSurfaceDefault = () => (
  <BpkSegmentedControl
    buttonContents={allCustomButtonContent}
    label="Choose when to travel"
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.SurfaceDefault}
    shadow
  />
);

const CustomCanvasContrast = () => (
  <BpkDarkExampleWrapper padded style={{ backgroundColor: canvasContrastDay }}>
    <BpkSegmentedControl
      buttonContents={allCustomButtonContent}
      label="Choose when to travel"
      onItemClick={() => {}}
      selectedIndex={1}
      type={SEGMENT_TYPES.CanvasContrast}
      shadow
    />
  </BpkDarkExampleWrapper>
);

const CustomCanvasDefault = () => (
  <BpkSegmentedControl
    buttonContents={allCustomButtonContent}
    label="Choose when to travel"
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.CanvasDefault}
    shadow
  />
);

const CustomSurfaceDefaultNoShadow = () => (
  <BpkSegmentedControl
    buttonContents={allCustomButtonContent}
    label="Choose when to travel"
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.SurfaceDefault}
  />
);

// Complex Segmented Control
const complexButtonContentBest = [
  <>
    <div>Best</div>
    <div>£84</div>
    <div>2h average</div>
  </>,
];
const complexButtonContentCheapest = [
  <>
    <div>Cheapest</div>
    <div>£34</div>
    <div>9h average</div>
  </>,
];
const complexButtonContentFastest = [
  <>
    <div>Fastest</div>
    <div>£90</div>
    <div>1h average</div>
  </>,
];

const allComplexButtonContent = [
  complexButtonContentBest,
  complexButtonContentCheapest,
  complexButtonContentFastest,
];

const ComplexSurfaceContrast = () => (
  <BpkDarkExampleWrapper padded>
    <BpkSegmentedControl
      buttonContents={allComplexButtonContent}
      label="Sort flight itineraries"
      onItemClick={() => {}}
      selectedIndex={1}
      type={SEGMENT_TYPES.SurfaceContrast}
      shadow
    />
  </BpkDarkExampleWrapper>
);

const ComplexSurfaceDefault = () => (
  <BpkSegmentedControl
    buttonContents={allComplexButtonContent}
    label="Sort flight itineraries"
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.SurfaceDefault}
    shadow
  />
);

const ComplexCanvasContrast = () => (
  <BpkDarkExampleWrapper padded style={{ backgroundColor: canvasContrastDay }}>
    <BpkSegmentedControl
      buttonContents={allComplexButtonContent}
      label="Sort flight itineraries"
      onItemClick={() => {}}
      selectedIndex={1}
      type={SEGMENT_TYPES.CanvasContrast}
      shadow
    />
  </BpkDarkExampleWrapper>
);

const ComplexCanvasDefault = () => (
  <BpkSegmentedControl
    buttonContents={allComplexButtonContent}
    label="Sort flight itineraries"
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.CanvasDefault}
    shadow
  />
);

const ComplexSurfaceDefaultNoShadow = () => (
  <BpkSegmentedControl
    buttonContents={allComplexButtonContent}
    label="Sort flight itineraries"
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.SurfaceDefault}
  />
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

// Example demonstrating the recommended hook pattern for managing tabs and panels.
// The hook automatically handles ID generation and ARIA relationships.
const WithHookControlledPanelsExample = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonContents = useMemo(() => ['Flights', 'Hotels', 'Car hire'], []);

  const { controlProps, getPanelProps } = useSegmentedControlPanels(
    buttonContents,
    selectedIndex,
  );

  const panelStyle = {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '0.5rem',
    marginTop: '1rem',
  };

  return (
    <div>
      <BpkSegmentedControl
        {...controlProps}
        label="Travel options"
        onItemClick={setSelectedIndex}
        type={SEGMENT_TYPES.CanvasDefault}
      />
      <div {...getPanelProps(0)} style={panelStyle}>
        <BpkText>Search for flights to your destination.</BpkText>
      </div>
      <div {...getPanelProps(1)} style={panelStyle}>
        <BpkText>Find the perfect place to stay.</BpkText>
      </div>
      <div {...getPanelProps(2)} style={panelStyle}>
        <BpkText>Rent a car for your trip.</BpkText>
      </div>
    </div>
  );
};

// Example using conditional rendering instead of the hidden attribute.
// Both approaches are valid - use whichever fits your use case better.
const WithConditionalPanelsExample = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const panelStyle = {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '0.5rem',
    marginTop: '1rem',
  };

  return (
    <div>
      <BpkSegmentedControl
        buttonContents={['Specific dates', 'Flexible dates']}
        label="Date selection mode"
        onItemClick={setSelectedIndex}
        selectedIndex={selectedIndex}
        type={SEGMENT_TYPES.SurfaceDefault}
      />
      {selectedIndex === 0 && (
        <div role="tabpanel" style={panelStyle}>
          <BpkText>Specific dates Panel</BpkText>
        </div>
      )}
      {selectedIndex === 1 && (
        <div role="tabpanel" style={panelStyle}>
          <BpkText>Flexible dates Panel</BpkText>
        </div>
      )}
    </div>
  );
};

export {
  SimpleDefault,
  SimpleCanvasContrast,
  SimpleSurfaceDefault,
  SimpleSurfaceContrast,
  CustomSurfaceContrast,
  CustomSurfaceDefault,
  CustomCanvasContrast,
  CustomCanvasDefault,
  CustomSurfaceDefaultNoShadow,
  ComplexSurfaceContrast,
  ComplexSurfaceDefault,
  ComplexCanvasContrast,
  ComplexCanvasDefault,
  ComplexSurfaceDefaultNoShadow,
  VisualExample,
  WithHookControlledPanelsExample,
  WithConditionalPanelsExample,
};
