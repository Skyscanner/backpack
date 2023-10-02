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

/* @flow strict */

import {
  DocsPrimaryExample,
  PrimaryExample,
  PrimaryOnDarkExample,
  PrimaryOnLightExample,
  SecondaryExample,
  SecondaryOnDarkExample,
  DestructiveExample,
  LinkButtonExample,
  LinkOnDarkButtonExample,
  FeaturedExample,
  MixtureExample,
  AnchorTagsExample,
  CustomIconExample,
  VisualExample,
} from './examples';

export default {
  title: 'bpk-component-loading-button',
};

export const DocsPrimary = DocsPrimaryExample;

export const Primary = PrimaryExample;
export const PrimaryOnDark = PrimaryOnDarkExample;

export const PrimaryOnLight = PrimaryOnLightExample;

export const Secondary = SecondaryExample;
export const SecondaryOnDark = SecondaryOnDarkExample;

export const Destructive = DestructiveExample;
export const LinkButton = LinkButtonExample;

export const LinkOnDarkButton = LinkOnDarkButtonExample;

export const Featured = FeaturedExample;
export const Mixture = MixtureExample;
export const AnchorTags = AnchorTagsExample;

export const CustomIcon = CustomIconExample;
export const VisualTest = VisualExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  fontSize: '32px'
};
