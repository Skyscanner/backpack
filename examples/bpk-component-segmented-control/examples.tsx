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
  surfaceContrastDay
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkSegmentedControl from '../../packages/bpk-component-segmented-control';
import { SEGMENT_TYPES } from '../../packages/bpk-component-segmented-control/src/BpkSegmentedControl';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

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
    onItemClick={() => {}}
    selectedIndex={0}
    type={SEGMENT_TYPES.CanvasDefault}
  />
);

const SimpleCanvasContrast = () => (
  <div style={canvasDefaultWrapperStyle}>
    <BpkSegmentedControl
      buttonContents={['Value', 'Value', 'Value']}
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
      onItemClick={() => {}}
      selectedIndex={2}
      type={SEGMENT_TYPES.SurfaceContrast}
    />
  </BpkDarkExampleWrapper>
);

// // Complex Segmented Control
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

const allButtonContent = [
  complexButtonContentBest,
  complexButtonContentCheapest,
  complexButtonContentFastest,
];

const ComplexSurfaceContrast = () => (
  <BpkDarkExampleWrapper padded>
    <BpkSegmentedControl
      buttonContents={allButtonContent}
      onItemClick={() => {}}
      selectedIndex={1}
      type={SEGMENT_TYPES.SurfaceContrast}
      shadow
    />
  </BpkDarkExampleWrapper>
);

const ComplexSurfaceDefault = () => (
  <BpkSegmentedControl
    buttonContents={allButtonContent}
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.SurfaceDefault}
    shadow
  />
);

const ComplexCanvasContrast = () => (
  <BpkDarkExampleWrapper
    padded
    style={{ backgroundColor: canvasContrastDay }}
  >
    <BpkSegmentedControl
      buttonContents={allButtonContent}
      onItemClick={() => {}}
      selectedIndex={1}
      type={SEGMENT_TYPES.CanvasContrast}
      shadow
    />
  </BpkDarkExampleWrapper>
);

const ComplexCanvasDefault = () => (
  <BpkSegmentedControl
    buttonContents={allButtonContent}
    onItemClick={() => {}}
    selectedIndex={1}
    type={SEGMENT_TYPES.CanvasDefault}
    shadow
  />
);

const ComplexSurfaceDefaultNoShadow = () => (
  <BpkSegmentedControl
    buttonContents={allButtonContent}
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
  ComplexSurfaceContrast,
  ComplexSurfaceDefault,
  ComplexCanvasContrast,
  ComplexCanvasDefault,
  ComplexSurfaceDefaultNoShadow,
  VisualExample,
};
