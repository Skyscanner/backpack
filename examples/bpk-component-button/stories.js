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

import { BpkButtonV2 } from '../../packages/bpk-component-button/src/BpkButtonV2/BpkButton';

import {
  PrimaryExample,
  PrimaryOnDarkExample,
  PrimaryOnLightExample,
  SecondaryExample,
  SecondaryOnDarkExample,
  DestructiveExample,
  FeaturedExample,
  LinkExample,
  LinkOnDarkExample,
  MixedExample,
  AnchorTagsExample,
} from './examples';

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

export const BpkButtonLinkOnDarkButton = () => <LinkOnDarkExample />;

export const Mixture = () => <MixedExample />;
export const AnchorTags = () => <AnchorTagsExample />;

export const VisualTest = () => <MixedExample />;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};