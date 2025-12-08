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

/* eslint-disable */

import { BpkButtonV2 } from '../../packages/bpk-component-button';

import {
  PrimaryExample,
  PrimaryOnDarkExample,
  PrimaryOnLightExample,
  SecondaryExample,
  SecondaryOnDarkExample,
  DestructiveExample,
  FeaturedExample,
  LinkExample,
  LinkImplicitExample,
  LinkImplicitOnDarkExample,
  LinkOnDarkExample,
  LinksExample,
  MixedExample,
  AnchorTagsExample,
  FullWidthExample,
  SubmitButtonExample,
} from './examples';
import { MixedExample as MixedExampleV1 } from './examplesv1';
import { PerformanceBenchmark } from './PerformanceBenchmark';

export default {
  title: 'bpk-component-button',
  component: BpkButtonV2,
};

export const BpkButtonPrimary = () => <PrimaryExample />;

export const BpkButtonPrimaryOnDark = () => <PrimaryOnDarkExample />;

export const BpkButtonPrimaryOnLight = () => <PrimaryOnLightExample />;

export const BpkButtonSecondary = () => <SecondaryExample />;

export const BpkButtonSecondaryOnDark = () => <SecondaryOnDarkExample />;

export const BpkButtonDestructive = () => <DestructiveExample />;

export const BpkButtonFeatured = () => <FeaturedExample />;

export const BpkButtonLinkButton = () => <LinkExample />;

export const BpkButtonLinkImplicitButton = () => <LinkImplicitExample />;

export const BpkButtonLinkOnDarkButton = () => <LinkOnDarkExample />;

export const BpkButtonLinkImplicitOnDarkButton = () => <LinkImplicitOnDarkExample />;

export const Links = () => <LinksExample />;

export const Mixture = () => <MixedExample />;
export const AnchorTags = () => <AnchorTagsExample />;

export const VisualTest = () => <MixedExample />;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};

export const VisualTestV1 = () => <MixedExampleV1 />;
export const VisualTestV1WithZoom = {
  render: VisualTestV1,
  args: {
    zoomEnabled: true,
  },
};
export const SubmitButton = () => <SubmitButtonExample />;
export const FullWidth = () => <FullWidthExample />;

export const PerformanceTest = () => <PerformanceBenchmark />;
PerformanceTest.parameters = {
  docs: {
    description: {
      story: 'Interactive performance benchmark for testing link button icon detection performance in real browser environment.',
    },
  },
};
