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

import {
  canvasContrastDay,
  surfaceContrastDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkSegmentedControl from '../../packages/bpk-component-segmented-control';
import { SEGMENT_TYPES } from '../../packages/bpk-component-segmented-control/src/BpkSegmentedControl';
import { cssModules } from '../../packages/bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

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
    label='Segmented control'
    onItemClick={() => {}}
    selectedIndex={0}
    type={SEGMENT_TYPES.CanvasDefault}
  />
);

const SimpleCanvasContrast = () => (
  <div style={canvasDefaultWrapperStyle}>
    <BpkSegmentedControl
      buttonContents={['Value', 'Value', 'Value']}
      label='Segmented control'
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
      label='Segmented control'
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
      label='Segmented control'
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
      label='Choose when to travel'
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
    label='Choose when to travel'
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
      label='Choose when to travel'
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
    label='Choose when to travel'
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.CanvasDefault}
    shadow
  />
);

const CustomSurfaceDefaultNoShadow = () => (
  <BpkSegmentedControl
    buttonContents={allCustomButtonContent}
    label='Choose when to travel'
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
      label='Sort flight itineraries'
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
    label='Sort flight itineraries'
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
      label='Sort flight itineraries'
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
    label='Sort flight itineraries'
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.CanvasDefault}
    shadow
  />
);

const ComplexSurfaceDefaultNoShadow = () => (
  <BpkSegmentedControl
    buttonContents={allComplexButtonContent}
    label='Sort flight itineraries'
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
};
