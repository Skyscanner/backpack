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

import { BpkSegmentedControlV2 } from '../../packages/bpk-component-segmented-control';

import {
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
} from './examples';

export default {
  title: 'bpk-component-segmented-control-v2',
  component: BpkSegmentedControlV2.Root,
  parameters: {
    a11y: { disable: false },
  },
};

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default = {
  render: DefaultCanvasDefault,
  name: 'Default (canvas-default, 3 items)',
};

export const UncontrolledUsage = {
  render: UncontrolledDefaultValue,
  name: 'Uncontrolled (defaultValue)',
};

// ─── Type variants ────────────────────────────────────────────────────────────

export const TypeCanvasContrast = {
  render: CanvasContrast,
  name: 'Type — canvas-contrast',
};

export const TypeSurfaceDefault = {
  render: SurfaceDefault,
  name: 'Type — surface-default',
};

export const TypeSurfaceContrast = {
  render: SurfaceContrast,
  name: 'Type — surface-contrast',
};

// ─── Shadow ───────────────────────────────────────────────────────────────────

export const Shadow = {
  render: WithShadow,
  name: 'With shadow',
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const DisabledRoot = {
  render: RootDisabled,
  name: 'Root disabled',
};

export const DisabledItem = {
  render: IndividualItemDisabled,
  name: 'Individual item disabled',
};

// ─── Custom content ───────────────────────────────────────────────────────────

export const IconAndText = {
  render: WithIconAndText,
  name: 'Icon + text content',
};

export const IconOnly = {
  render: IconOnlyWithAccessibilityLabel,
  name: 'Icon-only with accessibilityLabel',
};

// ─── Theming ──────────────────────────────────────────────────────────────────

export const Vdl2Theme = {
  render: Vdl2ThemeOverride,
  name: 'CSS variable override (VDL 2.0 preview)',
};

// ─── RTL ──────────────────────────────────────────────────────────────────────

export const Rtl = {
  render: RtlLayout,
  name: 'RTL layout',
};

// ─── Edge cases ───────────────────────────────────────────────────────────────

export const TwoSegments = {
  render: TwoItems,
  name: 'Edge case — 2 items',
};

export const LongLabelText = {
  render: LongLabels,
  name: 'Edge case — long label text (truncation)',
};

export const NoneSelected = {
  render: NoInitialSelection,
  name: 'Edge case — no initial selection',
};

// ─── Visual regression ────────────────────────────────────────────────────────

export const VisualTest = VisualExample;
